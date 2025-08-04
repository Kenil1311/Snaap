import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, CardBody } from 'reactstrap';
import classnames from 'classnames';

//SimpleBar
import SimpleBar from "simplebar-react"

const branchesData = [
    {
        id: 1,
        branchName: "SNAAP ORAL DIAGNOSIS AND RADIOLOGY CENTRE",
        area: "Lal Darwaja",
        phone: "+91 93131 51637",
        address1: "A-108, Millenium Point, Lal Darwaja Station Rd",
        address2: "opp. Gabani hospital",
        city: "Surat",
        state: "Gujarat",
        zip: "395003",
        country: "India",
        latitude: "21.323585382014564",
        longitude: "72.85372149153386",
        dicomCount: 100,
        opgCount: 50
    },
    {
        id: 2,
        branchName: "SNAAP ORAL DIAGNOSIS AND RADIOLOGY CENTRE",
        area: "Athwa",
        phone: "+91 94296 77150",
        address1: "3rd Floor, Maher Park-A, 37, Ring Rd",
        address2: "near Lucky Book store, above Desai Metropolis, Athwa",
        city: "Surat",
        state: "Gujarat",
        zip: "395001",
        country: "India",
        latitude: "21.29287950702769",
        longitude: "72.82076250771047",
        dicomCount: 120,
        opgCount: 60
    },
    {
        id: 3,
        branchName: "SNAAP ORAL DIAGNOSIS AND RADIOLOGY CENTRE",
        area: "Adajan",
        phone: "+91 63527 66065",
        address1: "Millionaire Business Park, 106",
        address2: "Opp, Subhash Chandra Bose Marg, TGB, Adajan",
        city: "Surat",
        state: "Gujarat",
        zip: "395009",
        country: "India",
        latitude: "21.29287950702769",
        longitude: "72.7713240319754",
        dicomCount: 80,
        opgCount: 40
    },
    {
        id: 4,
        branchName: "Snaap Oral Diagnosis & Radiology Centre LLP",
        area: "Althan",
        phone: "",
        email: "hyd.hub@example.com",
        address1: "1rd floor, blue arc complex, VIP Rd",
        address2: "near Althan - Sarsana Road, Althan",
        city: "Surat",
        state: "Gujarat",
        zip: "395007",
        country: "India",
        latitude: "21.267286377320417",
        longitude: "72.80428301579879",
        dicomCount: 90,
        opgCount: 45
    },
    {
        id: 5,
        branchName: "SNAAP ORAL DIAGNOSIS AND RADIOLOGY CENTER VESU",
        area: "Vesu",
        phone: "+91 63527 57631",
        address1: "Trinity Orion, 201",
        address2: "Vesu Main Road, Vesu",
        city: "Surat",
        state: "Gujarat",
        zip: "395007",
        country: "India",
        latitude: "21.246808669039474",
        longitude: "72.74935137609314",
        dicomCount: 110,
        opgCount: 55
    },
    {
        id: 6,
        branchName: "SNAAP ORAL DIAGNOSIS AND RADIOLOGY CENTRE SARTHANA",
        area: "Sarthana",
        phone: "+91 63549 47340",
        address1: "Rise On Plaza, 224",
        address2: "near Sarthana Jakat Naka",
        city: "Surat",
        state: "Gujarat",
        zip: "395013",
        country: "India",
        latitude: "21.33381924686161",
        longitude: "72.9086531312395",
        dicomCount: 130,
        opgCount: 65
    },
    {
        id: 7,
        branchName: "SNAAP ORAL DIAGNOSIS AND RADIOLOGY CENTRE",
        area: "Navsari",
        phone: "",
        address1: "WWX9+RVC, Sandhkuva",
        address2: "Udyog Nagar, Vejalpore",
        city: "Navsari",
        state: "Gujarat",
        zip: "396445",
        country: "India",
        latitude: "20.965593720139175",
        longitude: "72.92032614039391",
        dicomCount: 70,
        opgCount: 85
    },
    {
        id: 8,
        branchName: "SNAAP ORAL DIAGNOSIS AND RADIOLOGY CENTRE, VADODARA",
        area: "Race Course Road",
        phone: "+91 70965 55589",
        address1: "327, Trivia",
        address2: "Near, Race Course Road, Natubhai Cir",
        city: "Vadodara",
        state: "Gujarat",
        zip: "390007",
        country: "India",
        latitude: "22.433388292489944",
        longitude: "73.17079302388392",
        dicomCount: 150,
        opgCount: 104
    },
    {
        id: 9,
        branchName: "Snaap Oral Diagnosis & radiology Centre",
        area: "Maninagar",
        phone: "+91 98793 00703",
        address1: "Prankunj Society",
        address2: "Pushpkunj, Maninagar",
        city: "Ahmedabad",
        state: "Gujarat",
        zip: "380008",
        country: "India",
        latitude: "23.112087260983426",
        longitude: "72.61598346285689",
        dicomCount: 140,
        opgCount: 90
    },
    {
        id: 10,
        branchName: "SNAAP Centre",
        area: "Paldi",
        phone: "+91 94296 77152",
        address1: "F-104, Sahajanand Plaza, Beside Utsav Restaurant, above Fashion House",
        address2: "opp. Zalak Complex, Bhatta, Paldi",
        city: "Ahmedabad",
        state: "Gujarat",
        zip: "380007",
        country: "India",
        latitude: "23.10703489039966",
        longitude: "72.54457233123955",
        dicomCount: 160,
        opgCount: 120
    },
    {
        id: 11,
        branchName: "Snaap Oral Diagnosis Centre",
        area: "Rajkot",
        phone: "",
        address1: "202-5, Street No.4, near Kalrav Children Hospital",
        address2: "New College Wadi, Mahavir Park",
        city: "Rajkot",
        state: "Gujarat",
        zip: "360005",
        country: "India",
        latitude: "22.392762652774564",
        longitude: "70.74830771286493",
        dicomCount: 75,
        opgCount: 55
    },
    {
        id: 12,
        branchName: "SNAAP ORAL DIAGNOSIS AND RADIOLOGY CENTRE",
        area: "Karelibagh",
        phone: "+91 70965 55591",
        address1: "ADITI COMPLEX, AMITNAGAR CIRCLE",
        address2: "VIP Rd, Karelibagh",
        city: "Vadodara",
        state: "Gujarat",
        zip: "390018",
        country: "India",
        latitude: "22.433388292489944",
        longitude: "73.22572466358955",
        dicomCount: 95,
        opgCount: 65
    },
    {
        id: 13,
        branchName: "SNAAP Oral Diagnosis & Radiology Centre - MOTERA",
        area: "Motera",
        phone: "",
        address1: "Shukan Mall, 45, GANDHI NAGAR ROAD",
        address2: "Rangjyot Society, Parvati Nagar, Chandkheda",
        city: "Ahmedabad",
        state: "Gujarat",
        zip: "380005",
        country: "India",
        latitude: "23.112201427326987",
        longitude: "72.59286043850545",
        dicomCount: 85,
        opgCount: 70
    },
    {
        id: 14,
        branchName: "Snaap Imaging Centre",
        area: "Bharuch",
        phone: "+91 63549 61652",
        address1: "Shop no.9, status hub , falshruti nagar",
        address2: "near ami laboratory, Patel Super Market, B/h",
        city: "Bharuch",
        state: "Gujarat",
        zip: "392001",
        country: "India",
        latitude: "21.720089647763373",
        longitude: "72.99694598589022",
        dicomCount: 60,
        opgCount: 40
    },
    {
        id: 15,
        branchName: "SNAAP Oral",
        area: "Satellite",
        phone: "+91 83202 12924",
        address1: "Mansi Cross Road, Shop No. 129, Sunrise Mall",
        address2: "above Bata Showroom, Satellite",
        city: "Ahmedabad",
        state: "Gujarat",
        zip: "380015",
        country: "India",
        latitude: "23.04271473818183",
        longitude: "72.52900240734763",
        dicomCount: 110,
        opgCount: 80
    },
];



const Transactions = () => {
    const [activeTab, setActiveTab] = useState('1');
    const [state, setState] = useState("ALL");

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const onChangeHandle = (data) => {
        setState(data);
    };

    const generateMockData = () => {
        return branchesData.map(branch => ({
            branch: `${branch.branchName} - ${branch.city}`,
            phone: branch.phone || "N/A",
            location: `${branch.area}, ${branch.city}, ${branch.state}`,
            dicom: Math.floor(Math.random() * 100),
            opg: Math.floor(Math.random() * 100),
        }));
    };

    const filteredData = {
        ALL: generateMockData(),
        "1M": generateMockData(),
        "6M": generateMockData(),
        "1Y": generateMockData()
    };

    const currentData = filteredData[state];

    return (
        <React.Fragment>
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">SNAAP Reports</h4>
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
                                                            <p className="text-muted mb-0 font-size-12">{branch?.location}</p>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="text-end">
                                                            <h5 className="font-size-14 mb-0">{branch?.dicom}</h5>
                                                            <p className="text-muted mb-0 font-size-12">CBCT</p>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="text-end">
                                                            <h5 className="font-size-14 text-muted mb-0">{branch?.opg}</h5>
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