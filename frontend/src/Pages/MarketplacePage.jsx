import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Common/Navbar.jsx';
import Footer from '../Components/Common/Footer.jsx';
import ProductGrid from '../Components/Marketplace/ProductGrid.jsx';
import SearchFilters from '../Components/Marketplace/SearchFilters.jsx';
import { useProductStore } from '../Store/useProductStore.js';

const MarketplacePage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('latest');

    const { getAllProducts } = useProductStore();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const productsData = await getAllProducts();

                if (Array.isArray(productsData) && productsData.length > 0) {
                    setProducts(productsData);
                    setFilteredProducts(productsData);
                } else {
                    setProducts([]);
                    setFilteredProducts([]);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
                setFilteredProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            applySearchAndSort();
        }
    }, [searchTerm, sortOption, products]);

    const applySearchAndSort = () => {
        let result = [...products];

        if (searchTerm) {
            result = result.filter(
                product =>
                    product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(result);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-20 py-8 bg-gray-50 border-t-1 border-gray-300">
                <h1 className="text-3xl font-bold text-green-800 mb-6">Marketplace</h1>

                <SearchFilters
                    onSearchChange={setSearchTerm}
                    onSortChange={setSortOption}
                    sortOption={sortOption}
                />

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                ) : (
                    <>
                        {filteredProducts.length === 0 ? (
                            <div className="text-center mt-8 text-gray-500">
                                No products found!
                            </div>
                        ) : (
                            <ProductGrid
                                products={filteredProducts}
                                loading={loading}
                            />
                        )}
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default MarketplacePage;