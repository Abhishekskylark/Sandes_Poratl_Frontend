import React, { useState, useEffect } from 'react';
import { Typography, Box, Toolbar, ButtonBase } from '@mui/material';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../redux/authSlice";

function OrganizationOverviewDash({ drawerWidth, collapsedDrawerWidth, desktopOpen }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const rowsPerPage = 5;
    const dispatch = useDispatch();
    const employeeState = useSelector((state) => state.employee);
    const tableData = employeeState.employees
    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);
    const totalPages = Math.ceil(tableData.length / rowsPerPage);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
                        <Button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                            Previous
                        </Button>
                    </li>
                    {pageNumbers.map((number) => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <Button className="page-link" onClick={() => handlePageChange(number)}>
                                {number}
                            </Button>
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
                        Organization for POC - OU Wise Statistics
                    </Typography>
                    <Typography variant="body2" align="center" color='#003566' gutterBottom>
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
                                <th>Action</th>
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
                                    <td>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className='btn-bg-1'
                                            sx={{ color: "#fff" }}
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

                                            </List>
                                        </Popover>
                                    </td>
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

export default OrganizationOverviewDash;