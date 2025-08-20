import React, { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Drawer, Button, Typography, Box, Toolbar, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faPen, faCheck, faPenToSquare, faTrash, faTurnDown } from '@fortawesome/free-solid-svg-icons';
import { faBandcamp } from '@fortawesome/free-brands-svg-icons';
import "./Dashboard.css";
import { useLocation } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganization, updateOrganization, fetchMinistry, fetchOrganizationType, deleteOrganization, createOrganization } from "../../redux/authSlice";
import { toast } from 'react-toastify';


function ManageOrganizationDash({ drawerWidth, collapsedDrawerWidth, desktopOpen }) {
    const location = useLocation();
    const permissionData = location.state?.permissionData;
    // const dispatch = useDispatch();
    const organizationState = useSelector((state) => state.organization);
    const ministryState = useSelector((state) => state.ministry);
    const organizationTypeState = useSelector((state) => state.organizationType);
    const tableData = organizationState.organization.data
    const MinistryData = ministryState.ministry
    const organizationType = organizationTypeState.organizationType
    const [columns, setColumns] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [showSelect, setShowSelect] = useState(false);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDel, setOpenDel] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null); // Updated
    const [openNew, setOpenNew] = useState(false);
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector(
        (state) => state.organization
    );
    const [formData, setFormData] = useState({
        organization_code: "",
        o_name: "",
        organization_type_id: "",
        vhost_id: "",
        org_visibility: "",   // 👈 Added
        public_visibility: "", // 👈 Added
    });

    useEffect(() => {
        dispatch(fetchOrganization());
        dispatch(fetchMinistry());
        dispatch(fetchOrganizationType());
    }, [dispatch]);

    const handleChange = (e) => {
        dispatch(setFormData({
            ...formData,
            [e.target.name]: e.target.value
        }));
    };

    // ------------------ Submit Handler ------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("selectedRowData", selectedRowData);

        try {
            let res;

            if (openEdit) {
                // 🔹 Update Mode
                res = await dispatch(updateOrganization({ formData, rowId: selectedRowData })).unwrap();

                toast.success(res?.message || "Organization updated!");
                setOpenEdit(false);
            } else {
                // 🔹 Create Mode
                res = await dispatch(createOrganization(formData)).unwrap();

                toast.success(res?.message || "Organization created!");
                setOpenNew(false);
            }

            // 🔹 Refresh list after success
            await dispatch(fetchOrganization());
        } catch (err) {
            console.error(err);
            toast.error(err?.message || "Something went wrong");
        }
    };

    // ------------------ Delete Handler ------------------
    
    const handleDelete = async (gu_id) => {
        if (!gu_id) {
            toast.error("Delete Failed: gu_id not found");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this organization?")) return;

        try {
            const res = await dispatch(deleteOrganization(gu_id)).unwrap();

            if (res?.status === "success") {
                toast.success(res?.message || "Organization deleted!");
                setOpenDel(false);
                await dispatch(fetchOrganization());
            } else {
                toast.error(res?.message || "Delete failed");
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.message || "Delete failed");
        }
    };


    const handlePopoverOpen = (event, rowData) => {
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
                    organizationCode: rowId.organization_code || '',
                    organizationType: rowId.organization_type_id || '',
                    organizationName: rowId.o_name || '',
                    vhost_id: rowId.vhost_id || '',
                    orgVisibility: rowId.is_o_visibility == true ? 1 : 0,
                    publicVisibility: rowId.is_public_visibility == true ? 1 : 0,


                });
            }
            setOpen(true);
        }
        if (action === 'Edit') {
            if (rowId) {
                setSelectedRowData(rowId);  // 🔹 Yeh line add karo

                setFormData({
                    gu_id: rowId.gu_id || '',
                    organizationCode: rowId.organization_code || '',
                    organizationType: rowId.organization_type_id || '',
                    organizationName: rowId.o_name || '',
                    vhost_id: rowId.vhost_id || '',
                    orgVisibility: rowId.is_o_visibility == true ? 1 : 0,
                    publicVisibility: rowId.is_public_visibility == true ? 1 : 0,
                });
            }
            setOpenEdit(true);
        }

        if (action === 'Delete') {
            if (rowId) {
                const ministry = MinistryData.find(item => item.id === rowId.ministry_id);
                const organization = organizationType.find(item => item.code === rowId.organization_type_id);
                setFormData({
                    id: rowId.id || '',
                    gu_id: rowId.gu_id || '',
                    organizationCode: rowId.organization_code || '',
                    organizationType: rowId.organization_type_id || '',
                    organizationTypeName: organization ? organization.description : '',
                    organizationName: rowId.o_name || '',
                    vhost: rowId.vhost || '',
                    ministry_id: rowId.ministry_id || '',
                    ministryName: ministry ? ministry.ministry_name : '',
                    orgVisibility: rowId.is_o_visibility == true ? 1 : 0,
                    publicVisibility: rowId.is_public_visibility == true ? 1 : 0,
                });

            }
            setOpenDel(true);
        }
        handlePopoverClose();
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
    const toggleDrawerNew = (status) => () => {
        setOpenNew(status);
    };

    useEffect(() => {
        if (tableData && organizationType.length && MinistryData.length) {
            const displayColumns = [
                { field: 'id', headerName: 'ID', sort: 'asc' },
                { field: 'ministrycode', headerName: 'Ministry' },
                { field: 'organization_code', headerName: 'Organisation Code' },
                { field: 'o_name', headerName: 'O Name' },
                { field: 'organizationtype', headerName: 'Organisation Type' },
                { field: 'vhost', headerName: 'Vhost' },
                { field: 'action', headerName: 'Action' }
            ];

            const formattedColumns = displayColumns.map(col => {
                if (col.field === 'organisation_type_id') {
                    return {
                        ...col,
                        valueGetter: (params) => {
                            const match = organizationType.find(item => item.code === params.data.organization_type_id);
                            return match ? match.description : '';
                        }
                    };
                } else if (col.field === 'ministry_id') {
                    return {
                        ...col,
                        valueGetter: (params) => {
                            const match = MinistryData.find(item => item.id === params.data.ministry_id);
                            return match ? match.ministry_name : '';
                        }
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
    }, [tableData, organizationType, MinistryData]);

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
            <div className="m-3">
                <div className="overdata mb-3" style={{ justifyContent: 'space-between', display: 'flex' }}>
                    <Typography variant="h5" color='#003566' fontWeight="700" align="center" gutterBottom>
                        Manage Organization
                    </Typography>
                    <div className="button">
                        {/* {permissionData.organisation_list == "active" ?
                            <button
                                type="button"
                                className="btn btn-primary mr-3 btn-bg-1"
                                onClick={() => setShowSelect((prev) => !prev)} // Toggle filter dropdown
                            >
                                Filter
                            </button> :
                            <></>} */}
                        {permissionData.add_organisation == "active" ?
                            <button type="button" className="btn btn-success" onClick={toggleDrawerNew(true)}>
                                + New
                            </button> :
                            <></>}


                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content" style={{ padding: "2%" }}>
                                    <div class="modal-header">
                                        {/* <h5 class="modal-title" id="exampleModalLabel">New Organization Unit [Ministry for POC]</h5> */}
                                        <Typography variant="h6" mb={2}>Create Organization</Typography>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form>

                                        <Typography variant="h6" mb={2} mt={2} textAlign="center">Ministry for POC</Typography>

                                        <div className="row">
                                            <div className="col-md-6 mt-3">
                                                <input class="form-control" type="text" placeholder="Organization code" aria-label="default input example" />
                                            </div>
                                            <div className="col-md-6  mt-3">
                                                <select class="form-select" aria-label="Default select example">
                                                    <option selected>Organization type</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6  mt-3">
                                                <input class="form-control" type="text" placeholder="Organization name" aria-label="default input example" />
                                            </div>

                                            <div className="col-md-6  mt-3">
                                                <select class="form-select" aria-label="Default select example">
                                                    <option selected>Vhost</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6  mt-3">
                                                <select class="form-select" aria-label="Default select example">
                                                    <option selected>Organization Visibility</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6  mt-3">
                                                <select class="form-select" aria-label="Default select example">
                                                    <option selected>Public Visibility</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>



                                        </div>
                                        <button type="submit" class="btn btn-primary m-3">Save</button>
                                        <button type="submit" class="btn btn-danger">Close</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* 
                {showSelect && (

                    <FormControl fullWidth className='mb-3' variant="outlined" style={{ width: '300px' }}>
                        <InputLabel id="Select an option">Select</InputLabel>
                        <Select
                            labelId="Select"
                            defaultValue=""
                            label="Select"
                        >
                            <MenuItem value="1">Organization Type</MenuItem>
                            <MenuItem value="2">Organization Code</MenuItem>
                            <MenuItem value="3">Organization</MenuItem>
                        </Select>
                    </FormControl>
                )}
 */}

                <div className="ag-theme-alpine" style={{ height: 539, width: '100%', padding: '10px', borderRadius: '10px' }}>
                    <AgGridReact
                        rowData={permissionData.organisation_list === "active" ? tableData : []}
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
                        <Typography margin={2}>DSP - Delhi Police</Typography>
                        <hr />

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

                        {permissionData.daily_chat_statistics === "active" && (
                            <ListItem
                                button
                                component="a"
                                className='cursor-pointer'
                                href="/DailyChat"
                                onClick={() => handleMenuItemClick('Daily Chat Statistics', selectedRowData)}
                            >
                                <FontAwesomeIcon icon={faCheck} className='mr-1' style={{ color: "#158cba" }} />
                                <ListItemText primary="Daily Chat Statistics" />
                            </ListItem>
                        )}

                        {permissionData.percapita_statistics === "active" && (
                            <ListItem
                                button
                                component="a"
                                className='cursor-pointer'
                                href="/PercapitaStatistics"
                                onClick={() => handleMenuItemClick('Percapita Statistics', selectedRowData)}
                            >
                                <FontAwesomeIcon icon={faPen} className='mr-1' style={{ color: "#158cba" }} />
                                <ListItemText primary="Percapita Statistics" />
                            </ListItem>
                        )}

                        {permissionData.organization_unit_wise_statistics === "active" && (
                            <ListItem
                                button
                                component="a"
                                className='cursor-pointer'
                                href="/OrganizationOverview"
                                onClick={() => handleMenuItemClick('Organization Units Wise Statistics', selectedRowData)}
                            >
                                <FontAwesomeIcon icon={faCube} className='mr-1' style={{ color: "#158cba" }} />
                                <ListItemText primary="Organization Units Wise Statistics" />
                            </ListItem>
                        )}

                        <hr />

                        {permissionData["top/buttom_reports"] === "active" && (
                            <ListItem
                                button
                                component="a"
                                href="/HeatMap"
                                className='cursor-pointer'
                                onClick={() => handleMenuItemClick('Top/Bottom Reports', selectedRowData)}
                            >
                                <FontAwesomeIcon icon={faTurnDown} className='mr-1' style={{ color: "#158cba" }} />
                                <ListItemText primary="Top/Bottom Reports" />
                            </ListItem>
                        )}

                        {permissionData["top/buttom_reports_single_page_view"] === "active" && (
                            <ListItem
                                button
                                component="a"
                                href="/HeatMap"
                                className='cursor-pointer'
                                onClick={() => handleMenuItemClick('Top/Bottom Reports Single Page View', selectedRowData)}
                            >
                                <FontAwesomeIcon icon={faBandcamp} className='mr-1' style={{ color: "#158cba" }} />
                                <ListItemText primary="Top/Bottom Reports Single Page View" />
                            </ListItem>
                        )}
                    </List>
                </Popover>
            </div>

            {/* Drawer for Create */}

            <Drawer anchor="top" open={openNew} onClose={toggleDrawerNew(false)}>
                <Box className="mt-14" sx={{ width: "100%", p: 3 }} role="presentation">
                    <Typography variant="h5" mb={2} color="#003566" fontWeight="700">
                        Create Organization
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Typography variant="h6" color="#003566" mb={2} textAlign="center">
                            Ministry for POC
                        </Typography>

                        <div className="row">
                            <div className="col-md-6 mt-3">
                                <TextField
                                    name="organization_code"
                                    label="Organization Code"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.organization_code}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 mt-3">
                                <TextField
                                    name="o_name"
                                    label="Organization Name"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.o_name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mt-3">
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="org-type-label">Organization Type</InputLabel>
                                    <Select
                                        labelId="org-type-label"
                                        name="organization_type_id"
                                        value={formData.organization_type_id}
                                        onChange={handleChange}
                                        label="Organization Type"
                                    >
                                        <MenuItem value="M">Ministry</MenuItem>
                                        <MenuItem value="D">Department Under Ministry</MenuItem>
                                        <MenuItem value="A">Attached Office</MenuItem>
                                        <MenuItem value="S">State Government</MenuItem>
                                        <MenuItem value="G">State Government Department</MenuItem>
                                        <MenuItem value="AU">Autonomous Bodies</MenuItem>
                                        <MenuItem value="CO">Central Offices</MenuItem>
                                        <MenuItem value="SG">Semi Government Office</MenuItem>
                                        <MenuItem value="PS">Central Public Sector Unit</MenuItem>
                                        <MenuItem value="ST">Statutory/Apex Bodies</MenuItem>
                                        <MenuItem value="C1">Section 8 Company</MenuItem>
                                        <MenuItem value="C2">Section 25 Company</MenuItem>
                                        <MenuItem value="J">Judiciary</MenuItem>

                                    </Select>
                                </FormControl>
                            </div>

                            <div className="col-md-6 mt-3">
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="vhost-label">Vhost</InputLabel>
                                    <Select
                                        labelId="vhost-label"
                                        name="vhost_id"
                                        value={formData.vhost_id}
                                        onChange={handleChange}
                                        label="Vhost"
                                    >
                                        <MenuItem value="1">State Government-North East</MenuItem>
                                        <MenuItem value="2">Defence</MenuItem>
                                        <MenuItem value="3">My Bharat</MenuItem>
                                        <MenuItem value="4">Judiciary</MenuItem>
                                        <MenuItem value="5">State Government Western</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            {/* 👇 Organization Visibility */}
                            <div className="col-md-6 mt-3">
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="org-vis-label">Organization Visibility</InputLabel>
                                    <Select
                                        labelId="org-vis-label"
                                        name="org_visibility"
                                        value={formData.org_visibility}
                                        onChange={handleChange}
                                        label="Organization Visibility"
                                    >
                                        <MenuItem value="1">Visible</MenuItem>
                                        <MenuItem value="0">Invisible</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            {/* 👇 Public Visibility */}
                            <div className="col-md-6 mt-3">
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="public-vis-label">Public Visibility</InputLabel>
                                    <Select
                                        labelId="public-vis-label"
                                        name="public_visibility"
                                        value={formData.public_visibility}
                                        onChange={handleChange}
                                        label="Public Visibility"
                                    >
                                        <MenuItem value="1">Visible</MenuItem>
                                        <MenuItem value="0">Invisible</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        {error && (
                            <Typography color="error" mt={2}>
                                {error}
                            </Typography>
                        )}
                        {success && (
                            <Typography color="green" mt={2}>
                                {success}
                            </Typography>
                        )}

                        <Box mt={3} gap={2} display="flex">
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Submit"}
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={toggleDrawerNew(false)}
                            >
                                Close
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Drawer>

            {/* Drawer for Edit */}
            <Drawer anchor="top" open={openEdit} onClose={toggleDrawerEdit(false)}>
                <div className="modal-content mt-14" style={{ padding: "2%" }}>
                    <div class="modal-header">
                        <Typography variant="h5" mb={2} color='#003566' fontWeight="700">Update Organization</Typography>
                        <button type="button" class="btn-close" onClick={() => setOpenEdit(false)} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h6" mb={2} mt={2} textAlign="center" color="#003566">
                            Ministry for POC
                        </Typography>

                        <div className="row">
                            <div className="col-md-6 mt-3">
                                <label htmlFor="organizationCode">Organization Code</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="organizationCode"
                                    value={formData.organizationCode}
                                    onChange={handleChange}
                                    placeholder="Organization code"
                                />
                            </div>




                            <div className="col-md-6 mt-3">
                                <label htmlFor="organizationType">Organization Type</label>
                                <select
                                    className="form-select"
                                    name="organizationType"
                                    value={formData.organizationType}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Organization Type</option>
                                    <option value="M">Ministry</option>
                                    <option value="D" selected="selected">Department under Ministry</option>
                                    <option value="A">Attached Office</option>
                                    <option value="S">State Government</option>
                                    <option value="G">State Government Department</option>
                                    <option value="AU">Autonomous Bodies</option>
                                    <option value="CO">Central Offices</option>
                                    <option value="SG">Semi Government Office</option>
                                    <option value="PS">Central Public Sector Unit</option>
                                    <option value="ST">Statutory / Apex Bodies</option>
                                    <option value="C1">Section 8 Company</option>
                                    <option value="C2">Section 25 Company</option>
                                    <option value="J">Judiciary</option>
                                </select>
                            </div>
                            <div className="col-md-6 mt-3">
                                <label htmlFor="organizationName">Organization Name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="organizationName"
                                    value={formData.organizationName}
                                    onChange={handleChange}
                                    placeholder="Organization name"
                                />
                            </div>

                            <div className="col-md-6 mt-3">
                                <label htmlFor="vhost_id">Vhost</label>
                                <select
                                    className="form-select"
                                    name="vhost_id"
                                    value={formData.vhost_id}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Vhost</option>
                                    <option value="10">State Government-North East</option>
                                    <option value="11">Defence </option>
                                    <option value="13">My Bharat</option>
                                    <option value="12">Judiciary</option>
                                    <option value="8">State Government-Western (Gujarat, Maharastra, Dadra and Nagar Haveli, Daman and Diu, Goa)</option>
                                    <option value="16">Public - I</option>
                                    <option value="7">State Government-Eastern (Bihar, Jharkhand, Odisha and West Bengal)</option>
                                    <option value="6">State Government-Central (Uttar Pradesh, Madya Pradesh, Chhattisgarh, Uttarakhand)</option>
                                    <option value="5">State Governemnt-North (Chandigarh, Delhi, Haryana, Himachal Pradesh, Jammu and Kashmir, Ladakh, Punjab and Rajastan)</option>
                                    <option value="3">Swachhagrahis</option>
                                    <option value="4">State Governemnt-South (Andhra Pradesh, Karnataka, Kerala, Puducherry, Tamil Nadu, Telengana)</option>
                                    <option value="1" selected="selected">Central Government (Civil) - I</option>
                                </select>
                            </div>
                            <div className="col-md-6 mt-3">
                                <label htmlFor="orgVisibility">Organization Visibility</label>
                                <select
                                    className="form-select"
                                    name="orgVisibility"
                                    value={formData.orgVisibility}
                                    onChange={handleChange}
                                >
                                    <option>Organization Visibility</option>
                                    <option value="1">Visible</option>
                                    <option value="0">Invisible</option>
                                </select>
                            </div>
                            <div className="col-md-6 mt-3">
                                <label htmlFor="publicVisibility">Public Visibility</label>
                                <select
                                    className="form-select"
                                    name="publicVisibility"
                                    value={formData.publicVisibility}
                                    onChange={handleChange}
                                >
                                    <option>Public Visibility</option>
                                    <option value="1">Visible</option>
                                    <option value="0">Invisible</option>
                                </select>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-success m-3">Update</button>
                        <button type="button" onClick={() => setOpenEdit(false)} className="btn btn-danger">Close</button>
                    </form>
                </div>
            </Drawer>

            {/* Drawer for Delete */}
            <Drawer anchor="top" open={openDel} onClose={toggleDrawerDel(false)}>
                <div className="modal-content mt-14" style={{ padding: "2%" }}>
                    <div class="modal-header">
                        <Typography variant="h5" color='#003566' fontWeight="700" mb={2}>Delete Organization</Typography>
                        <button type="button" onClick={() => setOpenDel(false)} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-md-6  mt-3">
                                <lavel>Organization Code	</lavel>
                                <input class="form-control" type="text" placeholder="O_POC" aria-label="default input example" value={formData.organizationCode} readOnly />
                            </div>
                            <div className="col-md-6  mt-3">
                                <lavel>Organization</lavel>
                                <input class="form-control" type="text" placeholder="Organization" aria-label="default input example" value={formData.organizationName} readOnly />
                            </div>
                            <div className="col-md-6  mt-3">
                                <lavel>Ministry	</lavel>
                                <input class="form-control" type="text" placeholder="Ministry" aria-label="default input example" value={formData.ministryName} readOnly />
                            </div>
                            <div className="col-md-6 mt-3">
                                <lavel>Organization Type	</lavel>
                                <input class="form-control" type="text" placeholder="Organization Type" aria-label="default input example" value={formData.organizationTypeName} readOnly />
                            </div>

                            <div className="col-md-6  mt-3">
                                <lavel>Vhost</lavel>
                                <input class="form-control" type="text" placeholder="Vhost" aria-label="default input example" value={formData.vhost} readOnly />
                            </div>
                        </div>
                        <button class="btn btn-primary m-3" type="button" onClick={() => handleDelete(formData.gu_id)}> Delete </button>
                        <button class="btn btn-danger" type="button" onClick={() => setOpenDel(false)}>Close</button>
                    </form>
                </div>
            </Drawer>
        </Box>
    );
}

export default ManageOrganizationDash;
