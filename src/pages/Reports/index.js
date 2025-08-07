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
import { isEmpty, set } from "lodash";
import FilterSidebar from "../../components/Common/FilterSidebar";
import Sagment from "../Sagment";


const patientsData = [
    {
        id: 1,
        name: "Aarav Mehta",
        birthdate: "1985-06-12",
        gender: "Male",
        studyDate: "2025-07-15",
        modality: "MRI",
        description: "Brain MRI for persistent headaches",
        segment: [{ value: "CBCT OF TMJ RIGHT/LEFT (8 X 8)", label: "CBCT OF TMJ RIGHT/LEFT (8 X 8)" }, { value: "CBCT OF TMJ RIGHT/LEFT (8 X 8)", label: "CBCT OF TMJ RIGHT/LEFT (8 X 8)" }],
        age: 40,
        branch: "Lal Darwaja",
        phone: "+91 93131 51637",
        email: "aarav.mehta@example.com",
        pathology: [{ value: "Cancer", label: "Cancer" }]
    },
    {
        id: 2,
        name: "Sneha Sharma",
        birthdate: "1992-01-25",
        gender: "Female",
        studyDate: "2025-06-18",
        modality: "CT",
        description: "CT scan for abdominal pain",
        segment: [{ value: "HAND WRIST RADIOGRAPH", label: "HAND WRIST RADIOGRAPH" }],
        age: 33,
        branch: "Athwa",
        phone: "+91 94296 77150",
        email: "sneha.sharma@example.com",
        pathology: [{ value: "Implant", label: "Implant" }]
    },
    {
        id: 3,
        name: "Rahul Kapoor",
        birthdate: "1978-09-30",
        gender: "Male",
        studyDate: "2025-07-10",
        modality: "X-ray",
        description: "Chest X-ray for routine checkup",
        segment: [{ value: "CBCT OF MANDIBLE (FULL ARCH. 10 X 5, 8 X 8)", label: "CBCT OF MANDIBLE (FULL ARCH. 10 X 5, 8 X 8)" }],
        age: 46,
        branch: "Adajan",
        phone: "+91 63527 66065",
        email: "rahul.kapoor@example.com",
        pathology: [{ value: "Cancer", label: "Cancer" }]
    },
    {
        id: 4,
        name: "Neha Verma",
        birthdate: "1989-03-17",
        gender: "Female",
        studyDate: "2025-07-20",
        modality: "Ultrasound",
        description: "Ultrasound for pelvic scan",
        segment: [{ value: "PA MANDIBLE/SKULL VIEW", label: "PA MANDIBLE/SKULL VIEW" }],
        age: 36,
        branch: "Althan",
        phone: "",
        email: "neha.verma@example.com",
        pathology: [{ value: "Implant", label: "Implant" }]
    },
    {
        id: 5,
        name: "Karan Patel",
        birthdate: "1995-11-11",
        gender: "Male",
        studyDate: "2025-07-25",
        modality: "PET",
        description: "PET scan for metabolic activity",
        segment: [{ value: "CBCT OF BOTH JAWS (FULL ARCH. 10 X 10)", label: "CBCT OF BOTH JAWS (FULL ARCH. 10 X 10)" }],
        age: 29,
        branch: "Vesu",
        phone: "+91 63527 57631",
        email: "karan.patel@example.com",
        pathology: [{ value: "Implant", label: "Implant" }]
    }
];

const segments2D = [
    { id: 1, type: "2D", name: "OPG", description: "", createdBy: "Admin", createdDate: "2024-01-10T10:00:00Z", status: "Active" },
    { id: 2, type: "2D", name: "WATER VIEW", description: "", createdBy: "Admin", createdDate: "2023-11-05T14:20:00Z", status: "Inactive" },
    { id: 3, type: "2D", name: "REVERSE TOWN VIEW", description: "", createdBy: "Admin", createdDate: "2023-11-05T14:20:00Z", status: "Active" },
    { id: 4, type: "2D", name: "LATERAL CEPHALGRAM TRUE", description: "", createdBy: "Admin", createdDate: "2023-11-05T14:20:00Z", status: "Active" },
    { id: 5, type: "2D", name: "HAND WRIST RADIOGRAPH", description: "", createdBy: "Admin", createdDate: "2023-11-05T14:20:00Z", status: "Active" },
    { id: 6, type: "2D", name: "PA MANDIBLE/SKULL VIEW", description: "", createdBy: "Admin", createdDate: "2023-11-05T14:20:00Z", status: "Active" },
    { id: 7, type: "2D", name: "LATERAL CEPHALGRAM WITH TRACING", description: "", createdBy: "Admin", createdDate: "2023-11-05T14:20:00Z", status: "Active" },
    { id: 8, type: "2D", name: "SUBMENTOVERTEEX VIEW", description: "", createdBy: "Admin", createdDate: "2023-11-05T14:20:00Z", status: "Active" },
    { id: 9, type: "2D", name: "TMJ View", description: "", createdBy: "Admin", createdDate: "2023-11-05T14:20:00Z", status: "Active" }
];


const Reports = () => {
    document.title = "Snaap Reports | SNAAP - Radiology & Diagnostic Centers";

    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isOpenFillter, setIsOpenFillter] = useState(false);
    const [isFilterAdded, setIsFilterAdded] = useState(false);

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
                Cell: ({ value }) => <span className="text-wrap" style={{ whiteSpace: "normal" }}>{value}</span>,
            },
            {
                Header: "Segment",
                accessor: "segment",
                Cell: ({ value }) =>
                    value?.map((seg, index) => (
                        <span key={index} className={`badge ${segments2D?.find(sagment => sagment.name == seg?.value) ? 'bg-secondary' : 'bg-warning'} p-1 me-1`}>{seg?.value}</span>
                    )),
            },
            {
                Header: "Name",
                accessor: "name",
                Cell: ({ value }) => <span className="fw-semibold text-dark text-wrap" style={{ whiteSpace: "normal" }}>{value}</span>,
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
                Cell: ({ value }) => <span>{new Date(value).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })}</span>,
            },
            {
                Header: "Modality",
                accessor: "modality",
                Cell: ({ value }) => <span className="text-wrap" style={{ whiteSpace: "normal" }}>{value}</span>,
            },
            {
                Header: "Pathology",
                accessor: "pathology",
                Cell: ({ value }) =>
                    value?.map((pathology, index) => (
                        <span key={index} className={`p-1 me-1`}>{pathology?.value}</span>
                    )),
            },
            {
                Header: "Description",
                accessor: "description",
                Cell: ({ value }) => <span className="text-wrap" style={{ whiteSpace: "normal" }}>{value}</span>,
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
                                        isFilterAdded={isFilterAdded}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <FilterSidebar
                        isOpen={isOpenFillter}
                        onClose={() => setIsOpenFillter(false)}
                        onApply={(selectedFilters) => {
                            if (selectedFilters) {
                                setIsFilterAdded(true);
                            }
                            else {
                                setIsFilterAdded(false);
                            }
                        }}
                    />

                </Container>
            </div >
        </React.Fragment >
    );
};

export default Reports;
