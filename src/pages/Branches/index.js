import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { deleteBranch, getBranches } from "../../store/Branch/actions";
import { toast, ToastContainer } from "react-toastify";
import UploadFileModel from "../../components/Common/UploadFileModel";
import { getCity } from "../../store/actions";



const Branches = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const branches = useSelector(state => state.branch?.branches || []);
    const cities = useSelector(state => state.city?.city || []);

    const error = useSelector(state => state.branch?.error);

    useEffect(() => {
        dispatch(getBranches());
        dispatch(getCity())
    }, [dispatch]);


    console.log("branches", branches)
    document.title = "Branches | SNAAP - Radiology & Diagnostic Centers";

    const [contact, setContact] = useState();
    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [initialValues, setInitialValues] = useState({
        branchName: "",
        area: "",
        phone: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        latitude: "",
        longitude: "",
    })
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [isOpenImportModel, setIsOpenImportModel] = useState(false)

    // validation
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues || {
            branchName: "",
            area: "",
            phone: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            latitude: "",
            longitude: "",
        },
        validationSchema: Yup.object({
            branchName: Yup.string().required("Please enter branch name"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            phone: Yup.string().required("Phone number is required"),
            address1: Yup.string().required("Address 1 is required"),
            city: Yup.string().required("City is required"),
            state: Yup.string().required("State is required"),
            zip: Yup.string().required("Zip code is required"),
            country: Yup.string().required("Country is required"),
        }),
        onSubmit: (values) => {
            if (values.id) {
                // Edit
                updateBranch(values);
            } else {
                // Add
                addBranch({ ...values, id: Date.now() }); // or use UUID
            }

            setModal(false)
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
                Header: "Branch Name",
                accessor: "name",
                Cell: ({ value }) => (
                    <span className="text-muted tex">{value}</span>
                ),
            },
            {
                Header: "Area Name",
                accessor: "area",
                Cell: ({ value }) => (
                    <span className="fw-semibold text-dark">{value}</span>
                ),
            },
            {
                Header: "Phone",
                accessor: "phone",
                Cell: ({ value }) => (
                    <a href={`tel:${value}`} className="text-primary">
                        {value}
                    </a>
                ),
            },
            {
                Header: "Address",
                accessor: "address",
                Cell: ({ row }) => {
                    const { address_1, address_2 } = row.original;
                    return (
                        <div>
                            <span>{address_1}</span>
                            <span>{address_2}</span>
                        </div>
                    );
                },
            },
            {
                Header: "City",
                accessor: "city",
                Cell: ({ value }) => <span>{cities?.find(city => city?.id == value)?.name}</span>,
            },
            {
                Header: "State",
                accessor: "state",
                Cell: ({ value }) => <span>{value}</span>,
            },
            {
                Header: "ZIP Code",
                accessor: "zip",
                Cell: ({ value }) => <span>{value}</span>,
            },
            {
                Header: "Country",
                accessor: "country",
                Cell: ({ value }) => <span>{value}</span>,
            },
            {
                Header: "Status",
                accessor: "isactive",
                Cell: ({ value }) => <span
                    className={`badge bg-${(value == true || value == "true") ? "success" : "secondary"}`}
                >
                    {(value == true || value == "true") ? "Active" : "Inactive"}
                </span>,
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
        [cities]
    );

    useEffect(() => {
        setIsEdit(false);
    }, [branches]);

    useEffect(() => {
        if (!isEmpty(branches) && !!isEdit) {
            setContact(branches);
            setIsEdit(false);
        }
    }, [branches]);


    const toggle = () => {
        if (modal) {
            // Closing the modal: Reset everything
            setIsEdit(false);
            setSelectedBranch(null);
            setInitialValues({
                branchName: "",
                email: "",
                phone: "",
                address1: "",
                address2: "",
                city: "",
                state: "",
                zip: "",
                country: "",
                latitude: "",
                longitude: "",
            });
        }

        if (!isEdit) {
            validation.resetForm()
        }
        setModal(!modal);
    };

    const handleUserClick = (arg) => {
        const branches = arg;
        navigate('/edit-branches', {
            state: {
                ...branches
            }
        });
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

    const onClickDelete = (branch) => {
        setSelectedBranch(branch?.id)
        setDeleteModal(true);
    };

    const handleDeleteUser = () => {
        // const filteredBranches = branches.filter(branch => branch.id !== selectedBranch);
        // setBranches(filteredBranches);
        dispatch(deleteBranch(selectedBranch))
        onPaginationPageChange(1);
        setDeleteModal(false);
    };

    const handleToggle = () => {
        try {
            navigate('/add-branches')
        } catch (e) {
            console.error('Navigation error:', e);
        }
    };

    const onImport = () => {
        setIsOpenImportModel(true)
    }

    const keyField = "id";

    return (
        <React.Fragment>
            <DeleteModal
                show={deleteModal}
                onDeleteClick={handleDeleteUser}
                onCloseClick={() => setDeleteModal(false)}
            />

            <UploadFileModel
                show={isOpenImportModel}
                onClose={() => setIsOpenImportModel(false)}
                type={"branch"}
            />

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Branches" breadcrumbItem="Branches" />
                    <Row>
                        <Col lg="12">

                            <Row>
                                <Col xl="12">
                                    <TableContainer
                                        columns={columns}
                                        data={branches.sort((a, b) => a.id - b.id)}
                                        isGlobalFilter={true}
                                        isAddUserList={true}
                                        customPageSize={10}
                                        className="table align-middle datatable dt-responsive table-check nowrap"
                                        toggle={handleToggle}
                                        onImport={onImport}
                                    />

                                    <Modal isOpen={modal} toggle={toggle} size="lg" centered>
                                        <ModalHeader toggle={toggle}>
                                            {isEdit ? "Edit Branch" : "Add Branch"}
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
                                                            <Label>Branch Name</Label>
                                                            <Input
                                                                name="branchName"
                                                                type="text"
                                                                placeholder="Enter branch name"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.branchName}
                                                                invalid={validation.touched.branchName && !!validation.errors.branchName}
                                                            />
                                                            <FormFeedback>{validation.errors.branchName}</FormFeedback>
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col md="6">
                                                        <div className="mb-3">
                                                            <Label>Phone</Label>
                                                            <Input
                                                                name="phone"
                                                                type="text"
                                                                placeholder="Enter phone"
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
                                                                placeholder="Enter email"
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
                                                            <Label>Address 1</Label>
                                                            <Input
                                                                name="address1"
                                                                type="text"
                                                                placeholder="Enter address line 1"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.address1}
                                                                invalid={validation.touched.address1 && !!validation.errors.address1}
                                                            />
                                                            <FormFeedback>{validation.errors.address1}</FormFeedback>
                                                        </div>
                                                    </Col>
                                                    <Col md="6">
                                                        <div className="mb-3">
                                                            <Label>Address 2</Label>
                                                            <Input
                                                                name="address2"
                                                                type="text"
                                                                placeholder="Enter address line 2"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.address2}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col md="4">
                                                        <div className="mb-3">
                                                            <Label>City</Label>
                                                            <Input
                                                                name="city"
                                                                type="text"
                                                                placeholder="Enter city"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.city}
                                                                invalid={validation.touched.city && !!validation.errors.city}
                                                            />
                                                            <FormFeedback>{validation.errors.city}</FormFeedback>
                                                        </div>
                                                    </Col>
                                                    <Col md="4">
                                                        <div className="mb-3">
                                                            <Label>State</Label>
                                                            <Input
                                                                name="state"
                                                                type="text"
                                                                placeholder="Enter state"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.state}
                                                                invalid={validation.touched.state && !!validation.errors.state}
                                                            />
                                                            <FormFeedback>{validation.errors.state}</FormFeedback>
                                                        </div>
                                                    </Col>


                                                    <Col md="4">
                                                        <div className="mb-3">
                                                            <Label>Zip</Label>
                                                            <Input
                                                                name="zip"
                                                                type="text"
                                                                placeholder="Enter zip code"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.zip}
                                                                invalid={validation.touched.zip && !!validation.errors.zip}
                                                            />
                                                            <FormFeedback>{validation.errors.zip}</FormFeedback>
                                                        </div>
                                                    </Col>


                                                </Row>

                                                <Row>
                                                    <Col md="4">
                                                        <div className="mb-3">
                                                            <Label>Country</Label>
                                                            <Input
                                                                name="country"
                                                                type="text"
                                                                placeholder="Enter country"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.country}
                                                                invalid={validation.touched.country && !!validation.errors.country}
                                                            />
                                                            <FormFeedback>{validation.errors.country}</FormFeedback>
                                                        </div>
                                                    </Col>

                                                    <Col md="4">
                                                        <div className="mb-3">
                                                            <Label>Latitude</Label>
                                                            <Input
                                                                name="lat"
                                                                type="text"
                                                                placeholder="Enter latitude"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.latitude}
                                                                invalid={validation.touched.latitude && !!validation.errors.latitude}
                                                            />
                                                            <FormFeedback>{validation.errors.latitude}</FormFeedback>
                                                        </div>
                                                    </Col>
                                                    <Col md="4">
                                                        <div className="mb-3">
                                                            <Label>Longitude</Label>
                                                            <Input
                                                                name="long"
                                                                type="text"
                                                                placeholder="Enter longitude"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.longitude}
                                                                invalid={validation.touched.longitude && !!validation.errors.longitude}
                                                            />
                                                            <FormFeedback>{validation.errors.longitude}</FormFeedback>
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

                <ToastContainer
                    className={"mt-2"}
                />

            </div>
        </React.Fragment>
    );
};

export default Branches;
