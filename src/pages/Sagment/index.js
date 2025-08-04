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

import * as Yup from "yup";
import { useFormik } from "formik";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import DeleteModal from "../../components/Common/DeleteModal";
import { isEmpty } from "lodash";


const dummySegments = [
    {
        id: 1,
        name: "CBCT",
        description: "",
        createdBy: "Admin",
        createdAt: "2024-01-10T10:00:00Z",
        // updatedAt: "2024-06-10T12:30:00Z",
        status: "Active",
    },
    {
        id: 2,
        name: "OPG",
        description: "",
        createdBy: "Admin",
        createdAt: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Inactive",
    },
];

const Sagment = () => {
    document.title = "Sagments | SNAAP - Radiology & Diagnostic Centers";

    const [segments, setSegments] = useState(dummySegments);
    const [selectedSegment, setSelectedSegment] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [segmentInitialValues, setSegmentInitialValues] = useState({
        id: null,
        name: "",
        description: "",
        createdBy: "",
        createdDate: new Date().toISOString().split("T")[0],
        status: "Active",
    });
    const [modal, setModal] = useState(false);

    // validation
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: segmentInitialValues || {
            id: null,
            name: "",
            description: "",
            createdBy: "",
            createdDate: new Date().toISOString().split("T")[0],
            status: "Active",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Segment name is required"),
            createdDate: Yup.date().required("Created date is required"),
        }),
        onSubmit: (values) => {
            console.log("values", values)
            if (values.id) {
                updateSegment(values);
            } else {
                addSegment({ ...values, id: segments?.length + 1 });
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
                Header: "Segment Name",
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
                accessor: "createdAt",
                Cell: ({ value }) => (
                    <span className="text-muted small">
                        {new Date(value).toLocaleString("en-IN")}
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
    }, [segments]);

    useEffect(() => {
        if (!isEmpty(segments) && !!isEdit) {
            setIsEdit(false);
        }
    }, [segments]);

    const addSegment = (newSegment) => {
        setSegments((prev) => [...prev, newSegment]);
    };

    const updateSegment = (updatedSegment) => {
        setSegments((prev) =>
            prev.map((seg) => (seg.id === updatedSegment.id ? updatedSegment : seg))
        );
    };


    const toggle = () => {
        if (modal) {
            // Closing the modal: Reset everything
            setIsEdit(false);
            setSelectedSegment(null);
            setSegmentInitialValues({
                id: null,
                name: "",
                description: "",
                createdBy: "",
                createdDate: new Date().toISOString().split("T")[0],
                status: "Active",
            });
        }
        setModal(!modal);
    };

    const handleUserClick = (segment) => {
        setIsEdit(true);
        setSegmentInitialValues({
            ...segment,
            createdDate: new Date(segment.createdAt).toISOString().split("T")[0],
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
        setSelectedSegment(sagment?.id)
        setDeleteModal(true);
    };

    const handleDeleteUser = () => {
        const filteredsegments = segments.filter(sagment => sagment.id !== selectedSegment);
        setSegments(filteredsegments);
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
                    <Breadcrumbs title="Sagments" breadcrumbItem="Sagments" />
                    <Row>
                        <Col lg="12">

                            <Row>
                                <Col xl="12">
                                    <TableContainer
                                        columns={columns}
                                        data={segments}
                                        isGlobalFilter={true}
                                        isAddUserList={true}
                                        customPageSize={10}
                                        className="table align-middle datatable dt-responsive table-check nowrap"
                                        toggle={toggle}
                                    />

                                    <Modal isOpen={modal} toggle={toggle} centered>
                                        <ModalHeader toggle={toggle}>
                                            {isEdit ? "Edit Segment" : "Add Segment"}
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
                                                            <Label>Segment Name</Label>
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

export default Sagment;
