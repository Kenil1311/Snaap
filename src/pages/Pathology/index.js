import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
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
    UncontrolledTooltip,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    NavLink,
    Button,
} from "reactstrap";
import Select from "react-select"
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import DeleteModal from "../../components/Common/DeleteModal";
import { isEmpty } from "lodash";
import TextField from "@mui/material/TextField";


const dummyPathologies = [
    {
        id: 1,
        name: "Cancer",
        description: "Description for Cancer",
        createdBy: "Admin",
        createdDate: new Date().getTime(),
        status: "Active",
    },
    {
        id: 2,
        name: "Implant",
        description: "Description for Implant",
        createdBy: "Admin",
        createdDate: new Date().getTime(),
        status: "Inactive",
    }
];


const Pathology = () => {
    document.title = "Pathology | SNAAP - Radiology & Diagnostic Centers";

    const [pathologies, setPathologies] = useState(dummyPathologies);
    const [selectedPathology, setSelectedPathology] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [pathologyInitialValues, setPathologyInitialValues] = useState({
        id: null,
        name: "",
        description: "",
        createdBy: "Admin",
        createdDate: new Date().getTime(),
        status: "Active",
    });
    const [modal, setModal] = useState(false);

    // validation
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: pathologyInitialValues || {
            id: null,
            name: "",
            description: "",
            createdBy: "Admin",
            createdDate: new Date().getTime(),
            status: "Active",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Pathology name is required"),
            // createdDate: Yup.date().required("Created date is required"),
        }),
        onSubmit: (values) => {
            if (values.id) {
                updatePathology(values);
            } else {
                addPathology({ ...values, id: pathologies?.length + 1 });
            }
            setModal(false);
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
                Header: "Pathology Name",
                accessor: "name",
                Cell: ({ value }) => (
                    <span className="fw-semibold text-dark">{value}</span>
                ),
            },
            {
                Header: "Description",
                accessor: "description",
                Cell: ({ value }) => <span>{value}</span>,
            },
            {
                Header: "Created By",
                accessor: "createdBy",
                Cell: ({ value }) => <span>{value}</span>,
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: ({ value }) => (
                    <span
                        className={`badge bg-${value === "Active" ? "success" : "secondary"}`}
                    >
                        {value}
                    </span>
                ),
            },
            {
                Header: "Created At",
                accessor: "createdDate",
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
                                onClick={() => handleUserClick(row)}
                            >
                                <i
                                    className="mdi mdi-pencil-outline"
                                    style={{ fontSize: "20px" }}
                                ></i>
                            </button>
                            <button
                                className="btn btn-sm"
                                onClick={() => onClickDelete(row)}
                            >
                                <i className="mdi mdi-delete-outline"
                                    style={{ fontSize: "20px" }}></i>
                            </button>
                        </div>
                    );
                },
            },
        ],
        []
    );


    useEffect(() => {
        setIsEdit(false);
    }, [pathologies]);

    useEffect(() => {
        if (!isEmpty(pathologies) && !!isEdit) {
            setIsEdit(false);
        }
    }, [pathologies]);

    const addPathology = (newPathology) => {
        setPathologies((prev) => [...prev, newPathology]);
    };

    const updatePathology = (updatedPathology) => {
        setPathologies((prev) =>
            prev.map((seg) => (seg.id === updatedPathology.id ? updatedPathology : seg))
        );
    };


    const toggle = () => {
        if (modal) {
            // Closing the modal: Reset everything
            setIsEdit(false);
            setSelectedPathology(null);
            setPathologyInitialValues({
                id: null,
                name: "",
                description: "",
                createdBy: "Admin",
                createdDate: new Date().getTime(),
                status: "Active",
            });
        }

        if (!isEdit) {
            setPathologyInitialValues({
                id: null,
                name: "",
                description: "",
                createdBy: "Admin",
                createdDate: new Date().getTime(),
                status: "Active",
            });
        }
        setModal(!modal);
    };

    const handleUserClick = (segment) => {
        setIsEdit(true);
        setPathologyInitialValues({
            ...segment
        });
        setModal(true);
    };

    var node = useRef();
    const onPaginationPageChange = (page) => {
        if (
            node &&
            node.current &&
            node.current.props &&
            node.current.props.pagination &&
            node.current.props.pagination.options
        ) {
            node.current.props.pagination.options.onPageChange(page);
        }
    };

    //delete customer
    const [deleteModal, setDeleteModal] = useState(false);

    const onClickDelete = (sagment) => {
        setSelectedPathology(sagment?.id)
        setDeleteModal(true);
    };

    const handleDeleteUser = () => {
        const filteredpathologies = pathologies.filter(sagment => sagment.id !== selectedPathology);
        setPathologies(filteredpathologies);
        onPaginationPageChange(1);
        setDeleteModal(false);
    };

    const keyField = "id";

    return (
        <React.Fragment>
            <DeleteModal
                show={deleteModal}
                onDeleteClick={handleDeleteUser}
                onCloseClick={() => setDeleteModal(false)}
            />
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Pathology" breadcrumbItem="Pathology" />
                    <Row>
                        <Col lg="12">

                            <Row>
                                <Col xl="12">
                                    <TableContainer
                                        columns={columns}
                                        data={pathologies}
                                        isGlobalFilter={true}
                                        isAddUserList={true}
                                        customPageSize={10}
                                        className="table align-middle datatable dt-responsive table-check nowrap"
                                        toggle={toggle}
                                    />

                                    <Modal isOpen={modal} toggle={toggle} centered>
                                        <ModalHeader toggle={toggle}>
                                            {isEdit ? "Edit Pathology" : "Add Pathology"}
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
                                                            <Label>Pathology Name</Label>

                                                            <Input
                                                                name="name"
                                                                type="text"
                                                                placeholder="Enter segment name"
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
                                                            <Label>Description</Label>
                                                            <Input
                                                                name="description"
                                                                type="textarea"
                                                                rows="3"
                                                                placeholder="Enter description"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.description}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>

                                                {/* <Row>
                                                    <Col md="6">
                                                        <div className="mb-3">
                                                            <Label>Created By</Label>
                                                            <Input
                                                                name="createdBy"
                                                                type="text"
                                                                placeholder="Enter creator name"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.createdBy}
                                                                invalid={validation.touched.createdBy && !!validation.errors.createdBy}
                                                            />
                                                            <FormFeedback>{validation.errors.createdBy}</FormFeedback>
                                                        </div>
                                                    </Col>

                                                    <Col md="6">
                                                        <div className="mb-3">
                                                            <Label>Created Date</Label>
                                                            <Input
                                                                name="createdDate"
                                                                type="date"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.createdDate}
                                                                invalid={validation.touched.createdDate && !!validation.errors.createdDate}
                                                            />
                                                            <FormFeedback>{validation.errors.createdDate}</FormFeedback>
                                                        </div>
                                                    </Col>
                                                </Row> */}

                                                <Row>
                                                    <Col md="6">
                                                        <div className="mb-3">
                                                            <Label>Status</Label>
                                                            <Input
                                                                name="status"
                                                                type="select"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.status}
                                                                invalid={validation.touched.status && !!validation.errors.status}
                                                            >
                                                                <option value="Active">Active</option>
                                                                <option value="Inactive">Inactive</option>
                                                            </Input>
                                                            <FormFeedback>{validation.errors.status}</FormFeedback>
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
            </div>
        </React.Fragment>
    );
};

export default Pathology;
