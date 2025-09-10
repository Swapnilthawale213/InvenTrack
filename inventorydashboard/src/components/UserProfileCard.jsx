import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import axios from "axios";

const images = import.meta.glob('../assets/*.png', { eager: true });

function getUserImage(name) {
    const lowerName = name.toLowerCase();
    const imagePath = `../assets/${lowerName}.png`;

    // Find matching image or fallback
    const matchedImage = images[imagePath]?.default;
    const fallbackImage = images['../assets/default.png']?.default;

    return matchedImage || fallbackImage;
}

export default function UserProfileCard({ name, email, role, assignedZones = [], username }) {
    const { clearSession } = useSession();
    const navigate = useNavigate();
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [statusMessage, setStatusMessage] = useState("");

    const handleLogout = () => {
        clearSession();
        navigate("/");
    };

    const togglePasswordModal = () => {
        setShowPasswordModal(prev => !prev);
        setStatusMessage("");
        setFormData({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        });
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordUpdate = async e => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:5231/changepassword/update?username=${name}`,
                {
                    currentpassword: formData.currentPassword,
                    newpassword: formData.newPassword,
                    confirmnewpassword: formData.confirmNewPassword,
                }
            );
            setStatusMessage(response.data);
            setTimeout(() => togglePasswordModal(), 2000);
        } catch (error) {
            setStatusMessage(error.response?.data || "Something went wrong");
        }
    };

    return (
        <>
            <div className="bg-[#f4f6fc] p-6 rounded-xl shadow-md max-w-sm mx-auto text-center text-[#1a237e]">
                <div className="flex justify-center mb-4">
                    <img
                        src={getUserImage(name)}
                        alt={`${name}'s profile`}
                        className="w-24 h-24 rounded-full object-cover border-2 border-[#1a237e]"
                    />
                </div>
                <h2 className="text-xl font-bold">{name}</h2>
                <p className="text-sm font-medium text-[#3949ab]">Role: {role}</p>
                <p className="mt-2 text-sm text-[#3949ab]">Email: {email}</p>
                <hr className="border-[#c5cae9] my-3" />
                {assignedZones.length > 0 && (
                    <p className="text-sm text-[#1a237e]">
                        <span className="font-semibold">Assigned Zones:</span>{" "}
                        {assignedZones.map(z => `${z}`).join(", ")}
                    </p>
                )}
                <div className="mt-4 flex justify-center gap-2">
                    <button
                        onClick={togglePasswordModal}
                        className="bg-[#5c6bc0] hover:bg-[#3f51b5] text-white px-4 py-2 rounded text-sm transition"
                    >
                        Change Password
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-[#3949ab] hover:bg-[#303f9f] text-white px-4 py-2 rounded text-sm transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                        <h3 className="text-lg font-semibold text-[#1a237e] mb-4">Update Password</h3>
                        <form className="space-y-3" onSubmit={handlePasswordUpdate}>
                            <input
                                type="password"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                placeholder="Current Password"
                                className="w-full px-3 py-2 border rounded text-sm"
                                required
                            />
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="New Password"
                                className="w-full px-3 py-2 border rounded text-sm"
                                required
                            />
                            <input
                                type="password"
                                name="confirmNewPassword"
                                value={formData.confirmNewPassword}
                                onChange={handleChange}
                                placeholder="Confirm New Password"
                                className="w-full px-3 py-2 border rounded text-sm"
                                required
                            />
                            {statusMessage && (
                                <p className="text-sm text-red-600 pt-1">{statusMessage}</p>
                            )}
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={togglePasswordModal}
                                    className="px-4 py-2 text-sm bg-gray-300 hover:bg-gray-400 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm bg-[#1a237e] hover:bg-[#0d1333] text-white rounded"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
