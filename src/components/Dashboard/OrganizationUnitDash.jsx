import React, { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Drawer, FormControl, InputLabel, Select, MenuItem, TextField, Button, Typography, Box, Toolbar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faPen, faCheck, faPenToSquare, faEnvelope, faTrash, faTurnDown } from '@fortawesome/free-solid-svg-icons';
import "./Dashboard.css";
import { useLocation } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganizationUnit, fetchMastersDistricts, fetchMastersStates, fetchOrganizationType, fetchOrganization } from "../../redux/authSlice";

function OrganizationUnitDash({ drawerWidth, collapsedDrawerWidth, desktopOpen }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showSelect, setShowSelect] = useState(false);
    const [open, setOpen] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDel, setOpenDel] = useState(false);
    const [age, setAge] = useState('');
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const location = useLocation();
    const permissionData = location.state?.permissionData;
    const [columns, setColumns] = useState([]);
    const dispatch = useDispatch();
    const organizationUnitState = useSelector((state) => state.organizationUnit);
    const mastersDistrictsState = useSelector((state) => state.masterDistricts);
    const mastersStatesState = useSelector((state) => state.masterStates);
    const organizationTypeState = useSelector((state) => state.organizationType);
    const organizationState = useSelector((state) => state.organization);

    const tableData = organizationUnitState.organizationUnit.data
    const MastersDistricts = mastersDistrictsState.mastersDistricts
    const MastersStates = mastersStatesState.mastersStates
    const OrganizationType = organizationTypeState.organizationType
    const OrganizationName = organizationState.organization.data

    useEffect(() => {
        dispatch(fetchOrganizationUnit());
        dispatch(fetchMastersDistricts());
        dispatch(fetchMastersStates());
        dispatch(fetchOrganizationType());
        dispatch(fetchOrganization());

    }, [dispatch]);

    const [formData, setFormData] = useState({
        gu_id: '',
        OU_ID: '',
        OU_Name: '',
        OU_Type: '',
        Organisation: '',
        State: '',
        District: '',
        OU_Address: '',
        OU_Code: '',
        Pin_Code: '',
        Landline: '',
        Website: '',
    });

    console.log("formData", formData);


    const handlePopoverOpen = (event, rowData) => {
        console.log("rowData", rowData);

        setAnchorEl(event.currentTarget);
        setSelectedRowData(rowData);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setSelectedRowData(null);
    };

    const handleMenuItemClick = (action, rowId) => {
        console.log("rowId", rowId);

        if (action === 'Send Sandes Message') {
            if (rowId) {
                setSelectedRowData(rowId);
                setFormData({
                    gu_id: rowId.gu_id || '',
                    OU_ID: rowId.ou_id || '',
                    OU_Name: rowId.ou_name || '',
                    OU_Type: rowId.ou_type || '',
                    Organisation: rowId.organization_id || '',
                    State: rowId.state_id || '',
                    District: rowId.district_id || '',
                    OU_Address: rowId.ou_address || '',
                    OU_Code: rowId.ou_code || '',
                    Pin_Code: rowId.pin_code || '',
                    Landline: rowId.landline || '',
                    Website: rowId.website || '',
                });
            }
            setOpen(true);
        }
        if (action === 'Edit') {
            if (rowId) {
                setSelectedRowData(rowId);
                console.log("rowId", rowId);

                setFormData({
                    gu_id: rowId.gu_id || '',
                    Parent_OU:rowId.parent_ou || '',
                    OU_ID: rowId.ou_id || '',
                    OU_Name: rowId.ou_name || '',
                    OU_Type: rowId.ou_type || '',
                    Organisation: rowId.organization_id || '',
                    State: rowId.state_id || '',
                    District: rowId.district_id || '',
                    OU_Address: rowId.ou_address || '',
                    OU_Code: rowId.ou_code || '',
                    Pin_Code: rowId.pin_code || '',
                    Landline: rowId.landline || '',
                    Website: rowId.website || '',
                });
            }
            setOpenEdit(true);
        }
        if (action === 'Delete') {
            if (rowId) {
                setSelectedRowData(rowId);
                setFormData({
                    gu_id: rowId.gu_id || '',
                    Parent_OU:rowId.parent_ou || '',
                    OU_ID: rowId.ou_id || '',
                    OU_Name: rowId.ou_name || '',
                    OU_Type: rowId.ou_type || '',
                    Organisation: rowId.organization_id || '',
                    State: rowId.state_id || '',
                    District: rowId.district_id || '',
                    OU_Address: rowId.ou_address || '',
                    OU_Code: rowId.ou_code || '',
                });
            }
            setOpenDel(true);
        }
        handlePopoverClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await dispatch(updateOrganization({ formData, rowId: selectedRowData }));

            if (res.meta.requestStatus === 'fulfilled') {
                setOpenEdit(false);
                await dispatch(fetchOrganizationUnit());
                toast.success("Organization Unit updated!");
            } else {
                toast.error("Update failed");
            }
        } catch (err) {
            toast.error("Something went wrong");
            console.error(err);
        }
    };

    const handleChange = (event) => {
        dispatch(setFormData({
            ...formData,
            [e.target.name]: e.target.value
        }));
    };

    const toggleDrawerNew = (open) => () => {
        setOpenNew(open);
    };

    const toggleDrawer = (open) => () => {
        setOpen(open);
    };

    const toggleDrawerEdit = (open) => () => {
        setOpenEdit(open);
    };
    const toggleDrawerDel = (open) => () => {
        setOpenDel(open);
    };

    useEffect(() => {
        if (tableData && MastersDistricts.length && MastersStates.length && OrganizationType.length && OrganizationName) {
            const displayColumns = [
                { field: 'ou_id', headerName: 'OU ID', sort: 'asc' },
                { field: 'ou_name', headerName: 'OU Name' },
                { field: 'ou_type', headerName: 'OU Type' },
                { field: 'organization_id', headerName: 'Organisation' },
                { field: 'state_id', headerName: 'State' },
                { field: 'district_id', headerName: 'District' },
                { field: 'ou_address', headerName: 'OU Address' },
                { field: 'ou_code', headerName: 'OU Code' },
                { field: 'action', headerName: 'Action' }
            ];

            const formattedColumns = displayColumns.map(col => {
                if (col.field === 'ou_type') {
                    return {
                        ...col,
                        valueGetter: (params) => {
                            const match = OrganizationType.find(item => item.code === params.data.ou_type);
                            return match ? match.description : '';
                        }
                    };
                } else if (col.field === 'state_id') {
                    return {
                        ...col,
                        valueGetter: (params) => {
                            const match = MastersStates.find(item => item.id === params.data.state_id);
                            return match ? match.state : '';
                        }
                    };
                }
                else if (col.field === 'district_id') {
                    return {
                        ...col,
                        valueGetter: (params) => {
                            const match = MastersDistricts.find(item => item.id === params.data.district_id);
                            return match ? match.district : '';
                        }
                    };
                }
                else if (col.field === 'organization_id') {
                    return {
                        ...col,
                        valueGetter: (params) => {
                            const match = OrganizationName.find(item => item.id === params.data.organization_id);
                            return match ? match.o_name : '';
                        }
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
                        headerName: formatHeader(col.headerName || col.field)
                    };
                }
            });

            setColumns(formattedColumns);
        }
    }, [tableData, MastersDistricts, MastersStates, OrganizationType, OrganizationName]);


    const formatHeader = (field) => {
        return field
            .replace(/_/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
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
                    <Typography variant="h5" align="center" gutterBottom className='card-text' fontWeight="700">
                        Organization Unit
                    </Typography>
                    <div className="button">
                        <button
                            type="button"
                            className="btn btn-primary mr-3 btn-bg-1"
                            onClick={() => setShowSelect((prev) => !prev)} // Toggle filter dropdown
                        >
                            Filter
                        </button>
                        <button type="button" className="btn btn-success" onClick={toggleDrawerNew(true)}>
                            + New
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



                <div className="ag-theme-alpine" style={{ height: 560, width: '100%', padding: '10px', borderRadius: '10px' }}>

                    <AgGridReact
                        rowData={permissionData.unit_list === "active" ? tableData : []}
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
                        {permissionData.send_sandes_message === "active" && (
                            <ListItem button className='cursor-pointer' onClick={() => handleMenuItemClick('Send Sandes Message', selectedRowData)}>
                                <FontAwesomeIcon icon={faEnvelope} className='mr-1' style={{ color: "#158cba" }} />  <ListItemText primary="Send Sandes Message" />
                            </ListItem>
                        )}
                        {permissionData.edit === "active" && (
                            <ListItem button className='cursor-pointer' onClick={() => handleMenuItemClick('Edit', selectedRowData)}>
                                <FontAwesomeIcon className='mr-1' style={{ color: "#158cba" }} icon={faPenToSquare} />
                                <ListItemText primary="Edit" />
                            </ListItem>
                        )}

                        {permissionData.delete === "active" && (
                            <ListItem button className='cursor-pointer' onClick={() => handleMenuItemClick('Delete', selectedRowData)}>
                                <FontAwesomeIcon className='mr-1' icon={faTrash} style={{ color: "#ff0000b8" }} />
                                <ListItemText primary="Delete" />
                            </ListItem>
                        )}



                        {permissionData.member_wise_status === "active" && (
                            <ListItem
                                button
                                component="a"
                                className='cursor-pointer'
                                href="/MemberPage"
                                onClick={() => handleMenuItemClick('Member wise status', selectedRowData)}
                            >
                                <FontAwesomeIcon icon={faCheck} className='mr-1' style={{ color: "#158cba" }} /> <ListItemText primary="Member wise status" />
                            </ListItem>
                        )}

                        {permissionData.heat_map === "active" && (
                            <ListItem
                                button
                                component="a"
                                className='cursor-pointer'
                                href="/HeatMap"
                                onClick={() => handleMenuItemClick('Heat Map', selectedRowData)}
                            >
                                <FontAwesomeIcon icon={faPen} className='mr-1' style={{ color: "#158cba" }} /> <ListItemText primary="Heat Map based on chat activity" />
                            </ListItem>
                        )}
                    </List>
                </Popover>

            </div>

            <Drawer anchor="top" open={openNew} onClose={toggleDrawerNew(false)}>

                <div class="modal-content mt-14" style={{ padding: "2%" }}>
                    <div class="modal-header">
                        {/* <h5 class="modal-title" id="exampleModalLabel">New Organization Unit [Ministry for POC]</h5> */}
                        <Typography variant="h5" mb={2} color='#003566' fontWeight="700">New Organization Unit [Ministry for POC]</Typography>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>

                        <Typography variant="h6" mb={2} mt={2} textAlign="center" color='#003566'>Organization for POC</Typography>

                        <div className="row">
                            <div className="col-md-6  mt-3">
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Parent organization unit</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="col-md-6  mt-3">
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Organization unit type</option>
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
                            <div className="col-md-6 mt-3">
                                <input class="form-control" type="text" placeholder="O u code" aria-label="default input example" />
                            </div>

                            <div className="col-md-6  mt-3">
                                <input class="form-control" type="text" placeholder="O u name" aria-label="default input example" />
                            </div>

                            <div className="col-md-6 mt-3">
                                <input class="form-control" type="text" placeholder="Address" aria-label="default input example" />
                            </div>

                            <div className="col-md-6  mt-3">
                                <input class="form-control" type="text" placeholder="Pin code" aria-label="default input example" />
                            </div>
                            <div className="col-md-6 mt-3">
                                <input class="form-control" type="text" placeholder="Landline" aria-label="default input example" />
                            </div>

                            <div className="col-md-6  mt-3">
                                <input class="form-control" type="text" placeholder="Website" aria-label="default input example" />
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
                        <Button variant="outlined" sx={{ marginRight: "15px" }} color='error' onClick={toggleDrawer(false)}>Cancel</Button>
                        <Button variant="contained" sx={{ marginRight: "15px" }} color="success"> <FontAwesomeIcon icon={faMessage} fontSize="20px" style={{ marginRight: "5px" }} /> Send Message</Button>

                    </Box>
                </Box>

            </Drawer>

            {/* Drawer for Edit */}
            <Drawer anchor="top" open={openEdit} onClose={toggleDrawerEdit(false)}>
                <div class="modal-content mt-14" style={{ padding: "2%" }}>
                    <div class="modal-header">
                        {/* <h5 class="modal-title" id="exampleModalLabel">New Organization Unit [Ministry for POC]</h5> */}
                        <Typography variant="h5" mb={2} color='#003566' fontWeight="700">Update Organization Unit [Ministry for POC]</Typography>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit}>

                        <Typography variant="h6" mb={2} mt={2} textAlign="center" color='#003566'>Update Organization for POC</Typography>

                        <div className="row">
                            <div className="col-md-6  mt-3">
                                <select class="form-select" aria-label="Default select example" value={formData.Parent_OU} onChange={handleChange}>
                                    <option selected>Parent organization unit</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="col-md-6  mt-3">
                                <select class="form-select" aria-label="Default select example" value={formData.OU_Type} onChange={handleChange}>
                                    <option selected>Organization unit type</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="col-md-6  mt-3">
                                <select class="form-select" aria-label="Default select example" value={formData.State} onChange={handleChange}>
                                    <option selected>State</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="col-md-6  mt-3">
                                <select class="form-select" aria-label="Default select example" value={formData.District} onChange={handleChange}>
                                    <option selected>District</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="col-md-6 mt-3">
                                <input class="form-control" type="text" placeholder="O u code" value={formData.OU_Code} onChange={handleChange} aria-label="default input example" />
                            </div>

                            <div className="col-md-6  mt-3">
                                <input class="form-control" type="text" placeholder="O u name" value={formData.OU_Name} onChange={handleChange} aria-label="default input example" />
                            </div>

                            <div className="col-md-6 mt-3">
                                <input class="form-control" type="text" placeholder="Address" value={formData.OU_Address} onChange={handleChange} aria-label="default input example" />
                            </div>

                            <div className="col-md-6  mt-3">
                                <input class="form-control" type="text" placeholder="Pin code" value={formData.Pin_Code} onChange={handleChange} aria-label="default input example" />
                            </div>
                            <div className="col-md-6 mt-3">
                                <input class="form-control" type="text" placeholder="Landline" value={formData.Landline} onChange={handleChange} aria-label="default input example" />
                            </div>

                            <div className="col-md-6  mt-3">
                                <input class="form-control" type="text" placeholder="Website" value={formData.Website} onChange={handleChange} aria-label="default input example" />
                            </div>

                        </div>
                        <button type="submit" class="btn btn-success m-3">Update</button>
                        <button type="submit" class="btn btn-danger">Close</button>
                    </form>
                </div>
            </Drawer>

            {/* Drawer for Delete */}
            <Drawer anchor="top" open={openDel} onClose={toggleDrawerDel(false)}>
                <div class="modal-content mt-14" style={{ padding: "2%" }}>
                    <div class="modal-header">
                        {/* <h5 class="modal-title" id="exampleModalLabel">New Organization Unit [Ministry for POC]</h5> */}
                        <Typography variant="h5" mb={2} color='#003566' fontWeight="700">Delete Organization Unit</Typography>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>

                        {/* <Typography variant="h6" mb={2} mt={2} textAlign="center">Delete Organization Unit</Typography> */}

                        <div className="row">
                            <div className="col-md-6  mt-3">
                                <lavel>Organization Unit Code	</lavel>
                                <input class="form-control" type="text" placeholder="OU_POC" aria-label="default input example" value="OU_POC" readOnly />
                            </div>
                            <div className="col-md-6  mt-3">
                                <lavel>Organization</lavel>
                                <input class="form-control" type="text" placeholder="Organization for POC" aria-label="default input example" value="Organization for POC" readOnly />
                            </div>
                            <div className="col-md-6  mt-3">
                                <lavel>Organization Name</lavel>
                                <input class="form-control" type="text" placeholder="OU for POC	" aria-label="default input example" value="OU for POC" readOnly />
                            </div>
                            <div className="col-md-6  mt-3">
                                <lavel>Parent Organization Unit	</lavel>
                                <input class="form-control" type="text" placeholder="Parent Organization Unit" aria-label="default input example" value="" readOnly />
                            </div>
                            <div className="col-md-6 mt-3">
                                <lavel>Organization Unit Type	</lavel>
                                <input class="form-control" type="text" placeholder="Department under Ministry" aria-label="default input example" value="Department under Ministry" readOnly />
                            </div>

                            <div className="col-md-6  mt-3">
                                <lavel>Address</lavel>
                                <input class="form-control" type="text" placeholder="New Delhi" aria-label="default input example" value="New Delhi" readOnly />
                            </div>

                            <div className="col-md-6 mt-3">
                                <lavel>Pin Code	</lavel>
                                <input class="form-control" type="text" placeholder="Pin Code	" aria-label="default input example" value="" readOnly />
                            </div>

                            <div className="col-md-6  mt-3">
                                <lavel>Land Line Number	</lavel>
                                <input class="form-control" type="text" placeholder="Land Line Number" aria-label="default input example" value="" readOnly />
                            </div>
                            <div className="col-md-6 mt-3">
                                <lavel>Website</lavel>
                                <input class="form-control" type="text" placeholder="Website" aria-label="default input example" value="" readOnly />
                            </div>

                        </div>
                        <button type="submit" class="btn btn-primary m-3">Delete</button>
                        <button type="submit" class="btn btn-danger">Close</button>
                    </form>
                </div>
            </Drawer>

        </Box>
    );
}

export default OrganizationUnitDash;
