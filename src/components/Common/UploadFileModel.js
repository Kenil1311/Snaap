import React, { useState } from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from "reactstrap";
import Papa from "papaparse";

const UploadFileModel = ({ show, onClose, type }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.name.endsWith(".csv")) {
                setError("Please upload a valid CSV file.");
                setSelectedFile(null);
                return;
            }
            setError("");
            setSelectedFile(file);
        }
    };


    const handleUpload = () => {
        if (!selectedFile) {
            setError("Please choose a CSV file before uploading.");
            return;
        }
        Papa.parse(selectedFile, {
            header: true,         // First row as keys
            skipEmptyLines: true, // Ignore blank rows
            quoteChar: '"',       // Ensure quoted strings are handled
            complete: (results) => {

                if (type == "branch") {
                    console.log("Parsed CSV JSON:", results.data);
                }
            },
        });
        onClose();
    };

    return (
        <Modal isOpen={show} toggle={onClose} centered>
            <ModalHeader toggle={onClose}>📂 Import Data from CSV</ModalHeader>

            <ModalBody>
                <p>Please upload your CSV file following the format below:</p>
                <pre style={{ background: "#f8f9fa", padding: "10px", borderRadius: "5px" }}>
                    #,Branch Name,Area Name,Phone,Address,City,State,ZIP Code,Country,Action
                    "1","SNAAP ORAL DIAGNOSIS AND RADIOLOGY CENTRE","Lal Darwaja","+9193131 51637","","Surat","Gujarat","395003","India",""
                    "2","SNAAP ORAL DIAGNOSIS AND RADIOLOGY CENTRE","Athwa","+919429677150","","Surat","Gujarat","395001","India",""
                </pre>

                <div
                    style={{
                        border: "2px dashed #ccc",
                        borderRadius: "6px",
                        padding: "20px",
                        textAlign: "center",
                        marginTop: "15px",
                        cursor: "pointer",
                        background: "#fafafa"
                    }}
                    onClick={() => document.getElementById("fileInput").click()}
                >
                    <p style={{ margin: 0 }}>
                        {selectedFile
                            ? `📄 ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(1)} KB)`
                            : "Drag & Drop or Click to Choose CSV File"}
                    </p>
                    <input
                        type="file"
                        id="fileInput"
                        accept=".csv"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </div>

                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            </ModalBody>

            <ModalFooter>
                <Button color="secondary" onClick={onClose}>Cancel</Button>
                <Button color="primary" onClick={handleUpload}>Upload</Button>
            </ModalFooter>
        </Modal>
    );
};

export default UploadFileModel;
