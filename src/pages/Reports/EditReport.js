import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, FormFeedback, Input, Label, Row, InputGroup } from 'reactstrap'
import * as Yup from "yup";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Dropzone from 'react-dropzone';
import Select from "react-select"
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"

const branchesData = [
    {
        id: 1,
        branchName: "SNAAP ORAL DIAGNOSIS AND RADIOLOGY CENTRE",
        area: "Lal Darwaja",
        phone: "+91 93131 51637",
        address1: "A-108, Millenium Point, Lal Darwaja Station Rd",
        address2: "opp. Gabani hospital",
        city: "Surat",
        state: "Gujarat",
        zip: "395003",
        country: "India",
        latitude: "21.323585382014564",
        longitude: "72.85372149153386",
    },
    {
        id: 2,
        branchName: "SNAAP ORAL DIAGNOSIS AND RADIOLOGY CENTRE",
        area: "Athwa",
        phone: "+91 94296 77150",
        address1: "3rd Floor, Maher Park-A, 37, Ring Rd",
        address2: "near Lucky Book store, above Desai Metropolis, Athwa",
        city: "Surat",
        state: "Gujarat",
        zip: "395001",
        country: "India",
        latitude: "21.29287950702769",
        longitude: "72.82076250771047",
    },
    {
        id: 3,
        branchName: "SNAAP ORAL DIAGNOSIS AND RADIOLOGY CENTRE",
        area: "Adajan",
        phone: "+91 63527 66065",
        address1: "Millionaire Business Park, 106",
        address2: "Opp, Subhash Chandra Bose Marg, TGB, Adajan",
        city: "Surat",
        state: "Gujarat",
        zip: "395009",
        country: "India",
        latitude: "21.29287950702769",
        longitude: "72.7713240319754",
    },
    {
        id: 4,
        branchName: "Snaap Oral Diagnosis & Radiology Centre LLP",
        area: "Althan",
        phone: "",
        email: "hyd.hub@example.com",
        address1: "1rd floor, blue arc complex, VIP Rd",
        address2: "near Althan - Sarsana Road, Althan",
        city: "Surat",
        state: "Gujarat",
        zip: "395007",
        country: "India",
        latitude: "21.267286377320417",
        longitude: "72.80428301579879",
    },
    {
        id: 5,
        branchName: "SNAAP ORAL DIAGNOSIS AND RADIOLOGY CENTER VESU",
        area: "Vesu",
        phone: "+91 63527 57631",
        address1: "Trinity Orion, 201",
        address2: "Vesu Main Road, Vesu",
        city: "Surat",
        state: "Gujarat",
        zip: "395007",
        country: "India",
        latitude: "21.246808669039474",
        longitude: "72.74935137609314"
    },
    {
        id: 6,
        branchName: "SNAAP ORAL DIAGNOSIS AND RADIOLOGY CENTRE SARTHANA",
        area: "Sarthana",
        phone: "+91 63549 47340",
        address1: "Rise On Plaza, 224",
        address2: "near Sarthana Jakat Naka",
        city: "Surat",
        state: "Gujarat",
        zip: "395013",
        country: "India",
        latitude: "21.33381924686161",
        longitude: "72.9086531312395"
    },
    {
        id: 7,
        branchName: "SNAAP ORAL DIAGNOSIS AND RADIOLOGY CENTRE",
        area: "Navsari",
        phone: "",
        address1: "WWX9+RVC, Sandhkuva",
        address2: "Udyog Nagar, Vejalpore",
        city: "Navsari",
        state: "Gujarat",
        zip: "396445",
        country: "India",
        latitude: "20.965593720139175",
        longitude: "72.92032614039391"
    },
    {
        id: 8,
        branchName: "SNAAP ORAL DIAGNOSIS AND RADIOLOGY CENTRE, VADODARA",
        area: "Race Course Road",
        phone: "+91 70965 55589",
        address1: "327, Trivia",
        address2: "Near, Race Course Road, Natubhai Cir",
        city: "Vadodara",
        state: "Gujarat",
        zip: "390007",
        country: "India",
        latitude: "22.433388292489944",
        longitude: "73.17079302388392"
    },
    {
        id: 9,
        branchName: "Snaap Oral Diagnosis & radiology Centre",
        area: "Maninagar",
        phone: "+91 98793 00703",
        address1: "Prankunj Society",
        address2: "Pushpkunj, Maninagar",
        city: "Ahmedabad",
        state: "Gujarat",
        zip: "380008",
        country: "India",
        latitude: "23.112087260983426",
        longitude: "72.61598346285689"
    },
    {
        id: 10,
        branchName: "SNAAP Centre",
        area: "Paldi",
        phone: "+91 94296 77152",
        address1: "F-104, Sahajanand Plaza, Beside Utsav Restaurant, above Fashion House",
        address2: "opp. Zalak Complex, Bhatta, Paldi",
        city: "Ahmedabad",
        state: "Gujarat",
        zip: "380007",
        country: "India",
        latitude: "23.10703489039966",
        longitude: "72.54457233123955"
    },
    {
        id: 11,
        branchName: "Snaap Oral Diagnosis Centre",
        area: "Rajkot",
        phone: "",
        address1: "202-5, Street No.4, near Kalrav Children Hospital",
        address2: "New College Wadi, Mahavir Park",
        city: "Rajkot",
        state: "Gujarat",
        zip: "360005",
        country: "India",
        latitude: "22.392762652774564",
        longitude: "70.74830771286493"
    },
    {
        id: 12,
        branchName: "SNAAP ORAL DIAGNOSIS AND RADIOLOGY CENTRE",
        area: "Karelibagh",
        phone: "+91 70965 55591",
        address1: "ADITI COMPLEX, AMITNAGAR CIRCLE",
        address2: "VIP Rd, Karelibagh",
        city: "Vadodara",
        state: "Gujarat",
        zip: "390018",
        country: "India",
        latitude: "22.433388292489944",
        longitude: "73.22572466358955"
    },
    {
        id: 13,
        branchName: "SNAAP Oral Diagnosis & Radiology Centre - MOTERA",
        area: "Motera",
        phone: "",
        address1: "Shukan Mall, 45, GANDHI NAGAR ROAD",
        address2: "Rangjyot Society, Parvati Nagar, Chandkheda",
        city: "Ahmedabad",
        state: "Gujarat",
        zip: "380005",
        country: "India",
        latitude: "23.112201427326987",
        longitude: "72.59286043850545"
    },
    {
        id: 14,
        branchName: "Snaap Imaging Centre",
        area: "Bharuch",
        phone: "+91 63549 61652",
        address1: "Shop no.9, status hub , falshruti nagar",
        address2: "near ami laboratory, Patel Super Market, B/h",
        city: "Bharuch",
        state: "Gujarat",
        zip: "392001",
        country: "India",
        latitude: "21.720089647763373",
        longitude: "72.99694598589022"
    },
    {
        id: 15,
        branchName: "SNAAP Oral",
        area: "Satellite",
        phone: "+91 83202 12924",
        address1: "Mansi Cross Road, Shop No. 129, Sunrise Mall",
        address2: "above Bata Showroom, Satellite",
        city: "Ahmedabad",
        state: "Gujarat",
        zip: "380015",
        country: "India",
        latitude: "23.04271473818183",
        longitude: "72.52900240734763",
    },
];

const sagmentData = [
    {
        id: 1,
        type: "2D",
        name: "OPG",
        description: "",
        createdBy: "Admin",
        createdDate: "2024-01-10T10:00:00Z",
        // updatedAt: "2024-06-10T12:30:00Z",
        status: "Active",
    },
    {
        id: 2,
        type: "2D",
        name: "WATER VIEW",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Inactive",
    },
    {
        id: 3,
        type: "2D",
        name: "REVERSE TOWN VIEW",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 4,
        type: "2D",
        name: "LATERAL CEPHALGRAM TRUE",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 5,
        type: "2D",
        name: "HAND WRIST RADIOGRAPH",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 6,
        type: "2D",
        name: "PA MANDIBLE/SKULL VIEW",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 7,
        type: "2D",
        name: "LATERAL CEPHALGRAM WITH TRACING",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 8,
        type: "2D",
        name: "SUBMENTOVERTEEX VIEW",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 9,
        type: "2D",
        name: "TMJ View",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 10,
        type: "3D",
        name: "SELECTIONAL CBCT (5 X 5)",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 11,
        type: "3D",
        name: "CBCT OF TMJ RIGHT/LEFT (8 X 8)",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 12,
        type: "3D",
        name: "CBCT OF MAXILLA (FULL ARCH. 10 X 5, 8 X 8)",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 13,
        type: "3D",
        name: "CBCT OF TMJ BOTH (17 X 6)",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 14,
        type: "3D",
        name: "CBCT OF MANDIBLE (FULL ARCH. 10 X 5, 8 X 8)",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 15,
        type: "3D",
        name: "SINUS VIEW (10 X 10)",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 16,
        type: "3D",
        name: "CBCT OF BOTH JAWS (FULL ARCH. 10 X 10)",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 17,
        type: "3D",
        name: "FULL FACIAL 3D IMAGING (17 X 16)",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
];

const optionGroup = [
    { label: "Cancer", value: "Cancer" },
    { label: "Implant", value: "Implant" }
]

const ganderOptionGroup = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" }
]

const branchOptions = Object.values(
    branchesData.reduce((acc, branch) => {
        const city = branch.city;

        if (!acc[city]) {
            acc[city] = {
                label: city,
                options: []
            };
        }

        acc[city].options.push({
            label: branch.area,
            value: branch.area,
            city: branch.city,
        });

        return acc;
    }, {})
);

const segmentOptions = Object.values(
    sagmentData.reduce((acc, sagment) => {
        const type = sagment.type;

        if (!acc[type]) {
            acc[type] = {
                label: type,
                options: []
            };
        }

        acc[type].options.push({
            label: sagment.name,
            value: sagment.name,
            type: sagment.type
        });

        return acc;
    }, {})
);

const findBranchByValue = (valueToFind) => {
    for (const group of branchOptions) {
        const found = group.options.find(opt => opt.value === valueToFind);
        if (found) return found;
    }
    return null;
};

const findSegmentByValue = (valueToFind) => {
    for (const group of segmentOptions) {
        const found = group.options.find(opt => opt.value === valueToFind);
        if (found) return found;
    }
    return null;
};


export default function EditReport() {

    document.title = "Edit Report | SNAAP - Radiology & Diagnostic Centers";

    const navigate = useNavigate();

    const location = useLocation();
    const initialValues = location.state || {};

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues || {
            id: "",
            name: "",
            phone: "",
            email: "",
            gender: "",
            age: "",
            studyDate: "",
            modality: "",
            pathology: "",
            description: "",
            segment: "",
            branch: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please enter patient name"),
            gender: Yup.string().required("Please select gender"),
            phone: Yup.string().required("Please enter phone name").matches(/^[0-9]+$/, "Phone number must be numeric").min(10, "Phone number must be at least 10 digits").max(15, "Phone number cannot exceed 15 digits"),
            email: Yup.string().required("Please enter email adress").email("Please enter a valid email address"),
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


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Reports" breadcrumbItem="Edit Report" />

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
                                            <Label>Branch</Label>
                                            <Select
                                                name="branch"
                                                placeholder="Select Branch"
                                                value={findBranchByValue(validation.values.branch)}
                                                onChange={(selectedOption) =>
                                                    validation.handleChange({
                                                        target: {
                                                            name: "branch",
                                                            value: selectedOption.value
                                                        }
                                                    })
                                                }
                                                options={branchOptions}
                                                classNamePrefix="custom-select"
                                                className="react-select-container"
                                            />

                                            {validation.touched.branch && validation.errors.branch && (
                                                <div className="invalid-feedback d-block">
                                                    {validation.errors.branch}
                                                </div>
                                            )}
                                        </div>

                                    </Col>

                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label>Segment</Label>
                                            <Select
                                                name="segment"
                                                placeholder="Select Segment"
                                                value={findSegmentByValue(validation.values.segment)}
                                                onChange={(selectedOption) =>
                                                    validation.handleChange({
                                                        target: {
                                                            name: "segment",
                                                            value: selectedOption.value
                                                        }
                                                    })
                                                }
                                                options={segmentOptions}
                                                classNamePrefix="custom-select"
                                                className="react-select-container"
                                            />

                                            {validation.touched.segment && validation.errors.segment && (
                                                <div className="invalid-feedback d-block">
                                                    {validation.errors.segment}
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
                                            <Label>Gender</Label>
                                            <Select
                                                name="gender"
                                                placeholder="Select Gender"
                                                value={ganderOptionGroup.find(opt => opt.value === validation.values.gender)}
                                                onChange={(selectedOption) =>
                                                    validation.handleChange({
                                                        target: {
                                                            name: "segment",
                                                            value: { type: segmentOptions, value: selectedOption.value }
                                                        }
                                                    })
                                                }
                                                options={ganderOptionGroup}
                                                classNamePrefix="custom-select"
                                                className="react-select-container"
                                            />

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

                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label>Study Date</Label>
                                            <InputGroup>
                                                <Flatpickr
                                                    className="form-control d-block"
                                                    placeholder="Select study date"
                                                    options={{
                                                        altInput: true,
                                                        altFormat: "F j, Y",
                                                        dateFormat: "Y-m-d"
                                                    }}
                                                    value={validation.values.studyDate}
                                                    onChange={(date) => {
                                                        console.log("studyDate", date[0])
                                                        validation.setFieldValue("studyDate", date[0]);
                                                    }}
                                                    invalid={validation.touched.studyDate && !!validation.errors.studyDate}
                                                />

                                            </InputGroup>
                                            <FormFeedback>{validation.errors.studyDate}</FormFeedback>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label>Phone</Label>
                                            <Input
                                                name="phone"
                                                type="tel"
                                                placeholder="Enter phone number"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.phone}
                                                invalid={validation.touched.phone && !!validation.errors.phone}
                                            />
                                            <FormFeedback>{validation.errors.phone}</FormFeedback>
                                        </div>
                                    </Col>

                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label>Email</Label>
                                            <Input
                                                name="email"
                                                type="email"
                                                placeholder="Enter email address"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.email}
                                                invalid={validation.touched.email && !!validation.errors.email}
                                            />
                                            <FormFeedback>{validation.errors.email}</FormFeedback>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="6">
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

                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label>Pathology</Label>
                                            <Select
                                                name="pathology"
                                                placeholder="Select Pathology"
                                                value={optionGroup.find(opt => opt.value === validation.values.pathology)}
                                                onChange={(selectedOption) =>
                                                    validation.handleChange({
                                                        target: {
                                                            name: "pathology",
                                                            value: selectedOption.value
                                                        }
                                                    })
                                                }
                                                options={optionGroup}
                                                classNamePrefix="custom-select"
                                                className="react-select-container"
                                            />
                                            {/* <FormFeedback>{validation.errors.pathology}</FormFeedback> */}
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

                                <Row>
                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label>Upload File(DICOM/OPG)</Label>
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
                                            <Label>Upload Report</Label>
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
                                </Row>

                                <div className="d-flex justify-content-end gap-3 mb-3">
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
