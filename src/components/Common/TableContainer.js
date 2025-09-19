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
import { Table, Row, Col, Button } from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";
import { Link } from "react-router-dom";
import { TbArrowNarrowUp, TbArrowNarrowDown } from "react-icons/tb";

//Import Flatpickr
import Flatpickr from "react-flatpickr";

// Global search filter
function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Col sm={4}>
      <div className="search-box mb-0 d-inline-block mt-1">
        <div className="position-relative">
          <label htmlFor="search-bar-0" className="search-label">
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
  handleCustomerClick,
  isAddCustList,
  customPageSize = 10,
  className,
  isAddInvoiceList,
  handleInvoiceClick,
  isBordered,
  theadClass,
  toggle,
  isOpenFillter,
  setIsOpenFillter,
  isFilterAdded = false,
  activeFilter = 0,
  onImport
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

  const onChangeInSelect = event => setPageSize(Number(event.target.value));

  const onChangeInInput = event => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  const exportVisibleToCSV = () => {
    if (!page || page.length === 0) return;
    // const headers = page[0].cells.map(cell => cell.column.Header || cell.column.id);

    const data = headerGroups[0]?.headers[0]?.preFilteredRows.map(row => row.original) || [];

    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    const csvRows = [
      headers.join(","), // header row
      ...data.map(row =>
        headers
          .map(header => {
            const cellValue = row[header] ?? "";
            // Escape double quotes
            return `"${cellValue.toString().replace(/"/g, '""')}"`;
          })
          .join(",")
      )
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "snaap_table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Responsive pagination logic
  const renderPagination = () => {
    const maxPagesToShow = 5;
    const pages = [];
    const startPage = Math.max(0, pageIndex - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(pageCount - 1, startPage + maxPagesToShow - 1);

    if (startPage > 0) {
      pages.push(
        <li key={0} className="page-item">
          <Link to="#" className="page-link" onClick={() => gotoPage(0)}>1</Link>
        </li>
      );
      if (startPage > 1) pages.push(<li key="start-ellipsis" className="page-item disabled"><span className="page-link">…</span></li>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${pageIndex === i ? "active" : ""}`}>
          <Link to="#" className="page-link" onClick={() => gotoPage(i)}>{i + 1}</Link>
        </li>
      );
    }

    if (endPage < pageCount - 1) {
      if (endPage < pageCount - 2) pages.push(<li key="end-ellipsis" className="page-item disabled"><span className="page-link">…</span></li>);
      pages.push(
        <li key={pageCount - 1} className="page-item">
          <Link to="#" className="page-link" onClick={() => gotoPage(pageCount - 1)}>{pageCount}</Link>
        </li>
      );
    }

    return pages;
  };

  return (
    <Fragment>
      <Row className="align-items-center g-3 mb-3">
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

        <Col sm={12} md={6}>
          <div className="d-flex justify-content-md-end justify-content-start flex-wrap gap-3">
            {isOpenFillter && (
              <button
                type="button"
                className="btn btn-outline-secondary position-relative"
                onClick={() => setIsOpenFillter(true)}
              >
                <i className="fas fa-filter me-1"></i> Filter
                {isFilterAdded && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    +{activeFilter}
                  </span>
                )}
              </button>
            )}
            <button className="btn btn-outline-danger btn-md" onClick={exportVisibleToCSV}>
              <i className="fas fa-download me-1"></i> Export
            </button>
            <button type="button" className="btn btn-primary btn-md" onClick={toggle}>
              <i className="fas fa-plus me-1"></i> Add New
            </button>
          </div>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table hover {...getTableProps()} className={className} bordered={isBordered}>
          <thead className={theadClass}>
            {headerGroups.map(headerGroup => {
              const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} {...restHeaderGroupProps}>
                  {headerGroup.headers.map(column => (
                    <th key={column.id} {...column.getSortByToggleProps()}>
                      {column.render("Header")} {generateSortingIndicator(column)}
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
                <tr key={idx}>
                  {row.cells.map(cell => (
                    <td key={cell.getCellProps().key}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Row className="align-items-center g-3 text-center text-sm-start mb-3">
        <div className="col-sm d-flex align-items-center flex-wrap gap-2">
          <span className="me-2 fw-normal">Show</span>
          <select className="form-select form-select-sm w-auto" value={pageSize} onChange={onChangeInSelect}>
            {[10, 20, 30, 50, 100].map((size, idx) => <option key={idx} value={size}>{size}</option>)}
          </select>
          <span className="ms-2 fw-normal">entries</span>
        </div>

        <div className="col-sm">
          <div>Showing <span className="fw-normal">{page.length}</span> of <span className="fw-normal">{data.length}</span> Results</div>
        </div>

        <div className="col-sm-auto">
          <ul className="pagination pagination-separated pagination-md justify-content-center justify-content-sm-start mb-0">
            <li className={!canPreviousPage ? "page-item disabled" : "page-item"}>
              <Link to="#" className="page-link" onClick={previousPage}>Previous</Link>
            </li>
            {renderPagination()}
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
