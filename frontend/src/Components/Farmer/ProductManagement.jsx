import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiFilter } from 'react-icons/fi';

const ProductManagement = () => {
    // Sample product data - in a real app, this would come from your API
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Organic Tomatoes",
            price: 3.99,
            stock: 25,
            category: "Vegetables",
            organic: true,
            createdAt: "2025-03-01",
            image: "https://images.unsplash.com/photo-1546470427-227c21f15dbc?q=80&w=200&auto=format&fit=crop"
        },
        {
            id: 2,
            name: "Fresh Lettuce",
            price: 2.49,
            stock: 18,
            category: "Vegetables",
            organic: true,
            createdAt: "2025-03-05",
            image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=80&w=200&auto=format&fit=crop"
        },
        {
            id: 3,
            name: "Carrots Bundle",
            price: 3.29,
            stock: 32,
            category: "Vegetables",
            organic: true,
            createdAt: "2025-03-10",
            image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?q=80&w=200&auto=format&fit=crop"
        },
        {
            id: 4,
            name: "Free Range Eggs",
            price: 5.99,
            stock: 10,
            category: "Dairy & Eggs",
            organic: true,
            createdAt: "2025-03-12",
            image: "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=200&auto=format&fit=crop"
        },
        {
            id: 5,
            name: "Honey Jar",
            price: 8.50,
            stock: 15,
            category: "Other",
            organic: true,
            createdAt: "2025-03-15",
            image: "https://images.unsplash.com/photo-1558642084-fd07fae5282e?q=80&w=200&auto=format&fit=crop"
        },
        {
            id: 6,
            name: "Apple Basket",
            price: 7.99,
            stock: 8,
            category: "Fruits",
            organic: true,
            createdAt: "2025-03-18",
            image: "https://images.unsplash.com/photo-1577028300946-53d69a7b8404?q=80&w=200&auto=format&fit=crop"
        },
    ]);

    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [currentProduct, setCurrentProduct] = useState({
        name: "",
        price: "",
        stock: "",
        category: "Vegetables",
        organic: true,
        description: "",
        image: null
    });

    // Filter and search products
    const filteredProducts = products
        .filter(product =>
            searchTerm === '' ||
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(product =>
            filterCategory === 'All' ||
            product.category === filterCategory
        );

    // Handle adding a new product
    const handleAddProduct = (e) => {
        e.preventDefault();
        // In a real app, you would send this data to your backend
        const newProductWithId = {
            ...currentProduct,
            id: products.length + 1,
            image: currentProduct.image || "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?q=80&w=200&auto=format&fit=crop",
            price: parseFloat(currentProduct.price),
            stock: parseInt(currentProduct.stock),
            createdAt: new Date().toISOString().split('T')[0]
        };

        setProducts([...products, newProductWithId]);
        setCurrentProduct({
            name: "",
            price: "",
            stock: "",
            category: "Vegetables",
            organic: true,
            description: "",
            image: null
        });
        setIsAddProductModalOpen(false);
    };

    // Handle editing a product
    const handleEditProduct = (e) => {
        e.preventDefault();
        setProducts(products.map(product =>
            product.id === currentProduct.id ? {
                ...currentProduct,
                price: parseFloat(currentProduct.price),
                stock: parseInt(currentProduct.stock)
            } : product
        ));
        setIsEditProductModalOpen(false);
    };

    // Handle deleting a product
    const handleDeleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(product => product.id !== id));
        }
    };

    // Open edit modal with product data
    const openEditModal = (product) => {
        setCurrentProduct(product);
        setIsEditProductModalOpen(true);
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
                    <button
                        onClick={() => setIsAddProductModalOpen(true)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center transition duration-200"
                    >
                        <FiPlus className="mr-2" />
                        Add New Product
                    </button>
                </div>

                {/* Filters and Search */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center">
                        <div className="flex items-center mr-2">
                            <FiFilter className="text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">Filter:</span>
                        </div>
                        <select
                            className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Dairy & Eggs">Dairy & Eggs</option>
                            <option value="Meat">Meat</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {filteredProducts.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Stock
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Added On
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0">
                                                        <img
                                                            className="h-10 w-10 rounded-md object-cover"
                                                            src={product.image}
                                                            alt={product.name}
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {product.name}
                                                        </div>
                                                        {product.organic && (
                                                            <div className="text-xs text-green-600">
                                                                Organic
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                ${product.price.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`text-sm ${product.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                                                    {product.stock} units
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {product.createdAt}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => openEditModal(product)}
                                                    className="text-blue-600 hover:text-blue-800 mr-4"
                                                >
                                                    <FiEdit className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <FiTrash2 className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-10 text-center text-gray-500">
                            No products found. {searchTerm && 'Try a different search term or'} Add a new product.
                        </div>
                    )}
                </div>
            </div>

            {/* Add Product Modal */}
            {isAddProductModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold">Add New Product</h3>
                                <button
                                    onClick={() => setIsAddProductModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    &times;
                                </button>
                            </div>

                            <form onSubmit={handleAddProduct}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="name">
                                        Product Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="e.g., Organic Tomatoes"
                                        value={currentProduct.name}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-gray-700 mb-2" htmlFor="price">
                                            Price ($)
                                        </label>
                                        <input
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="0.00"
                                            value={currentProduct.price}
                                            onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2" htmlFor="stock">
                                            Stock Quantity
                                        </label>
                                        <input
                                            id="stock"
                                            type="number"
                                            min="0"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="0"
                                            value={currentProduct.stock}
                                            onChange={(e) => setCurrentProduct({ ...currentProduct, stock: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="category">
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        value={currentProduct.category}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                                        required
                                    >
                                        <option value="Vegetables">Vegetables</option>
                                        <option value="Fruits">Fruits</option>
                                        <option value="Dairy & Eggs">Dairy & Eggs</option>
                                        <option value="Meat">Meat</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="flex items-center text-gray-700 mb-2">
                                        <input
                                            type="checkbox"
                                            className="rounded text-green-600 focus:ring-green-500 mr-2"
                                            checked={currentProduct.organic}
                                            onChange={(e) => setCurrentProduct({ ...currentProduct, organic: e.target.checked })}
                                        />
                                        Organic Product
                                    </label>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="description">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        rows="3"
                                        placeholder="Describe your product..."
                                        value={currentProduct.description}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 mb-2" htmlFor="image">
                                        Product Image
                                    </label>
                                    <div className="border border-dashed border-gray-300 rounded-md p-6 text-center hover:bg-gray-50 cursor-pointer">
                                        <input
                                            type="file"
                                            id="image"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.files[0] })}
                                        />
                                        <label htmlFor="image" className="cursor-pointer">
                                            <FiPlus className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-500">Click to upload image</p>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddProductModalOpen(false)}
                                        className="mr-3 px-4 py-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        Add Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Product Modal */}
            {isEditProductModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold">Edit Product</h3>
                                <button
                                    onClick={() => setIsEditProductModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    &times;
                                </button>
                            </div>

                            <form onSubmit={handleEditProduct}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="edit-name">
                                        Product Name
                                    </label>
                                    <input
                                        id="edit-name"
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        value={currentProduct.name}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-gray-700 mb-2" htmlFor="edit-price">
                                            Price ($)
                                        </label>
                                        <input
                                            id="edit-price"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={currentProduct.price}
                                            onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2" htmlFor="edit-stock">
                                            Stock Quantity
                                        </label>
                                        <input
                                            id="edit-stock"
                                            type="number"
                                            min="0"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={currentProduct.stock}
                                            onChange={(e) => setCurrentProduct({ ...currentProduct, stock: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="edit-category">
                                        Category
                                    </label>
                                    <select
                                        id="edit-category"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        value={currentProduct.category}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                                    >
                                        <option value="Vegetables">Vegetables</option>
                                        <option value="Fruits">Fruits</option>
                                        <option value="Dairy & Eggs">Dairy & Eggs</option>
                                        <option value="Meat">Meat</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="flex items-center text-gray-700 mb-2">
                                        <input
                                            type="checkbox"
                                            className="rounded text-green-600 focus:ring-green-500 mr-2"
                                            checked={currentProduct.organic}
                                            onChange={(e) => setCurrentProduct({ ...currentProduct, organic: e.target.checked })}
                                        />
                                        Organic Product
                                    </label>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="edit-description">
                                        Description
                                    </label>
                                    <textarea
                                        id="edit-description"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        rows="3"
                                        value={currentProduct.description || ""}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditProductModalOpen(false)}
                                        className="mr-3 px-4 py-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;