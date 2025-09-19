import { useFormik } from 'formik';
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, FormFeedback, Input, Label, Row, UncontrolledDropdown } from 'reactstrap'
import * as Yup from "yup";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { isEmpty } from "lodash";
import { updateBranch } from '../../store/Branch/actions';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select"
import { getCity } from '../../store/actions';

const StatusGroup = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" }
];

export default function EditBranches() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    document.title = "Edit Branch | SNAAP - Radiology & Diagnostic Centers";

    const cities = useSelector(state => state.city?.city || []);


    useEffect(() => {
        dispatch(getCity());
    }, [dispatch]);

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

    const location = useLocation();
    const initialValues = location.state || {};
    const [searchTerm, setSearchTerm] = useState("");

    // validation
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues || {
            name: "",
            area: "",
            email: "",
            phone: "",
            address_1: "",
            address_2: "",
            city: "",
            state: "",
            zip: "",
            isactive: "",
            country: "",
            latitude: "",
            longitude: "",
        },
        validationSchema: Yup.object({
            // name: Yup.string().required("Please enter branch name"),
            // area: Yup.string().required("Please enter area name"),
            // email: Yup.string().email("Invalid email").required("Email is required").optional(),
            // phone: Yup.string()
            //     .nullable()
            //     .matches(/^[-+]?\d*$/, "Phone number must be numeric"),
            // address_1: Yup.string().required("Address 1 is required"),
            // city: Yup.string().required("City is required"),
            // state: Yup.string().required("State is required"),
            // zip: Yup.string().required("Zip code is required"),
            // country: Yup.string().required("Country is required"),
            // latitude: Yup.string()
            //     .nullable()
            //     .matches(/^[-+]?\d*\.?\d*$/, 'Latitude must be a number'),
            // longitude: Yup.string()
            //     .nullable()
            //     .matches(/^[-+]?\d*\.?\d*$/, 'Longitude must be a number')
        }),
        onSubmit: (values) => {
            const data = {
                "id": values?.id,
                "name": values?.name?.trim(),
                "area": values?.area?.trim(),
                "phone": values?.phone?.trim(),
                "email": values?.email?.trim(),
                "address_1": values?.address_1?.trim(),
                "address_2": values?.address_2?.trim(),
                "city": values?.city?.trim(),
                "state": values?.state?.trim(),
                "zip": values?.zip?.trim(),
                "isActive": values?.isactive,
                "country": values?.country?.trim(),
                "latitude": values?.latitude,
                "longitude": values?.longitude,

            }

            dispatch(updateBranch(data));

            navigate('/branches');
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

    const findCityByValue = (valueToFind) => {
        for (const group of cityOptions) {
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
                                                name="name"
                                                type="text"
                                                placeholder="Enter branch name"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.name}
                                                invalid={validation.touched.name && !!validation.errors.name}
                                            />
                                            <FormFeedback>{validation.errors.name}</FormFeedback>
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
                                                name="address_1"
                                                type="text"
                                                placeholder="Enter address line 1"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.address_1}
                                                invalid={validation.touched.address_1 && !!validation.errors.address_1}
                                            />
                                            <FormFeedback>{validation.errors.address_1}</FormFeedback>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label>Address 2</Label>
                                            <Input
                                                name="address_2"
                                                type="text"
                                                placeholder="Enter address line 2"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.address_2}
                                            />
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
                                                        value={cityOptions.find(opt => opt.value === validation.values.city)}
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


                                            {validation.touched.city && validation.errors.city && (
                                                <div className="invalid-feedback d-block">
                                                    {validation.errors.city}
                                                </div>
                                            )}
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
                                            <Label>Latitude</Label>
                                            <Input
                                                name="latitude"
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
                                                name="longitude"
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

                                    <Col md="4">
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

                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label>Status</Label>
                                            <Select
                                                name="isActive"
                                                value={{ value: validation.values.isactive == true ? "Active" : "Inactive", label: validation.values.isactive == true ? "Active" : "Inactive" }}
                                                onChange={(selectedOption) =>
                                                    validation.handleChange({
                                                        target: {
                                                            name: "isactive",
                                                            value: selectedOption.value == "Active" ? true : false
                                                        }
                                                    })
                                                }
                                                options={StatusGroup}
                                                classNamePrefix="custom-select"
                                                className="react-select-container"
                                            />
                                            <FormFeedback>{validation.errors.isactive}</FormFeedback>
                                        </div>
                                    </Col>
                                </Row>

                                <div className="d-flex justify-content-end gap-3 mt-3">
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
