import React, { useEffect, useState } from "react";
import Select from "react-select"
import Nouislider from 'nouislider-react';
import { useDispatch, useSelector } from "react-redux";
import { getBranches, getPathology, getSegments } from "../../store/actions";



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

const FilterSidebar = ({ isOpen, onClose, onApply, values }) => {

    const dispatch = useDispatch();


    const branches = useSelector(state => state.branch?.branches || []);
    const segments = useSelector(state => state.segment?.segments || []);
    const pathology = useSelector(state => state.pathology?.pathology || []);

    useEffect(() => {
        dispatch(getBranches());
        dispatch(getSegments());
        dispatch(getPathology());
    }, [dispatch]);

    const branchOptions = Object.values(
        branches.reduce((acc, branch) => {
            const city = branch.city;

            if (!acc[city]) {
                acc[city] = {
                    label: city,
                    options: []
                };
            }

            acc[city].options.push({
                label: branch.area,
                value: branch.id
            });

            return acc;
        }, {})
    );

    const segmentOptions = Object.values(
        segments.reduce((acc, sagment) => {
            const type = sagment.type;

            if (!acc[type]) {
                acc[type] = {
                    label: type,
                    options: []
                };
            }

            acc[type].options.push({
                label: sagment.name,
                value: sagment.id
            });

            return acc;
        }, {})
    );


    const pathologyOptions = pathology.map(sagment => ({
        label: sagment.name,
        value: sagment.id
    }));


    const [selectedBranchIds, setSelectedBranchIds] = useState([]);
    const [selectedSegments, setSelectedSegments] = useState([]);
    const [selectedPathology, setSelectedPathology] = useState([]);
    const [selectedGander, setSelectedGander] = useState(null);
    const [ageRange, setAgeRange] = useState([0, 100]);

    useEffect(() => {
        setSelectedBranchIds(values?.branches || []);
        setSelectedSegments(values?.segments || []);
        setSelectedPathology(values?.pathology || []);
        setAgeRange([values?.minAge, values?.maxAge] || [0, 100]);
        setSelectedGander(values?.gander)
    }, [values])

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
            minAge: ageRange[0],
            maxAge: ageRange[1]
        };

        if (selectedBranchIds?.length > 0 && selectedSegments?.length > 0 && selectedPathology?.length > 0 && !selectedGander && !ageRange[0] && !ageRange[1]) {
            onApply(null)
        }
        else {
            onApply(selected);
        }

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
                                Selected Range: <strong>{ageRange[0]?.toString() || "0"} - {ageRange[1]?.toString() || "100"}</strong> years
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
                                        value={
                                            (branchOptions || [])
                                                .flatMap(group => group.options || [])
                                                .filter(option => (selectedBranchIds || []).includes(option.value))
                                        }

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
                                        value={
                                            (segmentOptions || [])
                                                .flatMap(group => group.options || [])
                                                .filter(option => (selectedSegments || []).includes(option.value))
                                        }
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
                                        value={pathologyOptions.filter(option => selectedPathology.includes(option.value))}
                                        options={pathologyOptions}
                                        onChange={(selected) => {
                                            setSelectedPathology(selected.map(option => option.value));
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
                                        value={ganderOptions.find(gander => gander.value == selectedGander)}
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
