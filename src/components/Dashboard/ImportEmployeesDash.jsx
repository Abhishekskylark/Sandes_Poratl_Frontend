import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Drawer, FormControl, InputLabel, Select, MenuItem, TextField, Typography, Box, Toolbar } from '@mui/material';
import "./Dashboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCommentSms } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';


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

function ImportEmployeesDash({ drawerWidth, collapsedDrawerWidth, desktopOpen }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [showSelect, setShowSelect] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const [open, setOpen] = useState(false); // State to control Drawer
    const [age, setAge] = useState(''); // State for the dropdown (age selection)
    const [imagePreview, setImagePreview] = useState(''); // State for image preview

    const rowsPerPage = 5;
    const totalPages = Math.ceil(tableData.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (confirmDelete) {
            // Your delete logic (API call or state update)
            console.log(`Deleting row with ID: ${row.id}`);
        }
    };

    // const handlePopoverOpen = (event, rowId) => {
    //     setAnchorEl(event.currentTarget);
    //     setSelectedRowId(rowId);
    // };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setSelectedRowId(null);
    };

    // const handleMenuItemClick = (action, rowId) => {
    //     if (action === 'Send Sandes Message') {
    //         setOpen(true); // Open the drawer when "Send Sandes Message" is clicked
    //     }
    //     console.log(`Action: ${action} for Row ID: ${rowId}`);
    //     handlePopoverClose();
    // };

    // Form handling
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here (e.g., send message)
    };

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const toggleDrawerNew = (open) => () => {
        setOpenNew(open);
    };

    const toggleDrawer = (open) => () => {
        setOpen(open);
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
            <div className="m-3" style={{ height: '70vh' }}>
                <div className="overdata mb-3" style={{ justifyContent: 'space-between', display: 'flex' }}>
                    <Typography variant="h5" align="center" gutterBottom color='#003566' fontWeight="700">
                        Import Employees
                    </Typography>
                    <div className="button">
                        <button
                            type="button"
                            className="btn btn-primary mr-3 btn-bg-1"
                            onClick={() => setShowSelect((prev) => !prev)} // Toggle filter dropdown
                        >
                            Help
                        </button>

                        <button type="button" class="btn btn-success" onClick={toggleDrawerNew(true)}>
                            + New Upload
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
                                        {/* <Button
                                            variant="outlined"
                                            size="small"
                                            className='btn-bg-1'
                                            sx={{ color: "#fff" }}
                                            onClick={(event) => handlePopoverOpen(event, row.id)}
                                        >
                                            Actions
                                        </Button> */}
                                        <Dialog>
                                            <div className='flex gap-3'>
                                                {/* Show Actions or View based on status */}
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        className='btn-bg-1'
                                                        sx={{ color: "#fff" }}
                                                    >
                                                        {row.status === "Active" ? "Actions" : "View"}
                                                    </Button>
                                                </DialogTrigger>

                                                {/* Delete button only if status is Active */}
                                                {row.status === "Active" && (
                                                    <Button variant="outline" onClick={handleDelete}>
                                                        Delete
                                                    </Button>
                                                )}
                                            </div>

                                            {/* Common Dialog Content for both Actions & View */}
                                            <DialogContent className="sm:max-w-[980px]">
                                                <DialogHeader>
                                                    <DialogTitle>{row.status === "Active" ? "Edit profile" : "View Details"}</DialogTitle>
                                                    <DialogDescription>
                                                        {row.status === "Active"
                                                            ? "Make changes to your profile here. Click save when you're done."
                                                            : "Viewing details of the selected record."}
                                                    </DialogDescription>
                                                </DialogHeader>

                                                {/* Table Content */}
                                                <table className="min-w-full table-auto border-collapse">
                                                    <thead>
                                                        <tr className="bg-slate-600">
                                                            <th className="border px-4 py-2">Header 1</th>
                                                            <th className="border px-4 py-2">Header 2</th>
                                                            <th className="border px-4 py-2">Header 3</th>
                                                            <th className="border px-4 py-2">Header 4</th>
                                                            <th className="border px-4 py-2">Header 5</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {[1, 2, 3, 4, 5].map((rowNum, index) => (
                                                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}>
                                                                {[1, 2, 3, 4, 5].map((colNum) => (
                                                                    <td key={colNum} className="border px-4 py-2">
                                                                        {`Row ${rowNum}, Col ${colNum}`}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </DialogContent>
                                        </Dialog>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {renderPagination()}
            </div>

            <Drawer anchor="top" open={openNew} onClose={toggleDrawerNew(false)}>
                <div class="modal-content mt-14" style={{ padding: "2%" }}>
                    <div class="modal-header">
                        {/* <h5 class="modal-title" id="exampleModalLabel">New Organization Unit [Ministry for POC]</h5> */}
                        <Typography variant="h6" mb={2} color='#003566' fontWeight="700">Import Employees</Typography>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>
                        <div className="row">

                            <div className="col-md-6  mt-3">
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Organization Unit</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-success m-3">Save</button>
                        <button type="submit" class="btn btn-danger">Close</button>
                    </form>
                </div>
            </Drawer>

            {/* Drawer for Send Sandes Message */}
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
                <Box
                    component="form"
                    className='mt-14'
                    onSubmit={handleSubmit}
                    sx={{ p: 4, width: '100%', maxWidth: "80%", mx: 'auto' }}
                >
                    <Typography variant="h4" textAlign="center" fontWeight="700" gutterBottom>
                        Send Message
                    </Typography>
                    <div className="row">
                        <div className="col-md-6 mt-3">
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="demo-simple-select-label">Sandes Portal</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Sender ID/App"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-md-6 mt-3">
                            <TextField
                                fullWidth
                                margin="normal"
                                label="To"
                                value="OU for POC
             "
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>

                        <div className="col-md-12 mt-3">
                            <TextField
                                fullWidth
                                margin="normal"
                                name="message"
                                label="Message"
                                multiline
                                rows={4}
                            />
                        </div>
                        <div className="col-md-3 mt-3">
                            <FormControl>
                                <label>
                                    <input type="checkbox" name="Include your name in message footer" /> Include your name in message footer
                                </label>
                            </FormControl>
                        </div>
                        <div className="col-md-3 mt-3">
                            <FormControl>
                                <label>
                                    <input type="checkbox" name="Include your OU name in message footer" /> Include your OU name in message footer
                                </label>
                            </FormControl>
                        </div>
                        <div className="col-md-12 mt-3">
                            <Button variant="outlined" component="label">
                                Upload Files
                                <input
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = (event) => {
                                                setImagePreview(event.target.result);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </Button>
                        </div>
                        <div className="col-md-12 mt-3">
                            {imagePreview && (
                                <Box mt={2}>
                                    <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: 200, objectFit: 'contain' }} />
                                </Box>
                            )}

                        </div>

                    </div>



                    <Box display="flex" mt={3}>
                        <Button variant="outlined" sx={{ marginRight: "15px" }} onClick={toggleDrawer(false)}>Cancel</Button>
                        <Button variant="contained" sx={{ marginRight: "15px" }} color="primary"> <FontAwesomeIcon icon={faEnvelope} fontSize="20px" style={{ marginRight: "5px" }} /> Send Email</Button>
                        <Button variant="contained" color="secondary"> <FontAwesomeIcon icon={faCommentSms} fontSize="20px" style={{ marginRight: "5px" }} /> Send SMS</Button>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
}

export default ImportEmployeesDash
