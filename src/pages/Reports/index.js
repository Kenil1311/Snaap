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
import FilterSidebar from "../../components/Common/FilterSidebar";


const patientsData = [
    {
        id: 1,
        name: "Aarav Mehta",
        birthdate: "1985-06-12",
        gender: "Male",
        studyDate: "2025-07-15",
        modality: "MRI",
        description: "Brain MRI for persistent headaches",
        segment: "CBCT",
        age: 40,
        branch: "Mumbai Central Branch"
    },
    {
        id: 2,
        name: "Sneha Sharma",
        birthdate: "1992-01-25",
        gender: "Female",
        studyDate: "2025-06-18",
        modality: "CT",
        description: "CT scan for abdominal pain",
        segment: "OPG",
        age: 33,
        branch: "Delhi NCR Branch"
    },
    {
        id: 3,
        name: "Rahul Kapoor",
        birthdate: "1978-09-30",
        gender: "Male",
        studyDate: "2025-07-10",
        modality: "X-ray",
        description: "Chest X-ray for routine checkup",
        segment: "CBCT",
        age: 46,
        branch: "Hyderabad Hub"
    },
    {
        id: 4,
        name: "Neha Verma",
        birthdate: "1989-03-17",
        gender: "Female",
        studyDate: "2025-07-20",
        modality: "Ultrasound",
        description: "Ultrasound for pelvic scan",
        segment: "OPG",
        age: 36,
        branch: "Chennai Office"
    },
    {
        id: 5,
        name: "Karan Patel",
        birthdate: "1995-11-11",
        gender: "Male",
        studyDate: "2025-07-25",
        modality: "PET",
        description: "PET scan for metabolic activity",
        segment: "CBCT",
        age: 29,
        branch: "Ahmedabad Support Center"
    },
    {
        id: 6,
        name: "Priya Das",
        birthdate: "1990-05-05",
        gender: "Female",
        studyDate: "2025-07-11",
        modality: "Mammography",
        description: "Mammography screening",
        segment: "OPG",
        age: 35,
        branch: "Kolkata Branch"
    },
    {
        id: 7,
        name: "Manoj Nair",
        birthdate: "1982-08-08",
        gender: "Male",
        studyDate: "2025-07-14",
        modality: "MRI",
        description: "Knee MRI due to sports injury",
        segment: "CBCT",
        age: 42,
        branch: "Bangalore Tech Park"
    },
    {
        id: 8,
        name: "Isha Singh",
        birthdate: "1998-02-02",
        gender: "Female",
        studyDate: "2025-07-26",
        modality: "Ultrasound",
        description: "Routine pregnancy scan",
        segment: "OPG",
        age: 27,
        branch: "Lucknow Regional Center"
    },
    {
        id: 9,
        name: "Vikram Chauhan",
        birthdate: "1975-12-15",
        gender: "Male",
        studyDate: "2025-07-29",
        modality: "CT",
        description: "CT angiography for chest pain",
        segment: "CBCT",
        age: 49,
        branch: "Pune Corporate Office"
    },
    {
        id: 10,
        name: "Anjali Rao",
        birthdate: "1988-07-01",
        gender: "Female",
        studyDate: "2025-07-13",
        modality: "X-ray",
        description: "Spinal X-ray after minor accident",
        segment: "OPG",
        age: 37,
        branch: "Jaipur Office"
    }
];


const Reports = () => {
    document.title = "Snaap Reports | SNAAP - Radiology & Diagnostic Centers";

    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [initialValues, setInitialValues] = useState({
        id: "",
        name: "",
        birthdate: "",
        gender: "",
        studyDate: "",
        modality: "",
        description: "",
        segment: "",
        age: "",
        branch: ""
    })
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isOpenFillter, setIsOpenFillter] = useState(false);

    // validation
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues || {
            id: "",
            name: "",
            birthdate: "",
            gender: "",
            age: "",
            studyDate: "",
            modality: "",
            description: "",
            segment: "",
            branch: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please enter patient name"),
            birthdate: Yup.date().required("Please select birthdate"),
            gender: Yup.string().required("Please select gender"),
            age: Yup.number().typeError("Age must be a number").required("Please enter age"),
            studyDate: Yup.date().required("Please select study date"),
            modality: Yup.string().required("Please enter modality"),
            description: Yup.string().required("Please enter description"),
            segment: Yup.string().required("Please select segment"),
            branch: Yup.string().required("Please select branch"),
        }),
        onSubmit: (values) => {
            if (values.id) {
                // Edit patient
                updatePatient(values);
            } else {
                // Add patient
                addPatient({ ...values, id: Date.now() }); // Use unique ID
            }

            setModal(false); // Close modal after submit
        },
    });

    const [patients, setPatients] = useState(patientsData);

    const columns = useMemo(
        () => [
            {
                Header: "#",
                accessor: "id",
                Cell: ({ value }) => <strong>{value}</strong>,
            },
            {
                Header: "Branch",
                accessor: "branch",
                Cell: ({ value }) => <span>{value}</span>,
            },
            {
                Header: "Segment",
                accessor: "segment",
                Cell: ({ value }) => <span className={`badge ${value == "CBCT" ? 'bg-secondary' : 'bg-warning'} p-1`}>{value}</span>,
            },
            {
                Header: "Name",
                accessor: "name",
                Cell: ({ value }) => <span className="fw-semibold text-dark">{value}</span>,
            },
            {
                Header: "Age",
                accessor: "age",
                Cell: ({ value }) => <span>{value}</span>,
            },
            {
                Header: "Gender",
                accessor: "gender",
                Cell: ({ value }) => <span>{value}</span>,
            },
            {
                Header: "Study Date",
                accessor: "studyDate",
                Cell: ({ value }) => <span>{value}</span>,
            },
            {
                Header: "Modality",
                accessor: "modality",
                Cell: ({ value }) => <span>{value}</span>,
            },
            {
                Header: "Description",
                accessor: "description",
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


    const location = useLocation();
    const newData = location.state || {};

    useEffect(() => {
        // Check if newData is an object with at least one key
        const isDataValid = newData && Object.keys(newData).length > 0;

        if (isDataValid) {
            if (newData?.id) {
                updatePatient(newData);
            } else {
                addPatient({ ...newData, id: patients?.length + 1 });
            }
        }
    }, [location.state]);

    useEffect(() => {
        setIsEdit(false);
    }, [patients]);

    useEffect(() => {
        if (!isEmpty(patients) && !!isEdit) {
            setIsEdit(false);
        }
    }, [patients]);

    const addPatient = (newPatient) => {
        setPatients((prev) => [...prev, { ...newPatient, id: patients?.length + 1 }]);
    };

    const updatePatient = (updatedPatient) => {
        setPatients((prev) =>
            prev.map((patient) =>
                patient.id === updatedPatient.id ? updatedPatient : patient
            )
        );
    };

    const handleUserClick = (arg) => {
        const patient = arg;
        navigate('/edit-report', {
            state: {
                ...patient
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

    const onClickDelete = (patien) => {
        setSelectedPatient(patien?.id)
        setDeleteModal(true);
    };

    const handleDeleteUser = () => {
        const filteredPatients = patients.filter(patient => patient.id !== selectedPatient);
        setPatients(filteredPatients);
        onPaginationPageChange(1);
        setDeleteModal(false);
    };

    const handleToggle = () => {
        try {
            // window.location.href = '/add-patient';
            navigate('/add-report')
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
                    <Breadcrumbs title="Reports" breadcrumbItem="Reports" />
                    <Row>
                        <Col lg="12">

                            <Row>
                                <Col xl="12">
                                    <TableContainer
                                        columns={columns}
                                        data={patients}
                                        isGlobalFilter={true}
                                        isAddUserList={true}
                                        customPageSize={10}
                                        className="table align-middle datatable dt-responsive table-check nowrap"
                                        toggle={handleToggle}
                                        isOpenFillter={true}
                                        setIsOpenFillter={setIsOpenFillter}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <FilterSidebar
                        isOpen={isOpenFillter}
                        onClose={() => setIsOpenFillter(false)}
                        onApply={(selectedFilters) => console.log(selectedFilters)}
                    />

                </Container>
            </div >
        </React.Fragment >
    );
};

export default Reports;
