import { useFormik } from 'formik';
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, FormFeedback, Input, Label, Row, UncontrolledDropdown } from 'reactstrap'
import * as Yup from "yup";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { isEmpty } from "lodash";

const branchesData = [
    {
        id: 1,
        branchName: "Mumbai Central Branch",
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


export default function EditBranches() {

    const navigate = useNavigate();

    document.title = "User List | SNAAP - React Admin & Dashboard Template";
    const location = useLocation();
    const initialValues = location.state || {};
    const [searchTerm, setSearchTerm] = useState("");

    // validation
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues || {
            branchName: "",
            area: "",
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
            area: Yup.string().required("Please enter area name"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            phone: Yup.string().required("Phone number is required"),
            address1: Yup.string().required("Address 1 is required"),
            city: Yup.string().required("City is required"),
            state: Yup.string().required("State is required"),
            zip: Yup.string().required("Zip code is required"),
            country: Yup.string().required("Country is required"),
        }),
        onSubmit: (values) => {
            console.log("edited branches", values);

            navigate('/branches', {
                state: {
                    ...values
                }
            });
        },
    });

    const Country = [
        { "name": "United States", "code": "US", "flag": "🇺🇸" },
        { "name": "India", "code": "IN", "flag": "🇮🇳" },
        { "name": "United Kingdom", "code": "GB", "flag": "🇬🇧" },
        { "name": "Canada", "code": "CA", "flag": "🇨🇦" },
        { "name": "Australia", "code": "AU", "flag": "🇦🇺" },
        { "name": "Germany", "code": "DE", "flag": "🇩🇪" },
        { "name": "France", "code": "FR", "flag": "🇫🇷" },
        { "name": "Italy", "code": "IT", "flag": "🇮🇹" },
        { "name": "Spain", "code": "ES", "flag": "🇪🇸" },
        { "name": "Brazil", "code": "BR", "flag": "🇧🇷" },
        { "name": "Japan", "code": "JP", "flag": "🇯🇵" },
        { "name": "South Korea", "code": "KR", "flag": "🇰🇷" },
        { "name": "China", "code": "CN", "flag": "🇨🇳" },
        { "name": "Russia", "code": "RU", "flag": "🇷🇺" },
        { "name": "Mexico", "code": "MX", "flag": "🇲🇽" },
        { "name": "South Africa", "code": "ZA", "flag": "🇿🇦" },
        { "name": "Saudi Arabia", "code": "SA", "flag": "🇸🇦" },
        { "name": "United Arab Emirates", "code": "AE", "flag": "🇦🇪" },
        { "name": "Argentina", "code": "AR", "flag": "🇦🇷" },
        { "name": "Singapore", "code": "SG", "flag": "🇸🇬" }
    ]

    const filteredCountry = Country.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Branches" breadcrumbItem="Edit Branches" />

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

                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label>Area Name</Label>
                                            <Input
                                                name="area"
                                                type="text"
                                                placeholder="Enter area name"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.area}
                                                invalid={validation.touched.area && !!validation.errors.area}
                                            />
                                            <FormFeedback>{validation.errors.area}</FormFeedback>
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
                                    <Col md="6">
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
                                    <Col md="6">
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
                                </Row>

                                <Row>

                                    <Col md="6">
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

                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label>Country</Label>
                                            <UncontrolledDropdown className="w-100">
                                                <DropdownToggle
                                                    caret
                                                    className={`form-control custom-dropdown text-start d-flex align-items-center justify-content-between ${validation.touched.country && validation.errors.country ? "is-invalid" : ""}`}
                                                >
                                                    <span className="flex-grow-1 text-truncate">
                                                        {Country?.find(country => country.name == validation.values.country)?.flag} {validation.values.country || "Select Country"}
                                                    </span>
                                                    <i className="mdi mdi-chevron-down"></i>
                                                </DropdownToggle>

                                                <DropdownMenu className="w-100 shadow-sm mt-1 border rounded p-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
                                                    <Input
                                                        type="text"
                                                        placeholder="Search country"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                        className="mb-2"
                                                    />

                                                    {filteredCountry.map((country) => (
                                                        <DropdownItem
                                                            key={country.name}
                                                            onClick={() => {
                                                                validation.setFieldValue("country", country.name);
                                                            }}
                                                            className={`text-dark  custom-dropdown-item rounded px-2 py-1 ${validation.values.country === country.name ? "custom-dropdown-item-active" : ""}`}
                                                            style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                                                        >
                                                            {country.flag}  {country.name}
                                                        </DropdownItem>
                                                    ))}

                                                    {filteredCountry.length === 0 && (
                                                        <DropdownItem disabled className="text-muted">No Country found</DropdownItem>
                                                    )}
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </div>
                                    </Col>

                                </Row>

                                <div className="d-flex justify-content-end gap-3">
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
