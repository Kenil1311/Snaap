import React, { useState } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Locations = (props) => {
    const [selected, setSelected] = useState(null);

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
            latitude: 21.323585382014564,
            longitude: 72.85372149153386,
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
            latitude: 21.29287950702769,
            longitude: 72.82076250771047,
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
            latitude: 21.29287950702769,
            longitude: 72.7713240319754,
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
            latitude: 21.267286377320417,
            longitude: 72.80428301579879,
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
            latitude: 21.246808669039474,
            longitude: 72.74935137609314
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
            latitude: 21.33381924686161,
            longitude: 72.9086531312395
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
            latitude: 20.965593720139175,
            longitude: 72.92032614039391
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
            latitude: 22.433388292489944,
            longitude: 73.17079302388392
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
            latitude: 23.112087260983426,
            longitude: 72.61598346285689
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
            latitude: 23.10703489039966,
            longitude: 72.54457233123955
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
            latitude: 22.392762652774564,
            longitude: 70.74830771286493
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
            latitude: 22.433388292489944,
            longitude: 73.22572466358955
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
            latitude: 23.112201427326987,
            longitude: 72.59286043850545
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
            latitude: 21.720089647763373,
            longitude: 72.99694598589022
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
            latitude: 23.04271473818183,
            longitude: 72.52900240734763,
        },
    ];

    const markers = [
        { lat: 28.6139, lng: 77.2090, name: "Delhi" },
        { lat: 19.0760, lng: 72.8777, name: "Mumbai" },
        { lat: 13.0827, lng: 80.2707, name: "Chennai" },
        { lat: 22.5726, lng: 88.3639, name: "Kolkata" },
        { lat: 12.9716, lng: 77.5946, name: "Bangalore" },
        { lat: 21.1702, lng: 72.8311, name: "Surat - City Center" },
        { lat: 21.2096, lng: 72.8570, name: "Surat - Adajan" },
        { lat: 23.0225, lng: 72.5714, name: "Ahmedabad" },
        { lat: 22.3072, lng: 73.1812, name: "Vadodara" },
        { lat: 21.5222, lng: 70.4579, name: "Rajkot" },
        { lat: 20.5883, lng: 72.9289, name: "Valsad" },
    ];

    return (
        <Col xl={12}>
            <Card>
                <CardBody>
                    <div className="d-flex flex-wrap align-items-center mb-4">
                        <h5 className="card-title me-2">SNAAP Radiology & Diagnostic Centers</h5>
                    </div>

                    <div style={{ height: '500px', width: props.width || '100%' }}>
                        <MapContainer
                            center={[22.9734, 78.6569]} // Center of India
                            zoom={5}
                            style={{ height: "100%", width: "100%" }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {branchesData.map((marker, index) => (
                                <Marker
                                    key={index}
                                    position={[marker.latitude, marker.longitude]}
                                    eventHandlers={{
                                        click: () => setSelected(marker),
                                    }}
                                >
                                    <Popup>
                                        <div style={{ lineHeight: '1.6', fontSize: '14px' }}>
                                            <div style={{ fontWeight: 'bold', color: '#556ee6' }}>{marker.branchName}</div>
                                            <div><strong>📍 Address:</strong>{marker.address1 + marker.address2 + marker.city + marker.state + marker.zip + marker.country}</div>
                                            {marker.phone && (<div><strong>📞 Phone:</strong>{marker.phone}</div>)}
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Locations;
