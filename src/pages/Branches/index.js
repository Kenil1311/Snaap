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

const Branches = () => {
    const navigate = useNavigate();

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
