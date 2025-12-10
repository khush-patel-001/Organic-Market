import React, { useState, useEffect } from 'react';
import { FiAlertCircle, FiCheckCircle, FiClock, FiPackage, FiCalendar, FiShoppingBag, FiBell, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const FarmerDashboard = () => {
    // Sample state data (in a real app, this would come from your backend)
    const [farmer, setFarmer] = useState({
        name: "Green Valley Farms",
        verificationStatus: "Verified", // "Pending", "Verified", "Rejected"
        profileImage: "https://images.unsplash.com/photo-1582557915710-84015fca8e8d?q=80&w=150&h=150&auto=format&fit=crop",
    });

    const [stats, setStats] = useState({
        productsListed: 12,
        upcomingAudits: 1,
    });

    const [products, setProducts] = useState([
        { id: 1, name: "Organic Tomatoes", price: 3.99, stock: 25, image: "https://images.unsplash.com/photo-1546470427-227c21f15dbc?q=80&w=200&auto=format&fit=crop" },
        { id: 2, name: "Fresh Lettuce", price: 2.49, stock: 18, image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=80&w=200&auto=format&fit=crop" },
        { id: 3, name: "Carrots Bundle", price: 3.29, stock: 32, image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?q=80&w=200&auto=format&fit=crop" },
        { id: 4, name: "Free Range Eggs", price: 5.99, stock: 10, image: "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=200&auto=format&fit=crop" },
    ]);

    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", description: "", image: null });

    // Function to handle adding a new product
    const handleAddProduct = (e) => {
        e.preventDefault();
        // In a real app, you would send this data to your backend
        const newProductWithId = {
            ...newProduct,
            id: products.length + 1,
            image: newProduct.image || "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?q=80&w=200&auto=format&fit=crop",
            price: parseFloat(newProduct.price)
        };

        setProducts([...products, newProductWithId]);
        setNewProduct({ name: "", price: "", stock: "", description: "", image: null });
        setIsAddProductModalOpen(false);
        setStats({ ...stats, productsListed: stats.productsListed + 1 });
    };

    // Function to handle deleting a product
    const handleDeleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
        setStats({ ...stats, productsListed: stats.productsListed - 1 });
    };


    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Dashboard Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <img
                                src={farmer.profileImage}
                                alt={farmer.name}
                                className="h-12 w-12 rounded-full object-cover mr-4"
                            />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{farmer.name}</h1>
                                <div className="flex items-center">
                                    {farmer.verificationStatus === "Verified" ? (
                                        <div className="flex items-center text-green-600">
                                            <FiCheckCircle className="mr-1" />
                                            <span>Verified Farmer</span>
                                        </div>
                                    ) : farmer.verificationStatus === "Pending" ? (
                                        <div className="flex items-center text-yellow-600">
                                            <FiClock className="mr-1" />
                                            <span>Verification Pending</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-red-600">
                                            <FiAlertCircle className="mr-1" />
                                            <span>Verification Required</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                <FiPackage className="h-8 w-8" />
                            </div>
                            <div className="ml-5">
                                <p className="text-gray-500 text-sm">Products Listed</p>
                                <h3 className="text-2xl font-bold">{stats.productsListed}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-600">
                                <FiCalendar className="h-8 w-8" />
                            </div>
                            <div className="ml-5">
                                <p className="text-gray-500 text-sm">Upcoming Audits</p>
                                <h3 className="text-2xl font-bold">{stats.upcomingAudits}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Management */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Product Management</h2>
                        <button
                            onClick={() => setIsAddProductModalOpen(true)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center transition duration-200"
                        >
                            <FiPlus className="mr-2" />
                            Add New Product
                        </button>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map(product => (
                            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition duration-200 hover:shadow-md">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-green-600 font-bold">${product.price.toFixed(2)}</span>
                                        <span className="text-gray-600 text-sm">Stock: {product.stock}</span>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t border-gray-100">
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <FiEdit className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(product.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FiTrash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add Product Modal */}
            {isAddProductModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
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
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
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
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
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
                                            value={newProduct.stock}
                                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                            required
                                        />
                                    </div>
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
                                        value={newProduct.description}
                                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
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
                                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
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
        </div>
    );
};

export default FarmerDashboard;