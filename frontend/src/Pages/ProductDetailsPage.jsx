import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../Context/CartContent.jsx';
import Navbar from '../Components/Common/Navbar.jsx';
import Footer from '../Components/Common/Footer.jsx';
import Button from '../Components/Common/Button.jsx';
import toast from 'react-hot-toast';
import { useProductStore } from '../Store/useProductStore.js';
import { useFarmerStore } from '../Store/useFarmerStore.js';
import { useAuthStore } from '../Store/useAuthStore.js';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [farmer, setFarmer] = useState({});


    const { getProductByProductId } = useProductStore();
    useEffect(() => {
        const getProductDetail = async () => {
            try {
                setLoading(true);
                const productData = await getProductByProductId(id);
                setProduct(productData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getProductDetail();
    }, [id]);

    const { getFarmerById } = useFarmerStore();
    useEffect(() => {
        const getFarmer = async () => {
            if (!product || !product.farmer) return;
            try {
                setLoading(true);
                const farmerData = await getFarmerById(product.farmer);
                setFarmer(farmerData);
            } catch (error) {
                console.log("Error fetching farmer data: ", error);
            } finally {
                setLoading(false);
            }
        };

        getFarmer();
    }, [product]);

    const { checkAuth, authUser } = useAuthStore();
    const handleAddToCart = async () => {
        try {
            await checkAuth();
            if (!authUser) {
                toast.error('Please log in to add items to your cart.');
            } else {
                addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    quantity: quantity,
                    farmer: farmer.name,
                });
                toast.success('Product added to cart!');
            }
        } catch (error) {
            toast.error('Please log in to add items to your cart.');
        }
    };

    if (loading && !product) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
                    <div className="animate-pulse text-gray-600">Loading product details...</div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
                    <div className="">Error loading product. Please try again later.</div>
                </div>
                <Footer />
            </div>
        );
    }

    if (product) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />

                <div className="flex-grow container mx-auto px-20 py-8">
                    {/* Breadcrumb */}
                    <div className="text-sm text-gray-500 mb-6">
                        <span className="hover:text-green-600 cursor-pointer">Home</span> &gt;
                        <span className="hover:text-green-600 cursor-pointer ml-1">Marketplace</span> &gt;
                        <span className="text-gray-700 font-medium ml-1">{product.name}</span>
                    </div>

                    {/* Product Main Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {/* Product Image Gallery */}
                        <div className="flex flex-col space-y-4">
                            <div className="bg-gray-100 rounded-lg overflow-hidden h-96 flex items-center justify-center">
                                <img
                                    src={product.images[selectedImage] || null}
                                    alt={product.name}
                                    className="object-contain max-h-full max-w-full transition-transform duration-300 hover:scale-110 cursor-zoom-in"
                                />
                            </div>

                            {/* Thumbnail Gallery */}
                            <div className="flex space-x-2 overflow-x-auto">
                                {product.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`w-20 h-20 flex-shrink-0 border-2 rounded cursor-pointer ${selectedImage === index ? 'border-green-500' : 'border-gray-200'
                                            }`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} view ${index + 1}`}
                                            className="w-full h-full object-cover rounded"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Information */}
                        <div className="flex flex-col space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                                <div className="flex items-center mt-2">
                                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                                        {product.certifications[0]}
                                    </div>
                                    {product.certifications.length > 1 && (
                                        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium ml-2">
                                            {product.certifications[1]}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline">
                                <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                                <span className="text-gray-600 ml-2">per {product.unit}</span>
                                <span className="ml-4 text-sm text-gray-500">{product.stock} in stock</span>
                            </div>

                            {/* Quick Description */}
                            <p className="text-gray-700">{product.description}</p>

                            {/* Origin and Harvest */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Harvest Date</h3>
                                        <p className="text-gray-800">{product.harvestDate}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Purchase Controls */}
                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                                <div className="flex items-center border border-gray-300 rounded-md">
                                    <button
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-l-md"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        max={product.stock}
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                                        className="w-12 text-center border-x border-gray-300 py-2 focus:outline-none"
                                    />
                                    <button
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-r-md"
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    >
                                        +
                                    </button>
                                </div>

                                <Button
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md"
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Traceability Section */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Farmer Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="col-span-2 grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Farm Name</h3>
                                    <p className="text-gray-800">{farmer.farmName}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Farmer</h3>
                                    <p className="text-gray-800">{farmer.name}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                                    <p className="text-gray-800">{farmer.farmAddress}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Verification Status</h3>
                                    <p className="text-green-600 flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        {farmer.verificationStatus}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Certifications</h3>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {farmer.certifications?.map((cert, index) => (
                                            <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 text-xs rounded">
                                                {cert}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
};

export default ProductDetailsPage;