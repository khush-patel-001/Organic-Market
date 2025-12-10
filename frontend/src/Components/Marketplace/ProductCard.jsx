import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFarmerStore } from '../../Store/useFarmerStore';

const ProductCard = ({ product }) => {
    const [loading, setLoading] = useState(false);
    const [farmer, setFarmer] = useState(null);

    const {
        _id,
        productName,
        price,
        images,
        category = "General",
        farmer: farmerId
    } = product;

    const { getFarmerById } = useFarmerStore();
    useEffect(() => {
        const getFarmer = async () => {
            if (!farmerId) return;

            try {
                setLoading(true);
                const farmerData = await getFarmerById(farmerId);
                if (farmerData) {
                    setFarmer(farmerData);
                }
            } catch (error) {
                console.error("Error fetching farmer data: ", error);
            } finally {
                setLoading(false);
            }
        };

        getFarmer();
    }, [farmerId]);

    if (!product) return null;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="relative">
                <img
                    src={images?.[0] || '/placeholder-image.jpg'}
                    alt={productName}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                        e.target.src = '/placeholder-image.jpg'; // Fallback image
                    }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <span className="text-white text-sm font-medium">{category}</span>
                    <span className="text-white text-xs font-light ml-2">{farmer?.farmAddress || 'Location not available'}</span>
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{productName}</h3>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-green-700 font-bold">${price || '0.00'}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                    By {farmer?.name}
                </p>
                <Link
                    to={`/product/${_id}`}
                    className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition duration-200"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;