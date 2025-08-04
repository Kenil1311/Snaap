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

              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  position={[marker.lat, marker.lng]}
                  eventHandlers={{
                    click: () => setSelected(marker),
                  }}
                >
                  <Popup>
                    <div style={{ lineHeight: '1.6', fontSize: '14px' }}>
                      <div style={{ fontWeight: 'bold', color: '#556ee6' }}>{marker.name}</div>
                      <div><strong>📍 Address:</strong> Adajan Rd, Surat</div>
                      <div><strong>✉️ Email:</strong> adajan@snaap.com</div>
                      <div><strong>📞 Phone:</strong> +91 9876543212</div>
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
