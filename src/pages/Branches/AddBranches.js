import { useFormik } from 'formik';
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, FormFeedback, Input, Label, Row, UncontrolledDropdown } from 'reactstrap'
import * as Yup from "yup";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Select from "react-select"
import { addNewBranch } from '../../store/Branch/actions';
import { useDispatch } from 'react-redux';



export default function AddBranches() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    document.title = "Add Branch | SNAAP - Radiology & Diagnostic Centers";


    // validation
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            area: "",
            email: "",
            phone: "",
            address_1: "",
            address_2: "",
            city: "",
            state: "",
            zip: "",
            country: "India",
            latitude: "",
            longitude: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please enter branch name"),
            area: Yup.string().required("Please enter area name"),
            email: Yup.string().email("Invalid email").required("Email is required").optional(),
            phone: Yup.string()
                .nullable()
                .matches(/^[-+]?\d*$/, "Phone number must be numeric"),
            address_1: Yup.string().required("Address 1 is required"),
            city: Yup.string().required("City is required"),
            state: Yup.string().required("State is required"),
            zip: Yup.number().typeError('Latitude must be a number').required("Zip code is required"),
            country: Yup.string().required("Country is required"),
            latitude: Yup.string()
                .nullable()
                .matches(/^[-+]?\d*\.?\d*$/, 'Latitude must be a number'),
            longitude: Yup.string()
                .nullable()
                .matches(/^[-+]?\d*\.?\d*$/, 'Longitude must be a number')
        }),
        onSubmit: (values) => {
            const data = {
                "name": values?.name?.trim(),
                "area": values?.area?.trim(),
                "phone": values?.phone?.trim(),
                "email": values?.email?.trim(),
                "address_1": values?.address_1?.trim(),
                "address_2": values?.address_2?.trim(),
                "city": values?.city?.trim(),
                "state": values?.state?.trim(),
                "zip": values?.zip?.trim(),
                "country": values?.country?.trim(),
                "latitude": values?.latitude,
                "longitude": values?.longitude
            }

            dispatch(addNewBranch(data));

            navigate('/branches');
        },
    });

    const Country = [
        { label: "🇺🇸 United States", value: "United States" },
        { label: "🇮🇳 India", value: "India" },
        { label: "🇬🇧 United Kingdom", value: "United Kingdom" },
        { label: "🇨🇦 Canada", value: "Canada" },
        { label: "🇦🇺 Australia", value: "Australia" },
        { label: "🇩🇪 Germany", value: "Germany" },
        { label: "🇫🇷 France", value: "France" },
        { label: "🇮🇹 Italy", value: "Italy" },
        { label: "🇪🇸 Spain", value: "Spain" },
        { label: "🇧🇷 Brazil", value: "Brazil" },
        { label: "🇯🇵 Japan", value: "Japan" },
        { label: "🇰🇷 South Korea", value: "South Korea" },
        { label: "🇨🇳 China", value: "China" },
        { label: "🇷🇺 Russia", value: "Russia" },
        { label: "🇲🇽 Mexico", value: "Mexico" },
        { label: "🇿🇦 South Africa", value: "South Africa" },
        { label: "🇸🇦 Saudi Arabia", value: "Saudi Arabia" },
        { label: "🇦🇪 United Arab Emirates", value: "United Arab Emirates" },
        { label: "🇦🇷 Argentina", value: "Argentina" },
        { label: "🇸🇬 Singapore", value: "Singapore" }
    ];


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Branches" breadcrumbItem="Add Branches" />

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
                                            <Select
                                                name="country"
                                                placeholder="Select Country"
                                                value={Country.find(opt => opt.value === validation.values.country)}
                                                onChange={(selectedOption) =>
                                                    validation.handleChange({
                                                        target: {
                                                            name: "country",
                                                            value: selectedOption.value
                                                        }
                                                    })
                                                }
                                                options={Country}
                                                classNamePrefix="custom-select"
                                                className="react-select-container"
                                            />
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
