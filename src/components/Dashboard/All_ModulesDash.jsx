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
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../redux/authSlice";


function All_ModulesDash({ drawerWidth, collapsedDrawerWidth, desktopOpen }) {
    const location = useLocation();
    const permissionData = location.state?.permissionData;
    const dispatch = useDispatch();
    const employeeState = useSelector((state) => state.employee);
    const tableData = employeeState.employees
    const [columns, setColumns] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [showSelect, setShowSelect] = useState(false);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDel, setOpenDel] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null); // Updated
    const [openNew, setOpenNew] = useState(false);
    const [formData, setFormData] = useState({
        organizationCode: '',
        organizationType: '',
        organizationName: '',
        vhost: '',
        orgVisibility: '',
        publicVisibility: ''
    });

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);


    const handlePopoverOpen = (event, rowData) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowData(rowData);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setSelectedRowData(null);
    };

    const handleMenuItemClick = (action, rowId) => {
        if (action === 'Send Sandes Message') {
            setOpen(true);
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
        if (action === 'Delete') {
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
        if (tableData && tableData.length > 0) {
            const keys = Object.keys(tableData[0]);
            const cols = keys
                .filter(key => key !== 'action')
                .map(key => ({
                    headerName: key.charAt(0).toUpperCase() + key.slice(1),
                    field: key,
                    sortable: true,
                    filter: true,
                    resizable: true,
                }));

            cols.push({
                headerName: 'Action',
                field: 'action',
                cellRenderer: (params) => (
                    <Button
                        variant="outlined"
                        sx={{ color: '#fff', backgroundColor: '#003566', fontSize: ".8rem" }}
                        onClick={(event) => handlePopoverOpen(event, params.data)}
                    >
                        Actions
                    </Button>
                ),
            });

            setColumns(cols);
        }
    }, [tableData]);


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
                        All Modules
                    </Typography>
                    <div className="button">
                        {permissionData.modules_list == "active" ?
                            <button
                                type="button"
                                className="btn btn-primary mr-3 btn-bg-1"
                                onClick={() => setShowSelect((prev) => !prev)}
                            >
                                Filter
                            </button> :
                            <></>}
                        {permissionData.add_modules == "active" ?
                            <button type="button" className="btn btn-success" onClick={toggleDrawerNew(true)}>
                                + New
                            </button> :
                            <></>}


                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content" style={{ padding: "2%" }}>
                                    <div class="modal-header">
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

                {showSelect && (

                    <FormControl fullWidth className='mb-3' variant="outlined" style={{ width: '300px' }}>
                        <InputLabel id="Select an option">Select an option</InputLabel>
                        <Select
                            labelId="Select an option"
                            defaultValue=""
                            label="Select an option"
                        >
                            <MenuItem value="1">One</MenuItem>
                            <MenuItem value="2">Two</MenuItem>
                            <MenuItem value="3">Three</MenuItem>
                        </Select>
                    </FormControl>
                )}

                <div className="ag-theme-alpine" style={{ height: "58.1vh", width: '100%', padding: '10px', borderRadius: '10px' }}>

                    <AgGridReact
                        rowData={permissionData.modules_list === "active" ? tableData : []}
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
                            <ListItem button className='cursor-pointer' onClick={() => handleMenuItemClick('Edit' , selectedRowData)}>
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
                                onClick={() => handleMenuItemClick('Daily Chat Statistics')}
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
                                onClick={() => handleMenuItemClick('Percapita Statistics')}
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
                                onClick={() => handleMenuItemClick('Organization Units Wise Statistics')}
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
                                onClick={() => handleMenuItemClick('Top/Bottom Reports')}
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
                                onClick={() => handleMenuItemClick('Top/Bottom Reports Single Page View')}
                            >
                                <FontAwesomeIcon icon={faBandcamp} className='mr-1' style={{ color: "#158cba" }} />
                                <ListItemText primary="Top/Bottom Reports Single Page View" />
                            </ListItem>
                        )}
                    </List>
                </Popover>
            </div>

            <Drawer anchor="top" open={openNew} onClose={toggleDrawerNew(false)}>
                <Box className="mt-14" sx={{ width: "100%", p: 3 }} role="presentation">
                    <Typography variant="h5" mb={2} color='#003566' fontWeight="700">
                        Create Organization
                    </Typography>

                    <form>
                        <Typography variant="h6" color='#003566' mb={2} textAlign="center">
                            Ministry for POC
                        </Typography>

                        <div className="row">
                            <div className="col-md-6  mt-3">
                                <TextField label="Organization Code" variant="outlined" fullWidth />

                            </div>
                            <div className="col-md-6  mt-3">
                                <TextField label="Organization Name" variant="outlined" fullWidth />

                            </div>

                            <div className="col-md-6 mt-3">

                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="org-type-label">Organization Type</InputLabel>
                                    <Select
                                        labelId="org-type-label"
                                        defaultValue=""
                                        label="Organization Type"
                                    >
                                        <MenuItem value="1">One</MenuItem>
                                        <MenuItem value="2">Two</MenuItem>
                                        <MenuItem value="3">Three</MenuItem>
                                    </Select>
                                </FormControl>

                            </div>
                            <div className="col-md-6 mt-3">
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="vhost-label">Vhost</InputLabel>
                                    <Select
                                        labelId="vhost-label"
                                        defaultValue=""
                                        label="Vhost"
                                    >
                                        <MenuItem value="1">One</MenuItem>
                                        <MenuItem value="2">Two</MenuItem>
                                        <MenuItem value="3">Three</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="col-md-6 mt-3">
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="org-vis-label">Organization Visibility</InputLabel>
                                    <Select
                                        labelId="org-vis-label"
                                        defaultValue=""
                                        label="Organization Visibility"
                                    >
                                        <MenuItem value="1">One</MenuItem>
                                        <MenuItem value="2">Two</MenuItem>
                                        <MenuItem value="3">Three</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="col-md-6 mt-3">
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="public-vis-label">Public Visibility</InputLabel>
                                    <Select
                                        labelId="public-vis-label"
                                        defaultValue=""
                                        label="Public Visibility"
                                    >
                                        <MenuItem value="1">One</MenuItem>
                                        <MenuItem value="2">Two</MenuItem>
                                        <MenuItem value="3">Three</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>


                        </div>

                        <Box mt={3} gap={2} display="flex">
                            <Button variant="contained" color="success" >
                                Submit
                            </Button>
                            <Button variant="outlined" color="error" onClick={toggleDrawer(false)}>
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
                        {/* <h5 class="modal-title" id="exampleModalLabel">New Organization Unit [Ministry for POC]</h5> */}
                        <Typography variant="h5" mb={2} color='#003566' fontWeight="700">Update Organization</Typography>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>

                        <Typography variant="h6" mb={2} mt={2} textAlign="center" color='#003566'>Ministry for POC</Typography>

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
                        <button type="submit" class="btn btn-success m-3">Update</button>
                        <button type="submit" class="btn btn-danger">Close</button>
                    </form>
                </div>
            </Drawer>

            {/* Drawer for Delete */}
            <Drawer anchor="top" open={openDel} onClose={toggleDrawerDel(false)}>
                <div className="modal-content mt-14" style={{ padding: "2%" }}>
                    <div class="modal-header">
                        <Typography variant="h5" color='#003566' fontWeight="700" mb={2}>Delete Organization</Typography>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>

                        <div className="row">
                            <div className="col-md-6  mt-3">
                                <lavel>Organization Code	</lavel>
                                <input class="form-control" type="text" placeholder="O_POC" aria-label="default input example" value="O_POC" readOnly />
                            </div>
                            <div className="col-md-6  mt-3">
                                <lavel>Organization</lavel>
                                <input class="form-control" type="text" placeholder="Organization" aria-label="default input example" value="" readOnly />
                            </div>
                            <div className="col-md-6  mt-3">
                                <lavel>Organization Name</lavel>
                                <input class="form-control" type="text" placeholder="Organization for POC	" aria-label="default input example" value="Organization for POC" readOnly />
                            </div>
                            <div className="col-md-6  mt-3">
                                <lavel>Ministry	</lavel>
                                <input class="form-control" type="text" placeholder="Ministry" aria-label="default input example" value="Ministry for POC" readOnly />
                            </div>
                            <div className="col-md-6 mt-3">
                                <lavel>Organization Type	</lavel>
                                <input class="form-control" type="text" placeholder="Organization Type" aria-label="default input example" value="Department under Ministry" readOnly />
                            </div>

                            <div className="col-md-6  mt-3">
                                <lavel>Vhost</lavel>
                                <input class="form-control" type="text" placeholder="Vhost" aria-label="default input example" value="fd6cca52.gims.gov.in" readOnly />
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

export default All_ModulesDash;
