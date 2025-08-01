import React from 'react';
import { Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { VectorMap } from "react-jvectormap";
import "../Maps/jquery-jvectormap.scss";
import { inMill } from "@react-jvectormap/india";

const Locations = (props) => {
    const map = React.createRef(null);

    const markers = [
        { latLng: [28.6139, 77.2090], name: "Delhi" },
        { latLng: [19.0760, 72.8777], name: "Mumbai" },
        { latLng: [13.0827, 80.2707], name: "Chennai" },
        { latLng: [22.5726, 88.3639], name: "Kolkata" },
        { latLng: [12.9716, 77.5946], name: "Bangalore" },
        { latLng: [21.1702, 72.8311], name: "Surat - City Center" },
        { latLng: [21.2096, 72.8570], name: "Surat - Adajan" },
        { latLng: [23.0225, 72.5714], name: "Ahmedabad" },
        { latLng: [22.3072, 73.1812], name: "Vadodara" },
        { latLng: [21.5222, 70.4579], name: "Rajkot" },
        { latLng: [20.5883, 72.9289], name: "Valsad" },
    ];

    return (
        <React.Fragment>
            <Col xl={12}>
                <Card>
                    <CardBody>
                        <div className="d-flex flex-wrap align-items-center mb-4">
                            <h5 className="card-title me-2">Branches by Location</h5>
                        </div>

                        <div id="sales-by-locations" data-colors='["#5156be"]' style={{ height: "500px" }}>
                            <div style={{ width: props.width, height: 500 }}>
                                <VectorMap
                                    map={"in_mill"}
                                    backgroundColor="transparent"
                                    normalizeFunction='polynomial'
                                    hoverOpacity={0.7}
                                    hoverColor={false}
                                    ref={map}
                                    containerStyle={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    regionStyle={{
                                        initial: {
                                            fill: "#e9e9ef",
                                            'fill-opacity': 0.9,
                                            stroke: "#fff",
                                            "stroke-width": 7,
                                            "stroke-opacity": 0.4,
                                        },
                                        hover: {
                                            'stroke': '#fff',
                                            'fill-opacity': 1,
                                            'stroke-width': 1.5,
                                            cursor: "pointer",
                                        },
                                        selected: {
                                            fill: "#2938bc", //what colour clicked country will be
                                        },
                                        selectedHover: {},
                                    }}
                                    markers={markers}
                                    markerStyle={{
                                        initial: {
                                            fill: "#00B3CF",        // Blue color for default
                                            stroke: "#ffffff",
                                            "stroke-width": 2,
                                            r: 6,
                                        },
                                        hover: {
                                            fill: "#34c38f",        // Green on hover
                                            stroke: "#ffffff",
                                            "stroke-width": 2,
                                            r: 8,
                                        }
                                    }}
                                    onMarkerTipShow={(event, label, index) => {
                                        const marker = markers[index];
                                          label.html(`
    <div style="
      background-color: #fff;
      color: #333;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 400;
      box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
      max-width: 240px;
      text-align: left;
      line-height: 1.6;
      border: none;
    ">
      <div style="font-size: 15px; font-weight: 600; color: #556ee6; margin-bottom: 4px;">
        ${marker.name}
      </div>
      <div><strong>📍 Address:</strong> Adajan Rd, Surat</div>
      <div><strong>✉️ Email:</strong> adajan@snaap.com</div>
      <div><strong>📞 Phone:</strong> +91 9876543212</div>
    </div>
  `);
                                    }}


                                    containerClassName="map"
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default Locations;