import React, { useState } from 'react';
import {  Typography, Box, Toolbar} from '@mui/material';


const tableData = [
    { id: 1, name: 'Amit Sharma', email: 'amit@example.com', phone: '9876543210', city: 'Delhi', role: 'Developer', status: 'Active' },
    { id: 2, name: 'Priya Singh', email: 'priya@example.com', phone: '8765432109', city: 'Mumbai', role: 'Designer', status: 'Inactive' },
    { id: 3, name: 'Rahul Verma', email: 'rahul@example.com', phone: '7654321098', city: 'Bangalore', role: 'Manager', status: 'Active' },
    { id: 4, name: 'Sneha Gupta', email: 'sneha@example.com', phone: '6543210987', city: 'Kolkata', role: 'Tester', status: 'Active' },
    { id: 5, name: 'Vikram Rao', email: 'vikram@example.com', phone: '5432109876', city: 'Chennai', role: 'Analyst', status: 'Inactive' },
    { id: 6, name: 'Anjali Mehta', email: 'anjali@example.com', phone: '4321098765', city: 'Pune', role: 'Developer', status: 'Active' },
    { id: 7, name: 'Karan Patel', email: 'karan@example.com', phone: '3210987654', city: 'Hyderabad', role: 'Designer', status: 'Inactive' },
    { id: 8, name: 'Neha Joshi', email: 'neha@example.com', phone: '2109876543', city: 'Ahmedabad', role: 'Manager', status: 'Active' },
    { id: 9, name: 'Ravi Kumar', email: 'ravi@example.com', phone: '1098765432', city: 'Jaipur', role: 'Tester', status: 'Active' },
    { id: 10, name: 'Suman Das', email: 'suman@example.com', phone: '0987654321', city: 'Lucknow', role: 'Analyst', status: 'Inactive' },
    { id: 11, name: 'Pooja Reddy', email: 'pooja@example.com', phone: '9876543211', city: 'Surat', role: 'Developer', status: 'Active' },
    { id: 12, name: 'Arjun Yadav', email: 'arjun@example.com', phone: '8765432110', city: 'Nagpur', role: 'Designer', status: 'Inactive' },
    { id: 13, name: 'Meera Nair', email: 'meera@example.com', phone: '7654321109', city: 'Bhopal', role: 'Manager', status: 'Active' },
    { id: 14, name: 'Suresh Menon', email: 'suresh@example.com', phone: '6543211098', city: 'Patna', role: 'Tester', status: 'Active' },
    { id: 15, name: 'Lakshmi Pillai', email: 'lakshmi@example.com', phone: '5432109987', city: 'Kochi', role: 'Analyst', status: 'Inactive' },
];


function PercapitaStatisticsDash({ drawerWidth, collapsedDrawerWidth, desktopOpen }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const rowsPerPage = 5;

    // Calculate total pages
    const totalPages = Math.ceil(tableData.length / rowsPerPage);

    // Get data for current page
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle popover open
    const handlePopoverOpen = (event, rowId) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowId(rowId);
    };

    // Handle popover close
    const handlePopoverClose = () => {
        setAnchorEl(null);
        setSelectedRowId(null);
    };

    // Handle menu item click
    const handleMenuItemClick = (action, rowId) => {
        // console.log(`Action: ${action} for Row ID: ${rowId}`);
        handlePopoverClose();
    };

    // Render pagination buttons
    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return (
            <nav className="d-flex justify-content-center mt-3">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                            Previous
                        </button>
                    </li>
                    {pageNumbers.map((number) => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(number)}>
                                {number}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        );
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
            <div className="m-3" style={{ height: '70vh' }}>
                <div className="overdata" style={{ justifyContent: 'space-between', display: 'flex' }}>
                    <Typography variant="h5" align="center" gutterBottom color='#003566' fontWeight="700">
                    Organization for POC - Percapita Messages
                    </Typography>
                    <Typography variant="body2" align="center" gutterBottom color='#003566'>
                        Data last updated at 27-04-2025 00:32:02
                    </Typography>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-bordered bgc-1">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>City</th>
                                <th>Role</th>
                                <th>Status</th>
                                {/* <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.name}</td>
                                    <td>{row.email}</td>
                                    <td>{row.phone}</td>
                                    <td>{row.city}</td>
                                    <td>{row.role}</td>
                                    <td>{row.status}</td>
                                    {/* <td>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className='btn-bg-1'
                                            sx={{color:"#fff"}}
                                            onClick={(event) => handlePopoverOpen(event, row.id)}
                                        >
                                            Actions
                                        </Button>
                                        <Popover
                                            open={Boolean(anchorEl) && selectedRowId === row.id}
                                            anchorEl={anchorEl}
                                            onClose={handlePopoverClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <List>
                                                <ListItem
                                                    button
                                                    component="a"
                                                    href="/MemberPage"
                                                    onClick={() => handleMenuItemClick('Member wise status', row.id)}
                                                >
                                                    <ListItemText primary="Member wise status" />
                                                </ListItem>

                                                <ListItem
                                                     button
                                                     component="a"
                                                     href="/HeatMap"
                                                    onClick={() => handleMenuItemClick('Heat Map', row.id)}
                                                >
                                                    <ListItemText primary="Heat Map based on chat activity" />
                                                </ListItem>
                                                <ListItem
                                                    button
                                                    onClick={() => handleMenuItemClick('APP Insights', row.id)}
                                                >
                                                    <ListItemText primary="APP Insights" />
                                                </ListItem>
                                            </List>
                                        </Popover>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {renderPagination()}
            </div>
         </Box>
    );
}

export default PercapitaStatisticsDash;