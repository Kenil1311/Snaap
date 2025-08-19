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
import { useDispatch, useSelector } from "react-redux";
import { deleteReport, getReports, getSegments } from "../../store/actions";
import { ToastContainer } from "react-toastify";


const Reports = () => {
    document.title = "Snaap Reports | SNAAP - Radiology & Diagnostic Centers";

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const reports = useSelector(state => state.report?.reports || []);
    const error = useSelector(state => state.report?.error);
    const segments = useSelector(state => state.segment?.segments || []);


    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [isOpenFillter, setIsOpenFillter] = useState(false);
    const [isFilterAdded, setIsFilterAdded] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({})
    const [activeFilter, setActiveFilter] = useState(0);

    const columns = useMemo(
        () => [
            {
                Header: "#",
                accessor: "id",
                Cell: ({ value }) => <strong>{value}</strong>,
            },
            {
                Header: "Branch",
                accessor: "branch_name",
                Cell: ({ value }) => <span className="text-wrap" style={{ whiteSpace: "normal" }}>{value}</span>,
            },
            {
                Header: "Segment",
                accessor: "segments",
                Cell: ({ value }) =>
                    value?.map((seg, index) => (
                        <span key={index} className={`badge ${seg?.type == "2D" ? 'bg-secondary' : 'bg-warning'} p-1 me-1`}>{seg?.name}</span>
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
                accessor: "studydate",
                Cell: ({ value }) => <span><span>
                    {new Date(Number(value) || value).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span></span>,
            },
            {
                Header: "Modality",
                accessor: "modality",
                Cell: ({ value }) => <span className="text-wrap" style={{ whiteSpace: "normal" }}>{value}</span>,
            },
            {
                Header: "Pathology",
                accessor: "pathologies",
                Cell: ({ value }) =>
                    value?.map((pathology, index) => (
                        <span key={index} className={`p-1 me-1`}>{index != value?.length - 1 ?`${pathology?.name}, ` : pathology?.name} </span>
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

    useEffect(() => {
        dispatch(getReports(selectedFilters));
        dispatch(getSegments());
    }, [dispatch]);


    useEffect(() => {
        dispatch(getReports(selectedFilters));
    }, [selectedFilters])

    useEffect(() => {
        setIsEdit(false);
    }, [reports]);

    useEffect(() => {
        if (!isEmpty(reports) && !!isEdit) {
            setIsEdit(false);
        }
    }, [reports]);


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
        setSelectedReport(patien?.id)
        setDeleteModal(true);
    };

    const handleDeleteUser = () => {
        dispatch(deleteReport(selectedReport))
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
                                        data={reports}
                                        isGlobalFilter={true}
                                        isAddUserList={true}
                                        customPageSize={10}
                                        className="table align-middle datatable dt-responsive table-check nowrap"
                                        toggle={handleToggle}
                                        isOpenFillter={true}
                                        setIsOpenFillter={setIsOpenFillter}
                                        isFilterAdded={selectedFilters ? Object.keys(selectedFilters).length > 0 ? true : false : false}
                                        activeFilter={activeFilter}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <FilterSidebar
                        values={selectedFilters}
                        isOpen={isOpenFillter}
                        onClose={() => setIsOpenFillter(false)}
                        onApply={(Filters) => {
                            setSelectedFilters(Filters)

                            if (Filters) {
                                const { minAge, maxAge, ...rest } = Filters;

                                const activeCountWithoutAge = Object.values(rest).filter(value => {
                                    if (Array.isArray(value)) {
                                        return value.length > 0;
                                    }
                                    if (typeof value === "number") {
                                        return !isNaN(value);
                                    }
                                    if (typeof value === "string") {
                                        return value.trim() !== "";
                                    }
                                    return false;
                                }).length;

                                // Check if age filter is active (either minAge or maxAge set)
                                const isAgeActive = (typeof minAge === "number" && !isNaN(minAge)) ||
                                    (typeof maxAge === "number" && !isNaN(maxAge));

                                setActiveFilter(activeCountWithoutAge + (isAgeActive ? 1 : 0));
                            }
                        }}
                    />
                </Container>

                <ToastContainer />

            </div >
        </React.Fragment >
    );
};

export default Reports;
