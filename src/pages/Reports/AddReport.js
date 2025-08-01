import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, FormFeedback, Input, Label, Row, UncontrolledDropdown } from 'reactstrap'
import * as Yup from "yup";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Dropzone from 'react-dropzone';

const branchesData = [
    {
        id: 1,
        branchName: "Mumbai Central Branch",
        phone: "+91 9820456789",
        email: "mumbai.central@example.com",
        address1: "123 Marine Drive",
        address2: "Opp. Churchgate Station",
        city: "Mumbai",
        state: "Maharashtra",
        zip: "400020",
        country: "India",
        latitude: "18.9388",
        longitude: "72.8354"
    },
    {
        id: 2,
        branchName: "Bangalore Tech Park",
        phone: "+91 9988776655",
        email: "blore.tech@example.com",
        address1: "Sigma Soft Tech Park",
        address2: "Whitefield Main Road",
        city: "Bengaluru",
        state: "Karnataka",
        zip: "560066",
        country: "India",
        latitude: "12.9716",
        longitude: "77.5946"
    },
    {
        id: 3,
        branchName: "Chennai Office",
        phone: "+91 9876543210",
        email: "chennai.office@example.com",
        address1: "Old No. 12, New No. 45",
        address2: "Mount Road",
        city: "Chennai",
        state: "Tamil Nadu",
        zip: "600002",
        country: "India",
        latitude: "13.0827",
        longitude: "80.2707"
    },
    {
        id: 4,
        branchName: "Hyderabad Hub",
        phone: "+91 9012345678",
        email: "hyd.hub@example.com",
        address1: "Mindspace IT Park",
        address2: "Hitech City",
        city: "Hyderabad",
        state: "Telangana",
        zip: "500081",
        country: "India",
        latitude: "17.3850",
        longitude: "78.4867"
    },
    {
        id: 5,
        branchName: "Delhi NCR Branch",
        phone: "+91 8447001122",
        email: "delhi.ncr@example.com",
        address1: "DLF Cyber City",
        address2: "Sector 24",
        city: "Gurugram",
        state: "Haryana",
        zip: "122002",
        country: "India",
        latitude: "28.4595",
        longitude: "77.0266"
    },
    {
        id: 6,
        branchName: "Pune Corporate Office",
        phone: "+91 9561234567",
        email: "pune.corp@example.com",
        address1: "EON IT Park",
        address2: "Kharadi",
        city: "Pune",
        state: "Maharashtra",
        zip: "411014",
        country: "India",
        latitude: "18.5524",
        longitude: "73.9409"
    },
    {
        id: 7,
        branchName: "Ahmedabad Support Center",
        phone: "+91 9324567890",
        email: "ahm.support@example.com",
        address1: "S.G. Highway",
        address2: "Thaltej",
        city: "Ahmedabad",
        state: "Gujarat",
        zip: "380059",
        country: "India",
        latitude: "23.0225",
        longitude: "72.5714"
    },
    {
        id: 8,
        branchName: "Kolkata Branch",
        phone: "+91 9090909090",
        email: "kolkata.branch@example.com",
        address1: "Salt Lake Sector V",
        address2: "Near Wipro",
        city: "Kolkata",
        state: "West Bengal",
        zip: "700091",
        country: "India",
        latitude: "22.5726",
        longitude: "88.3639"
    },
    {
        id: 9,
        branchName: "Jaipur Office",
        phone: "+91 9812312345",
        email: "jaipur.office@example.com",
        address1: "C-Scheme",
        address2: "Ashok Marg",
        city: "Jaipur",
        state: "Rajasthan",
        zip: "302001",
        country: "India",
        latitude: "26.9124",
        longitude: "75.7873"
    },
    {
        id: 10,
        branchName: "Lucknow Regional Center",
        phone: "+91 9456781234",
        email: "lucknow.rc@example.com",
        address1: "Gomti Nagar",
        address2: "Vibhuti Khand",
        city: "Lucknow",
        state: "Uttar Pradesh",
        zip: "226010",
        country: "India",
        latitude: "26.8467",
        longitude: "80.9462"
    }
];


export default function AddReport() {

    const navigate = useNavigate();

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: "",
            name: "",
            birthdate: "",
            gender: "",
            age: "",
            studyDate: "",
            modality: "",
            description: "",
            segment: "",
            branch: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please enter patient name"),
            gender: Yup.string().required("Please select gender"),
            age: Yup.number().typeError("Age must be a number").required("Please enter age"),
            studyDate: Yup.date().required("Please select study date"),
            modality: Yup.string().required("Please enter modality"),
            description: Yup.string().required("Please enter description"),
            segment: Yup.string().required("Please select segment"),
            branch: Yup.string().required("Please select branch"),
        }),
        onSubmit: (values) => {
            navigate('/reports', {
                state: {
                    ...values
                }
            });
        },
    });

    const [searchTerm, setSearchTerm] = useState("");

    const [selectedFiles, setselectedFiles] = useState([]);

    function handleAcceptedFiles(files) {
        files.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        );
        setselectedFiles(files);
    }

    const handleRemoveFile = (index) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setselectedFiles(newFiles);
    };

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

    // Filtered branches
    const filteredBranches = branchesData.filter(branch =>
        branch.branchName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Reports" breadcrumbItem="Add Report" />

                    <Row>
                        <Col lg="12">
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    validation.handleSubmit();
                                }}
                            >
                                <Row>
                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label>Upload File</Label>
                                            <Dropzone onDrop={handleAcceptedFiles}>
                                                {({ getRootProps, getInputProps }) => (
                                                    <div
                                                        className="dropzone p-3 border rounded"
                                                        style={{
                                                            minHeight: '125px',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            textAlign: 'center',
                                                            flexDirection: 'column',
                                                        }}
                                                    >
                                                        <input {...getInputProps()} />
                                                        {selectedFiles.length === 0 ? (
                                                            <div {...getRootProps()}>
                                                                <div className="mb-2">
                                                                    <i className="display-4 text-muted bx bx-cloud-upload" />
                                                                </div>
                                                                <h6 className="text-muted mb-0">Drop files here or click to upload.</h6>
                                                            </div>
                                                        ) : (
                                                            <div className="w-100">
                                                                {selectedFiles.map((f, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className="p-2 border rounded d-flex align-items-center justify-content-between mb-2"
                                                                        style={{ backgroundColor: '#f8f9fa' }}
                                                                    >
                                                                        <div className="d-flex align-items-center gap-2">
                                                                            <img
                                                                                src={f.preview}
                                                                                alt={f.name}
                                                                                height="48"
                                                                                width="48"
                                                                                className="rounded object-fit-cover"
                                                                            />
                                                                            <div>
                                                                                <h6 className="mb-0 text-truncate" style={{ maxWidth: '150px' }}>
                                                                                    {f.name}
                                                                                </h6>
                                                                                <small className="text-muted">{f.formattedSize}</small>
                                                                            </div>
                                                                        </div>
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-sm btn-outline-danger"
                                                                            onClick={() => handleRemoveFile(i)}
                                                                        >
                                                                            <i className="bx bx-trash" />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </Dropzone>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label>Branch</Label>
                                            <UncontrolledDropdown className="w-100">
                                                <DropdownToggle
                                                    caret
                                                    className={`form-control custom-dropdown text-start d-flex align-items-center justify-content-between ${validation.touched.gender && validation.errors.gender ? "is-invalid" : ""}`}
                                                >
                                                    <span className="flex-grow-1 text-truncate">
                                                        {validation.values.branch || "Select Branch"}
                                                    </span>
                                                    <i className="mdi mdi-chevron-down"></i>
                                                </DropdownToggle>

                                                <DropdownMenu className="w-100 shadow-sm mt-1 border rounded p-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
                                                    <Input
                                                        type="text"
                                                        placeholder="Search branch"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                        className="mb-2"
                                                    />

                                                    {filteredBranches.map((branch) => (
                                                        <DropdownItem
                                                            key={branch.branchName}
                                                            onClick={() => {
                                                                validation.setFieldValue("branch", branch.branchName);
                                                            }}
                                                            className={`text-dark  custom-dropdown-item rounded px-2 py-1 ${validation.values.branch === branch.branchName ? "custom-dropdown-item-active" : ""}`}
                                                            style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                                                        >
                                                            {branch.branchName}
                                                        </DropdownItem>
                                                    ))}

                                                    {filteredBranches.length === 0 && (
                                                        <DropdownItem disabled className="text-muted">No branches found</DropdownItem>
                                                    )}
                                                </DropdownMenu>
                                            </UncontrolledDropdown>

                                            {validation.touched.gender && validation.errors.gender && (
                                                <div className="invalid-feedback d-block">
                                                    {validation.errors.gender}
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <Label>Segment</Label>
                                            <UncontrolledDropdown className="w-100">
                                                <DropdownToggle
                                                    caret
                                                    className={`form-control custom-dropdown text-start d-flex align-items-center justify-content-between ${validation.touched.gender && validation.errors.gender ? "is-invalid" : ""}`}
                                                >
                                                    <span className="flex-grow-1 text-truncate">
                                                        {validation.values.segment || "Select segment"}
                                                    </span>
                                                    <i className="mdi mdi-chevron-down"></i>
                                                </DropdownToggle>

                                                <DropdownMenu className="w-100 shadow-sm mt-1 border rounded">
                                                    {["DICOM", "OPG"].map((sagment) => (
                                                        <DropdownItem
                                                            key={sagment}
                                                            onClick={() => validation.setFieldValue("segment", sagment)}
                                                            className={`text-dark custom-dropdown-item rounded px-2 py-1 ${validation.values.segment === sagment ? "custom-dropdown-item-active" : ""}`}
                                                            style={{ backgroundColor: "white" }}
                                                        >
                                                            {sagment}
                                                        </DropdownItem>
                                                    ))}
                                                </DropdownMenu>
                                            </UncontrolledDropdown>

                                            {validation.touched.gender && validation.errors.gender && (
                                                <div className="invalid-feedback d-block">
                                                    {validation.errors.gender}
                                                </div>
                                            )}
                                        </div>
                                    </Col>

                                </Row>

                                <Row>
                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label>Patient Name</Label>
                                            <Input
                                                name="name"
                                                type="text"
                                                placeholder="Enter patient name"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.name}
                                                invalid={validation.touched.name && !!validation.errors.name}
                                            />
                                            <FormFeedback>{validation.errors.name}</FormFeedback>
                                        </div>
                                    </Col>

                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label>Age</Label>
                                            <Input
                                                name="age"
                                                type="number"
                                                placeholder="Enter age"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.age}
                                                invalid={validation.touched.age && !!validation.errors.age}
                                            />
                                            <FormFeedback>{validation.errors.age}</FormFeedback>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label>Gender</Label>
                                            <UncontrolledDropdown className="w-100">
                                                <DropdownToggle
                                                    caret
                                                    className={`form-control custom-dropdown text-start d-flex align-items-center justify-content-between ${validation.touched.gender && validation.errors.gender ? "is-invalid" : ""}`}

                                                >
                                                    <span className="flex-grow-1 text-truncate">
                                                        {validation.values.gender || "Select gender"}
                                                    </span>
                                                    <i className="mdi mdi-chevron-down"></i>
                                                </DropdownToggle>

                                                <DropdownMenu className="w-100 shadow-sm mt-1 border rounded">
                                                    {["Male", "Female", "Other"].map((gender) => (
                                                        <DropdownItem
                                                            key={gender}
                                                            onClick={() => validation.setFieldValue("gender", gender)}
                                                            className={`text-dark rounded px-2 py-1 custom-dropdown-item ${validation.values.gender === gender ? "custom-dropdown-item-active" : ""}`}
                                                            style={{ backgroundColor: "white" }}
                                                        >
                                                            {gender}
                                                        </DropdownItem>
                                                    ))}
                                                </DropdownMenu>
                                            </UncontrolledDropdown>

                                            {validation.touched.gender && validation.errors.gender && (
                                                <div className="invalid-feedback d-block">
                                                    {validation.errors.gender}
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label>Study Date</Label>
                                            <Input
                                                name="studyDate"
                                                type="date"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.studyDate}
                                                invalid={validation.touched.studyDate && !!validation.errors.studyDate}
                                            />
                                            <FormFeedback>{validation.errors.studyDate}</FormFeedback>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="12">
                                        <div className="mb-3">
                                            <Label>Modality</Label>
                                            <Input
                                                name="modality"
                                                type="text"
                                                placeholder="Enter modality"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.modality}
                                                invalid={validation.touched.modality && !!validation.errors.modality}
                                            />
                                            <FormFeedback>{validation.errors.modality}</FormFeedback>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="12">
                                        <div className="mb-3">
                                            <Label>Description</Label>
                                            <Input
                                                name="description"
                                                type="textarea"
                                                rows={4}
                                                placeholder="Enter description"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.description}
                                                invalid={validation.touched.description && !!validation.errors.description}
                                            />
                                            <FormFeedback>{validation.errors.description}</FormFeedback>
                                        </div>
                                    </Col>
                                </Row>

                                <div className="d-flex justify-content-end gap-3">
                                    <Button type='button' color="secondary" onClick={() => navigate(-1)}>
                                        Cancel
                                    </Button>

                                    <Button type="submit" color="success">
                                        Save
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    )
}
