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


const branchesData = [
    {
        id: 1,
        branchName: "Mumbai Central Branch",
        area: "Churchgate",
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
        area: "Tech Park",
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

const Branches = () => {
    const navigate = useNavigate();

    document.title = "Branches | SNAAP - Radiology & Diagnostic Centers";

    const [contact, setContact] = useState();
    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [initialValues, setInitialValues] = useState({
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
    })
    const [selectedBranch, setSelectedBranch] = useState(null);


    // validation
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues || {
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
    const location = useLocation();
    const newData = location.state || {};

    useEffect(() => {

        console.log("in branch list data", newData);

        // Check if newData is an object with at least one key
        const isDataValid = newData && Object.keys(newData).length > 0;

        if (isDataValid) {
            if (newData?.id) {
                console.log("data valid in update");
                updateBranch(newData);
            } else {
                console.log("data valid in add");
                addBranch({ ...newData, id: branches?.length + 1 });
            }
        }
    }, [location.state]);
    console.log("branchesdata", branchesData);

    const [branches, setBranches] = useState(branchesData);

    const columns = useMemo(
        () => [
            {
                Header: "#",
                accessor: "id",
                Cell: ({ value }) => <strong>{value}</strong>,
            },
            {
                Header: "Branch Name",
                accessor: "branchName",
                Cell: ({ value }) => (
                    <span className="fw-semibold text-dark">{value}</span>
                ),
            },
            {
                Header: "Area Name",
                accessor: "area",
                Cell: ({ value }) => (
                    <span className="fw-semibold text-muted">{value}</span>
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
                Header: "Email",
                accessor: "email",
                Cell: ({ value }) => (
                    <a href={`mailto:${value}`} className="text-muted">
                        {value}
                    </a>
                ),
            },
            {
                Header: "Address Line 1",
                accessor: "address1",
                Cell: ({ value }) => <span>{value}</span>,
            },
            {
                Header: "Address Line 2",
                accessor: "address2",
                Cell: ({ value }) => <span>{value}</span>,
            },
            {
                Header: "City",
                accessor: "city",
                Cell: ({ value }) => <span>{value}</span>,
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
                Header: "Latitude",
                accessor: "latitude",
                Cell: ({ value }) => (
                    <code className="text-success small">{value}</code>
                ),
            },
            {
                Header: "Longitude",
                accessor: "longitude",
                Cell: ({ value }) => (
                    <code className="text-success small">{value}</code>
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
                                    style={{ color: "green", fontSize: "20px" }}
                                ></i>
                            </button>
                            <button
                                className="btn btn-sm"
                                onClick={() => onClickDelete(row)}
                            >
                                <i className="mdi mdi-delete-outline"
                                style={{ color: "red", fontSize: "20px" }}></i>
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
    }, [branches]);

    useEffect(() => {
        if (!isEmpty(branches) && !!isEdit) {
            setContact(branches);
            setIsEdit(false);
        }
    }, [branches]);

    const addBranch = (newBranch) => {
        console.log("add branch data", newBranch);

        setBranches((prev) => [...prev, { ...newBranch, id: branches?.length + 1 }]);
    };

    const updateBranch = (updatedBranch) => {
        setBranches((prev) =>
            prev.map((branch) =>
                branch.id === updatedBranch.id ? updatedBranch : branch
            )
        );
    };

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
        const filteredBranches = branches.filter(branch => branch.id !== selectedBranch);
        setBranches(filteredBranches);
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
                    <Breadcrumbs title="Branches" breadcrumbItem="Branches" />
                    <Row>
                        <Col lg="12">

                            <Row>
                                <Col xl="12">
                                    <TableContainer
                                        columns={columns}
                                        data={branches}
                                        isGlobalFilter={true}
                                        isAddUserList={true}
                                        customPageSize={10}
                                        className="table align-middle datatable dt-responsive table-check nowrap"
                                        toggle={handleToggle}
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
            </div>
        </React.Fragment>
    );
};

export default Branches;
