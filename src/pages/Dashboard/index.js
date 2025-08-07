import React from 'react';

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
import { WidgetsData } from "../../common/data/dashboard";
import WalletBalance from './WalletBalance';
import InvestedOverview from './InvestedOverview';
import MarketOverview from './MarketOverview';
import Locations from './Locations';
import Trading from './Trading';
import Transactions from './Transactions';
import RecentActivity from './RecentActivity';
import NewSlider from './NewSlider';

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

    //meta title
    document.title = "Dashboard | SNAAP Radiology & Diagnostic Centers";

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
                                                {/* <div className="text-nowrap">
                                                    <span
                                                        className={
                                                            "badge bg-" +
                                                            widget.statusColor +
                                                            "-subtle text-" +
                                                            widget.statusColor
                                                        }
                                                    >
                                                        {widget.rank}
                                                    </span>
                                                    <span className="ms-1 text-muted font-size-13">
                                                        Since last week
                                                    </span>
                                                </div> */}
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