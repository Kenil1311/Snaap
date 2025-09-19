import React, { useEffect, useState, useMemo } from "react";
import TableContainer from "../../components/Common/TableContainer";

import {
    Col,
    Container,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Label,
    Input,
    FormFeedback,
    Button,
} from "reactstrap";
import Select from "react-select";
import * as Yup from "yup";
import { useFormik } from "formik";

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import DeleteModal from "../../components/Common/DeleteModal";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { addNewDoctor, deleteDoctor, getDoctor, updateDoctor } from "../../store/actions";
import { ToastContainer } from "react-toastify";

const StatusGroup = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" }
];

const Doctor = () => {
    document.title = "Doctor | SNAAP - Radiology & Diagnostic Centers";

    const dispatch = useDispatch();
    const doctors = useSelector(state => state.doctor?.doctor || []);
    const error = useSelector(state => state.doctor?.error);

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [doctorInitialValues, setDoctorInitialValues] = useState({
        id: null,
        name: "",
        phone: "",
        isActive: true,
    });
    const [modal, setModal] = useState(false);

    // Form validation
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: doctorInitialValues,
        validationSchema: Yup.object({
            name: Yup.string().required("Doctor name is required"),
            phone: Yup.string().required("Phone number is required"),
        }),
        onSubmit: (values) => {
            if (values.id) {
                dispatch(updateDoctor(values));
            } else {
                dispatch(addNewDoctor(values));
            }
            setModal(false);
            validation.resetForm();
        },
    });

    const columns = useMemo(
        () => [
            {
                Header: "#",
                accessor: "id",
                Cell: ({ value }) => <strong>{value}</strong>,
            },
            {
                Header: "Name",
                accessor: "name",
                Cell: ({ value }) => <span className="fw-semibold text-dark">{value}</span>,
            },
            {
                Header: "Phone",
                accessor: "phone",
                Cell: ({ value }) => <span>{value}</span>,
            },
            {
                Header: "Status",
                accessor: "isActive",
                Cell: ({ value }) => (
                    <span className={`badge bg-${value ? "success" : "secondary"}`}>
                        {value ? "Active" : "Inactive"}
                    </span>
                ),
            },
            {
                Header: "Action",
                Cell: (cellProps) => {
                    const row = cellProps.row.original;
                    return (
                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-sm"
                                onClick={() => handleDoctorClick(row)}
                            >
                                <i className="mdi mdi-pencil-outline" style={{ fontSize: "20px" }}></i>
                            </button>
                            <button
                                className="btn btn-sm"
                                onClick={() => onClickDelete(row)}
                            >
                                <i className="mdi mdi-delete-outline" style={{ fontSize: "20px" }}></i>
                            </button>
                        </div>
                    );
                },
            },
        ],
        []
    );

    useEffect(() => {
        dispatch(getDoctor());
    }, [dispatch]);

    const toggle = () => {
        if (modal) {
            setIsEdit(false);
            setSelectedDoctor(null);
            setDoctorInitialValues({
                id: null,
                name: "",
                phone: "",
                isActive: true,
            });
        }
        setModal(!modal);
    };

    const handleDoctorClick = (doctor) => {
        setIsEdit(true);
        setDoctorInitialValues({ ...doctor });
        setModal(true);
    };

    const [deleteModal, setDeleteModal] = useState(false);

    const onClickDelete = (doctor) => {
        setSelectedDoctor(doctor?.id);
        setDeleteModal(true);
    };

    const handleDeleteDoctor = () => {
        dispatch(deleteDoctor(selectedDoctor));
        setDeleteModal(false);
    };

    return (
        <React.Fragment>
            <DeleteModal
                show={deleteModal}
                onDeleteClick={handleDeleteDoctor}
                onCloseClick={() => setDeleteModal(false)}
            />
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Doctors" breadcrumbItem="Doctors" />
                    <Row>
                        <Col lg="12">
                            <TableContainer
                                columns={columns}
                                data={doctors.sort((a, b) => a.id - b.id)}
                                isGlobalFilter={true}
                                customPageSize={10}
                                className="table align-middle datatable dt-responsive table-check nowrap"
                                toggle={toggle}
                            />

                            <Modal isOpen={modal} toggle={toggle} centered>
                                <ModalHeader toggle={toggle}>
                                    {isEdit ? "Edit Doctor" : "Add Doctor"}
                                </ModalHeader>
                                <ModalBody>
                                    <Form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                        }}
                                    >
                                        <Row>
                                            <Col md="12">
                                                <div className="mb-3">
                                                    <Label>Name</Label>
                                                    <Input
                                                        name="name"
                                                        type="text"
                                                        placeholder="Enter doctor name"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.name}
                                                        invalid={validation.touched.name && !!validation.errors.name}
                                                    />
                                                    <FormFeedback>{validation.errors.name}</FormFeedback>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md="12">
                                                <div className="mb-3">
                                                    <Label>Phone</Label>
                                                    <Input
                                                        name="phone"
                                                        type="text"
                                                        placeholder="Enter phone number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.phone}
                                                        invalid={validation.touched.phone && !!validation.errors.phone}
                                                    />
                                                    <FormFeedback>{validation.errors.phone}</FormFeedback>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md="6">
                                                <div className="mb-3">
                                                    <Label>Status</Label>
                                                    <Select
                                                        name="isActive"
                                                        value={{
                                                            value: validation.values.isActive ? "Active" : "Inactive",
                                                            label: validation.values.isActive ? "Active" : "Inactive"
                                                        }}
                                                        onChange={(selectedOption) =>
                                                            validation.handleChange({
                                                                target: {
                                                                    name: "isActive",
                                                                    value: selectedOption.value === "Active"
                                                                }
                                                            })
                                                        }
                                                        options={StatusGroup}
                                                        classNamePrefix="custom-select"
                                                        className="react-select-container"
                                                    />
                                                    <FormFeedback>{validation.errors.isActive}</FormFeedback>
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="text-end">
                                            <Button type="submit" color="success">
                                                Save
                                            </Button>
                                        </div>
                                    </Form>
                                </ModalBody>
                            </Modal>
                        </Col>
                    </Row>
                </Container>

                <ToastContainer />
            </div>
        </React.Fragment>
    );
};

export default Doctor;
