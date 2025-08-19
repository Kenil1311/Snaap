import React, { useEffect, useMemo, useState } from 'react';
import { TabContent, TabPane, CardBody, Collapse, Col, Row } from 'reactstrap';
import classnames from 'classnames';
import SimpleBar from 'simplebar-react';
import { useDispatch, useSelector } from 'react-redux';
import { getBranches, getReports, getSegments } from '../../store/actions';

const mockSubTypes = {
  dicom: [
    { type: "OPG", count: 20 },
    { type: "WATER VIEW", count: 30 },
    { type: "REVERSE TOWN VIEW", count: 15 },
    { type: "LATERAL CEPHALGRAM TRUE", count: 25 },
    { type: "HAND WRIST RADIOGRAPH", count: 20 },
    { type: "PA MANDIBLE/SKULL VIEW", count: 15 },
    { type: "LATERAL CEPHALGRAM WITH TRACING", count: 10 },
    { type: "SUBMENTOVERTEEX VIEW", count: 5 },
    { type: "TMJ View", count: 5 }
  ],
  opg: [
    { type: "SELECTIONAL CBCT (5 X 5)", count: 50 },
    { type: "CBCT OF TMJ RIGHT/LEFT (8 X 8)", count: 30 },
    { type: "CBCT OF MAXILLA (FULL ARCH. 10 X 5, 8 X 8)", count: 25 },
    { type: "CBCT OF TMJ BOTH (17 X 6)", count: 15 },
    { type: "CBCT OF MANDIBLE (FULL ARCH. 10 X 5, 8 X 8)", count: 20 },
    { type: "SINUS VIEW (10 X 10)", count: 3 },
    { type: "CBCT OF BOTH JAWS (FULL ARCH. 10 X 10)", count: 8 },
    { type: "FULL FACIAL 3D IMAGING (17 X 16)", count: 5 },
  ]
};

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


const Transactions = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [state, setState] = useState('ALL');
  const [openAccordions, setOpenAccordions] = useState(null);

  const dispatch = useDispatch();

  const branches = useSelector(state => state.branch?.branches || []);
  const reports = useSelector(state => state.report?.reports || []);
  const segments = useSelector(state => state.segment?.segments || []);

  useEffect(() => {
    dispatch(getBranches());
    dispatch(getReports({}));
    dispatch(getSegments());
  }, [dispatch]);

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => (prev === key ? null : key));
  };

  const generateBranchSegmentCounts = (branches, segments, reports) => {
    return branches.map(branch => {
      // Filter reports for this branch (coerce IDs to same type)
      const branchReports = reports.filter(r => String(r.branch_id) === String(branch.id));

      let total2D = 0;
      let total3D = 0;

      const subtypesByType = {
        "2D": [],
        "3D": []
      };

      segments.forEach(seg => {
        // Count how many times this segment appears in this branch
        const count = branchReports.reduce((acc, report) => {
          const segCount = report.segments?.filter(rSeg => String(rSeg.id) === String(seg.id))?.length || 0;
          return acc + segCount;
        }, 0);

        if (seg.type === "2D") {
          total2D += count;
          subtypesByType["2D"].push({ name: [seg.name], count });
        } else if (seg.type === "3D") {
          total3D += count;
          subtypesByType["3D"].push({ name: [seg.name], count });
        }
      });

      return {
        id: branch.id,
        branch: branch.branch_name || branch.area,
        phone: branch.phone || "N/A",
        location: `${branch.city || "Unknown"}, ${branch.state || "Unknown"}`,
        total2D,
        total3D,
        ...subtypesByType
      };
    });
  };

  const getFilteredReports = (reports, monthsAgo) => {
    if (!monthsAgo) return reports; // ALL
    const now = new Date();
    const pastDate = new Date();
    pastDate.setMonth(now.getMonth() - monthsAgo);

    return reports.filter(report => {
      const createdAt = new Date(report.created_at);
      return createdAt >= pastDate;
    });
  };

  const dataByState = {
    ALL: generateBranchSegmentCounts(branches, segments, reports),
    '1M': generateBranchSegmentCounts(branches, segments, getFilteredReports(reports, 1)),
    '6M': generateBranchSegmentCounts(branches, segments, getFilteredReports(reports, 6)),
    '1Y': generateBranchSegmentCounts(branches, segments, getFilteredReports(reports, 12))
  };

  const currentData = dataByState[state];



  console.log(generateBranchSegmentCounts(branches, segments, reports))

  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="card-title mb-0">SNAAP Reports</h4>
          <div>
            {["ALL", "1M", "6M", "1Y"].map((period) => (
              <button
                key={period}
                type="button"
                className={`btn btn-soft-${state === period ? 'primary' : 'secondary'} btn-sm me-1`}
                onClick={() => setState(period)}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <CardBody className="px-0">
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <SimpleBar className="table-responsive px-3" style={{ height: "480px" }}>
                <table className="table align-middle table-nowrap table-borderless">
                  <tbody>
                    {currentData.map((branch, index) => (
                      <React.Fragment key={branch.id}>
                        <tr
                          className={`cursor-pointer ${openAccordions == index ? "border rounded-1" : ""}`}
                          onClick={() => toggleAccordion(index)}
                        >
                          <td
                            className={`cursor-pointer`}
                          >
                            <div>
                              <h5 className="font-size-14 mb-1">{branch.branch}</h5>
                              <p className="text-muted mb-0 font-size-12">{branch.location}</p>
                            </div>
                          </td>

                          <td
                            className={`cursor-pointer`}
                          >
                            <div
                              className="text-end"
                              style={{ cursor: "pointer" }}
                            >
                              <h5 className="font-size-14 mb-0 text-primary">{branch.total2D}</h5>
                              <p className="text-muted mb-0 font-size-12">2D</p>
                            </div>
                          </td>

                          <td
                            className={`cursor-pointer`}
                          >
                            <div
                              className="text-end"
                              style={{ cursor: "pointer" }}
                            >
                              <h5 className="font-size-14 mb-0 text-success">{branch.total3D}</h5>
                              <p className="text-muted mb-0 font-size-12">3D</p>
                            </div>
                          </td>
                        </tr>

                        {/* 2D Collapse */}
                        <tr>
                          <td colSpan="3" className="p-0" style={{ width: "90%" }}>
                            <Collapse isOpen={openAccordions === index}>
                              <Row className="border-bottom">
                                {/* 2D Types Section */}
                                <Col md={6} className="p-0">
                                  <div className="accordion-body px-4 py-3 border-end">
                                    <strong className="d-block mb-2">2D Types:</strong>
                                    {branch["2D"]?.length > 0 ? (
                                      branch["2D"]?.map((sub, idx) => (
                                        <Row key={idx} className='mt-1'>
                                          <Col xs={6} className="text-muted mb-0 font-size-12">{sub.name}</Col>
                                          <Col xs={6} className="text-end font-size-12"><strong>{sub.count}</strong></Col>
                                        </Row>

                                      ))
                                    ) : (
                                      <p> No 2D types available</p>
                                    )}
                                  </div>
                                </Col>

                                {/* 3D Types Section */}
                                <Col md={6} className="p-0">
                                  <div className="accordion-body px-4 py-3">
                                    <strong className="d-block mb-2">3D Types:</strong>
                                    {branch["3D"]?.length > 0 ? (
                                      branch["3D"]?.map((sub, idx) => (
                                        <Row key={idx} className='mt-1'>
                                          <Col xs={6} className="text-muted mb-0 font-size-12">{sub.name}</Col>
                                          <Col xs={6} className="text-end font-size-12"><strong>{sub.count}</strong></Col>
                                        </Row>
                                      ))
                                    ) : (
                                      <p>No 3D types available.</p>
                                    )}
                                  </div>
                                </Col>
                              </Row>
                            </Collapse>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}

                    {currentData?.length === 0 && (
                      <div
                        className="d-flex flex-column justify-content-center align-items-center"
                        style={{ height: "480px" }} // same as your table container height
                      >
                        <i className="fas fa-building fa-3x mb-3"></i>
                        <h5 className="mb-2">No Branch Found</h5>
                        <p className="mb-0 text-center">
                          Currently, there are no branches to display. Please add a branch to get started.
                        </p>
                      </div>
                    )}
                  </tbody>
                </table>
              </SimpleBar>
            </TabPane>
          </TabContent>
        </CardBody>
      </div>
    </div >
  );
};

export default Transactions;
