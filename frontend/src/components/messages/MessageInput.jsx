import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { FaPaperclip } from "react-icons/fa";
import useSendMessage from "../../hooks/useSendMessage";
import axios from "axios";
import './style.css';

// MessageInput.jsx
const MessageInput = () => {
    const [message, setMessage] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const { loading, sendMessage } = useSendMessage();

    // Toggle dropdown
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    // Handle file upload
    const handleFileUpload = async (file, type) => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(`/api/files/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const fileUrl = response.data.url;

            // Send file message
            await sendMessage(`Sent a ${type}: ${fileUrl}`);
        } catch (error) {
            console.error("File upload failed:", error);
        }
    };

    // Handle form submission for text message
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(message);
        setMessage("");
    };

    // Handle file selection
    const handleFileSelect = (e, type) => {
        const file = e.target.files[0];
        handleFileUpload(file, type);
    };

    return (
        <div className="relative">
            <form className="px-4 my-3" onSubmit={handleSubmit}>
                <div className="w-full relative flex items-center">
                    <input
                        type="text"
                        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
                        placeholder="Send a message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="relative">
                        <button
                            type="button"
                            className="p-2 text-white"
                            onClick={toggleDropdown}
                        >
                            <FaPaperclip />
                        </button>
                        {showDropdown && (
                            <div className="absolute bottom-full mb-2 right-0 w-48 bg-white rounded-md shadow-lg z-10">
                                <label
                                    className="block px-4 py-2 cursor-pointer hover:bg-gray-200"
                                    htmlFor="upload-image"
                                >
                                    Image
                                </label>
                                <label
                                    className="block px-4 py-2 cursor-pointer hover:bg-gray-200"
                                    htmlFor="upload-document"
                                >
                                    Document
                                </label>
                                <label
                                    className="block px-4 py-2 cursor-pointer hover:bg-gray-200"
                                    htmlFor="upload-video"
                                >
                                    Video
                                </label>
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="absolute inset-y-0 end-0 flex items-center pe-3"
                    >
                        {loading ? (
                            <div className="loading loading-spinner"></div>
                        ) : (
                            <BsSend />
                        )}
                    </button>
                </div>
            </form>

            {/* Hidden File Inputs */}
            <input
                id="upload-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileSelect(e, "image")}
            />
            <input
                id="upload-document"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={(e) => handleFileSelect(e, "document")}
            />
            <input
                id="upload-video"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => handleFileSelect(e, "video")}
            />
        </div>
    );
};
