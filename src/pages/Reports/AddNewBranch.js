import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select"
import * as Yup from "yup";
import { Button, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, FormFeedback, Input, Label, Row, UncontrolledDropdown } from 'reactstrap'
import { addNewBranch, getCity } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";


const AddNewBranch = ({ isOpen, onClose, onApply }) => {

    const dispatch = useDispatch();

    const cities = useSelector(state => state.city?.city || []);


    useEffect(() => {
        dispatch(getCity());
    }, [dispatch]);

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
                .matches(/^\d*$/, "Phone number must be numeric"),
            address_1: Yup.string().required("Address 1 is required"),
            city: Yup.string().required("City is required"),
            state: Yup.string().required("State is required"),
            zip: Yup.string().required("Zip code is required"),
            country: Yup.string().required("Country is required"),
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
                "country": values?.country?.trim()
            }

            dispatch(addNewBranch(data));
            onClose()
            validation.resetForm()
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

    const clearFilters = () => {
        onClose();
        validation.resetForm()
    };


    const OnSave = () => {
        validation.submitForm()
    }
    return (
        <>
            {isOpen && (
                <div
                    className="modal-backdrop fade show --bs-sidebar-bg"
                    onClick={onClose}
                    style={{ zIndex: 1040 }}
                />
            )}

            <div
                className={`offcanvas offcanvas-end ${isOpen ? "show" : ""}`}
                style={{
                    visibility: isOpen ? "visible" : "hidden",
                    zIndex: 1045,
                    transition: "transform 0.3s ease-in-out",
                    width: "400px"
                }}
            >
                {/* Header */}
                <div className="offcanvas-header border-bottom py-3 px-4">
                    <h5 className="offcanvas-title fw-semibold">
                        <i className="fas fa-plus me-1"></i> Add New Branch
                    </h5>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>

                {/* Body */}
                <div className="offcanvas-body d-flex flex-column px-4 py-3 hide-scrollbar" style={{ height: "100%" }}>
                    <div className="flex-grow-1 overflow-y-auto overflow-x-hidden pe-1 px-1 hide-scrollbar">

                        <Row>
                            <Col lg="12">
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

                                        <Col md="12">
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
                                        <Col md="12">
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

                                        <Col md="12">
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
                                        <Col md="12">
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
                                        <Col md="12">
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
                                        <Col md="12">
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
                                        <Col md="12">
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
                                        <Col md="12">
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

                                        <Col md="12">
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


                                </Form>
                            </Col>
                        </Row>

                    </div>

                    {/* Footer */}
                    <div className="py-3 border-top d-flex justify-content-end gap-3 align-items-center">
                        <button className="btn btn-outline-secondary" onClick={clearFilters}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={OnSave}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddNewBranch;
