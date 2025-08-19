import { useFormik } from "formik";
import React, { useState } from "react";
import Select from "react-select"
import * as Yup from "yup";
import { Button, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, FormFeedback, Input, Label, Row, UncontrolledDropdown } from 'reactstrap'
import { addNewPathology } from "../../store/actions";
import { useDispatch } from "react-redux";


const StatusData = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" }
];

const AddNewPathology = ({ isOpen, onClose, onApply }) => {


    const dispatch = useDispatch();

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            desciption: "",
            createdBy: "Admin",
            isActive: true,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please enter sagment name")
        }),
        onSubmit: (values) => {
            dispatch(addNewPathology(values))
            onClose()
            validation.resetForm()
        },
    });


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
                        <i className="fas fa-plus me-1"></i> Add New Pathology
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
                                                <Label>Pathology Name</Label>
                                                <Input
                                                    name="name"
                                                    type="text"
                                                    placeholder="Enter name"
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
                                                    name="desciption"
                                                    type="textarea"
                                                    rows="3"
                                                    placeholder="Enter desciption"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.desciption}
                                                    invalid={validation.touched.desciption && !!validation.errors.desciption}
                                                />
                                                <FormFeedback>{validation.errors.desciption}</FormFeedback>
                                            </div>
                                        </Col>

                                        <Col md="12">
                                            <div className="mb-3">
                                                <Label>Status</Label>
                                                <Select
                                                    name="type"
                                                    placeholder="Select Status"
                                                    value={{ value: validation.values.isActive ? "Active" : "Inactive", label: validation.values.isActive ? "Active" : "Inactive" }}
                                                    onChange={(selectedOption) =>
                                                        validation.handleChange({
                                                            target: {
                                                                name: "isActive",
                                                                value: selectedOption.value == "Active" ? true : false
                                                            }
                                                        })
                                                    }
                                                    options={StatusData}
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

export default AddNewPathology;
