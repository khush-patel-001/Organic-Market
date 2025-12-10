import React, { useState } from 'react';
import { FiUser, FiHome, FiPhone, FiMail, FiCamera, FiUpload, FiCheckCircle, FiClock, FiTrash2, FiEdit, FiSave } from 'react-icons/fi';

const ProfileSettings = () => {
    // Sample farmer profile data - in a real app, this would come from your API
    const [profile, setProfile] = useState({
        name: "Green Valley Farms",
        ownerName: "John Smith",
        address: "123 Farm Road, Greenville, CA 95463",
        phone: "(555) 123-4567",
        email: "info@greenvalleyfarms.com",
        bio: "Green Valley Farms has been growing organic produce for over 20 years. We specialize in sustainable farming practices that protect the environment while producing nutritious, delicious vegetables.",
        establishedYear: "2005",
        farmSize: "35 acres",
        certifications: ["USDA Organic", "Certified Humane", "Regenerative Organic Certified"],
        profileImage: "https://images.unsplash.com/photo-1582557915710-84015fca8e8d?q=80&w=150&h=150&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1376&h=400&auto=format&fit=crop",
        verificationStatus: "Verified", // "Pending", "Verified", "Rejected"
    });

    const [verificationDocuments, setVerificationDocuments] = useState([
        { id: 1, name: "Business License", status: "Approved", date: "2025-01-15" },
        { id: 2, name: "Organic Certification", status: "Approved", date: "2025-01-18" },
        { id: 3, name: "Farm Insurance", status: "Approved", date: "2025-01-20" },
    ]);

    const [isEditMode, setIsEditMode] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({ ...profile });
    const [newCertification, setNewCertification] = useState("");
    const [newDocument, setNewDocument] = useState(null);

    // Handle profile update
    const handleUpdateProfile = (e) => {
        e.preventDefault();
        setProfile(updatedProfile);
        setIsEditMode(false);
        alert("Profile updated successfully!");
    };

    // Handle adding certification
    const handleAddCertification = () => {
        if (newCertification.trim() !== "") {
            setUpdatedProfile({
                ...updatedProfile,
                certifications: [...updatedProfile.certifications, newCertification]
            });
            setNewCertification("");
        }
    };

    // Handle removing certification
    const handleRemoveCertification = (index) => {
        const updatedCertifications = [...updatedProfile.certifications];
        updatedCertifications.splice(index, 1);
        setUpdatedProfile({
            ...updatedProfile,
            certifications: updatedCertifications
        });
    };

    // Handle document upload
    const handleDocumentUpload = (e) => {
        e.preventDefault();

        if (newDocument) {
            const newUploadedDoc = {
                id: verificationDocuments.length + 1,
                name: newDocument.name,
                status: "Pending",
                date: new Date().toISOString().split('T')[0]
            };

            setVerificationDocuments([...verificationDocuments, newUploadedDoc]);
            setNewDocument(null);
            alert("Document uploaded successfully! It will be reviewed by our team.");
        }
    };

    return (
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
                        src={profile.coverImage}
                        alt="Farm Cover"
                        className="w-full h-full object-cover"
                    />

                    {/* Profile Image Overlay */}
                    <div className="absolute -bottom-16 left-8">
                        <div className="relative">
                            <img
                                src={profile.profileImage}
                                alt={profile.name}
                                className="h-32 w-32 rounded-full border-4 border-white object-cover bg-white"
                            />
                            {isEditMode && (
                                <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full text-white cursor-pointer hover:bg-green-700">
                                    <FiCamera className="h-5 w-5" />
                                    <input id="profile-image" type="file" accept="image/*" className="hidden" />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Verification Badge */}
                    <div className="absolute -bottom-6 right-8">
                        {profile.verificationStatus === "Verified" ? (
                            <div className="bg-green-600 text-white px-4 py-2 rounded-full flex items-center">
                                <FiCheckCircle className="mr-2" />
                                Verified Farm
                            </div>
                        ) : profile.verificationStatus === "Pending" ? (
                            <div className="bg-yellow-500 text-white px-4 py-2 rounded-full flex items-center">
                                <FiClock className="mr-2" />
                                Verification Pending
                            </div>
                        ) : (
                            <div className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center">
                                <FiClock className="mr-2" />
                                Verification Required
                            </div>
                        )}
                    </div>

                    {isEditMode && (
                        <label htmlFor="cover-image" className="absolute top-4 right-4 bg-gray-800 bg-opacity-70 p-2 rounded-full text-white cursor-pointer hover:bg-opacity-90">
                            <FiCamera className="h-5 w-5" />
                            <input id="cover-image" type="file" accept="image/*" className="hidden" />
                        </label>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    {isEditMode ? (
                        <form onSubmit={handleUpdateProfile}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 mb-2" htmlFor="farm-name">
                                        Farm Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiHome className="text-gray-400" />
                                        </div>
                                        <input
                                            id="farm-name"
                                            type="text"
                                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={updatedProfile.name}
                                            onChange={(e) => setUpdatedProfile({ ...updatedProfile, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2" htmlFor="owner-name">
                                        Owner Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiUser className="text-gray-400" />
                                        </div>
                                        <input
                                            id="owner-name"
                                            type="text"
                                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={updatedProfile.ownerName}
                                            onChange={(e) => setUpdatedProfile({ ...updatedProfile, ownerName: e.target.value })}
                                            required
                                        />
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
                                            required
                                        />
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
                                            value={updatedProfile.phone}
                                            onChange={(e) => setUpdatedProfile({ ...updatedProfile, phone: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2" htmlFor="established">
                                        Established Year
                                    </label>
                                    <input
                                        id="established"
                                        type="text"
                                        className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        value={updatedProfile.establishedYear}
                                        onChange={(e) => setUpdatedProfile({ ...updatedProfile, establishedYear: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2" htmlFor="farm-size">
                                        Farm Size
                                    </label>
                                    <input
                                        id="farm-size"
                                        type="text"
                                        className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        value={updatedProfile.farmSize}
                                        onChange={(e) => setUpdatedProfile({ ...updatedProfile, farmSize: e.target.value })}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 mb-2" htmlFor="address">
                                        Farm Address
                                    </label>
                                    <input
                                        id="address"
                                        type="text"
                                        className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        value={updatedProfile.address}
                                        onChange={(e) => setUpdatedProfile({ ...updatedProfile, address: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 mb-2" htmlFor="bio">
                                        Farm Bio
                                    </label>
                                    <textarea
                                        id="bio"
                                        rows="4"
                                        className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        value={updatedProfile.bio}
                                        onChange={(e) => setUpdatedProfile({ ...updatedProfile, bio: e.target.value })}
                                    ></textarea>
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
                                    <h3 className="text-gray-500 text-sm">Farm Name</h3>
                                    <p className="text-gray-900 font-medium">{profile.name}</p>
                                </div>

                                <div>
                                    <h3 className="text-gray-500 text-sm">Owner Name</h3>
                                    <p className="text-gray-900 font-medium">{profile.ownerName}</p>
                                </div>

                                <div>
                                    <h3 className="text-gray-500 text-sm">Email Address</h3>
                                    <p className="text-gray-900 font-medium">{profile.email}</p>
                                </div>

                                <div>
                                    <h3 className="text-gray-500 text-sm">Phone Number</h3>
                                    <p className="text-gray-900 font-medium">{profile.phone}</p>
                                </div>

                                <div>
                                    <h3 className="text-gray-500 text-sm">Established Year</h3>
                                    <p className="text-gray-900 font-medium">{profile.establishedYear}</p>
                                </div>

                                <div>
                                    <h3 className="text-gray-500 text-sm">Farm Size</h3>
                                    <p className="text-gray-900 font-medium">{profile.farmSize}</p>
                                </div>

                                <div className="md:col-span-2">
                                    <h3 className="text-gray-500 text-sm">Farm Address</h3>
                                    <p className="text-gray-900 font-medium">{profile.address}</p>
                                </div>

                                <div className="md:col-span-2">
                                    <h3 className="text-gray-500 text-sm">Farm Bio</h3>
                                    <p className="text-gray-700">{profile.bio}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Farm Certifications</h2>
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {(isEditMode ? updatedProfile.certifications : profile.certifications).map((cert, index) => (
                                <div key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
                                    <span>{cert}</span>
                                    {isEditMode && (
                                        <button
                                            onClick={() => handleRemoveCertification(index)}
                                            className="ml-2 text-red-500 hover:text-red-700"
                                        >
                                            <FiTrash2 className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {isEditMode && (
                            <div className="flex items-center mt-4">
                                <input
                                    type="text"
                                    placeholder="Add new certification..."
                                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={newCertification}
                                    onChange={(e) => setNewCertification(e.target.value)}
                                />
                                <button
                                    onClick={handleAddCertification}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-md"
                                >
                                    Add
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Verification Documents</h2>
                    <div className="space-y-4">
                        {verificationDocuments.map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                                <div className="flex items-center">
                                    <FiUpload className="text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-gray-900 font-medium">{doc.name}</p>
                                        <p className="text-gray-500 text-sm">Uploaded: {doc.date}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${doc.status === "Approved" ? "bg-green-100 text-green-800" :
                                        doc.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                                            "bg-red-100 text-red-800"
                                    }`}>
                                    {doc.status}
                                </span>
                            </div>
                        ))}

                        <form onSubmit={handleDocumentUpload} className="mt-6">
                            <div className="border border-dashed border-gray-300 rounded-md p-6 text-center hover:bg-gray-50">
                                <input
                                    type="file"
                                    id="document"
                                    className="hidden"
                                    onChange={(e) => setNewDocument(e.target.files[0])}
                                />
                                <label htmlFor="document" className="cursor-pointer">
                                    <FiUpload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500">Click to upload verification document</p>
                                    <p className="text-xs text-gray-400 mt-1">Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
                                </label>
                            </div>

                            {newDocument && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600">Selected: {newDocument.name}</p>
                                    <button
                                        type="submit"
                                        className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                                    >
                                        Upload Document
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;