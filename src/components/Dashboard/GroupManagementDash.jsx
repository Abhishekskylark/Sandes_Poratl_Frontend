import React, { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import "./Dashboard.css";
import { Drawer, FormControl, InputLabel, Select, MenuItem, TextField, Typography, Box, Toolbar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faMessage, faCircleInfo, faPenToSquare, faEnvelope, faRecycle, faMagnifyingGlass, faImage, faUsersLine, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { useDispatch, useSelector } from "react-redux";
import { fetchGroup, fetchMinistry, fetchOrganization, fetchOrganizationUnit } from "../../redux/authSlice";



function GroupManagementDash({ drawerWidth, collapsedDrawerWidth, desktopOpen }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [showSelect, setShowSelect] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const [open, setOpen] = useState(false); 
    const [openProfile, setOpenProfile] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openCover, setOpenCover] = useState(false);
    const [openGroup, setOpenGroup] = useState(false);
    const [openOU, setOpenOU] = useState(false);
    const [age, setAge] = useState(''); 
    const [imagePreview, setImagePreview] = useState(''); 
    const [imagePreviewProfile, setImagePreviewProfile] = useState('');
    const [filteredTableData, setFilteredTableData] = useState([]);

    const [columns, setColumns] = useState([]);
    const dispatch = useDispatch();
    const groupState = useSelector((state) => state.group);
    const organizationState = useSelector((state) => state.organization);
    const organizationUnitState = useSelector((state) => state.organizationUnit);
    const ministryState = useSelector((state) => state.ministry);
    const tableData = groupState.group
    const OrganizationData = organizationState.organization?.data
    const OrganizationUnitData = organizationUnitState.organizationUnit?.data
    const Ministry = ministryState.ministry

    console.log("tableData", tableData, OrganizationUnitData ,OrganizationData , Ministry);


    useEffect(() => {
        dispatch(fetchGroup());
        dispatch(fetchOrganization());
        dispatch(fetchOrganizationUnit());
        dispatch(fetchMinistry());


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

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setSelectedRowId(null);
    };

    useEffect(() => {
        if (tableData && OrganizationData?.length && OrganizationUnitData?.length && Ministry.length) {
            const displayColumns = [
                { field: 'id', headerName: 'ID', sort: 'asc' },
                { field: 'ministry', headerName: 'Ministry' },
                { field: 'organisation', headerName: 'Organisation' },
                { field: 'parent_ou', headerName: 'Organisation Unit' },
                { field: 'title', headerName: 'Group Title' },
                { field: 'action', headerName: 'Action' }
            ];

            const formattedColumns = displayColumns.map(col => {
                if (col.field === 'organisation') {
                    return {
                        ...col,
                        valueGetter: (params) => {
                           const OrganizationUnit = OrganizationUnitData.find(org => org.ou_id === params.data.parent_ou);
                            if (!OrganizationUnit) return '';
                            const Organization = OrganizationData.find(min => min.id === OrganizationUnit.organization_id);
                            return Organization ? Organization.o_name : '';
                        }
                    };
                } else if (col.field === 'parent_ou') {
                    return {
                        ...col,
                        valueGetter: (params) => {
                            const match = OrganizationUnitData.find(item => item.ou_id === params.data.parent_ou);
                            return match ? match.ou_name : '';
                        }
                    };
                } else if (col.field === 'ministry') {
                   return {
                        ...col,
                        valueGetter: (params) => {
                            const OrganizationUnit = OrganizationUnitData.find(org => org.ou_id === params.data.parent_ou);
                            if (!OrganizationUnit) return '';
                            const Organization = OrganizationData.find(min => min.id === OrganizationUnit.organization_id);
                             if (!Organization) return '';
                            const ministry = Ministry.find(min => min.id === Organization.ministry_id);
                            return ministry ? ministry.ministry_name : '';
                        },
                        flex: 1,
                        resizable: true,
                    };
                }
                else if (col.field === 'action') {
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
                        )
                    };
                } else {
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
    }, [tableData, OrganizationData, OrganizationUnitData ,Ministry]);

    const formatHeader = (field) => {
        return field
            .replace(/_/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
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
        if (action === "Profile Photo") {
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
        if (action === 'View') {
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
        if (action === 'Edit') {
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
        if (action === 'Cover Image') {
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
            setOpenCover(true);
        }
        if (action === 'Disperse Group') {
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
        if (action === 'Change OU') {
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
            setOpenOU(true);
        }
        handlePopoverClose();
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

    const toggleDrawerProfile = (open) => () => {
        setOpenProfile(open);
    };

    const toggleDrawerDetails = (open) => () => {
        setOpenDetails(open);
    };
    const toggleDrawerEdit = (open) => () => {
        setOpenEdit(open);
    };
    const toggleDrawerCover = (open) => () => {
        setOpenCover(open);
    };
    const toggleDrawerGroup = (open) => () => {
        setOpenGroup(open);
    };
    const toggleDrawerOU = (open) => () => {
        setOpenOU(open);
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
                        Group Management
                    </Typography>
                    <div className="button">
                        {/* <button
                            type="button"
                            className="btn btn-primary mr-3 btn-bg-1"
                            onClick={() => setShowSelect((prev) => !prev)} // Toggle filter dropdown
                        >
                            Filter
                        </button> */}

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
                        rowData={tableData}
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
                        <ListItem
                            button
                            onClick={() => handleMenuItemClick('View', selectedRowId)}
                        >
                            <FontAwesomeIcon className='mr-1' style={{ color: "#158cba" }} icon={faMagnifyingGlass} />  <ListItemText primary="View" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => handleMenuItemClick('Edit', selectedRowId)}
                        >
                            <FontAwesomeIcon className='mr-1' style={{ color: "#158cba" }} icon={faPenToSquare} />  <ListItemText primary="Edit" />
                        </ListItem>

                        <ListItem
                            button
                            onClick={() => handleMenuItemClick('Profile Photo', selectedRowId)}
                        >
                            <FontAwesomeIcon className='mr-1' style={{ color: "green" }} icon={faCamera} />  <ListItemText primary="Profile Photo" />
                        </ListItem>
                        <ListItem
                            button

                            onClick={() => handleMenuItemClick('Cover Image', selectedRowId)}
                        >
                            <FontAwesomeIcon icon={faImage} className='mr-1' style={{ color: "#158cba" }} /> <ListItemText primary="Cover Image" />
                        </ListItem>
                        <hr />
                        <ListItem
                            button
                            component="a"
                            href="/GroupAddMemebr"
                            onClick={() => handleMenuItemClick('Add Member', selectedRowId)}
                        >
                            <FontAwesomeIcon icon={faUsersLine} className='mr-1' style={{ color: "#158cba" }} /> <ListItemText primary="Add Member" />
                        </ListItem>
                        <ListItem
                            button
                            // component="a"
                            // href="/MemberPage"
                            onClick={() => handleMenuItemClick('Manage Members', selectedRowId)}
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} className='mr-1' style={{ color: "#158cba" }} /> <ListItemText primary="Manage Members" />
                        </ListItem>

                        <ListItem
                            button

                            onClick={() => handleMenuItemClick('Disperse Group', selectedRowId)}
                        >
                            <FontAwesomeIcon icon={faRecycle} className='mr-1' style={{ color: "#158cba" }} /> <ListItemText primary="Disperse Group" />
                        </ListItem>
                        <ListItem
                            button

                            onClick={() => handleMenuItemClick('Change OU', selectedRowId)}
                        >
                            <FontAwesomeIcon icon={faRecycle} className='mr-1' style={{ color: "#158cba" }} /> <ListItemText primary="Change OU" />
                        </ListItem>

                        <ListItem button onClick={() => handleMenuItemClick('Send Sandes Message', selectedRowId)}>
                            <FontAwesomeIcon icon={faEnvelope} className='mr-1' style={{ color: "#158cba" }} />  <ListItemText primary="Send Sandes Message" />
                        </ListItem>
                    </List>
                </Popover>

              
            </div>

            <Drawer anchor="top" open={openNew} onClose={toggleDrawerNew(false)}>
                <div class="modal-content mt-14" style={{ padding: "2%" }}>
                    <div class="modal-header">
                        <Typography variant="h5" mb={2} color='#003566' fontWeight="700">Group Registration Form</Typography>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>
                        <div className="row">
                            <Typography variant="p" mt={2} textAlign="center" color='#003566' fontWeight="700">Ministry:</Typography>
                            <Typography variant="h6" mb={1} textAlign="center" color='#003566' fontWeight="700">Ministry for POC</Typography>

                            <div className="col-md-6  mt-3">
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Organization unit</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>

                            <div className="col-md-6 mt-3">
                                <input class="form-control" type="text" placeholder="Group description" aria-label="default input example" />
                            </div>
                            <Typography variant="p" mt={1} textAlign="center" color='#003566' fontWeight="700">Organization Name:</Typography>
                            <Typography variant="h6" mb={1} textAlign="center" color='#003566' fontWeight="700">Organization for POC</Typography>


                            <div className="col-md-6  mt-3">
                                <input class="form-control" type="text" placeholder="Group title" aria-label="default input example" />
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
                    <Typography variant="h4" textAlign="center" fontWeight="700" gutterBottom color='#003566' >
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

            <Drawer anchor="top" open={openEdit} onClose={toggleDrawerEdit(false)}>
                <Box
                    component="form"
                    className='mt-14'
                    // onSubmit={handleSubmit}
                    sx={{ p: 4, width: '100%', maxWidth: "100%", mx: 'auto' }}
                >
                    <Typography className='' variant="h5" textAlign="center" color='#003566' fontWeight="700" gutterBottom>
                        Update Group Details
                    </Typography>

                    <form>


                        <div className="row">


                            <Typography variant="h6" mb={2} mt={2} textAlign="center" color='#003566' fontWeight="700">Ministry:</Typography>
                            <Typography variant="h6" mb={2} mt={2} textAlign="center" color='#003566' fontWeight="700">Ministry for POC</Typography>


                            <div className="col-md-6  mt-3">
                                <lavel>Organization unit</lavel>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>OU for POC</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="col-md-6  mt-3">
                                <lavel>Organization </lavel>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Organization for POC</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>

                            <div className="col-md-6 mt-3">
                                <lavel>Group description</lavel>
                                <input class="form-control" type="text" placeholder="Group description" aria-label="default input example" />
                            </div>
                            <div className="col-md-6  mt-3">
                                <level>Group title</level>
                                <input class="form-control" type="text" placeholder="Group title" aria-label="default input example" />
                            </div>


                            <div className="button">
                                <button type="submit" class="btn btn-success m-3">Update</button>
                                <button type="submit" class="btn btn-danger">Close</button>
                            </div>
                        </div>



                    </form>


                </Box>
            </Drawer>

            <Drawer anchor="top" open={openDetails} onClose={toggleDrawerDetails(false)}>
                <Box
                    component="form"
                    className='mt-14'
                    // onSubmit={handleSubmit}
                    sx={{ p: 4, width: '100%', maxWidth: "80%", mx: 'auto' }}
                >
                    <Typography className='mb-5' variant="h5" textAlign="center" color='#003566' fontWeight="700" gutterBottom>
                        Group Profile
                    </Typography>

                    <div className="row" >
                        <div className="col-md-6">

                            <Box mt={2}>
                                <img src="assets/images/userProfile.webp" alt="Preview" style={{ width: "140px", height: "140px", borderRadius: "80px", border: "1px solid" }} />
                            </Box>

                        </div>
                        <div className="col-md-6">
                            <Typography className='mb-3' variant="h5" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                                Test
                            </Typography>
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

                        <Typography className='mb-3 mt-4' variant="p" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                            Group created on 07-04-2025
                        </Typography>
                        <Typography className='mb-3' variant="p" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                            Group created by Vishal Singh
                        </Typography>

                    </div>

                    <button type="submit" className="btn btn-danger mt-4">Close</button>

                </Box>
            </Drawer>

            <Drawer anchor="top" open={openProfile} onClose={toggleDrawerProfile(false)}>
                <Box
                    component="form"
                    className='mt-14'
                    // onSubmit={handleSubmit}
                    sx={{ p: 4, width: '100%', maxWidth: "80%", mx: 'auto' }}
                >
                    <Typography className='mb-5' variant="h5" textAlign="center" color='#003566' fontWeight="700" gutterBottom>
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



                            <Button variant="outlined" className='mt-4' component="label">
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

            <Drawer anchor="top" open={openCover} onClose={toggleDrawerCover(false)}>
                <Box
                    component="form"
                    className='mt-14'
                    // onSubmit={handleSubmit}
                    sx={{ p: 4, width: '100%', maxWidth: "80%", mx: 'auto' }}
                >
                    <Typography className='mb-5' variant="h5" textAlign="center" color='#003566' fontWeight="700" gutterBottom>
                        Upload Cover Image
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



                            <Button variant="outlined" className='mt-4' component="label">
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

            <Drawer anchor="top" open={openGroup} onClose={toggleDrawerGroup(false)}>
                <Box
                    component="form"
                    className='mt-14'
                    // onSubmit={handleSubmit}
                    sx={{ p: 4, width: '100%', maxWidth: "80%", mx: 'auto' }}
                >
                    <Typography className='mb-5' variant="h5" textAlign="center" color='#003566' fontWeight="700" gutterBottom>
                        Disperse Group
                    </Typography>

                    <div className="row">
                        <Typography className='mb-3' variant="h6" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                            Ministry:
                        </Typography>
                        <Typography className='mb-3' variant="h6" textAlign="left" color='#003566' fontWeight="700" gutterBottom>
                            Ministry for POC
                        </Typography>
                        <div className="col-md-6  mt-3">
                            <lavel> Organization Unit</lavel>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Select Organization Unit</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="col-md-6  mt-3">
                            <lavel>Organization</lavel>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Select Organization</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>

                        <div className="col-md-6 mt-3">
                            <lavel>Group description</lavel>
                            <input class="form-control" type="text" placeholder="Group description" aria-label="default input example" />
                        </div>
                        <div className="col-md-6  mt-3">
                            <level>Group title</level>
                            <input class="form-control" type="text" placeholder="Group title" aria-label="default input example" />
                        </div>


                        <div className="button">
                            <button type="submit" class="btn btn-success m-3">Disperse Group</button>
                            <button type="submit" class="btn btn-danger">Close</button>
                        </div>

                    </div>


                </Box>
            </Drawer>

            <Drawer anchor="top" open={openOU} onClose={toggleDrawerOU(false)}>
                <Box
                    component="form"
                    className='mt-14'
                    // onSubmit={handleSubmit}
                    sx={{ p: 4, width: '100%', maxWidth: "80%", mx: 'auto' }}
                >
                    <Typography className='mb-5' variant="h5" textAlign="center" color='#003566' fontWeight="700" gutterBottom>
                        Change OU - OU for POC
                    </Typography>

                    <div className="row">

                        <div className="col-md-6  mt-3">
                            <lavel>Ministry</lavel>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Select Ministry</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>

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

export default GroupManagementDash;
