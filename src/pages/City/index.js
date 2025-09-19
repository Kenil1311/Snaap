import React, { useEffect, useState, useRef, useMemo } from "react";
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
import { addNewCity, deleteCity, getCity, updateCity } from "../../store/actions";
import { ToastContainer } from "react-toastify";

const StatusGroup = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" }
];

const City = () => {
    document.title = "City | SNAAP - Radiology & Diagnostic Centers";

    const dispatch = useDispatch();
    const cities = useSelector(state => state.city?.city || []);
    const error = useSelector(state => state.city?.error);

    const [selectedCity, setSelectedCity] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [cityInitialValues, setCityInitialValues] = useState({
        id: null,
        name: "",
        provinceId: "",
        latitude: "",
        longitude: "",
        isActive: true,
    });
    const [modal, setModal] = useState(false);

    // Form validation
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: cityInitialValues,
        validationSchema: Yup.object({
            name: Yup.string().required("City name is required"),
        }),
        onSubmit: (values) => {
            if (values.id) {
                dispatch(updateCity(values));
            } else {
                dispatch(addNewCity(values));
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
                Header: "City Name",
                accessor: "name",
                Cell: ({ value }) => <span className="fw-semibold text-dark">{value}</span>,
            },
            {
                Header: "Province ID",
                accessor: "provinceId",
                Cell: ({ value }) => <span>{value}</span>,
            },
            {
                Header: "Latitude",
                accessor: "latitude",
                Cell: ({ value }) => <span>{value}</span>,
            },
            {
                Header: "Longitude",
                accessor: "longitude",
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
                Header: "Created At",
                accessor: "createdAt",
                Cell: ({ value }) => (
                    <span className="text-muted small">
                        {new Date(value).toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
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
                                onClick={() => handleCityClick(row)}
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
        dispatch(getCity());
    }, [dispatch]);

    const toggle = () => {
        if (modal) {
            setIsEdit(false);
            setSelectedCity(null);
            setCityInitialValues({
                id: null,
                name: "",
                provinceId: "",
                latitude: "",
                longitude: "",
                isActive: true,
            });
        }
        setModal(!modal);
    };

    const handleCityClick = (city) => {
        setIsEdit(true);
        setCityInitialValues({ ...city });
        setModal(true);
    };

    const [deleteModal, setDeleteModal] = useState(false);

    const onClickDelete = (city) => {
        setSelectedCity(city?.id);
        setDeleteModal(true);
    };

    const handleDeleteCity = () => {
        dispatch(deleteCity(selectedCity));
        setDeleteModal(false);
    };

    const keyField = "id";

    return (
        <React.Fragment>
            <DeleteModal
                show={deleteModal}
                onDeleteClick={handleDeleteCity}
                onCloseClick={() => setDeleteModal(false)}
            />
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Cities" breadcrumbItem="Cities" />
                    <Row>
                        <Col lg="12">
                            <Row>
                                <Col xl="12">
                                    <TableContainer
                                        columns={columns}
                                        data={cities.sort((a, b) => a.id - b.id)}
                                        isGlobalFilter={true}
                                        isAddUserList={true}
                                        customPageSize={10}
                                        className="table align-middle datatable dt-responsive table-check nowrap"
                                        toggle={toggle}
                                    />

                                    <Modal isOpen={modal} toggle={toggle} centered>
                                        <ModalHeader toggle={toggle}>
                                            {isEdit ? "Edit City" : "Add City"}
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
                                                            <Label>City Name</Label>
                                                            <Input
                                                                name="name"
                                                                type="text"
                                                                placeholder="Enter city name"
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
                                                            <Label>Province ID</Label>
                                                            <Input
                                                                name="provinceId"
                                                                type="text"
                                                                placeholder="Enter province ID"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.provinceId}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col md="6">
                                                        <div className="mb-3">
                                                            <Label>Latitude</Label>
                                                            <Input
                                                                name="latitude"
                                                                type="text"
                                                                placeholder="Enter latitude"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.latitude}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col md="6">
                                                        <div className="mb-3">
                                                            <Label>Longitude</Label>
                                                            <Input
                                                                name="longitude"
                                                                type="text"
                                                                placeholder="Enter longitude"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.longitude}
                                                            />
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
                        </Col>
                    </Row>
                </Container>

                <ToastContainer />
            </div>
        </React.Fragment>
    );
};

export default City;
