import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBranches } from '../../store/actions';

// Fix default marker icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Locations = (props) => {

    const [selected, setSelected] = useState(null);

    const dispatch = useDispatch();

    const branches = useSelector(state => state.branch?.branches || []);

    useEffect(() => {
        dispatch(getBranches());
    }, [dispatch]);



    return (
        <Col xl={12}>
            <Card>
                <CardBody>
                    <div className="d-flex flex-wrap align-items-center mb-4">
                        <h5 className="card-title me-2">SNAAP Radiology & Diagnostic Centers</h5>
                    </div>

                    <div style={{ height: '500px', width: props.width || '100%' }}>
                        <MapContainer
                            center={[22.340111703767448, 72.5045502340445]} // Center of India
                            zoom={7}
                            style={{ height: "100%", width: "100%" }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {branches.map((marker, index) => {
                                if (marker?.latitude && marker?.longitude) {
                                    return (
                                        <Marker
                                            key={index}
                                            position={[marker?.latitude, marker?.longitude]}
                                            eventHandlers={{
                                                click: () => setSelected(marker),
                                            }}
                                        >
                                            <Popup>
                                                <div style={{ lineHeight: '1.6', fontSize: '14px' }}>
                                                    <div className='mb-2' style={{ fontWeight: 'bold', color: '#556ee6' }}>{marker.name} - {marker.area}</div>
                                                    <div className='mb-2'><strong>📍 Address:</strong>{marker.address_1 + marker.address_2 + marker.city + marker.state + marker.zip + marker.country}</div>
                                                    {marker.phone && (<div><strong> 📞 Phone: </strong> {marker.phone}</div>)}
                                                </div>
                                            </Popup>
                                        </Marker>
                                    )
                                }
                            })}
                        </MapContainer>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Locations;
