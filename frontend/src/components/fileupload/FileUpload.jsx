import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadType, setUploadType] = useState("");

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUploadType = (type) => {
        setUploadType(type);
        document.getElementById("fileInput").click(); // Trigger file input when type is selected
    };

    const uploadFile = async () => {
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post("/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert(`File uploaded successfully: ${response.data.file.filename}`);
        } catch (error) {
            console.error("File upload error:", error.response?.data?.message || error.message);
            alert("Failed to upload file.");
        }
    };

    return (
        <div className="relative">
            {/* File Upload Button */}
            <button
                className="btn bg-blue-500 text-white p-2 rounded-md"
                onClick={() => document.getElementById("dropdownMenu").classList.toggle("hidden")}
            >
                📁 Attach File
            </button>

            {/* Dropdown Menu */}
            <div
                id="dropdownMenu"
                className="absolute top-full mt-2 bg-white shadow-md rounded-md hidden"
            >
                <button
                    onClick={() => handleUploadType("image")}
                    className="block px-4 py-2 hover:bg-blue-100 w-full text-left"
                >
                    Image
                </button>
                <button
                    onClick={() => handleUploadType("document")}
                    className="block px-4 py-2 hover:bg-blue-100 w-full text-left"
                >
                    Document
                </button>
                <button
                    onClick={() => handleUploadType("video")}
                    className="block px-4 py-2 hover:bg-blue-100 w-full text-left"
                >
                    Video
                </button>
            </div>

            {/* Hidden File Input */}
            <input
                id="fileInput"
                type="file"
                accept={uploadType === "image" ? "image/*" : uploadType === "document" ? ".pdf,.doc,.docx" : "video/*"}
                className="hidden"
                onChange={handleFileChange}
            />

            {/* Upload Button */}
            {selectedFile && (
                <button
                    className="mt-2 btn bg-green-500 text-white p-2 rounded-md"
                    onClick={uploadFile}
                >
                    Upload {uploadType}
                </button>
            )}
        </div>
    );
};

export default FileUpload;
