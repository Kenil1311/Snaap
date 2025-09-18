import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, FormFeedback, Input, Label, Row, InputGroup } from 'reactstrap'
import * as Yup from "yup";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Dropzone from 'react-dropzone';
import Select from "react-select"
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import AddNewBranch from './AddNewBranch';
import AddNewSagment from './AddNewSagment';
import AddNewPathology from './AddNewPathology';
import { getBranches, getCity, getDoctor, getPathology, getSegments, updateReport } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';


const ganderOptionGroup = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" }
]


export default function EditReport() {

    document.title = "Edit Report | SNAAP - Radiology & Diagnostic Centers";

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const branches = useSelector(state => state.branch?.branches || []);
    const segments = useSelector(state => state.segment?.segments || []);
    const pathology = useSelector(state => state.pathology?.pathology || []);
    const cities = useSelector(state => state.city?.city || []);
    const doctors = useSelector(state => state.doctor?.doctor || []);

    useEffect(() => {
        dispatch(getBranches());
        dispatch(getSegments());
        dispatch(getPathology());
        dispatch(getCity());
        dispatch(getDoctor());
    }, [dispatch]);

    const branchOptions = Object.values(
        branches.reduce((acc, branch) => {
            const city = branch.city;

            if (!acc[city]) {
                acc[city] = {
                    label: city,
                    options: []
                };
            }

            acc[city].options.push({
                label: branch.area,
                value: branch.id
            });

            return acc;
        }, {})
    );

    const segmentOptions = Object.values(
        segments.reduce((acc, sagment) => {

            if (!sagment.isActive) return acc;

            const type = sagment.type;

            if (!acc[type]) {
                acc[type] = {
                    label: type,
                    options: []
                };
            }

            acc[type].options.push({
                label: sagment.name,
                value: sagment.id
            });

            return acc;
        }, {})
    );

    const cityOptions = Object.values(
        cities.reduce((acc, sagment) => {

            if (!sagment.isActive) return acc;

            const type = sagment.type;

            if (!acc[type]) {
                acc[type] = {
                    label: type,
                    options: []
                };
            }

            acc[type].options.push({
                label: sagment.name,
                value: sagment.id
            });

            return acc;
        }, {})
    );

    const doctorOptions = Object.values(
        doctors.reduce((acc, sagment) => {

            if (!sagment.isActive) return acc;

            const type = sagment.type;

            if (!acc[type]) {
                acc[type] = {
                    label: type,
                    options: []
                };
            }

            acc[type].options.push({
                label: sagment.name,
                value: sagment.id
            });

            return acc;
        }, {})
    );

    const pathologyOptions = pathology?.filter(item => item.isActive)?.map(sagment => ({
        label: sagment.name,
        value: sagment.id
    }));

    const initialValues = location.state || {};


    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: initialValues?.id,
            name: initialValues?.name,
            phone: initialValues?.phone,
            email: initialValues?.email,
            gender: initialValues?.gender,
            age: initialValues?.age,
            address: initialValues?.address,
            city: initialValues?.city,
            doctor: initialValues?.doctor,
            studyDate: initialValues?.studydate,
            modality: initialValues?.modality,
            pathology: initialValues?.pathologies?.map(item => ({
                value: item.id,
                label: item.name
            })),
            description: initialValues?.description,
            segment: initialValues?.segments?.map(item => ({
                value: item.id,
                label: item.name
            })),
            branch: initialValues?.branch
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
            segment: Yup.array()
                .of(
                    Yup.object().shape({
                        value: Yup.string().required("Please select segment"),
                        label: Yup.string().required("Please select segment"),
                    })
                )
                .min(1, "Please select segment")
                .required("Please select segment"),
            branch: Yup.string().required("Please select branch"),
            city: Yup.string().required("Please select city"),
            doctor: Yup.string().required("Please select doctor"),
        }),
        onSubmit: (values) => {
            const transformed = {
                id: values.id,
                age: values.age,
                branch: values.branch,
                description: values.description,
                email: values.email,
                gender: values.gender,
                modality: values.modality,
                name: values.name,
                phone: values.phone,
                studyDate: new Date(values.studyDate).getTime(),
                pathology_ids: values.pathology?.map(p => (p.value)),
                segment_ids: values.segment?.map(s => (s.value)),
                city: values.city,
                doctor: values.doctor,
                upload_file: selectedFiles[0],
                upload_report: selectedReport[0]
            };
            dispatch(updateReport(transformed))

            navigate(-1)
        },
    });

    const [selectedFiles, setselectedFiles] = useState([]);
    const [selectedReport, setSelectedReport] = useState([]);
    const [isOpenAddNewBranch, setIsOpenAddNewBranch] = useState(false);
    const [isOpenAddNewSagment, setIsOpenAddNewSagment] = useState(false);
    const [isOpenAddNewPathology, setIsOpenAddNewPathology] = useState(false);

    function handleAcceptedFiles(files, type) {
        files.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        );

        if (type == "report") {
            setSelectedReport(files)
        }
        else {
            setselectedFiles(files);
        }

    }

    const handleRemoveFile = (index, type) => {

        if (type == "report") {
            const newFiles = [...selectedReport];
            newFiles.splice(index, 1);
            setSelectedReport(newFiles);
        }
        else {
            const newFiles = [...selectedFiles];
            newFiles.splice(index, 1);
            setselectedFiles(newFiles);
        }

    };


    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

    const findBranchByValue = (valueToFind) => {
        for (const group of branchOptions) {
            const found = group.options.find(opt => opt.value === valueToFind);
            if (found) return found;
        }
        return null;
    };

    const findCityByValue = (valueToFind) => {
        for (const group of cityOptions) {
            const found = group.options.find(opt => opt.value === valueToFind);
            if (found) return found;
        }
        return null;
    };

    const findDoctorByValue = (valueToFind) => {
        for (const group of doctorOptions) {
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
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <div style={{ flex: "0 0 90%" }}>
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
                                                </div>

                                                <div
                                                    style={{
                                                        flex: "0 0 10%",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        cursor: "pointer"
                                                    }}
                                                    className="bordered icon-btn"
                                                    onClick={() => setIsOpenAddNewBranch(true)}
                                                >
                                                    <i className="fas fa-circle-plus" style={{ fontSize: 24 }} />
                                                </div>
                                            </div>


                                            {validation.touched.gender && validation.errors.gender && (
                                                <div className="invalid-feedback d-block">
                                                    {validation.errors.gender}
                                                </div>
                                            )}
                                        </div>

                                    </Col>

                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label>Segment</Label>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <div style={{ flex: "0 0 90%" }}>
                                                    <Select
                                                        name="segment"
                                                        placeholder="Select segment"
                                                        isMulti
                                                        value={validation.values.segment}
                                                        onChange={(selectedOptions) => {
                                                            validation.setFieldValue(
                                                                "segment",
                                                                selectedOptions
                                                            )
                                                        }}
                                                        options={segmentOptions}
                                                        classNamePrefix="custom-select"
                                                        className="react-select-container"
                                                    />
                                                </div>
                                                <div
                                                    style={{
                                                        flex: "0 0 10%",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        cursor: "pointer"
                                                    }}
                                                    className="bordered icon-btn"
                                                    onClick={() => setIsOpenAddNewSagment(true)}
                                                >
                                                    <i className="fas fa-circle-plus" style={{ fontSize: 24 }} />
                                                </div>
                                            </div>
                                            {validation.touched.segment && validation.errors.segment && (
                                                <div className="invalid-feedback d-block">
                                                    {validation.errors.segment}
                                                </div>
                                            )}
                                        </div>
                                    </Col>

                                </Row>

                                <Row>
                                    <Col md="4">
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

                                    <Col md="4">
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

                                    <Col md="4">
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

                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label>Address</Label>
                                            <Input
                                                name="address"
                                                type="textarea"
                                                rows={5}
                                                placeholder="Enter address"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.address}
                                                invalid={validation.touched.address && !!validation.errors.address}
                                            />
                                            <FormFeedback>{validation.errors.address}</FormFeedback>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="4">
                                        <div className="mb-3">
                                            <Label>City</Label>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <div style={{ flex: 1 }}>
                                                    <Select
                                                        name="city"
                                                        placeholder="Select city"
                                                        value={findCityByValue(validation.values.city)}
                                                        onChange={(selectedOption) =>
                                                            validation.handleChange({
                                                                target: {
                                                                    name: "city",
                                                                    value: selectedOption.value
                                                                }
                                                            })
                                                        }
                                                        options={cityOptions}
                                                        classNamePrefix="custom-select"
                                                        className="react-select-container"
                                                    />
                                                </div>

                                                {/* <div
                                                    style={{
                                                        flex: "0 0 5%",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        cursor: "pointer"
                                                    }}
                                                    className="bordered icon-btn"
                                                    onClick={() => setIsOpenAddNewBranch(true)}
                                                >
                                                    <i className="fas fa-circle-plus" style={{ fontSize: 24 }} />
                                                </div> */}
                                            </div>


                                            {validation.touched.gender && validation.errors.gender && (
                                                <div className="invalid-feedback d-block">
                                                    {validation.errors.gender}
                                                </div>
                                            )}
                                        </div>

                                    </Col>

                                    <Col md="4">
                                        <div className="mb-3">
                                            <Label>Doctor</Label>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <div style={{ flex: 1 }}>
                                                    <Select
                                                        name="doctor"
                                                        placeholder="Select doctor"
                                                        value={findDoctorByValue(validation.values.doctor)}
                                                        onChange={(selectedOption) =>
                                                            validation.handleChange({
                                                                target: {
                                                                    name: "doctor",
                                                                    value: selectedOption.value
                                                                }
                                                            })
                                                        }
                                                        options={doctorOptions}
                                                        classNamePrefix="custom-select"
                                                        className="react-select-container"
                                                    />
                                                </div>

                                                {/* <div
                                                    style={{
                                                        flex: "0 0 5%",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        cursor: "pointer"
                                                    }}
                                                    className="bordered icon-btn"
                                                    onClick={() => setIsOpenAddNewBranch(true)}
                                                >
                                                    <i className="fas fa-circle-plus" style={{ fontSize: 24 }} />
                                                </div> */}
                                            </div>


                                            {validation.touched.gender && validation.errors.gender && (
                                                <div className="invalid-feedback d-block">
                                                    {validation.errors.gender}
                                                </div>
                                            )}
                                        </div>

                                    </Col>

                                    <Col md="4">
                                        <div className="mb-3">
                                            <Label>Study Date</Label>
                                            {/* <InputGroup> */}
                                            <Flatpickr
                                                className="form-control d-block"
                                                placeholder="Mon dd, yyyy"
                                                options={{
                                                    altInput: true,
                                                    altFormat: "F j, Y",
                                                    dateFormat: "Y-m-d"
                                                }}
                                                onChange={(date) => {

                                                    validation.setFieldValue("studyDate", date[0]);
                                                }}
                                                invalid={validation.touched.studyDate && !!validation.errors.studyDate}
                                            />

                                            {/* </InputGroup> */}
                                            <FormFeedback>{validation.errors.studyDate}</FormFeedback>
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

                                        <div className="mb-3">
                                            <Label>Pathology</Label>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <div style={{ flex: "0 0 90%" }}>
                                                    <Select
                                                        name="pathology"
                                                        placeholder="Select Pathology"
                                                        isMulti
                                                        value={validation.values.pathology}
                                                        onChange={(selectedOptions) => {
                                                            validation.setFieldValue("pathology", selectedOptions);
                                                        }}
                                                        options={pathologyOptions}
                                                        classNamePrefix="custom-select"
                                                        className="react-select-container"
                                                    />
                                                </div>
                                                <div
                                                    style={{
                                                        flex: "0 0 10%",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        cursor: "pointer"
                                                    }}
                                                    className="bordered icon-btn"
                                                    onClick={() => setIsOpenAddNewPathology(true)}
                                                >
                                                    <i className="fas fa-circle-plus" style={{ fontSize: 24 }} />
                                                </div>
                                            </div>
                                            {/* <FormFeedback>{validation.errors.pathology}</FormFeedback> */}
                                        </div>

                                    </Col>

                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label>Upload File(DICOM/OPG)</Label>
                                            <Dropzone onDrop={(file) => handleAcceptedFiles(file, "file")}>
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
                                                                            onClick={() => handleRemoveFile(i, "file")}
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

                                <Row>
                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label>Description</Label>
                                            <Input
                                                name="description"
                                                type="textarea"
                                                rows={5}
                                                placeholder="Enter description"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.description}
                                                invalid={validation.touched.description && !!validation.errors.description}
                                            />
                                            <FormFeedback>{validation.errors.description}</FormFeedback>
                                        </div>
                                    </Col>

                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label>Upload Report</Label>
                                            <Dropzone onDrop={(file) => handleAcceptedFiles(file, "report")}>
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
                                                        {selectedReport.length === 0 ? (
                                                            <div {...getRootProps()}>
                                                                <div className="mb-2">
                                                                    <i className="display-4 text-muted bx bx-cloud-upload" />
                                                                </div>
                                                                <h6 className="text-muted mb-0">Drop files here or click to upload.</h6>
                                                            </div>
                                                        ) : (
                                                            <div className="w-100">
                                                                {selectedReport.map((f, i) => (
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
                                                                            onClick={() => handleRemoveFile(i, "report")}
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


                    <AddNewBranch
                        isOpen={isOpenAddNewBranch}
                        onClose={() => setIsOpenAddNewBranch(false)}
                        onApply={() => { }}
                    />

                    <AddNewSagment
                        isOpen={isOpenAddNewSagment}
                        onClose={() => setIsOpenAddNewSagment(false)}
                        onApply={() => { }}
                    />

                    <AddNewPathology
                        isOpen={isOpenAddNewPathology}
                        onClose={() => setIsOpenAddNewPathology(false)}
                        onApply={() => { }}
                    />
                </Container>
            </div>
        </React.Fragment>
    )
}
