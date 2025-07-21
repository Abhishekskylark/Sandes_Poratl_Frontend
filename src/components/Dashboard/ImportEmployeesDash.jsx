import React, { useState , useEffect  } from 'react';
import Button from '@mui/material/Button';
import { Drawer, FormControl, InputLabel, Select, MenuItem, TextField, Typography, Box, Toolbar } from '@mui/material';
import "./Dashboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCommentSms } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../redux/authSlice";

function ImportEmployeesDash({ drawerWidth, collapsedDrawerWidth, desktopOpen }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [showSelect, setShowSelect] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const [open, setOpen] = useState(false); // State to control Drawer
    const [age, setAge] = useState(''); // State for the dropdown (age selection)
    const [imagePreview, setImagePreview] = useState(''); // State for image preview
    const dispatch = useDispatch();
    const employeeState = useSelector((state) => state.employee);
    const tableData = employeeState.employees
    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);
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
            // console.log(`Deleting row with ID: ${row.id}`);
        }
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setSelectedRowId(null);
    };
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















// import React, { useState } from 'react';
// import {
//     Drawer,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     TextField,
//     Typography,
//     Box,
//     Toolbar,
//     Button
// } from '@mui/material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faCommentSms } from '@fortawesome/free-solid-svg-icons';
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle
// } from '../ui/dialog';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import 'ag-grid-enterprise';
// import './Dashboard.css';
// import Json from "../../Json/Data.json"


// function ImportEmployeesDash({ drawerWidth = 240, collapsedDrawerWidth = 80, desktopOpen = true }) {
//     const [openNew, setOpenNew] = useState(false);
//     const [open, setOpen] = useState(false);
//     const [age, setAge] = useState('');
//     const [showSelect, setShowSelect] = useState(false);
//     const [imagePreview, setImagePreview] = useState('');
//     const [dialogOpen, setDialogOpen] = useState(false);
//     const [selectedRow, setSelectedRow] = useState(null);
//     const [openDialogId, setOpenDialogId] = useState(null);
//     const tableData = Json
//     const toggleDrawerNew = (open) => () => setOpenNew(open);
//     const toggleDrawer = (open) => () => setOpen(open);
//     const handleChange = (event) => setAge(event.target.value);

//     const handleDelete = (id) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete?');
//         if (confirmDelete) {
//             console.log(`Deleting row with ID: ${id}`);
//         }
//     };

//     const columnDefs = [
//         { headerName: 'ID', field: 'id', sortable: true, filter: true },
//         { headerName: 'Name', field: 'name', sortable: true, filter: true },
//         { headerName: 'Email', field: 'email', sortable: true, filter: true },
//         { headerName: 'Phone', field: 'phone', sortable: true, filter: true },
//         { headerName: 'City', field: 'city', sortable: true, filter: true },
//         { headerName: 'Role', field: 'role', sortable: true, filter: true },
//         { headerName: 'Status', field: 'status', sortable: true, filter: true },
//         {
//             headerName: 'Action',
//             field: 'action',
//             cellRendererFramework: (params) => {
//                 const isDialogOpen = openDialogId === params.data.id;
//                 const isActive = params.data.status === "Active";

//                 return (
//                     <div className="flex gap-2">
//                         <Dialog onOpenChange={(open) => setOpenDialogId(open ? params.data.id : null)}>
//                             <div className="flex gap-2">
//                                 {!isDialogOpen && (
//                                     <>
//                                         <DialogTrigger asChild>
//                                             <Button
//                                                 variant="outlined"
//                                                 size="small"
//                                                 className="btn-bg-1"
//                                                 sx={{ color: "#fff" }}
//                                             >
//                                                 {isActive ? "Actions" : "View"}
//                                             </Button>
//                                         </DialogTrigger>

//                                         {isActive && (
//                                             <Button
//                                                 variant="outlined"
//                                                 size="small"
//                                                 onClick={() => handleDelete(params.data.id)}
//                                             >
//                                                 Delete
//                                             </Button>
//                                         )}
//                                     </>
//                                 )}
//                             </div>

//                             <DialogContent className="sm:max-w-[980px]">
//                                 <DialogHeader>
//                                     <DialogTitle>
//                                         {isActive ? "Edit Profile" : "View Details"}
//                                     </DialogTitle>
//                                     <DialogDescription>
//                                         {isActive
//                                             ? "Make changes to your profile here. Click save when you're done."
//                                             : "Viewing details of the selected record."}
//                                     </DialogDescription>
//                                 </DialogHeader>

//                                 <table className="min-w-full table-auto border-collapse mt-4">
//                                     <thead>
//                                         <tr className="bg-slate-600 text-white">
//                                             <th className="border px-4 py-2">Header 1</th>
//                                             <th className="border px-4 py-2">Header 2</th>
//                                             <th className="border px-4 py-2">Header 3</th>
//                                             <th className="border px-4 py-2">Header 4</th>
//                                             <th className="border px-4 py-2">Header 5</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {[1, 2, 3, 4, 5].map((rowNum, index) => (
//                                             <tr
//                                                 key={index}
//                                                 className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
//                                             >
//                                                 {[1, 2, 3, 4, 5].map((colNum) => (
//                                                     <td key={colNum} className="border px-4 py-2">
//                                                         {`Row ${rowNum}, Col ${colNum}`}
//                                                     </td>
//                                                 ))}
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </DialogContent>
//                         </Dialog>
//                     </div>
//                 );
//             }
//         }

//     ];

//     const handleSubmit = (e) => {
//         e.preventDefault();
//     };

//     return (
//         <Box
//             component="main"
//             sx={{
//                 flexGrow: 1,
//                 p: 3,
//                 transition: 'margin 0.3s, width 0.3s',
//                 width: {
//                     xs: '100%',
//                     md: desktopOpen ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${collapsedDrawerWidth}px)`
//                 },
//                 bgcolor: 'background.default'
//             }}
//         >
//             <Toolbar />
//             <div className="m-3" style={{ height: '70vh' }}>
//                 <div className="overdata mb-3" style={{ justifyContent: 'space-between', display: 'flex' }}>
//                     <Typography variant="h5" color="#003566" fontWeight="700">Import Employees</Typography>
//                     <div>
//                         <button
//                             type="button"
//                             className="btn btn-primary mr-3 btn-bg-1"
//                             onClick={() => setShowSelect(prev => !prev)}
//                         >
//                             Help
//                         </button>
//                         <button type="button" className="btn btn-success" onClick={toggleDrawerNew(true)}>
//                             + New Upload
//                         </button>
//                     </div>
//                 </div>

//                 {showSelect && (
//                     <select className="form-select mt-2 mb-3" style={{ width: '300px' }}>
//                         <option value="">Select an option</option>
//                         <option value="1">Option 1</option>
//                         <option value="2">Option 2</option>
//                     </select>
//                 )}

//                 <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
//                     <AgGridReact
//                         rowData={tableData}
//                         columnDefs={columnDefs}
//                         pagination={true}
//                         paginationPageSize={5}
//                         domLayout="autoHeight"
//                     />
//                 </div>
//             </div>

//             {/* Global Dialog (outside AG Grid) */}
//             <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//                 <DialogContent className="sm:max-w-[980px]">
//                     <DialogHeader>
//                         <DialogTitle>
//                             {selectedRow?.status === "Active" ? "Edit Profile" : "View Details"}
//                         </DialogTitle>
//                         <DialogDescription>
//                             {selectedRow?.status === "Active"
//                                 ? "Make changes to your profile here. Click save when you're done."
//                                 : "Viewing details of the selected record."}
//                         </DialogDescription>
//                     </DialogHeader>
//                     <table className="min-w-full table-auto border-collapse mt-4">
//                         <thead>
//                             <tr className="bg-slate-600 text-white">
//                                 {[1, 2, 3, 4, 5].map(i => (
//                                     <th key={i} className="border px-4 py-2">Header {i}</th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {[1, 2, 3, 4, 5].map((row, i) => (
//                                 <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
//                                     {[1, 2, 3, 4, 5].map(col => (
//                                         <td key={col} className="border px-4 py-2">Row {row}, Col {col}</td>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </DialogContent>
//             </Dialog>

//             {/* Drawer: New Upload */}
//             <Drawer anchor="top" open={openNew} onClose={toggleDrawerNew(false)}>
//                 <div className="modal-content mt-14" style={{ padding: '2%' }}>
//                     <Typography variant="h6" mb={2} color="#003566" fontWeight="700">Import Employees</Typography>
//                     <form>
//                         <div className="row">
//                             <div className="col-md-6 mt-3">
//                                 <select className="form-select">
//                                     <option selected>Organization Unit</option>
//                                     <option value="1">One</option>
//                                     <option value="2">Two</option>
//                                     <option value="3">Three</option>
//                                 </select>
//                             </div>
//                         </div>
//                         <button type="submit" className="btn btn-success m-3">Save</button>
//                         <button type="button" className="btn btn-danger" onClick={toggleDrawerNew(false)}>Close</button>
//                     </form>
//                 </div>
//             </Drawer>

//             {/* Drawer: Send Message */}
//             <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
//                 <Box component="form" className="mt-14" onSubmit={handleSubmit} sx={{ p: 4, width: '100%', maxWidth: "80%", mx: 'auto' }}>
//                     <Typography variant="h4" textAlign="center" fontWeight="700" gutterBottom>Send Message</Typography>
//                     <div className="row">
//                         <div className="col-md-6 mt-3">
//                             <FormControl fullWidth margin="normal">
//                                 <InputLabel>Sandes Portal</InputLabel>
//                                 <Select value={age} onChange={handleChange}>
//                                     <MenuItem value={10}>Ten</MenuItem>
//                                     <MenuItem value={20}>Twenty</MenuItem>
//                                     <MenuItem value={30}>Thirty</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </div>
//                         <div className="col-md-6 mt-3">
//                             <TextField fullWidth margin="normal" label="To" value="OU for POC" InputProps={{ readOnly: true }} />
//                         </div>
//                         <div className="col-md-12 mt-3">
//                             <TextField fullWidth label="Message" multiline rows={4} />
//                         </div>
//                         <div className="col-md-3 mt-3">
//                             <FormControl>
//                                 <label><input type="checkbox" /> Include your name in message footer</label>
//                             </FormControl>
//                         </div>
//                         <div className="col-md-3 mt-3">
//                             <FormControl>
//                                 <label><input type="checkbox" /> Include your OU name in message footer</label>
//                             </FormControl>
//                         </div>
//                         <div className="col-md-12 mt-3">
//                             <Button variant="outlined" component="label">
//                                 Upload Files
//                                 <input hidden accept="image/*" type="file" onChange={(e) => {
//                                     const file = e.target.files[0];
//                                     if (file) {
//                                         const reader = new FileReader();
//                                         reader.onload = (event) => setImagePreview(event.target.result);
//                                         reader.readAsDataURL(file);
//                                     }
//                                 }} />
//                             </Button>
//                         </div>
//                         <div className="col-md-12 mt-3">
//                             {imagePreview && <Box mt={2}><img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: 200, objectFit: 'contain' }} /></Box>}
//                         </div>
//                     </div>
//                     <Box display="flex" mt={3}>
//                         <Button variant="outlined" sx={{ marginRight: "15px" }} onClick={toggleDrawer(false)}>Cancel</Button>
//                         <Button variant="contained" sx={{ marginRight: "15px" }} color="primary">
//                             <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "5px" }} /> Send Email
//                         </Button>
//                         <Button variant="contained" color="secondary">
//                             <FontAwesomeIcon icon={faCommentSms} style={{ marginRight: "5px" }} /> Send SMS
//                         </Button>
//                     </Box>
//                 </Box>
//             </Drawer>
//         </Box>
//     );
// }

// export default ImportEmployeesDash;
