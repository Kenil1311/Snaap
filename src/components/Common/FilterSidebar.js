import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Select from "react-select"

const FilterSidebar = ({ isOpen, onClose, onApply }) => {

    const branchOptions = [
        { label: "Lal Darwaja - Surat", value: "ahmedabad" },
        { label: "Athwa - Surat", value: "surat" },
        { label: "Adajan - Surat", value: "vadodara" },
        { label: "Althan - Surat", value: "rajkot" },
        { label: "Vesu - Surat", value: "gandhinagar" },
        { label: "Sarthana - Surat", value: "bhavnagar" },
        { label: "Navsari", value: "jamnagar" },
        { label: "Race Course Road - Vadodara", value: "anand" },
        { label: "Maninagar - Ahmedabad", value: "nadiad" },
        { label: "Paldi - Ahmedabad", value: "vapi" },
        { label: "Rajkot", value: "Rajkot" },
        { label: "Karelibagh - Vadodara", value: "jamnagar" },
        { label: "Motera - Ahmedabad", value: "anand" },
        { label: "Bharuch", value: "nadiad" },
        { label: "Satellite - Ahmedabad", value: "vapi" }
    ];

    const sagmentOptions = [
        { label: "CBCT", value: "cbct" },
        { label: "OPG", value: "opg" }
    ];

    const [selectedBranchIds, setSelectedBranchIds] = useState([]);
    const [selectedSegments, setSelectedSegments] = useState([]);
    const [ageRange, setAgeRange] = useState([18, 60]);

    const clearFilters = () => {
        setSelectedBranchIds([]);
        setSelectedSegments([]);
        setAgeRange([18, 60]);
    };

    const handleApply = () => {
        const selected = {
            branches: selectedBranchIds,
            segments: selectedSegments,
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

                        {/* Branch Filter */}
                        <div className="mb-4">
                            <h5 className="text-uppercase text-muted small fw-bold mb-2">Branch</h5>


                            <div className="col-lg-12 col-md-12">
                                <div className="mb-3">
                                    <Select
                                        // defaultValue={[branchOptions[1]]}
                                        isMulti
                                        options={branchOptions}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        onChange={(e) => {
                                            console.log("e", e)
                                        }}

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
                                        // defaultValue={[sagmentOptions[1]]}
                                        options={sagmentOptions}
                                        className="basic-multi-select"
                                        classNamePrefix="select"

                                    />
                                </div>
                            </div>
                        </div>

                        {/* Age Range Filter */}
                        <div className="mb-4">
                            <h5 className="text-uppercase text-muted small fw-bold mb-3">Age Range</h5>
                            <Slider
                                getAriaLabel={() => 'Age range'}
                                value={ageRange}
                                onChange={(e, newVal) => setAgeRange(newVal)}
                                valueLabelDisplay="auto"
                                getAriaValueText={(val) => `${val}`}
                                min={0}
                                max={100}
                            />
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
