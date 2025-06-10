import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import "./Dashboard.css";
import { Typography, Box, Toolbar } from '@mui/material';

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


function GroupAddMemebrDash({ drawerWidth, collapsedDrawerWidth, desktopOpen }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [showSelect, setShowSelect] = useState(false);
    const rowsPerPage = 5;
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

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setSelectedRowId(null);
    };


    // Form handling
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here (e.g., send message)
    };

    const handleChange = (event) => {
        setAge(event.target.value);
    };



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
            <div className="m-3" style={{ height: '100%' }}>
                <div className="overdata mb-3" style={{ justifyContent: 'space-between', display: 'flex' }}>
                    <Typography variant="h5" align="center" gutterBottom color='#003566' fontWeight="700">
                        Members in Group test
                    </Typography>

                </div>

                <div className="col-md-12 mb-5">
                    <Box
                        component="form"
                        sx={{ mx: 'auto' }}
                    >
                        <div className="row" >

                            <div className="col-md-12">

                                <button className='btn btn-primary'>
                                    Hidden
                                </button>
                                <button className='btn btn-success ml-2'>
                                    Member Only
                                </button>
                                <button className='btn btn-primary ml-2'>
                                    Moderated
                                </button>
                                <button className='btn btn-primary ml-2'>
                                    Password Protected
                                </button>

                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6  mt-3">
                                <lavel>Organization</lavel>
                                <input class="form-control" type="text" placeholder="Organization" aria-label="default input example" value="Organization for POC" readOnly />
                            </div>
                            <div className="col-md-6  mt-3">
                                <lavel>Organization Unit</lavel>
                                <input class="form-control" type="text" placeholder="Organization Unit" aria-label="default input example" value="OU for POC" readOnly />
                            </div>
                            <div className="col-md-6  mt-3">
                                <lavel>Group Title</lavel>
                                <input class="form-control" type="text" placeholder="Group Title" aria-label="default input example" value="Test" readOnly />
                            </div>
                            <div className="col-md-6  mt-3">
                                <lavel>Group Name</lavel>
                                <input class="form-control" type="text" placeholder="Group Name" aria-label="default input example" value="f0d3f18a7622a386" readOnly />
                            </div>
                            <div className="col-md-6 mt-3">
                                <lavel>Group Type</lavel>
                                <input class="form-control" type="text" placeholder="Group Type" aria-label="default input example" value="Temporary Group" readOnly />
                            </div>

                            <div className="col-md-6  mt-3">
                                <lavel>Group Purpose</lavel>
                                <input class="form-control" type="text" placeholder="Group Purpose" aria-label="default input example" value="Team" readOnly />
                            </div>

                            <div className="col-md-6 mt-3">
                                <lavel>Group Creation Mode</lavel>
                                <input class="form-control" type="text" placeholder="Group Creation Mode" aria-label="default input example" value="Planned" readOnly />
                            </div>

                            <div className="col-md-6  mt-3">
                                <lavel>Host Name</lavel>
                                <input class="form-control" type="text" placeholder="Host Name" aria-label="default input example" value="conference.fd6cca52.gims.gov.in" readOnly />
                            </div>
                            <div className="col-md-6 mt-3">
                                <lavel>Group Description</lavel>
                                <input class="form-control" type="text" placeholder="Group Description" aria-label="default input example" value="" readOnly />
                            </div>

                        </div>

                    </Box>
                </div>
                <div className="col-md-12" style={{ textAlign: "end" }}>
                    <div className="btn">
                        <button
                            type="button"
                            className="btn btn-primary mr-3 btn-bg-1"
                            onClick={() => setShowSelect((prev) => !prev)} // Toggle filter dropdown
                        >
                            Filter
                        </button>
                    </div>
                </div>

                {showSelect && (
                    <select className="form-select mt-2 mb-3" style={{ width: '300px' }}>
                        <option value="">Select an option</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                    </select>
                )}

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
                                            Group Member
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

                                            <Typography margin={2} >OU for POC</Typography>
                                            <hr />

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

export default GroupAddMemebrDash;
