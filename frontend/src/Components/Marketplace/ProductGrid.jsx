import React from 'react';
import ProductCard from './ProductCard.jsx';

const ProductGrid = ({ products, loading }) => {
    if (loading) {
        return <div>Loading...</div>;
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">No products found!</h3>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;