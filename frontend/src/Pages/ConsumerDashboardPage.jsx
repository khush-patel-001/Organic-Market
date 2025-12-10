import React, { useEffect, useState } from 'react';
import { FiUser, FiHome, FiPhone, FiMail, FiCamera, FiUpload, FiCheckCircle, FiClock, FiTrash2, FiEdit, FiSave } from 'react-icons/fi';
import Navbar from '../Components/Common/Navbar.jsx';
import Footer from '../Components/Common/Footer.jsx';
import { useUserStore } from '../Store/useUserStore.js';
import toast from 'react-hot-toast';

const ConsumerDashboardPage = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phoneNo: "",
        coverImage: "",
        profileImage: ""
    });

    const { user, updateProfile, updateCoverImage } = useUserStore();
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const fetchedUser = await user();
                setProfile(fetchedUser);
                setUpdatedProfile({
                    name: fetchedUser.name || "",
                    email: fetchedUser.email || "",
                    phoneNo: fetchedUser.phoneNo || "",
                    coverImage: fetchedUser.coverImage || "",
                    profileImage: fetchedUser.profileImage || ""
                });
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        fetchUserProfile();
    }, [user]);

    const [isEditMode, setIsEditMode] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState();

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const profile = await updateProfile(updatedProfile);
            setProfile(profile);
        } catch (error) {
            console.error("Error while updating the user", error);
        }

        const coverImageFile = updatedProfile.coverImage instanceof FileList ? updatedProfile.coverImage[0] : null;
        if (coverImageFile) {
            const formData = new FormData();
            formData.append("coverImage", coverImageFile);
            try {
                const updatedUser = await updateCoverImage(formData);
                setProfile(updatedUser);
            } catch (error) {
                console.error("Error updating cover image:", error);
            }
        }
        toast.success("Profile updated successfully!");
        setIsEditMode(false);
    };

    return (
        <>
            <Navbar />
            <div className="bg-gray-50 min-h-screen p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                        {!isEditMode ? (
                            <button
                                onClick={() => setIsEditMode(true)}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
                            >
                                <FiEdit className="mr-2" />
                                Edit Profile
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setIsEditMode(false);
                                    setUpdatedProfile({ ...profile });
                                }}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                            >
                                Cancel
                            </button>
                        )}
                    </div>

                    {/* Cover Image Section */}
                    <div className="relative rounded-t-lg h-48 overflow-hidden mb-20 bg-gray-200">
                        <img
                            src={profile?.coverImage || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1376&h=400&auto=format&fit=crop"}
                            alt="Farm Cover"
                            className="w-full h-full object-cover" />

                        {/* Profile Image Overlay */}
                        <div className="absolute -bottom-16 left-8">
                            <div className="relative">
                                <img
                                    src={profile?.profileImage || "https://images.unsplash.com/photo-1582557915710-84015fca8e8d?q=80&w=150&h=150&auto=format&fit=crop"}
                                    alt={profile?.name || "Profile"}
                                    className="h-32 w-32 rounded-full border-4 border-white object-cover bg-white" />
                                {isEditMode && (
                                    <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full text-white cursor-pointer hover:bg-green-700">
                                        <FiCamera className="h-5 w-5" />
                                        <input id="profile-image" type="file" accept="image/*" className="hidden"
                                            onChange={(e) => setUpdatedProfile({ ...updatedProfile, profileImage: e.target.files })}
                                            required />
                                    </label>
                                )}
                            </div>
                        </div>

                        {isEditMode && (
                            <label htmlFor="cover-image" className="absolute top-4 right-4 bg-gray-800 bg-opacity-70 p-2 rounded-full text-white cursor-pointer hover:bg-opacity-90">
                                <FiCamera className="h-5 w-5" />
                                <input
                                    id="cover-image"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => setUpdatedProfile({ ...updatedProfile, coverImage: e.target.files })}
                                />
                            </label>
                        )}
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        {isEditMode ? (
                            <form onSubmit={handleUpdateProfile}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div>
                                        <label className="block text-gray-700 mb-2" htmlFor="name">
                                            Name
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FiUser className="text-gray-400" />
                                            </div>
                                            <input
                                                id="name"
                                                type="text"
                                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                value={updatedProfile.name}
                                                onChange={(e) => setUpdatedProfile({ ...updatedProfile, name: e.target.value })}
                                                required />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2" htmlFor="email">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FiMail className="text-gray-400" />
                                            </div>
                                            <input
                                                id="email"
                                                type="email"
                                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                value={updatedProfile.email}
                                                onChange={(e) => setUpdatedProfile({ ...updatedProfile, email: e.target.value })}
                                                required />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2" htmlFor="phone">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FiPhone className="text-gray-400" />
                                            </div>
                                            <input
                                                id="phone"
                                                type="text"
                                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                value={updatedProfile.phoneNo}
                                                onChange={(e) => setUpdatedProfile({ ...updatedProfile, phoneNo: e.target.value })}
                                                required />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md flex items-center"
                                    >
                                        <FiSave className="mr-2" />
                                        Save Profile
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-gray-500 text-sm">Name</h3>
                                        <p className="text-gray-900 font-medium">{profile.name}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-gray-500 text-sm">Email Address</h3>
                                        <p className="text-gray-900 font-medium">{profile.email}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-gray-500 text-sm">Phone Number</h3>
                                        <p className="text-gray-900 font-medium">{profile.phoneNo}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ConsumerDashboardPage;