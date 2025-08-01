import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, CardBody } from 'reactstrap';
import classnames from 'classnames';

//SimpleBar
import SimpleBar from "simplebar-react"

const data = [
    {
        "branch": "SNAAP - Ahmedabad",
        "dicomReports": 125,
        "opgReports": 340
    },
    {
        "branch": "SNAAP - Surat",
        "dicomReports": 98,
        "opgReports": 275
    },
    {
        "branch": "SNAAP - Baroda",
        "dicomReports": 110,
        "opgReports": 310
    },
    {
        "branch": "SNAAP - Rajkot",
        "dicomReports": 87,
        "opgReports": 200
    },
    {
        "branch": "SNAAP - Gandhinagar",
        "dicomReports": 65,
        "opgReports": 150
    },
    {
        "branch": "SNAAP - Rajkot",
        "dicomReports": 87,
        "opgReports": 200
    },
    {
        "branch": "SNAAP - Gandhinagar",
        "dicomReports": 65,
        "opgReports": 150
    },
    {
        "branch": "SNAAP - Gandhinagar",
        "dicomReports": 65,
        "opgReports": 150
    },
    {
        "branch": "SNAAP - Gandhinagar",
        "dicomReports": 65,
        "opgReports": 150
    },
    {
        "branch": "SNAAP - Gandhinagar",
        "dicomReports": 65,
        "opgReports": 150
    }
]


const Transactions = () => {
    const [activeTab, setActiveTab] = useState('1');
    const [state, setState] = useState("ALL");

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const onChangeHandle = (data) => {
        setState(data);
    };

    const filteredData = {
        ALL: data,
        "1M": data.map(branch => ({
            ...branch,
            dicomReports: Math.floor(branch.dicomReports * 0.2),
            opgReports: Math.floor(branch.opgReports * 0.2),
        })),
        "6M": data.map(branch => ({
            ...branch,
            dicomReports: Math.floor(branch.dicomReports * 0.6),
            opgReports: Math.floor(branch.opgReports * 0.6),
        })),
        "1Y": data.map(branch => ({
            ...branch,
            dicomReports: Math.floor(branch.dicomReports * 0.9),
            opgReports: Math.floor(branch.opgReports * 0.9),
        })),
    };

    const currentData = filteredData[state];

    return (
        <React.Fragment>
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Reports</h4>
                        <div className="ms-auto">
                            <div>
                                <button type="button" className="btn btn-soft-primary btn-sm" onClick={() => onChangeHandle("ALL")}>
                                    ALL
                                </button>{" "}
                                <button type="button" className="btn btn-soft-secondary btn-sm" onClick={() => onChangeHandle("1M")}>
                                    1M
                                </button>{" "}
                                <button type="button" className="btn btn-soft-secondary btn-sm" onClick={() => onChangeHandle("6M")}>
                                    6M
                                </button>{" "}
                                <button type="button" className="btn btn-soft-secondary btn-sm" onClick={() => onChangeHandle("1Y")}>
                                    1Y
                                </button>{" "}
                            </div>
                        </div>
                    </div>

                    <CardBody className="px-0">
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <SimpleBar className="table-responsive px-3" style={{ height: "480px" }}>
                                    <table className="table align-middle table-nowrap table-borderless">
                                        <tbody>

                                            {currentData?.map((branch, index) => (
                                                <tr key={index}>
                                                    {/* <td style={{ width: '50px' }}>
                                                        <div className="font-size-22 text-success">
                                                            <i className="bx bx-down-arrow-circle d-block"></i>
                                                        </div>
                                                    </td> */}

                                                    <td>
                                                        <div>
                                                            <h5 className="font-size-14 mb-1">{branch?.branch}</h5>
                                                            {/* <p className="text-muted mb-0 font-size-12">14 Mar, 2021</p> */}
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="text-end">
                                                            <h5 className="font-size-14 mb-0">{branch?.dicomReports}</h5>
                                                            <p className="text-muted mb-0 font-size-12">DICOM</p>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="text-end">
                                                            <h5 className="font-size-14 text-muted mb-0">{branch?.opgReports}</h5>
                                                            <p className="text-muted mb-0 font-size-12">OPG</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </SimpleBar>
                            </TabPane>
                        </TabContent>
                    </CardBody>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Transactions;