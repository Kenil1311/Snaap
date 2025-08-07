import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import { Table, Row, Col, Button, Input, InputGroup, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";
import { Link } from "react-router-dom";
import { TbArrowNarrowUp, TbArrowNarrowDown } from "react-icons/tb";

//Import Flatepicker
import Flatpickr from "react-flatpickr";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Col sm={4}>
      <div className="search-box mb-0 d-inline-block mt-1">
        <div className="position-relative">
          <label htmlFor="search-bar-0" className="search-label">
            <span id="search-bar-0-label" className="sr-only">
              Search this table
            </span>
            <input
              onChange={e => {
                setValue(e.target.value);
                onChange(e.target.value);
              }}
              id="search-bar-0"
              type="text"
              className="form-control"
              placeholder="Search records..."
              value={value || ""}
            />
          </label>
          <i className="bx bx-search-alt search-icon"></i>
        </div>
      </div>
    </Col>
  );
}

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  isAddOptions,
  // isAddUserList,
  handleOrderClicks,
  // handleUserClick,
  handleCustomerClick,
  isAddCustList,
  customPageSize,
  className,
  isAddInvoiceList,
  handleInvoiceClick,
  isBordered,
  theadClass,
  toggle,
  isOpenFillter,
  setIsOpenFillter,
  isFilterAdded = false, // Default value for isFilterAdded
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: customPageSize },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
  );

  const generateSortingIndicator = column => {
    return column.isSorted ? (column.isSortedDesc ? <TbArrowNarrowDown /> : <TbArrowNarrowUp />) : "";
  };

  const onChangeInSelect = event => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = event => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  const exportVisibleToCSV = () => {
    if (!page || page.length === 0) return;

    // Extract headers from visible columns
    const headers = page[0].cells.map(cell => cell.column.Header || cell.column.id);

    // Prepare CSV rows from the current page
    const csvRows = [
      headers.join(","), // header row
      ...page.map(row =>
        row.cells
          .map(cell =>
            `"${(cell.value ?? "").toString().replace(/"/g, '""')}"`
          )
          .join(",")
      )
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "snaap_table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Fragment>
      <Row>
        <Row className="align-items-center g-3 mb-3">
          {/* Search Field */}
          <Col sm={12} md={6}>
            {isGlobalFilter && (
              <div className="d-flex align-items-center">
                <label className="me-2 fw-semibold">Search:</label>
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </div>
            )}
          </Col>

          {/* Action Buttons */}
          <Col sm={12} md={6}>
            <div className="d-flex justify-content-md-end justify-content-start flex-wrap gap-3">
              {isOpenFillter && (
                <button
                  type="button"
                  className="btn btn-outline-secondary position-relative"
                  onClick={() => setIsOpenFillter(true)}
                >
                  <i className="fas fa-filter me-1"></i>
                  Filter{" "}
                  {isFilterAdded && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    +1{" "}
                    <span className="visually-hidden">
                      Filter added
                    </span>
                  </span>)}
                </button>
              )}
              <button className="btn btn-outline-success btn-md" onClick={exportVisibleToCSV}>
                <i className="fas fa-download me-1"></i> Export
              </button>
              <button type="button" className="btn btn-primary btn-md" onClick={toggle}>
                <i className="fas fa-plus me-1"></i> Add New
              </button>

            </div>
          </Col>
        </Row>
      </Row>

      <div className="table-responsive">
        <Table hover {...getTableProps()} className={className} bordered={isBordered}>
          <thead className={theadClass}>
            {headerGroups.map(headerGroup => {
              const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps(); // Extract key
              return (
                <tr key={key} {...restHeaderGroupProps}>
                  {headerGroup.headers.map(column => (
                    <th key={column.id}>
                      <div className="mb-2" {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {generateSortingIndicator(column)}
                      </div>
                      {/* <Filter column={column} /> */}
                    </th>
                  ))}
                </tr>
              );
            })}
          </thead>


          <tbody {...getTableBodyProps()}>
            {page.map((row, idx) => {
              prepareRow(row);
              return (
                <Fragment key={idx}>
                  <tr>
                    {row.cells.map((cell, index) => {
                      const { key, ...restCellProps } = cell.getCellProps(); // Extract key separately
                      return (
                        <td key={key} {...restCellProps}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Row className="align-items-center g-3 text-center text-sm-start mb-3">
        <div className="col-sm d-flex align-items-center">
          <span className="me-2 fw-normal">Show</span>
          <select
            className="form-select form-select-sm w-auto"
            value={pageSize}
            onChange={onChangeInSelect}
          >
            {[10, 20, 30, 40, 50].map((size, idx) => (
              <option key={idx} value={size}>{size}</option>
            ))}
          </select>
          <span className="ms-2 fw-normal">entries</span>
        </div>

        <div className="col-sm">
          <div>Showing<span className="fw-normal ms-1">{page.length}</span> of <span className="fw-normal">{data.length}</span> Results
          </div>
        </div>

        <div className="col-sm-auto">
          <ul className="pagination pagination-separated pagination-md justify-content-center justify-content-sm-start mb-0">
            <li className={!canPreviousPage ? "page-item disabled" : "page-item"}>
              <Link to="#" className="page-link" onClick={previousPage}>Previous</Link>
            </li>
            {pageOptions.map((item, key) => (
              <React.Fragment key={key}>
                <li className="page-item">
                  <Link to="#" className={pageIndex === item ? "page-link active" : "page-link"} onClick={() => gotoPage(item)}>{item + 1}</Link>
                </li>
              </React.Fragment>
            ))}
            <li className={!canNextPage ? "page-item disabled" : "page-item"}>
              <Link to="#" className="page-link" onClick={nextPage}>Next</Link>
            </li>
          </ul>
        </div>
      </Row>
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;