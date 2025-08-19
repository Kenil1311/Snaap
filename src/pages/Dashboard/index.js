import React, { useEffect, useMemo, useState } from 'react';

import ReactApexChart from "react-apexcharts"

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
    Card,
    CardBody,
    Col,
    Container,
    Row
} from "reactstrap";

import CountUp from "react-countup";

/** import Mini Widget data */
import WalletBalance from './WalletBalance';
import InvestedOverview from './InvestedOverview';
import MarketOverview from './MarketOverview';
import Locations from './Locations';
import Trading from './Trading';
import Transactions from './Transactions';
import RecentActivity from './RecentActivity';
import NewSlider from './NewSlider';
import { useDispatch, useSelector } from 'react-redux';
import { getBranches, getReports } from '../../store/actions';

const options = {
    chart: {
        height: 50,
        type: "line",
        toolbar: { show: false },
        sparkline: {
            enabled: true
        }
    },
    colors: ["#5156be"],
    stroke: {
        curve: "smooth",
        width: 2,
    },
    xaxis: {
        labels: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
    },
    yaxis: {
        labels: {
            show: false,
        },
    },
    tooltip: {
        fixed: {
            enabled: false,
        },
        x: {
            show: false,
        },
        y: {
            title: {
                formatter: function (seriesName) {
                    return "";
                },
            },
        },
        marker: {
            show: false,
        },
    },
};


const Dashboard = () => {


    const dispatch = useDispatch();

    const branches = useSelector(state => state.branch?.branches || []);
    const reports = useSelector(state => state.report?.reports || []);

    useEffect(() => {
        dispatch(getBranches());
        dispatch(getReports({}));
    }, [dispatch]);

    //meta title
    document.title = "Dashboard | SNAAP Radiology & Diagnostic Centers";

    const WidgetsData = useMemo(() => {
        const numBranches = branches?.length || 0;
        const numPatients = reports?.length || 0; // assuming each report = one patient

        // Count all 2D and 3D segments across all reports
        const num2DReports = reports?.reduce((count, report) => {
            return count + (report?.segments?.filter(seg => seg.type === "2D")?.length || 0);
        }, 0);

        const num3DReports = reports?.reduce((count, report) => {
            return count + (report?.segments?.filter(seg => seg.type === "3D")?.length || 0);
        }, 0);

        return [
            {
                id: 1,
                title: "Number of Branches",
                price: numBranches,
                statusColor: "green",
            },
            {
                id: 2,
                title: "Number of Patients",
                price: numPatients,
                statusColor: "red",
            },
            {
                id: 3,
                title: "Number of 2D Reports",
                price: num2DReports,
                statusColor: "cyan",
            },
            {
                id: 4,
                title: "Number of 3D Reports",
                price: num3DReports,
                statusColor: "orange",
            },
        ];
    }, [branches, reports]);



    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Dashboard" />

                    <Row>
                        <Col lg={12}>
                            <div className='row'>
                                {(WidgetsData || []).map((widget, key) => (
                                    <div className="col-xl-3 col-md-3" key={key}>
                                        <Card className="card-h-100">
                                            <CardBody>
                                                <Row className="align-items-center">
                                                    <Col xs={12}>
                                                        <span className="text-muted mb-3 lh-1 d-block text-truncate">
                                                            {widget.title}
                                                        </span>
                                                        <h4 className="mb-3">
                                                            {/* {widget.isDoller === true ? "$" : ""} */}
                                                            <span className="counter-value">
                                                                <CountUp
                                                                    start={0}
                                                                    end={widget.price}
                                                                    duration={2}
                                                                    separator=""
                                                                    style={{
                                                                        fontSize: 30,
                                                                        color: widget?.statusColor
                                                                    }}
                                                                />
                                                            </span>
                                                        </h4>


                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </Col>

                    </Row>
                    <Row className="d-flex align-items-stretch">
                        <Col xl={6} className="d-flex">
                            <div className="w-100">
                                <Transactions />
                            </div>
                        </Col>
                        <Col xl={6} className="d-flex">
                            <div className="w-100">
                                <Locations />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default Dashboard;