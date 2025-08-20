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
import { fetchOrganizationUnit, fetchMastersDistricts, fetchMastersStates, fetchOrganizationType, fetchOrganization, updateOrganizationUnit, createOrganizationUnit, deleteOrganizationUnit } from "../../redux/authSlice";
import { toast } from 'react-toastify';

function OrganizationUnitDash({ drawerWidth, collapsedDrawerWidth, desktopOpen }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDel, setOpenDel] = useState(false);
    const [editMode, setEditMode] = useState('');
    const [deleteMode, setDeleteMode] = useState('');
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const location = useLocation();
    const permissionData = location.state?.permissionData;
    const [columns, setColumns] = useState([]);
    const dispatch = useDispatch();
    const organizationUnitState = useSelector((state) => state.organizationUnit);
    const mastersDistrictsState = useSelector((state) => state.masterDistricts);
    const mastersStatesState = useSelector((state) => state.masterStates);
    const organizationState = useSelector((state) => state.organization);
    const organizationTypeState = useSelector((state) => state.organizationType);
    const tableData = organizationUnitState.organizationUnit.data
    const MastersDistricts = mastersDistrictsState.mastersDistricts
    const MastersStates = mastersStatesState.mastersStates
    const OrganizationName = organizationState.organization.data
    const OrganizationType = organizationTypeState.organizationType


    console.log("tableData", tableData);


    useEffect(() => {
        dispatch(fetchOrganizationUnit());
        dispatch(fetchMastersDistricts());
        dispatch(fetchMastersStates());
        dispatch(fetchOrganizationType());
        dispatch(fetchOrganization());
        dispatch(createOrganizationUnit(formData))
            .unwrap()
            .then((res) => {
                console.log("Create Success", res);
                dispatch(fetchOrganizationUnit()); // list refresh
                setOpenNew(false); // drawer close
            })
            .catch((err) => {
                console.error("Create Failed", err);
            });


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
            setEditMode(false); // Sandes message me edit mode off
            setDeleteMode(false)
        }

        if (action === 'Edit') {
            if (rowId) {
                setSelectedRowData(rowId);
                console.log("rowId", rowId);

                setFormData({
                    gu_id: rowId.gu_id || '',
                    Parent_OU: rowId.parent_ou || '',
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
            setEditMode(true); // ✅ Edit mode on
            setOpenEdit(true);
            setDeleteMode(false)
        }

        if (action === 'Delete') {
            if (rowId) {
                setSelectedRowData(rowId);
                setFormData({
                    gu_id: rowId.gu_id || '',
                    Parent_OU: rowId.parent_ou || '',
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
            setEditMode(false); // Delete me edit mode off
            setOpenDel(true);
            setDeleteMode(true)
        }

        handlePopoverClose();
    };


    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     let finalData = { ...formData };

    //     // Root OU banate time parent_ou null
    //     if (!finalData.Parent_OU || finalData.Parent_OU === "") {
    //         finalData.Parent_OU = null;
    //     }

    //     console.log("Submitting Form Data", finalData);

    //     if (editMode) {
    //         // Update Mode
    //         dispatch(updateOrganizationUnit({ formData: finalData, rowId: selectedRowData }))
    //             .unwrap()
    //             .then((res) => {
    //                 toast.success("Update Success", res);
    //                 dispatch(fetchOrganizationUnit());
    //                 setOpenEdit(false);
    //             })
    //             .catch((err) => {
    //                 toast.error("Update Failed", err);
    //             });
    //     } else if (deleteMode) {
    //         // Delete Mode
    //         if (!finalData.gu_id) {
    //             toast.error("Delete Failed: gu_id not found");
    //             return;
    //         }

    //         dispatch(deleteOrganizationUnit(finalData.gu_id))
    //             .unwrap()
    //             .then((res) => {
    //                 toast.success(res?.message || "Delete Success");
    //                 dispatch(fetchOrganizationUnit());
    //                 setOpenDel(false);
    //             })
    //             .catch((err) => {
    //                 toast.error(err?.message || "Delete Failed");
    //             });
    //     } else {
    //         // Create Mode
    //         dispatch(createOrganizationUnit(finalData))
    //             .unwrap()
    //             .then((res) => {
    //                 toast.success("Create Success", res);
    //                 dispatch(fetchOrganizationUnit());
    //                 setOpenNew(false);
    //             })
    //             .catch((err) => {
    //                 toast.error("Create Failed", err);
    //             });
    //     }
    // };


    const handleSubmit = (e) => {
        e.preventDefault();

        let finalData = { ...formData };

        // Root OU banate time parent_ou null
        if (!finalData.Parent_OU || finalData.Parent_OU === "") {
            finalData.Parent_OU = null;
        }

        console.log("Submitting Form Data", finalData);

        if (editMode) {
            // 🔹 Update Mode
            dispatch(updateOrganization({ formData: finalData, rowId: selectedRowData }))
                .unwrap()
                .then((res) => {
                    toast.success(res?.message || "Update Success");
                    dispatch(fetchOrganizationUnit());
                    setOpenEdit(false);
                })
                .catch((err) => {
                    toast.error(err?.message || "Update Failed");
                });

        } else if (deleteMode) {
            // 🔹 Delete Mode
            if (!finalData.gu_id) {
                toast.error("Delete Failed: gu_id not found");
                return;
            }

            dispatch(deleteOrganization(finalData.gu_id))
                .unwrap()
                .then((res) => {
                    if (res?.status === "success") {
                        toast.success(res.message || "Delete Success");
                        dispatch(fetchOrganizationUnit());
                        setOpenDel(false);
                    } else {
                        toast.error(res?.message || "Delete Failed");
                    }
                })
                .catch((err) => {
                    toast.error(err?.message || "Delete Failed");
                });

        } else {
            // 🔹 Create Mode
            dispatch(createOrganizationUnit(finalData))
                .unwrap()
                .then((res) => {
                    toast.success(res?.message || "Create Success");
                    dispatch(fetchOrganizationUnit());
                    setOpenNew(false);
                })
                .catch((err) => {
                    toast.error(err?.message || "Create Failed");
                });
        }
    };



    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "State" && { District: "" }) // state change pe district reset
        }));

        if (name === "State") {
            if (value) {
                dispatch(fetchMastersDistricts(value)); // API call with new state
            } else {
                dispatch({ type: "mastersDistricts/clear" }); // optional: agar koi state select na ho
            }
        }
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
                            const match = MastersStates.find(item => parseInt(item.state_code) === params.data.state_id);
                            return match ? match.state : '';
                        }
                    };
                }
                else if (col.field === 'district_id') {
                    return {
                        ...col,
                        valueGetter: (params) => {
                            const match = MastersDistricts.find(item => parseInt(item.district_code) === params.data.district_id);
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
                        headerName: formatHeader(col.headerName || col.field),
                        flex: 1,
                        resizable: true,
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

    const filteredDistricts = MastersDistricts.filter(
        (district) => district.state_code === formData.State
    );

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
                    <Typography variant="h5" align="center" gutterBottom className='card-text' fontWeight="700">
                        Organization Unit
                    </Typography>
                    <div className="button">
                        <button type="button" className="btn btn-success" onClick={toggleDrawerNew(true)}>
                            + New
                        </button>

                    </div>
                </div>


                <div className="ag-theme-alpine" style={{ height: 539, width: '100%', padding: '10px', borderRadius: '10px' }}>

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
                        <button type="button" class="btn-close" onClick={() => setOpenNew(false)} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row">

                            {/* Parent OU */}
                            <div className="col-md-6 mt-3">
                                <select
                                    className="form-select"
                                    name="Parent_OU"
                                    value={formData.Parent_OU}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Parent Organization Unit</option>
                                    <option value="1844">OU for POC</option>
                                    <option value="2024">POC-Government of Karnataka</option>
                                </select>
                            </div>

                            <div className="col-md-6 mt-3">
                                <select
                                    className="form-select"
                                    name="OU_Type"
                                    value={formData.OU_Type}
                                    onChange={handleChange}
                                >
                                    <option value="">Organization unit type</option>
                                    {OrganizationType.map((item) => (
                                        <option key={item.code} value={item.code}>{item.description}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6 mt-3">
                                <select
                                    className="form-select"
                                    name="State"
                                    value={formData.State}
                                    onChange={handleChange}
                                >
                                    <option value="">Select State</option>
                                    {MastersStates.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.state}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6 mt-3">

                                <select
                                    className="form-select"
                                    name="District"
                                    value={formData.District}
                                    onChange={handleChange}
                                    disabled={!formData.State || mastersDistrictsState.loading}
                                >
                                    <option value="">
                                        {mastersDistrictsState.loading ? "Loading..." : "Select District"}
                                    </option>
                                    {MastersDistricts.map((item) => (
                                        <option key={item.id} value={item.district_code}>
                                            {item.district}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div className="col-md-6 mt-3">
                                <input className="form-control" type="text" placeholder="OU Code" name="OU_Code" value={formData.OU_Code} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mt-3">
                                <input className="form-control" type="text" placeholder="OU Name" name="OU_Name" value={formData.OU_Name} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mt-3">
                                <input className="form-control" type="text" placeholder="Address" name="OU_Address" value={formData.OU_Address} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mt-3">
                                <input className="form-control" type="text" placeholder="Pin Code" name="Pin_Code" value={formData.Pin_Code} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mt-3">
                                <input className="form-control" type="text" placeholder="Landline" name="Landline" value={formData.Landline} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mt-3">
                                <input className="form-control" type="text" placeholder="Website" name="Website" value={formData.Website} onChange={handleChange} />
                            </div>

                        </div>

                        <button type="submit" className="btn btn-success m-3">Submit</button>
                        <button type="button" onClick={() => setOpenNew(false)} className="btn btn-danger">Close</button>
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
                                    // value={age}
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
                        <Typography variant="h5" mb={2} color='#003566' fontWeight="700">Update Organization Unit [Ministry for POC]</Typography>
                        <button type="button" class="btn-close" onClick={() => setOpenEdit(false)} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row">

                            {/* Parent OU */}
                            <div className="col-md-6 mt-3">
                                <select
                                    className="form-select"
                                    name="Parent_OU"
                                    value={formData.Parent_OU}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Parent Organization Unit</option>
                                    <option value="1">OU for POC</option>
                                    <option value="2">POC-Government of Karnataka</option>
                                </select>
                            </div>

                            <div className="col-md-6 mt-3">
                                <select
                                    className="form-select"
                                    name="OU_Type"
                                    value={formData.OU_Type}
                                    onChange={handleChange}
                                >
                                    <option value="">Organization unit type</option>
                                    {OrganizationType.map((item) => (
                                        <option key={item.code} value={item.code}>{item.description}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6 mt-3">
                                <select
                                    className="form-select"
                                    name="State"
                                    value={formData.State}
                                    onChange={handleChange}
                                >
                                    <option value="">Select State</option>
                                    {MastersStates.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.state}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6 mt-3">

                                <select
                                    className="form-select"
                                    name="District"
                                    value={formData.District}
                                    onChange={handleChange}
                                    disabled={!formData.State || mastersDistrictsState.loading}
                                >
                                    <option value="">
                                        {mastersDistrictsState.loading ? "Loading..." : "Select District"}
                                    </option>
                                    {MastersDistricts.map((item) => (
                                        <option key={item.id} value={item.district_code}>
                                            {item.district}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div className="col-md-6 mt-3">
                                <input className="form-control" type="text" placeholder="OU Code" name="OU_Code" value={formData.OU_Code} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mt-3">
                                <input className="form-control" type="text" placeholder="OU Name" name="OU_Name" value={formData.OU_Name} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mt-3">
                                <input className="form-control" type="text" placeholder="Address" name="OU_Address" value={formData.OU_Address} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mt-3">
                                <input className="form-control" type="text" placeholder="Pin Code" name="Pin_Code" value={formData.Pin_Code} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mt-3">
                                <input className="form-control" type="text" placeholder="Landline" name="Landline" value={formData.Landline} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mt-3">
                                <input className="form-control" type="text" placeholder="Website" name="Website" value={formData.Website} onChange={handleChange} />
                            </div>

                        </div>

                        <button type="submit" className="btn btn-success m-3">Update</button>
                        <button type="button" onClick={() => setOpenEdit(false)} className="btn btn-danger">Close</button>
                    </form>

                </div>
            </Drawer >

            {/* Drawer for Delete */}
            < Drawer anchor="top" open={openDel} onClose={toggleDrawerDel(false)} >
                <div class="modal-content mt-14" style={{ padding: "2%" }}>
                    <div class="modal-header">
                        <Typography variant="h5" mb={2} color='#003566' fontWeight="700">Delete Organization Unit</Typography>
                        <button type="button" class="btn-close" onClick={() => setOpenDel(false)} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit}>

                        <div className="row">
                            <div className="col-md-6  mt-3">
                                <lavel>Organization Unit Code	</lavel>
                                <input class="form-control" type="text" aria-label="default input example" value={formData.OU_Code} readOnly />
                            </div>

                            <div className="col-md-6  mt-3">
                                <lavel>Organization Name</lavel>
                                <input class="form-control" type="text" aria-label="default input example" value={formData.OU_Name} readOnly />
                            </div>
                            <div className="col-md-6  mt-3">
                                <lavel>Parent Organization Unit	</lavel>
                                <input class="form-control" type="text" aria-label="default input example" value={formData.Parent_OU} readOnly />
                            </div>
                            <div className="col-md-6 mt-3">
                                <lavel>Organization Unit Type	</lavel>
                                <input class="form-control" type="text" aria-label="default input example" value={formData.OU_Type} readOnly />
                            </div>

                            <div className="col-md-6  mt-3">
                                <lavel>Address</lavel>
                                <input class="form-control" type="text" aria-label="default input example" value={formData.OU_Address} readOnly />
                            </div>

                            <div className="col-md-6 mt-3">
                                <lavel>Pin Code	</lavel>
                                <input class="form-control" type="text" aria-label="default input example" value={formData.Pin_Code} readOnly />
                            </div>

                            <div className="col-md-6  mt-3">
                                <lavel>Land Line Number	</lavel>
                                <input class="form-control" type="text" aria-label="default input example" value={formData.Landline} readOnly />
                            </div>
                            <div className="col-md-6 mt-3">
                                <lavel>Website</lavel>
                                <input class="form-control" type="text" value={formData.Website} aria-label="default input example" readOnly />
                            </div>

                        </div>
                        <button type="submit" class="btn btn-primary m-3">Delete</button>
                        <button type='button' onClick={() => setOpenDel(false)} class="btn btn-danger">Close</button>
                    </form>
                </div>
            </Drawer >

        </Box >
    );
}

export default OrganizationUnitDash;
