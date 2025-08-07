import React, { useState } from "react";
import Select from "react-select"
import Nouislider from 'nouislider-react';

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
        longitude: "72.74935137609314"
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
        longitude: "72.9086531312395"
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
        longitude: "72.92032614039391"
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
        longitude: "73.17079302388392"
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
        longitude: "72.61598346285689"
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
        longitude: "72.54457233123955"
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
        longitude: "70.74830771286493"
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
        longitude: "73.22572466358955"
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
        longitude: "72.59286043850545"
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
        longitude: "72.99694598589022"
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
    },
];

const sagmentData = [
    {
        id: 1,
        type: "2D",
        name: "OPG",
        description: "",
        createdBy: "Admin",
        createdDate: "2024-01-10T10:00:00Z",
        // updatedAt: "2024-06-10T12:30:00Z",
        status: "Active",
    },
    {
        id: 2,
        type: "2D",
        name: "WATER VIEW",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Inactive",
    },
    {
        id: 3,
        type: "2D",
        name: "REVERSE TOWN VIEW",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 4,
        type: "2D",
        name: "LATERAL CEPHALGRAM TRUE",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 5,
        type: "2D",
        name: "HAND WRIST RADIOGRAPH",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 6,
        type: "2D",
        name: "PA MANDIBLE/SKULL VIEW",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 7,
        type: "2D",
        name: "LATERAL CEPHALGRAM WITH TRACING",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 8,
        type: "2D",
        name: "SUBMENTOVERTEEX VIEW",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 9,
        type: "2D",
        name: "TMJ View",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 10,
        type: "3D",
        name: "SELECTIONAL CBCT (5 X 5)",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 11,
        type: "3D",
        name: "CBCT OF TMJ RIGHT/LEFT (8 X 8)",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 12,
        type: "3D",
        name: "CBCT OF MAXILLA (FULL ARCH. 10 X 5, 8 X 8)",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 13,
        type: "3D",
        name: "CBCT OF TMJ BOTH (17 X 6)",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 14,
        type: "3D",
        name: "CBCT OF MANDIBLE (FULL ARCH. 10 X 5, 8 X 8)",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 15,
        type: "3D",
        name: "SINUS VIEW (10 X 10)",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 16,
        type: "3D",
        name: "CBCT OF BOTH JAWS (FULL ARCH. 10 X 10)",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
    {
        id: 17,
        type: "3D",
        name: "FULL FACIAL 3D IMAGING (17 X 16)",
        description: "",
        createdBy: "Admin",
        createdDate: "2023-11-05T14:20:00Z",
        // updatedAt: "2024-07-15T09:00:00Z",
        status: "Active",
    },
];

const pathologyOptions = [
    {
        label: "Cancer",
        value: "Cancer"
    },
    {
        label: "Implant",
        value: "Implant"
    }
];

const ganderOptions = [
    {
        label: "Male",
        value: "Male"
    },
    {
        label: "Female",
        value: "Female"
    },
    {
        label: "Other",
        value: "Other"
    }
];

const FilterSidebar = ({ isOpen, onClose, onApply }) => {


    const [selectedBranchIds, setSelectedBranchIds] = useState([]);
    const [selectedSegments, setSelectedSegments] = useState([]);
    const [selectedPathology, setSelectedPathology] = useState([]);
    const [selectedGander, setSelectedGander] = useState(null);
    const [ageRange, setAgeRange] = useState([18, 60]);

    const branchOptions = Object.values(
        branchesData.reduce((acc, branch) => {
            const city = branch.city;

            if (!acc[city]) {
                acc[city] = {
                    label: city,
                    options: []
                };
            }

            acc[city].options.push({
                label: branch.area,
                value: branch.area
            });

            return acc;
        }, {})
    );

    const segmentOptions = Object.values(
        sagmentData.reduce((acc, sagment) => {
            const type = sagment.type;

            if (!acc[type]) {
                acc[type] = {
                    label: type,
                    options: []
                };
            }

            acc[type].options.push({
                label: sagment.name,
                value: sagment.name
            });

            return acc;
        }, {})
    );


    const clearFilters = () => {
        setSelectedBranchIds([]);
        setSelectedSegments([]);
        setSelectedPathology([]);
        setAgeRange([]);
        setSelectedGander(null)
        onApply(null);
        onClose();
    };

    const handleApply = () => {
        const selected = {
            branches: selectedBranchIds,
            segments: selectedSegments,
            pathology: selectedPathology,
            gander: selectedGander,
            age: { min: ageRange[0], max: ageRange[1] },
        };
        onApply(selected);
        onClose();
    };

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
                        <i className="fas fa-filter me-1"></i> Filter Options
                    </h5>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>

                {/* Body */}
                <div className="offcanvas-body d-flex flex-column px-4 py-3" style={{ height: "100%" }}>
                    <div className="flex-grow-1 overflow-auto pe-1 px-1">

                        {/* Age Range Filter */}
                        <div className="mb-4 mt-4">
                            <h5 className="text-uppercase text-muted small fw-bold mb-3">Age Range</h5>
                            <div data-rangeslider data-slider-color="primary" className="px-2">
                                <Nouislider
                                    range={{ min: 0, max: 100 }}
                                    start={ageRange}
                                    connect
                                    step={1}
                                    tooltips={[
                                        {
                                            to: value => parseInt(value),
                                            from: value => parseInt(value),
                                        },
                                        {
                                            to: value => parseInt(value),
                                            from: value => parseInt(value),
                                        },
                                    ]}
                                    onChange={(values) => {
                                        setAgeRange(values.map(Number));
                                    }}
                                    className="nouislider"
                                />

                                {/* Custom Styles */}
                                <style>{`
        .noUi-handle {
          background-color: #00B3CF !important; /* Bootstrap primary */
          border: 2px solid #00B3CF !important;
          box-shadow: none !important;
        }

        .noUi-connect {
          background: #00B3CF !important;
        }
      `}</style>
                            </div>

                            <p className="mt-3 ms-2" >
                                Selected Range: <strong>{ageRange[0]} - {ageRange[1]}</strong> years
                            </p>
                        </div>

                        {/* Branch Filter */}
                        <div className="mb-4">
                            <h5 className="text-uppercase text-muted small fw-bold mb-2">Branch</h5>


                            <div className="col-lg-12 col-md-12">
                                <div className="mb-3">
                                    <Select
                                        name="branch"
                                        placeholder="Select Branch"
                                        isMulti
                                        options={branchOptions}
                                        onChange={(selected) => {
                                            setSelectedBranchIds(selected.map(option => option.value));
                                        }}
                                        classNamePrefix="custom-select"
                                        className="react-select-container"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Segment Filter */}
                        <div className="mb-4">
                            <h5 className="text-uppercase text-muted small fw-bold mb-2">Segment</h5>
                            <div className="col-lg-12 col-md-12">
                                <div className="mb-3">
                                    <Select
                                        name="sagment"
                                        placeholder="Select Sagment"
                                        isMulti
                                        options={segmentOptions}
                                        onChange={(selected) => {
                                            setSelectedSegments(selected.map(option => option.value));
                                        }}
                                        classNamePrefix="custom-select"
                                        className="react-select-container"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Segment Filter */}
                        <div className="mb-4">
                            <h5 className="text-uppercase text-muted small fw-bold mb-2">Pathology</h5>
                            <div className="col-lg-12 col-md-12">
                                <div className="mb-3">
                                    <Select
                                        name="pathology"
                                        placeholder="Select Pathology"
                                        isMulti
                                        options={pathologyOptions}
                                        onChange={(selected) => {
                                            setSelectedSegments(selected.map(option => option.value));
                                        }}
                                        classNamePrefix="custom-select"
                                        className="react-select-container"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Segment Filter */}
                        <div className="mb-4">
                            <h5 className="text-uppercase text-muted small fw-bold mb-2">Gander</h5>
                            <div className="col-lg-12 col-md-12">
                                <div className="mb-3">
                                    <Select
                                        name="gander"
                                        placeholder="Select Gander"
                                        options={ganderOptions}
                                        onChange={(selected) => {
                                            setSelectedGander(selected.value);
                                        }}
                                        classNamePrefix="custom-select"
                                        className="react-select-container"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="py-3 border-top d-flex justify-content-end gap-3 align-items-center">
                        <button className="btn btn-outline-secondary" onClick={clearFilters}>
                            Clear All
                        </button>
                        <button className="btn btn-primary" onClick={handleApply}>
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FilterSidebar;
