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
import { useDispatch, useSelector } from "react-redux";
import { addNewSegment, deleteSegment, getSegments, updateSegment } from "../../store/actions";
import { ToastContainer } from "react-toastify";


const dummySegments = [
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
    { label: "2D", value: "2D" },
    { label: "3D", value: "3D" }
]

const StatusGroup = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" }
];

const Sagment = () => {

    document.title = "Sagments | SNAAP - Radiology & Diagnostic Centers";

    const dispatch = useDispatch();

    const segments = useSelector(state => state.segment?.segments || []);
    const error = useSelector(state => state.segment?.error);

    const [selectedSegment, setSelectedSegment] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [segmentInitialValues, setSegmentInitialValues] = useState({
        id: null,
        type: optionGroup[0].value,
        name: "",
        description: "",
        isActive: true,
    });
    const [modal, setModal] = useState(false);

    // validation
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: segmentInitialValues || {
            id: null,
            type: optionGroup[0].value,
            name: "",
            description: "",
            isActive: true,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Segment name is required"),
            // createdDate: Yup.date().required("Created date is required"),
        }),
        onSubmit: (values) => {
            if (values.id) {
                dispatch(updateSegment(values));

                console.log("segment", values)

            } else {
                dispatch(addNewSegment(values))
            }
            setModal(false);
            validation.resetForm()
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
                Header: "Segment Type",
                accessor: "type",
                Cell: ({ value }) => (
                    <span>{value}</span>
                ),
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
                accessor: "createdByName",
                Cell: ({ value }) => <span>{value}</span>,
            },
            {
                Header: "Status",
                accessor: "isActive",
                Cell: ({ value }) => {
                    return (
                        <span
                            className={`badge bg-${(value == true || value == "true") ? "success" : "secondary"}`}
                        >
                            {(value == true || value == "true") ? "Active" : "Inactive"}
                        </span>
                    )
                },
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
        dispatch(getSegments());
    }, [dispatch]);

    useEffect(() => {
        setIsEdit(false);
    }, [segments]);

    useEffect(() => {
        if (!isEmpty(segments) && !!isEdit) {
            setIsEdit(false);
        }
    }, [segments]);



    const toggle = () => {
        if (modal) {
            // Closing the modal: Reset everything
            setIsEdit(false);
            setSelectedSegment(null);
            setSegmentInitialValues({
                id: null,
                type: optionGroup[0].value,
                name: "",
                description: "",
                isActive: true,
            });
        }

        if (!isEdit) {
            setSegmentInitialValues({
                id: null,
                type: optionGroup[0].value,
                name: "",
                description: "",
                isActive: true,
            });
        }
        setModal(!modal);
    };

    const handleUserClick = (segment) => {
        setIsEdit(true);
        setSegmentInitialValues({
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
        setSelectedSegment(sagment?.id)
        setDeleteModal(true);
    };

    const handleDeleteUser = () => {
        dispatch(deleteSegment(selectedSegment))
        // onPaginationPageChange(1);
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
                    <Breadcrumbs title="Segments" breadcrumbItem="Segments" />
                    <Row>
                        <Col lg="12">

                            <Row>
                                <Col xl="12">
                                    <TableContainer
                                        columns={columns}
                                        data={segments?.sort((a, b) => a.id - b.id)}
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
                                                            <label htmlFor="choices-single-default" className="form-label font-size-13 text-muted">Segment Type</label>
                                                            <Select
                                                                name="type"
                                                                value={{ value: validation.values.type, label: validation.values.type }}
                                                                onChange={(selectedOption) =>
                                                                    validation.handleChange({
                                                                        target: {
                                                                            name: "type",
                                                                            value: selectedOption.value
                                                                        }
                                                                    })
                                                                }
                                                                options={optionGroup}
                                                                classNamePrefix="custom-select"
                                                                className="react-select-container"
                                                            />
                                                        </div>

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



                                                <Row>
                                                    <Col md="6">
                                                        <div className="mb-3">
                                                            <Label>Status</Label>
                                                            <Select
                                                                name="isActive"
                                                                value={{ value: validation.values.isActive ? "Active" : "Inactive", label: validation.values.isActive ? "Active" : "Inactive" }}
                                                                onChange={(selectedOption) =>
                                                                    validation.handleChange({
                                                                        target: {
                                                                            name: "isActive",
                                                                            value: selectedOption.value == "Active" ? true : false
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

export default Sagment;
