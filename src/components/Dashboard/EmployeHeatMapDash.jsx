import React, { useState } from "react";
import { useTable } from "react-table";
import { Box, Toolbar } from '@mui/material';

const data = [
  { id: 1, name: "Alice", age: 25, email: "alice@example.com" },
  { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
  { id: 3, name: "Charlie", age: 28, email: "charlie@example.com" },
  { id: 1, name: "Alice", age: 25, email: "alice@example.com" },
  { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
  { id: 3, name: "Charlie", age: 28, email: "charlie@example.com" },
  { id: 1, name: "Alice", age: 25, email: "alice@example.com" },
];

const columns = [
  { Header: "ID", accessor: "id" },
  { Header: "Name", accessor: "name" },
  { Header: "Age", accessor: "age" },
  { Header: "Email", accessor: "email" },
];

const EmployeHeatMapDash = ({ drawerWidth, collapsedDrawerWidth, desktopOpen }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleGenerateClick = () => {
    // console.log("Start Date:", startDate);
    // console.log("End Date:", endDate);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        transition: "margin 0.3s, width 0.3s",
        width: {
          xs: "100%",
          md: desktopOpen
            ? `calc(100% - ${drawerWidth}px)`
            : `calc(100% - ${collapsedDrawerWidth}px)`,
        },
        bgcolor: "background.default",
      }}
    >
      <Toolbar />
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-2">
          <h1 className="text-xl font-semibold sm:text-2xl mb-4 sm:mb-0" style={{color:'#003566'}}>
            Employee Message Statistics - Top 1000
          </h1>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="w-full sm:w-64 border border-gray-300 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="w-full sm:w-64 border border-gray-300 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleGenerateClick}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium shadow"
            >
              Generate
            </button>
          </div>
        </div>

        <main className="flex-grow px-6 py-4">
          <div className="overflow-x-auto rounded shadow bg-white">
            <table {...getTableProps()} className="min-w-full table-auto ">
              <thead className="bg-blue-700 text-white">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        className="px-6 py-3 text-left text-sm font-semibold"
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="hover:bg-gray-100">
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          className="px-6 py-4 text-sm text-gray-700 border-t"
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </Box>
  );
};

export default EmployeHeatMapDash;
