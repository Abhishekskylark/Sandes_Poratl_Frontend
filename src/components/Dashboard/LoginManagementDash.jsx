import React, { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {
    Drawer, FormControl, InputLabel, Select, MenuItem, TextField, Button,
    Typography, Box, Toolbar
} from '@mui/material';
import "./Dashboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faMessage, faPlus, faXmark, faCircleInfo, faPenToSquare, faHouse, faEnvelope, faTrash, faMagnifyingGlass, faGear, faUsersLine, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { DiAndroid } from "react-icons/di";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { useDispatch, useSelector } from "react-redux";
import { fetchDesignation, fetchMember, fetchOrganizationUnit } from "../../redux/authSlice";


function LoginManagementDash({ drawerWidth, collapsedDrawerWidth, desktopOpen }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [showSelect, setShowSelect] = useState(false);
    const [open, setOpen] = useState(false); // State to control Drawer
    const [openDownload, setOpenDownload] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openRole, setOpenRole] = useState(false);
    const [openGroup, setOpenGroup] = useState(false);
    const [openGroupAdmin, setOpenGroupAdmin] = useState(false);
    const [openTransfer, setOpenTransfer] = useState(false);
    const [openOffboard, setOpenOffboard] = useState(false);
    const [age, setAge] = useState(''); // State for the dropdown (age selection)
    const [imagePreview, setImagePreview] = useState(''); // State for image preview
    const [imagePreviewProfile, setImagePreviewProfile] = useState('');
    const [filteredTableData, setFilteredTableData] = useState([]);
    const [columns, setColumns] = useState([]);
    const dispatch = useDispatch();
    const memberState = useSelector((state) => state.member);
    const designationState = useSelector((state) => state.designation);
    const organizationUnitState = useSelector((state) => state.organizationUnit);

    const tableData = memberState.member
    const Designation = designationState.designation
    const OrganizationUnit = organizationUnitState.organizationUnit?.data

    console.log("tableData", Designation, tableData);


    useEffect(() => {
        dispatch(fetchMember());
        dispatch(fetchDesignation());
        dispatch(fetchOrganizationUnit());

    }, [dispatch]);


    const [formData, setFormData] = useState({
        organizationCode: '',
        organizationType: '',
        organizationName: '',
        vhost: '',
        orgVisibility: '',
        publicVisibility: ''
    });


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePopoverOpen = (event, rowId) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowId(rowId);
    };

    useEffect(() => {
        if (tableData && Designation.length && OrganizationUnit?.length
        ) {

            // Remove duplicate rows based on `user_id` or `id`
            const uniqueRowsMap = new Map();
            tableData.forEach(row => {
                if (!uniqueRowsMap.has(row.user_id)) {  // change to 'id' if you want to filter by 'id'
                    uniqueRowsMap.set(row.user_id, row);
                }
            });
            const uniqueTableData = Array.from(uniqueRowsMap.values());

            // Set filtered data
            setFilteredTableData(uniqueTableData);

            // Define Columns
            const displayColumns = [
                { field: 'id', headerName: 'ID', sort: 'asc' },
                { field: 'name', headerName: 'Name' },
                { field: 'employee_code', headerName: 'Code' },
                { field: 'designation_code', headerName: 'Designation' },
                { field: 'email', headerName: 'Email' },
                { field: 'mobile_no', headerName: 'Mobile' },
                { field: 'ou_id', headerName: 'OU' },
                { field: 'action', headerName: 'Action' }
            ];

            const formattedColumns = displayColumns.map(col => {
                if (col.field === 'designation_code') {
                    return {
                        ...col,
                        valueGetter: (params) => {
                            const match = Designation.find(item => item.id === params.data.designation_code);
                            return match ? match.designation_name : '';
                        },
                        flex: 1,
                        resizable: true,
                    };
                }
                else if (col.field === 'ou_id') {
                    return {
                        ...col,
                        valueGetter: (params) => {
                            const match = OrganizationUnit.find(item => item.ou_id === params.data.ou_id);
                            return match ? match.ou_name : '';
                        },
                        flex: 1,
                        resizable: true,
                    };
                } else if (col.field === 'action') {
                    return {
                        ...col,
                        cellRenderer: (params) => (
                            <Button
                                variant="outlined"
                                sx={{ color: '#fff', backgroundColor: '#003566', fontSize: ".8rem" }}
                                onClick={(event) => handlePopoverOpen(event, params.data)}
                            >
                                Actions
                            </Button>
                        ),
                        flex: 1,
                        resizable: true,
                    };
                }
                else {
                    return {
                        ...col,
                        headerName: formatHeader(col.headerName || col.field),
                        flex: 1,
                        resizable: true,
                    };
                }
            });

            setColumns(formattedColumns);
        }
    }, [tableData, Designation, OrganizationUnit]);


    const formatHeader = (field) => {
        return field
            .replace(/_/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
    };


    const handlePopoverClose = () => {
        setAnchorEl(null);
        setSelectedRowId(null);
    };

    const handleMenuItemClick = (action, rowId) => {
        if (action === 'Send Sandes Message') {
            if (rowId) {
                setFormData({
                    organizationCode: rowId.id || '',
                    organizationType: rowId.email || '',
                    organizationName: rowId.name || '',
                    vhost: rowId.phone || '',
                    orgVisibility: rowId.city || '',
                    publicVisibility: rowId.role || '',
                });
            }
            setOpen(true); // Open the drawer when "Send Sandes Message" is clicked        
        }
        if (action === "Change Profile Photo") {
            if (rowId) {
                setFormData({
                    organizationCode: rowId.id || '',
                    organizationType: rowId.email || '',
                    organizationName: rowId.name || '',
                    vhost: rowId.phone || '',
                    orgVisibility: rowId.city || '',
                    publicVisibility: rowId.role || '',
                });
            }
            setOpenProfile(true);
        }
        if (action === 'View Details') {
            if (rowId) {
                setFormData({
                    organizationCode: rowId.id || '',
                    organizationType: rowId.email || '',
                    organizationName: rowId.name || '',
                    vhost: rowId.phone || '',
                    orgVisibility: rowId.city || '',
                    publicVisibility: rowId.role || '',
                });
            }
            setOpenDetails(true);
        }
        if (action === 'Edit Details') {
            if (rowId) {
                setFormData({
                    organizationCode: rowId.id || '',
                    organizationType: rowId.email || '',
                    organizationName: rowId.name || '',
                    vhost: rowId.phone || '',
                    orgVisibility: rowId.city || '',
                    publicVisibility: rowId.role || '',
                });
            }
            setOpenEdit(true);
        }
        if (action === 'Delete Member') {
            if (rowId) {
                setFormData({
                    organizationCode: rowId.id || '',
                    organizationType: rowId.email || '',
                    organizationName: rowId.name || '',
                    vhost: rowId.phone || '',
                    orgVisibility: rowId.city || '',
                    publicVisibility: rowId.role || '',
                });
            }
            setOpenDelete(true);
        }
        if (action === 'Manage Roles/Privileges') {
            if (rowId) {
                setFormData({
                    organizationCode: rowId.id || '',
                    organizationType: rowId.email || '',
                    organizationName: rowId.name || '',
                    vhost: rowId.phone || '',
                    orgVisibility: rowId.city || '',
                    publicVisibility: rowId.role || '',
                });
            }
            setOpenRole(true);
        }
        if (action === 'Manage Groups') {
            if (rowId) {
                setFormData({
                    organizationCode: rowId.id || '',
                    organizationType: rowId.email || '',
                    organizationName: rowId.name || '',
                    vhost: rowId.phone || '',
                    orgVisibility: rowId.city || '',
                    publicVisibility: rowId.role || '',
                });
            }
            setOpenGroup(true);
        }
        if (action === 'Manage Groups Admin') {
            if (rowId) {
                setFormData({
                    organizationCode: rowId.id || '',
                    organizationType: rowId.email || '',
                    organizationName: rowId.name || '',
                    vhost: rowId.phone || '',
                    orgVisibility: rowId.city || '',
                    publicVisibility: rowId.role || '',
                });
            }
            setOpenGroupAdmin(true);
        }
        if (action === 'Transfer Member') {
            if (rowId) {
                setFormData({
                    organizationCode: rowId.id || '',
                    organizationType: rowId.email || '',
                    organizationName: rowId.name || '',
                    vhost: rowId.phone || '',
                    orgVisibility: rowId.city || '',
                    publicVisibility: rowId.role || '',
                });
            }
            setOpenTransfer(true);
        }
        if (action === 'Offboard Member') {
            if (rowId) {
                setFormData({
                    organizationCode: rowId.id || '',
                    organizationType: rowId.email || '',
                    organizationName: rowId.name || '',
                    vhost: rowId.phone || '',
                    orgVisibility: rowId.city || '',
                    publicVisibility: rowId.role || '',
                });
            }
            setOpenOffboard(true);
        }
        // console.log(`Action: ${action} for Row ID: ${rowId}`);
        handlePopoverClose();
    };

    // Form handling
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here (e.g., send message)
    };

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const toggleDrawerDownload = (open) => () => {
        setOpenDownload(open);
    };
    const toggleDrawerNew = (open) => () => {
        setOpenNew(open);
    };
    const toggleDrawer = (open) => () => {
        setOpen(open);
    };

    const toggleDrawerProfile = (open) => () => {
        setOpenProfile(open);
    };

    const toggleDrawerDetails = (open) => () => {
        setOpenDetails(open);
    };
    const toggleDrawerEdit = (open) => () => {
        setOpenEdit(open);
    };
    const toggleDrawerDelete = (open) => () => {
        setOpenDelete(open);
    };
    const toggleDrawerRole = (open) => () => {
        setOpenRole(open);
    };
    const toggleDrawerGroup = (open) => () => {
        setOpenGroup(open);
    };
    const toggleDrawerGroupAdmin = (open) => () => {
        setOpenGroupAdmin(open);
    };
    const toggleDrawerTransfer = (open) => () => {
        setOpenTransfer(open);
    };
    const toggleDrawerOffboard = (open) => () => {
        setOpenOffboard(open);
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
            <div className="m-3">
                <div className="overdata mb-3" style={{ justifyContent: 'space-between', display: 'flex' }}>
                    <Typography variant="h5" align="center" gutterBottom color='#003566' fontWeight="700">
                        Employee/Login Management
                    </Typography>
                    <div className="button">
                        {/* <button
                            type="button"
                            className="btn btn-primary mr-3 btn-bg-1"
                            onClick={() => setShowSelect((prev) => !prev)} // Toggle filter dropdown
                        >
                            Filter
                        </button> */}
                        <button
                            type="button"
                            className="btn btn-primary mr-3 btn-bg-1"
                            onClick={() => handleMenuItemClick('Send Sandes Message', 1)}// Toggle filter dropdown
                        >
                            Sandes Message
                        </button>

                        <button type="button" class="btn btn-primary mr-3 btn-bg-1" onClick={toggleDrawerDownload(true)}>
                            Download
                        </button>

                        <button type="button" class="btn btn-success" onClick={toggleDrawerNew(true)}>
                            + New
                        </button>




                    </div>
                </div>

                {/* {showSelect && (
                    <select className="form-select mt-2 mb-3" style={{ width: '300px' }}>
                        <option value="">Select an option</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                    </select>
                )} */}

                <div className="ag-theme-alpine" style={{ height: 539, width: '100%', padding: '10px', borderRadius: '10px' }}>
                    <AgGridReact
                        rowData={filteredTableData}
                        columnDefs={columns}
                        defaultColDef={{ sortable: true, filter: true, resizable: true }}
                        pagination={true}
                        paginationPageSize={10}
                        animateRows={true}
                    />
                </div>

                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                >
                    <List>
                        <Typography margin={2} >OU for POC</Typography>
                        <hr />

                        <ListItem button onClick={() => handleMenuItemClick('Send Sandes Message', selectedRowId)}>
                            <FontAwesomeIcon icon={faEnvelope} className='mr-1' style={{ color: "#158cba" }} />  <ListItemText primary="Send Sandes Message" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => handleMenuItemClick('Change Profile Photo', selectedRowId)}
                        >
                            <FontAwesomeIcon className='mr-1' style={{ color: "#158cba" }} icon={faCamera} />  <ListItemText primary="Change Profile Photo" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => handleMenuItemClick('View Details', selectedRowId)}
                        >
                            <FontAwesomeIcon className='mr-1' style={{ color: "#158cba" }} icon={faMagnifyingGlass} />  <ListItemText primary="View Details" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => handleMenuItemClick('Edit Details', selectedRowId)}
                        >
                            <FontAwesomeIcon className='mr-1' style={{ color: "#158cba" }} icon={faPenToSquare} />  <ListItemText primary="Edit Details" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => handleMenuItemClick('Delete Member', selectedRowId)}
                        >
                            <FontAwesomeIcon className='mr-1' icon={faTrash} style={{ color: "#ff0000b8" }} />   <ListItemText primary="Delete Member" />
                        </ListItem>
                        <hr />
                        <ListItem
                            button
                            onClick={() => handleMenuItemClick('Manage Roles/Privileges', selectedRowId)}
                        >
                            <FontAwesomeIcon icon={faGear} className='mr-1' style={{ color: "green" }} /> <ListItemText primary="Manage Roles/Privileges" />
                        </ListItem>
                        <ListItem
                            button

                            onClick={() => handleMenuItemClick('Manage Groups', selectedRowId)}
                        >
                            <FontAwesomeIcon icon={faUsersLine} className='mr-1' style={{ color: "#158cba" }} /> <ListItemText primary="Manage Groups" />
                        </ListItem>
                        <ListItem
                            button

                            onClick={() => handleMenuItemClick('Manage Groups Admin', selectedRowId)}
                        >
                            <FontAwesomeIcon icon={faUsersLine} className='mr-1' style={{ color: "#158cba" }} /> <ListItemText primary="Manage Groups Admin" />
                        </ListItem>
                        <ListItem
                            button

                            onClick={() => handleMenuItemClick('Transfer Member', selectedRowId)}
                        >
                            <FontAwesomeIcon icon={faTelegram} className='mr-1' style={{ color: "#158cba" }} /> <ListItemText primary="Transfer Member" />
                        </ListItem>
                        <ListItem
                            button

                            onClick={() => handleMenuItemClick('Offboard Member', selectedRowId)}
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} className='mr-1' style={{ color: "#158cba" }} /> <ListItemText primary="Offboard Member" />
                        </ListItem>

                    </List>
                </Popover>

            </div>

            <Drawer anchor="top" open={openNew} onClose={toggleDrawerNew(false)}>
                <div class="modal-content mt-14" style={{ padding: "2%" }}>
                    <div class="modal-header">
                        {/* <h5 class="modal-title" id="exampleModalLabel">New Organization Unit [Ministry for POC]</h5> */}
                        <Typography variant="h5" color='#003566' fontWeight="700" mb={2}>Register Members</Typography>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>


                        <div className="row">
                            <div className="col-md-4">
                                <Typography variant="h6" mb={2} mt={2} textAlign="center" color='#003566' fontWeight="700">Instructions</Typography>
                                <Typography variant="p" mb={2} mt={2} textAlign="center">1. Administrative privileges may be assigned using Role Management available in Action Menu of Members List</Typography> <br />
                                <Typography variant="p" mb={2} mt={2} textAlign="center">2. Profile photos may be updated using photo Action Menu available in Members List
                                </Typography>


                            </div>
                            <div className="row col-md-8">
                                <Typography variant="h6" mb={2} mt={2} textAlign="center" color='#003566' fontWeight="700">Organization Details - Organization for POC</Typography>

                                <div className="col-md-6  mt-3">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>Organization unit</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="col-md-3  mt-3">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>State</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="col-md-3  mt-3">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>District</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <Typography variant="h6" mb={2} mt={2} textAlign="center" color='#003566' fontWeight="700">Basic Details</Typography>
                                <div className="col-md-6 mt-3">
                                    <input class="form-control" type="text" placeholder="Employee code" aria-label="default input example" />
                                </div>
                                <div className="col-md-6  mt-3">
                                    <input class="form-control" type="text" placeholder="Employee name" aria-label="default input example" />
                                </div>
                                <div className="col-md-6  mt-3">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>Designation</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="col-md-6  mt-3">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>Gender</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <Typography variant="h6" mb={2} mt={2} textAlign="center" color='#003566' fontWeight="700">Contact Details</Typography>
                                <div className="col-md-6 mt-3">
                                    <input class="form-control" type="text" placeholder="Email address" aria-label="default input example" />
                                </div>

                                <div className="col-md-6  mt-3">
                                    <input class="form-control" type="text" placeholder="Alternate email address" aria-label="default input example" />
                                </div>

                                <div className="col-md-6 mt-3">
                                    <input class="form-control" type="text" placeholder="Mobile number" aria-label="default input example" />
                                </div>

                                <div className="button">
                                    <button type="submit" class="btn btn-success m-3">Save</button>
                                    <button type="submit" class="btn btn-danger">Close</button>
                                </div>
                            </div>
                        </div>


                    </form>
                </div>
            </Drawer>
            <Drawer anchor="top" open={openDownload} onClose={toggleDrawerDownload(false)}>
                <div class="modal-content mt-14" style={{ padding: "2%" }}>
                    <div class="modal-header">
                        {/* <h5 class="modal-title" id="exampleModalLabel">New Organization Unit [Ministry for POC]</h5> */}
                        <Typography variant="h5" mb={2} fontWeight="700" color='#003566'>Set Password For Csv</Typography>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>

                        <Typography variant="h6" mb={2} mt={2} textAlign="center" color='red'>Some anti-virus softwares makes the downloaded file corrupted because of encryption. In such situation, try downloading by disabling the antivirus temporarily.</Typography>

                        <div className="row">

                            <div className="col-md-6 mt-3">
                                <input class="form-control" type="password" placeholder="New password" aria-label="default input example" />
                            </div>

                            <div className="col-md-6  mt-3">
                                <input class="form-control" type="password" placeholder="Confirm password" aria-label="default input example" />
                            </div>



                        </div>
                        <button type="submit" class="btn btn-success m-3">Submit</button>
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
                    <Typography variant="h4" textAlign="center" fontWeight="700" gutterBottom color='#003566'>
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
                        <Button variant="contained" color="success"> <FontAwesomeIcon icon={faMessage} fontSize="20px" style={{ marginRight: "5px" }} /> Send Message</Button>
                    </Box>
                </Box>
            </Drawer>

            <Drawer anchor="top" open={openProfile} onClose={toggleDrawerProfile(false)}>
                <Box
                    component="form"
                    className='mt-14'
                    // onSubmit={handleSubmit}
                    sx={{ p: 4, width: '100%', maxWidth: "80%", mx: 'auto' }}
                >
                    <Typography className='mb-5' variant="h4" textAlign="center" fontWeight="700" gutterBottom color='#003566'>
                        Upload Photo
                    </Typography>

                    <div className="row" >
                        <div className="col-md-6">
                            {imagePreviewProfile !== "" ? (
                                <Box mt={2}>
                                    <img src={imagePreviewProfile} alt="Preview" style={{ width: "140px", height: "140px", borderRadius: "80px", border: "1px solid" }} />
                                </Box>
                            )
                                : (
                                    <Box mt={2}>
                                        <img src="assets/images/userProfile.webp" alt="Preview" style={{ width: "140px", height: "140px", borderRadius: "80px", border: "1px solid" }} />
                                    </Box>
                                )}



                            <Button variant="outlined" className='mt-4' component="label" >
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
                                                setImagePreviewProfile(event.target.result);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </Button>
                            {imagePreviewProfile !== "" ? (
                                <Button type="submit" class="btn btn-success ml-2  mt-4">Submit</Button>
                            ) :
                                (
                                    <></>
                                )

                            }

                        </div>
                        <div className="col-md-6">
                            <Typography className='mb-3' variant="h5" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                                <FontAwesomeIcon icon={faCircleInfo} className='mr-2' /> Image Upload Specifications
                            </Typography>
                            <ol>
                                <li>1. Image should be of the format jpg, jpeg.</li>
                                <li>2. Click browse button to choose image.</li>
                                <li>3. Move the image to adjust.</li>
                                <li>4. Click Browse/Change button to upload/change image.</li>
                            </ol>
                        </div>
                    </div>

                </Box>
            </Drawer>

            <Drawer anchor="top" open={openDetails} onClose={toggleDrawerDetails(false)}>
                <Box
                    component="form"
                    className='mt-14'
                    // onSubmit={handleSubmit}
                    sx={{ p: 4, width: '100%', maxWidth: "80%", mx: 'auto' }}
                >
                    <Typography className='mb-5' variant="h4" textAlign="center" color='#003566' fontWeight="700" gutterBottom>
                        Employee Profile
                    </Typography>

                    <div className="row" >
                        <div className="col-md-6">

                            <Box mt={2}>
                                <img src="assets/images/userProfile.webp" alt="Preview" style={{ width: "140px", height: "140px", borderRadius: "80px", border: "1px solid" }} />
                            </Box>

                        </div>
                        <div className="col-md-6">
                            <Typography className='mb-3' variant="h5" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                                Ankur Deep Jaiswal (POC)
                            </Typography>
                            <button className='btn btn-success'>
                                Registeard
                            </button>
                            <button className='btn btn-success ml-2'>
                                Active
                            </button>

                            <DiAndroid fontSize="40px" className='mt-2' />
                            <button className='btn btn-info mt-2'>
                                2.2.55
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6  mt-3">
                            <lavel>Employee Code	</lavel>
                            <input class="form-control" type="text" placeholder="Employee Code" aria-label="default input example" value="9744167805" readOnly />
                        </div>
                        <div className="col-md-6  mt-3">
                            <lavel>Organization</lavel>
                            <input class="form-control" type="text" placeholder="Organization" aria-label="default input example" value="Organization for POC" readOnly />
                        </div>
                        <div className="col-md-6  mt-3">
                            <lavel>Organization Unit</lavel>
                            <input class="form-control" type="text" placeholder="Organization Unit" aria-label="default input example" value="OU for POC" readOnly />
                        </div>
                        <div className="col-md-6  mt-3">
                            <lavel>Gender</lavel>
                            <input class="form-control" type="text" placeholder="Gender" aria-label="default input example" value="Male" readOnly />
                        </div>
                        <div className="col-md-6 mt-3">
                            <lavel>E-Mail</lavel>
                            <input class="form-control" type="text" placeholder="E-Mail	" aria-label="default input example" value="" readOnly />
                        </div>

                        <div className="col-md-6  mt-3">
                            <lavel>Mobile Number</lavel>
                            <input class="form-control" type="text" placeholder="Mobile Number" aria-label="default input example" value="(+91) 9744167805" readOnly />
                        </div>

                        <div className="col-md-6 mt-3">
                            <lavel>Portal User Name	</lavel>
                            <input class="form-control" type="text" placeholder="Portal User Name" aria-label="default input example" value="9744167805" readOnly />
                        </div>

                        <div className="col-md-6  mt-3">
                            <lavel>Jabber ID</lavel>
                            <input class="form-control" type="text" placeholder="Jabber ID" aria-label="default input example" value="a0860ea7f8df7ac3@fd6cca52.gims.gov.in" readOnly />
                        </div>
                        <div className="col-md-6 mt-3">
                            <lavel>Jabber Name	</lavel>
                            <input class="form-control" type="text" placeholder="Jabber Name" aria-label="default input example" value="a0860ea7f8df7ac3" readOnly />
                        </div>
                        <div className="col-md-6 mt-3">
                            <lavel>Host Name</lavel>
                            <input class="form-control" type="text" placeholder="Host Name" aria-label="default input example" value="fd6cca52.gims.gov.in" readOnly />
                        </div>
                        <div className="col-md-6 mt-3">
                            <lavel>Portal Roles	</lavel>
                            <input class="form-control" type="text" placeholder="Portal Roles" aria-label="default input example" value="ROLE_MEMBER" readOnly />
                        </div>
                        <div className="col-md-6 mt-3">
                            <lavel>Superannuation</lavel>
                            <input class="form-control" type="text" placeholder="Superannuation" aria-label="default input example" value="" readOnly />
                        </div>

                    </div>

                    <button type="submit" className="btn btn-danger mt-4">Close</button>

                </Box>
            </Drawer>

            <Drawer anchor="top" open={openEdit} onClose={toggleDrawerEdit(false)}>
                <Box
                    component="form"
                    className='mt-14'
                    // onSubmit={handleSubmit}
                    sx={{ p: 4, width: '100%', maxWidth: "100%", mx: 'auto' }}
                >
                    <Typography className='mb-5' variant="h4" textAlign="center" color='#003566' fontWeight="700" gutterBottom>
                        Update Employee Details
                    </Typography>

                    <form>


                        <div className="row">
                            <div className="col-md-4">
                                <Typography variant="h6" mb={2} mt={2} textAlign="center" color='#003566' fontWeight="700">Instructions</Typography>
                                <Typography variant="p" mb={2} mt={2} textAlign="center">1. Administrative privileges may be assigned using Role Management available in Action Menu of Members List.</Typography> <br />
                                <Typography variant="p" mb={2} mt={2} textAlign="center">2. Profile photos may be updated using photo Action Menu available in Members List.</Typography><br />
                                <Typography variant="p" mb={2} mt={2} textAlign="center" color='red'>3. The member is self registered. Self registered members should be advised to update their Email and Mobile using Sandes Mobile App. </Typography>



                            </div>
                            <div className="row col-md-8">
                                <Typography variant="h6" mb={2} mt={2} textAlign="center" color='#003566' fontWeight="700">Organization Details - Ministry for POC</Typography>

                                <div className="col-md-6  mt-3">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>Organization for POC</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="col-md-6  mt-3">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>Organization unit for POC</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="col-md-6  mt-3">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>State</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="col-md-6  mt-3">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>District</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <Typography variant="h6" mb={2} mt={2} textAlign="center" color='#003566' fontWeight="700">Basic Details</Typography>
                                <div className="col-md-6 mt-3">
                                    <input class="form-control" type="text" placeholder="Employee code" aria-label="default input example" />
                                </div>
                                <div className="col-md-6  mt-3">
                                    <input class="form-control" type="text" placeholder="Employee name" aria-label="default input example" />
                                </div>
                                <div className="col-md-6  mt-3">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>Designation</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="col-md-6  mt-3">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>Gender</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <Typography variant="h6" mb={2} mt={2} textAlign="center" color='#003566' fontWeight="700">Contact Details</Typography>
                                <div className="col-md-6 mt-3">
                                    <input class="form-control" type="text" placeholder="Email address" aria-label="default input example" />
                                </div>

                                <div className="col-md-6  mt-3">
                                    <input class="form-control" type="text" placeholder="Alternate email address" aria-label="default input example" />
                                </div>

                                <div className="col-md-6 mt-3">
                                    <input class="form-control" type="text" placeholder="Mobile number" aria-label="default input example" />
                                </div>

                                <div className="button">
                                    <button type="submit" class="btn btn-success m-3">Update</button>
                                    <button type="submit" class="btn btn-danger">Close</button>
                                </div>
                            </div>
                        </div>


                    </form>


                </Box>
            </Drawer>

            <Drawer anchor="top" open={openDelete} onClose={toggleDrawerDelete(false)}>
                <Box
                    component="form"
                    className='mt-14'
                    // onSubmit={handleSubmit}
                    sx={{ p: 4, width: '100%', maxWidth: "80%", mx: 'auto' }}
                >
                    <Typography className='mb-5' variant="h4" textAlign="center" color='#003566' fontWeight="700" gutterBottom>
                        Employee Profile
                    </Typography>

                    <div className="row" >
                        <div className="col-md-6">

                            <Box mt={2}>
                                <img src="assets/images/userProfile.webp" alt="Preview" style={{ width: "140px", height: "140px", borderRadius: "80px", border: "1px solid" }} />
                            </Box>

                        </div>
                        <div className="col-md-6">
                            <Typography className='mb-3' variant="h5" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                                Ankur Deep Jaiswal (POC)
                            </Typography>
                            <button className='btn btn-success'>
                                Registeard
                            </button>
                            <button className='btn btn-success ml-2'>
                                Active
                            </button>


                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6  mt-3">
                            <lavel>Employee Code	</lavel>
                            <input class="form-control" type="text" placeholder="Employee Code" aria-label="default input example" value="9744167805" readOnly />
                        </div>
                        <div className="col-md-6  mt-3">
                            <lavel>Organization</lavel>
                            <input class="form-control" type="text" placeholder="Organization" aria-label="default input example" value="Organization for POC" readOnly />
                        </div>
                        <div className="col-md-6  mt-3">
                            <lavel>Organization Unit</lavel>
                            <input class="form-control" type="text" placeholder="Organization Unit" aria-label="default input example" value="OU for POC" readOnly />
                        </div>
                        <div className="col-md-6  mt-3">
                            <lavel>Gender</lavel>
                            <input class="form-control" type="text" placeholder="Gender" aria-label="default input example" value="Male" readOnly />
                        </div>
                        <div className="col-md-6 mt-3">
                            <lavel>E-Mail</lavel>
                            <input class="form-control" type="text" placeholder="E-Mail	" aria-label="default input example" value="" readOnly />
                        </div>

                        <div className="col-md-6  mt-3">
                            <lavel>Mobile Number</lavel>
                            <input class="form-control" type="text" placeholder="Mobile Number" aria-label="default input example" value="(+91) 9744167805" readOnly />
                        </div>

                        <div className="col-md-6 mt-3">
                            <lavel>Portal User Name	</lavel>
                            <input class="form-control" type="text" placeholder="Portal User Name" aria-label="default input example" value="9744167805" readOnly />
                        </div>

                        <div className="col-md-6  mt-3">
                            <lavel>Jabber ID</lavel>
                            <input class="form-control" type="text" placeholder="Jabber ID" aria-label="default input example" value="a0860ea7f8df7ac3@fd6cca52.gims.gov.in" readOnly />
                        </div>
                        <div className="col-md-6 mt-3">
                            <lavel>Jabber Name	</lavel>
                            <input class="form-control" type="text" placeholder="Jabber Name" aria-label="default input example" value="a0860ea7f8df7ac3" readOnly />
                        </div>
                        <div className="col-md-6 mt-3">
                            <lavel>Host Name</lavel>
                            <input class="form-control" type="text" placeholder="Host Name" aria-label="default input example" value="fd6cca52.gims.gov.in" readOnly />
                        </div>
                        <div className="col-md-6 mt-3">
                            <lavel>Portal Roles	</lavel>
                            <input class="form-control" type="text" placeholder="Portal Roles" aria-label="default input example" value="ROLE_MEMBER" readOnly />
                        </div>
                        <div className="col-md-6 mt-3">
                            <lavel>Superannuation</lavel>
                            <input class="form-control" type="text" placeholder="Superannuation" aria-label="default input example" value="" readOnly />
                        </div>
                        <div className="col-md-6  mt-3">
                            <lavel>Delete reason</lavel>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Select reason</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>

                    </div>
                    <button type="submit" className="btn btn-danger mt-4 mr-2">Delete</button>
                    <button type="submit" className="btn btn-info mt-4">Close</button>

                </Box>
            </Drawer>

            <Drawer anchor="top" open={openRole} onClose={toggleDrawerRole(false)}>
                <Box
                    component="form"
                    className='mt-14'
                    // onSubmit={handleSubmit}
                    sx={{ p: 4, width: '100%', maxWidth: "80%", mx: 'auto' }}
                >
                    <Typography className='mb-5' variant="h5" textAlign="center" color='#003566' fontWeight="700" gutterBottom>
                        Manage Employee Roles
                    </Typography>

                    <div className="row">
                        <Typography className='mb-3' variant="h6" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                            Choose OU and Role
                        </Typography>
                        <div className="col-md-6  mt-3">
                            <lavel>Organization</lavel>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Select Organization</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="col-md-6  mt-3">
                            <lavel> Organization Unit</lavel>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Select Organization Unit</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>


                    </div>
                    <Typography className='mb-3 mt-3' variant="h6" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                        Roles Available
                    </Typography>
                    <div className="row" >
                        <div className="col-md-6 p-4 ml-3" style={{ border: "solid lightgray 1px" }}>
                            <Typography className='mb-3' variant="h6" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                                Groups Available
                            </Typography>

                            <Typography className='mb-3' variant="p" textAlign="left" fontWeight="700" gutterBottom>
                                Following are the available groups which are not assigned to the user
                            </Typography>
                            <br />
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> Test</button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> POC Test Group</button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> Test_grp</button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> Test</button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> Help</button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> Test-13Dec</button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> Testers</button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> Sandes Dev Team NICHQ</button>

                        </div>

                        <div className="col-md-6 p-4 ml-3" style={{ border: "solid lightgray 1px", width: "48%" }}>

                            <Typography className='mb-3' variant="h6" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                                Groups Assigned
                            </Typography>

                            <Typography className='mb-3' variant="p" textAlign="left" fontWeight="700" gutterBottom>
                                Following are the groups which are already assigned to the user
                            </Typography>


                        </div>
                        <div className="button">
                            <button type="submit" class="btn btn-success m-3">Update</button>
                            <button type="submit" class="btn btn-danger">Close</button>
                        </div>
                    </div>

                    <div className="table-responsive mt-5">
                        <Typography className='mb-3 mt-3' variant="h6" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                            Roles Assigned
                        </Typography>
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

                                </tr>
                            </thead>
                            <tbody>
                                {/* {currentRows.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.name}</td>
                                        <td>{row.email}</td>
                                        <td>{row.phone}</td>
                                        <td>{row.city}</td>
                                        <td>{row.role}</td>
                                        <td>{row.status}</td>

                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>

                    {/* {renderPagination()} */}
                </Box>
            </Drawer>

            <Drawer anchor="top" open={openGroup} onClose={toggleDrawerGroup(false)}>
                <Box
                    component="form"
                    className='mt-14'
                    // onSubmit={handleSubmit}
                    sx={{ p: 4, width: '100%', maxWidth: "90%", mx: 'auto' }}
                >
                    <Typography className='mb-5' variant="h5" textAlign="center" color='#003566' fontWeight="700" gutterBottom>
                        Manage Employee Groups
                    </Typography>

                    <div className="row" >
                        <div className="col-md-6 p-4 ml-3" style={{ border: "solid lightgray 1px" }}>
                            <Typography className='mb-3' variant="h6" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                                Groups Available
                            </Typography>

                            <Typography className='mb-3' variant="p" textAlign="left" fontWeight="700" gutterBottom>
                                Following are the available groups which are not assigned to the user
                            </Typography>
                            <br />
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> Test</button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> POC Test Group</button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> Test_grp</button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> Test</button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> Help</button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> Test-13Dec</button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> Testers</button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> Sandes Dev Team NICHQ</button>

                        </div>

                        <div className="col-md-6 p-4 ml-3" style={{ border: "solid lightgray 1px", width: "48%" }}>

                            <Typography className='mb-3' variant="h6" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                                Groups Assigned
                            </Typography>

                            <Typography className='mb-3' variant="p" textAlign="left" fontWeight="700" gutterBottom>
                                Following are the groups which are already assigned to the user
                            </Typography>


                        </div>
                        <div className="button">
                            <button type="submit" class="btn btn-success m-3">Update</button>
                            <button type="submit" class="btn btn-danger">Close</button>
                        </div>
                    </div>



                </Box>
            </Drawer>

            <Drawer anchor="top" open={openGroupAdmin} onClose={toggleDrawerGroupAdmin(false)}>
                <Box
                    component="form"
                    className='mt-14'
                    // onSubmit={handleSubmit}
                    sx={{ p: 4, width: '100%', maxWidth: "90%", mx: 'auto' }}
                >
                    <Typography className='mb-5' variant="h5" textAlign="center" color='#003566' fontWeight="700" gutterBottom>
                        Manage Groups for Group Admins
                    </Typography>

                    <div className="row" >
                        <div className="col-md-6 p-4" style={{ border: "solid lightgray 1px" }}>
                            <Typography className='mb-3' variant="h6" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                                Groups Available in OU
                            </Typography>


                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> Test</button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> POC Test Group</button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> Test_grp</button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> Test</button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> Help</button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> Test-13Dec</button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> Testers</button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"><FontAwesomeIcon icon={faPlus} color='green' /> Sandes Dev Team NICHQ</button>

                        </div>

                        <div className="col-md-6 p-4 ml-3" style={{ border: "solid lightgray 1px", width: "48%" }}>

                            <Typography className='mb-3' variant="h6" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                                Groups
                            </Typography>

                            <Typography className='mb-3' variant="p" textAlign="left" fontWeight="700" gutterBottom>
                                HARIKRISHNAN R is already Group Admin of following groups
                            </Typography>


                        </div>
                        <div className="button">
                            <button type="submit" class="btn btn-success m-3">Update</button>
                            <button type="submit" class="btn btn-danger">Close</button>
                        </div>
                    </div>



                </Box>
            </Drawer>

            <Drawer anchor="top" open={openTransfer} onClose={toggleDrawerTransfer(false)}>
                <Box
                    component="form"
                    className='mt-14'
                    // onSubmit={handleSubmit}
                    sx={{ p: 4, width: '100%', maxWidth: "90%", mx: 'auto' }}
                >
                    <Typography className='mb-5' variant="h4" textAlign="center" color='#003566' fontWeight="700" gutterBottom>
                        Transfer Employee
                    </Typography>

                    <div className="row" >
                        <div className="col-md-6">

                            <Box mt={2}>
                                <img src="assets/images/userProfile.webp" alt="Preview" style={{ width: "140px", height: "140px", borderRadius: "80px", border: "1px solid" }} />
                            </Box>

                        </div>
                        <div className="col-md-6">
                            <Typography className='mb-3' variant="h5" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                                Ms.Komala C.N (POC)
                            </Typography>
                            <Typography className='mb-3' variant="p" textAlign="left" fontWeight="700" gutterBottom>
                                Ministry for POC <br /> Organization for POC, OU for POC <br />    9900144862 <br />   cn.komala@stpi.in
                            </Typography>

                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-6 p-4 " style={{ border: "solid lightgray 1px" }}>
                            <Typography className='mb-3' variant="h5" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                                Member of following groups
                            </Typography>
                            <Typography className='mb-3' variant="p" textAlign="left" fontWeight="700" gutterBottom>
                                Please click on the groups if any, to remove the membership
                            </Typography>
                        </div>
                        <div className="col-md-6 p-4 ml-3" style={{ border: "solid lightgray 1px", width: "48%" }}>
                            <Typography className='mb-3' variant="h5" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                                Transfer to new OU
                            </Typography>
                            <Typography className='mb-3' variant="p" textAlign="left" fontWeight="700" gutterBottom>
                                This employee/member is assigned with extra roles. Please deactivate all the roles before continuing
                            </Typography>
                        </div>
                        <div className="button">
                            <button type="submit" class="btn btn-success m-3">Update</button>
                            <button type="submit" class="btn btn-danger">Close</button>
                        </div>
                    </div>

                </Box>
            </Drawer>

            <Drawer anchor="top" open={openOffboard} onClose={toggleDrawerOffboard(false)}>
                <Box
                    component="form"
                    className='mt-14'
                    // onSubmit={handleSubmit}
                    sx={{ p: 4, width: '100%', maxWidth: "90%", mx: 'auto' }}
                >
                    <Typography className='mb-5' variant="h4" textAlign="center" color='#003566' fontWeight="700" gutterBottom>
                        Offboard Sanjeev Kumar Saxena
                    </Typography>

                    <div className="row" >
                        <div className="col-md-6">

                            <Box mt={2}>
                                <img src="assets/images/userProfile.webp" alt="Preview" style={{ width: "140px", height: "140px", borderRadius: "80px", border: "1px solid" }} />
                            </Box>

                        </div>
                        <div className="col-md-6">
                            <Typography className='mb-3' variant="h5" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                                Sanjeev Kumar Saxena (POC)
                            </Typography>
                            <Typography className='mb-3' variant="p" textAlign="left" fontWeight="700" gutterBottom>
                                Ministry for POC <br /> Organization for POC, OU for POC <br />    9900144862 <br />   cn.komala@stpi.in
                            </Typography>

                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-6 p-4 " style={{ border: "solid lightgray 1px" }}>

                            <Typography className='mb-3' variant="h6" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                                Member of following groups
                            </Typography>

                            <Typography className='mb-3' variant="p" textAlign="left" fontWeight="700" gutterBottom>
                                Please click on the groups if any, to remove the membership
                            </Typography>


                        </div>
                        <div className="col-md-6 p-4 ml-3" style={{ border: "solid lightgray 1px ", width: "48%" }}>
                            <Typography className='mb-3' variant="h6" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                                Offboarding of Employee
                            </Typography>
                            <Typography className='mb-3' variant="p" textAlign="left" fontWeight="700" gutterBottom>
                                Please choose the reason for offboarding
                            </Typography>
                            <br />
                            <button type="submit" className="btn btn-info mt-4 mr-3"> <FontAwesomeIcon icon={faHouse} /> Test <FontAwesomeIcon icon={faXmark} color='red' /></button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"> <FontAwesomeIcon icon={faHouse} /> POC Test Group <FontAwesomeIcon icon={faXmark} color='red' /></button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"> <FontAwesomeIcon icon={faHouse} /> Test_grp <FontAwesomeIcon icon={faXmark} color='red' /></button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"> <FontAwesomeIcon icon={faHouse} /> Test <FontAwesomeIcon icon={faXmark} color='red' /></button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"> <FontAwesomeIcon icon={faHouse} /> Help <FontAwesomeIcon icon={faXmark} color='red' /></button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"> <FontAwesomeIcon icon={faHouse} /> Test-13Dec <FontAwesomeIcon icon={faXmark} color='red' /></button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"> <FontAwesomeIcon icon={faHouse} /> Testers <FontAwesomeIcon icon={faXmark} color='red' /></button>
                            <button type="submit" className="btn btn-info mt-4 mr-3"> <FontAwesomeIcon icon={faHouse} /> Sandes Dev Team NICHQ <FontAwesomeIcon icon={faXmark} color='red' /></button>

                        </div>

                        <div className="button">
                            <button type="submit" class="btn btn-success m-3">Update</button>
                            <button type="submit" class="btn btn-danger">Close</button>
                        </div>
                    </div>

                </Box>
            </Drawer>
        </Box>
    );
}

export default LoginManagementDash;
