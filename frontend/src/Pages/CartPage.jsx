import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContent.jsx';
import Navbar from '../Components/Common/Navbar.jsx';
import Footer from '../Components/Common/Footer.jsx';

const CartPage = () => {
    const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="container mx-auto px-4 py-8 flex-grow">
                <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>

                {cart.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <p className="text-xl mb-4">Your cart is empty</p>
                        <Link to="/marketplace" className="bg-green-600 text-white py-2 px-6 rounded-lg inline-block hover:bg-green-700 transition duration-200">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="md:w-2/3">
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                {/* Header */}
                                <div className="bg-gray-50 p-4 border-b">
                                    <div className="grid grid-cols-12 gap-4 font-semibold">
                                        <div className="col-span-6">Product</div>
                                        <div className="col-span-2 text-center">Price</div>
                                        <div className="col-span-2 text-center">Quantity</div>
                                        <div className="col-span-2 text-right">Subtotal</div>
                                    </div>
                                </div>

                                {/* Cart Items */}
                                <div className="divide-y">
                                    {cart.map((item) => (
                                        <div key={item.id} className="p-4 grid grid-cols-12 gap-4 items-center">
                                            <div className="col-span-6 flex items-center gap-4">
                                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                                <div>
                                                    <h3 className="font-medium">{item.name}</h3>
                                                    <p className="text-sm text-gray-500">{item.farmer}</p>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-red-500 text-sm mt-1 hover:underline"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                ${item.price.toFixed(2)}
                                            </div>
                                            <div className="col-span-2 flex justify-center">
                                                <div className="flex items-center border rounded">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                        className="px-2 py-1 border-r hover:bg-gray-100"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-4 py-1">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-2 py-1 border-l hover:bg-gray-100"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-span-2 text-right font-medium">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between mt-6">
                                <Link
                                    to="/marketplace"
                                    className="flex items-center text-green-600 hover:text-green-700 transition duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                    </svg>
                                    Continue Shopping
                                </Link>
                                <button
                                    onClick={clearCart}
                                    className="text-gray-500 hover:text-gray-700 transition duration-200"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CartPage;