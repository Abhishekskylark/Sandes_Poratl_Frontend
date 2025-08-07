// import React, { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';
// import { Drawer, FormControl, InputLabel, Select, MenuItem, TextField, Typography, Box, Toolbar } from '@mui/material';
// import "./Dashboard.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faCommentSms } from '@fortawesome/free-solid-svg-icons';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
// import { useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { fetchImportEmployee, fetchOrganizationType, fetchOrganization } from "../../redux/authSlice";
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import 'ag-grid-enterprise';

// function ImportEmployeesDash({ drawerWidth, collapsedDrawerWidth, desktopOpen }) {
//     const location = useLocation();
//     const permissionData = location.state?.permissionData;
//     const [currentPage, setCurrentPage] = useState(1);
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [selectedRowId, setSelectedRowId] = useState(null);
//     const [showSelect, setShowSelect] = useState(false);
//     const [openNew, setOpenNew] = useState(false);
//     const [open, setOpen] = useState(false); // State to control Drawer
//     const [age, setAge] = useState(''); // State for the dropdown (age selection)
//     const [imagePreview, setImagePreview] = useState(''); // State for image preview
//     const [columns, setColumns] = useState([]);
//     const dispatch = useDispatch();
//     const importEmployeeState = useSelector((state) => state.importEmployee);
//     const organizationTypeState = useSelector((state) => state.organizationType);
//     const organizationState = useSelector((state) => state.organization);
//     const tableData = importEmployeeState.importEmployee
//     const OrganizationType = organizationTypeState.organizationType
//     const OrganizationName = organizationState.organization.data
//     console.log("tableData",tableData);

//     useEffect(() => {
//         dispatch(fetchImportEmployee());
//         dispatch(fetchOrganizationType());
//         dispatch(fetchOrganization());
//     }, [dispatch]);




//     const handleDelete = () => {
//         const confirmDelete = window.confirm("Are you sure you want to delete?");
//         if (confirmDelete) {
//             // Your delete logic (API call or state update)
//             // console.log(`Deleting row with ID: ${row.id}`);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Add form submission logic here (e.g., send message)
//     };

//     const handleChange = (event) => {
//         setAge(event.target.value);
//     };

//     const toggleDrawerNew = (open) => () => {
//         setOpenNew(open);
//     };

//     const toggleDrawer = (open) => () => {
//         setOpen(open);
//     };

//     useEffect(() => {
//         if (tableData && OrganizationType.length && OrganizationName) {
//             const displayColumns = [
//                 { field: 'ou_id', headerName: 'OU ID', sort: 'asc' },
//                 { field: 'ou_name', headerName: 'OU Name' },
//                 { field: 'batch_code', headerName: 'Batch Code' },
//                 { field: 'upload_date', headerName: 'Upload Date' },
//                 { field: 'records_count', headerName: 'Records' },
//                 { field: 'district_id', headerName: 'Onboarded' },
//                 { field: 'ou_address', headerName: 'Failed' },
//                 { field: 'ou_code', headerName: '	Status' },
//                 { field: 'action', headerName: 'Action' }
//             ];

//             const formattedColumns = displayColumns.map(col => {
//                 // if (col.field === 'ou_type') {
//                 //     return {
//                 //         ...col,
//                 //         valueGetter: (params) => {
//                 //             const match = OrganizationType.find(item => item.code === params.data.ou_type);
//                 //             return match ? match.description : '';
//                 //         }
//                 //     };
//                 // }
//                 // else if (col.field === 'state_id') {
//                 //     return {
//                 //         ...col,
//                 //         valueGetter: (params) => {
//                 //             const match = MastersStates.find(item => item.id === params.data.state_id);
//                 //             return match ? match.state : '';
//                 //         }
//                 //     };
//                 // }
//                 // else if (col.field === 'district_id') {
//                 //     return {
//                 //         ...col,
//                 //         valueGetter: (params) => {
//                 //             const match = MastersDistricts.find(item => item.id === params.data.district_id);
//                 //             return match ? match.district : '';
//                 //         }
//                 //     };
//                 // }
//                 if (col.field === 'organization_id') {
//                     return {
//                         ...col,
//                         valueGetter: (params) => {
//                             const match = OrganizationName.find(item => item.id === params.data.organization_id);
//                             return match ? match.o_name : '';
//                         }
//                     };
//                 }
//                 // else if (col.field === 'action') {
//                 //     return {
//                 //         ...col,
//                 //         cellRenderer: (params) => (
//                 //             <Button
//                 //                 variant="outlined"
//                 //                 sx={{ color: '#fff', backgroundColor: '#003566', fontSize: ".8rem" }}MastersDistricts 
//                 //                 onClick={(event) => handlePopoverOpen(event, params.data)}
//                 //             >
//                 //                 Actions
//                 //             </Button>
//                 //         )
//                 //     };
//                 // } 
//                 else {
//                     return {
//                         ...col,
//                         headerName: formatHeader(col.headerName || col.field)
//                     };
//                 }
//             });

//             setColumns(formattedColumns);
//         }
//     }, [tableData, OrganizationType, OrganizationName]);


//     const formatHeader = (field) => {
//         return field
//             .replace(/_/g, ' ')
//             .replace(/\b\w/g, char => char.toUpperCase());
//     };


//     return (
//         <Box
//             component="main"
//             sx={{
//                 flexGrow: 1,
//                 p: 3,
//                 transition: "margin 0.3s, width 0.3s",
//                 width: {
//                     xs: "100%",
//                     md: desktopOpen
//                         ? `calc(100% - ${drawerWidth}px)`
//                         : `calc(100% - ${collapsedDrawerWidth}px)`,
//                 },
//                 bgcolor: "background.default",
//             }}
//         >
//             <Toolbar />
//             <div className="m-3" style={{ height: '70vh' }}>
//                 <div className="overdata mb-3" style={{ justifyContent: 'space-between', display: 'flex' }}>
//                     <Typography variant="h5" align="center" gutterBottom color='#003566' fontWeight="700">
//                         Import Employees
//                     </Typography>
//                     <div className="button">
//                         <button
//                             type="button"
//                             className="btn btn-primary mr-3 btn-bg-1"
//                             onClick={() => setShowSelect((prev) => !prev)} // Toggle filter dropdown
//                         >
//                             Help
//                         </button>

//                         <button type="button" class="btn btn-success" onClick={toggleDrawerNew(true)}>
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

//                 <div className="ag-theme-alpine" style={{ height: 560, width: '100%', padding: '10px', borderRadius: '10px' }}>

//                     <AgGridReact
//                         rowData={permissionData.unit_list === "active" ? tableData : []}
//                         columnDefs={columns}
//                         defaultColDef={{ sortable: true, filter: true, resizable: true }}
//                         pagination={true}
//                         paginationPageSize={10}
//                         animateRows={true}
//                     />

//                 </div>
//             </div>

//             <Drawer anchor="top" open={openNew} onClose={toggleDrawerNew(false)}>
//                 <div class="modal-content mt-14" style={{ padding: "2%" }}>
//                     <div class="modal-header">
//                         <Typography variant="h6" mb={2} color='#003566' fontWeight="700">Import Employees</Typography>
//                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                     </div>
//                     <form>
//                         <div className="row">

//                             <div className="col-md-6  mt-3">
//                                 <select class="form-select" aria-label="Default select example">
//                                     <option selected>Organization Unit</option>
//                                     <option value="1">One</option>
//                                     <option value="2">Two</option>
//                                     <option value="3">Three</option>
//                                 </select>
//                             </div>
//                         </div>
//                         <button type="submit" class="btn btn-success m-3">Save</button>
//                         <button type="submit" class="btn btn-danger">Close</button>
//                     </form>
//                 </div>
//             </Drawer>

//             {/* Drawer for Send Sandes Message */}
//             <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
//                 <Box
//                     component="form"
//                     className='mt-14'
//                     onSubmit={handleSubmit}
//                     sx={{ p: 4, width: '100%', maxWidth: "80%", mx: 'auto' }}
//                 >
//                     <Typography variant="h4" textAlign="center" fontWeight="700" gutterBottom>
//                         Send Message
//                     </Typography>
//                     <div className="row">
//                         <div className="col-md-6 mt-3">
//                             <FormControl fullWidth margin="normal">
//                                 <InputLabel id="demo-simple-select-label">Sandes Portal</InputLabel>
//                                 <Select
//                                     labelId="demo-simple-select-label"
//                                     id="demo-simple-select"
//                                     value={age}
//                                     label="Sender ID/App"
//                                     onChange={handleChange}
//                                 >
//                                     <MenuItem value={10}>Ten</MenuItem>
//                                     <MenuItem value={20}>Twenty</MenuItem>
//                                     <MenuItem value={30}>Thirty</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </div>
//                         <div className="col-md-6 mt-3">
//                             <TextField
//                                 fullWidth
//                                 margin="normal"
//                                 label="To"
//                                 value="OU for POC
//              "
//                                 InputProps={{
//                                     readOnly: true,
//                                 }}
//                             />
//                         </div>

//                         <div className="col-md-12 mt-3">
//                             <TextField
//                                 fullWidth
//                                 margin="normal"
//                                 name="message"
//                                 label="Message"
//                                 multiline
//                                 rows={4}
//                             />
//                         </div>
//                         <div className="col-md-3 mt-3">
//                             <FormControl>
//                                 <label>
//                                     <input type="checkbox" name="Include your name in message footer" /> Include your name in message footer
//                                 </label>
//                             </FormControl>
//                         </div>
//                         <div className="col-md-3 mt-3">
//                             <FormControl>
//                                 <label>
//                                     <input type="checkbox" name="Include your OU name in message footer" /> Include your OU name in message footer
//                                 </label>
//                             </FormControl>
//                         </div>
//                         <div className="col-md-12 mt-3">
//                             <Button variant="outlined" component="label">
//                                 Upload Files
//                                 <input
//                                     hidden
//                                     accept="image/*"
//                                     type="file"
//                                     onChange={(e) => {
//                                         const file = e.target.files[0];
//                                         if (file) {
//                                             const reader = new FileReader();
//                                             reader.onload = (event) => {
//                                                 setImagePreview(event.target.result);
//                                             };
//                                             reader.readAsDataURL(file);
//                                         }
//                                     }}
//                                 />
//                             </Button>
//                         </div>
//                         <div className="col-md-12 mt-3">
//                             {imagePreview && (
//                                 <Box mt={2}>
//                                     <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: 200, objectFit: 'contain' }} />
//                                 </Box>
//                             )}

//                         </div>

//                     </div>



//                     <Box display="flex" mt={3}>
//                         <Button variant="outlined" sx={{ marginRight: "15px" }} onClick={toggleDrawer(false)}>Cancel</Button>
//                         <Button variant="contained" sx={{ marginRight: "15px" }} color="primary"> <FontAwesomeIcon icon={faEnvelope} fontSize="20px" style={{ marginRight: "5px" }} /> Send Email</Button>
//                         <Button variant="contained" color="secondary"> <FontAwesomeIcon icon={faCommentSms} fontSize="20px" style={{ marginRight: "5px" }} /> Send SMS</Button>
//                     </Box>
//                 </Box>
//             </Drawer>
//         </Box>
//     );
// }

// export default ImportEmployeesDash











import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {
    Drawer, FormControl, InputLabel, Select, MenuItem,
    TextField, Typography, Box, Toolbar
} from '@mui/material';
import "./Dashboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCommentSms,faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchImportEmployee, fetchOrganizationUnit } from "../../redux/authSlice";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

function ImportEmployeesDash({ drawerWidth, collapsedDrawerWidth, desktopOpen }) {
    const location = useLocation();
    const permissionData = location.state?.permissionData;
    const [showSelect, setShowSelect] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const [open, setOpen] = useState(false);
    const [age, setAge] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [columns, setColumns] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowData, setSelectedRowData] = useState(null);

    const dispatch = useDispatch();
    const importEmployeeState = useSelector((state) => state.importEmployee);
    const organizationUnitState = useSelector((state) => state.organizationUnit);

    const tableData = importEmployeeState.importEmployee;
    const OrganizationUnitName = organizationUnitState.organizationUnit.data;

    console.log("permissionData",permissionData);
    

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setSelectedRowData(null);
    };


    useEffect(() => {
        dispatch(fetchImportEmployee());
        dispatch(fetchOrganizationUnit());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        //   try {
        //       const res = await dispatch(updateOrganization({ formData, rowId: selectedRowData }));

        //       if (res.meta.requestStatus === 'fulfilled') {
        //           setOpenEdit(false);
        //           await dispatch(fetchOrganization());
        //           toast.success("Organization updated!");
        //       } else {
        //           toast.error("Update failed");
        //       }
        //   } catch (err) {
        //       toast.error("Something went wrong");
        //       console.error(err);
        //   }
    };

     const handleMenuItemClick = (action, rowId) => {
        console.log("rowId", rowId);

        // if (action === 'Send Sandes Message') {
        //     if (rowId) {
        //         setSelectedRowData(rowId);
        //         setFormData({
        //             gu_id: rowId.gu_id || '',
        //             organizationCode: rowId.organization_code || '',
        //             organizationType: rowId.organization_type_id || '',
        //             organizationName: rowId.o_name || '',
        //             vhost_id: rowId.vhost_id || '',
        //             orgVisibility: rowId.is_o_visibility == true ? 1 : 0,
        //             publicVisibility: rowId.is_public_visibility == true ? 1 : 0,


        //         });
        //     }
        //     setOpen(true);
        // }
        if (action === 'Edit') {
            if (rowId) {
                console.log("rowId", rowId);

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
        // if (action === 'Delete') {
        //     if (rowId) {
        //         const ministry = MinistryData.find(item => item.id === rowId.ministry_id);
        //         const organization = organizationType.find(item => item.code === rowId.organization_type_id);
        //         setFormData({
        //             id: rowId.id || '',
        //             gu_id: rowId.gu_id || '',
        //             organizationCode: rowId.organization_code || '',
        //             organizationType: rowId.organization_type_id || '',
        //             organizationTypeName: organization ? organization.description : '',
        //             organizationName: rowId.o_name || '',
        //             vhost: rowId.vhost || '',
        //             ministry_id: rowId.ministry_id || '',
        //             ministryName: ministry ? ministry.ministry_name : '',
        //             orgVisibility: rowId.is_o_visibility == true ? 1 : 0,
        //             publicVisibility: rowId.is_public_visibility == true ? 1 : 0,
        //         });

        //     }
        //     setOpenDel(true);
        // }
        handlePopoverClose();
    };


    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const handlePopoverOpen = (event, rowData) => {
        console.log("rowData", rowData);

        setAnchorEl(event.currentTarget);
        setSelectedRowData(rowData);
    };

    const toggleDrawerNew = (open) => () => {
        setOpenNew(open);
    };

    const toggleDrawer = (open) => () => {
        setOpen(open);
    };

    const formatHeader = (field) => {
        return field
            .replace(/_/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
    };

    useEffect(() => {
        if (tableData && OrganizationUnitName) {
            const displayColumns = [
                { field: 'id', headerName: 'ID', sort: 'asc' },
                { field: 'ou_id', headerName: 'OU Name' },
                { field: 'batch_code', headerName: 'Batch Code' },
                { field: 'upload_date', headerName: 'Upload Date' },
                { field: 'records_count', headerName: 'Records' },
                { field: 'inserted_count', headerName: 'Onboarded' },
                // { field: 'is_rejected', headerName: 'Failed' },
                // { field: 'is_scheduled', headerName: 'Status' },
                { field: 'action', headerName: 'Action' }
            ];

            const formattedColumns = displayColumns.map(col => {
                if (col.field === 'ou_id') {
                    return {
                        ...col,
                        valueGetter: (params) => {
                            const match = OrganizationUnitName.find(item => item.ou_id === params.data.ou_id);
                            return match ? match.ou_name : '';
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
    }, [tableData, OrganizationUnitName]);

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
                        Import Employees
                    </Typography>

                    <div className="button">
                        <button
                            type="button"
                            className="btn btn-primary mr-3 btn-bg-1"
                            onClick={() => setShowSelect((prev) => !prev)}
                        >
                            Help
                        </button>
                        <button type="button" className="btn btn-success" onClick={toggleDrawerNew(true)}>
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

                <div className="ag-theme-alpine" style={{ height: 539, width: '100%', padding: '10px', borderRadius: '10px' }}>
                    <AgGridReact
                        rowData={permissionData.import_employee_data === "active" ? tableData : []}
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
                        {/* {permissionData.send_sandes_message === "active" && (
                            <ListItem button className='cursor-pointer' onClick={() => handleMenuItemClick('Send Sandes Message', selectedRowData)}>
                                <FontAwesomeIcon icon={faEnvelope} className='mr-1' style={{ color: "#158cba" }} />  <ListItemText primary="Send Sandes Message" />
                            </ListItem>
                        )} */}
                        {permissionData.validate_employee_data === "active" && (
                            <ListItem button className='cursor-pointer' onClick={() => handleMenuItemClick('Edit', selectedRowData)}>
                                <FontAwesomeIcon className='mr-1' style={{ color: "#158cba" }} icon={faPenToSquare} />
                                <ListItemText primary="Edit" />
                            </ListItem>
                        )}

                        {/* {permissionData.delete === "active" && (
                            <ListItem button className='cursor-pointer' onClick={() => handleMenuItemClick('Delete', selectedRowData)}>
                                <FontAwesomeIcon className='mr-1' icon={faTrash} style={{ color: "#ff0000b8" }} />
                                <ListItemText primary="Delete" />
                            </ListItem>
                        )} */}



                        {/* {permissionData.member_wise_status === "active" && (
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
                        )} */}
                    </List>
                </Popover>

            </div>

            {/* Drawer: New Upload */}
            <Drawer anchor="top" open={openNew} onClose={toggleDrawerNew(false)}>
                <div className="modal-content mt-14" style={{ padding: "2%" }}>
                    <div className="modal-header">
                        <Typography variant="h6" mb={2} color='#003566' fontWeight="700">Import Employees</Typography>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-md-6 mt-3">
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Organization Unit</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success m-3">Save</button>
                        <button type="button" className="btn btn-danger" onClick={toggleDrawerNew(false)}>Close</button>
                    </form>
                </div>
            </Drawer>

            {/* Drawer: Send Message */}
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
                <Box
                    component="form"
                    className="mt-14"
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
                                value="OU for POC"
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
                                    <input type="checkbox" name="Include your name in message footer" />
                                    Include your name in message footer
                                </label>
                            </FormControl>
                        </div>

                        <div className="col-md-3 mt-3">
                            <FormControl>
                                <label>
                                    <input type="checkbox" name="Include your OU name in message footer" />
                                    Include your OU name in message footer
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

                        {imagePreview && (
                            <div className="col-md-12 mt-3">
                                <Box mt={2}>
                                    <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: 200, objectFit: 'contain' }} />
                                </Box>
                            </div>
                        )}
                    </div>

                    <Box display="flex" mt={3}>
                        <Button variant="outlined" sx={{ marginRight: "15px" }} onClick={toggleDrawer(false)}>Cancel</Button>
                        <Button variant="contained" sx={{ marginRight: "15px" }} color="primary">
                            <FontAwesomeIcon icon={faEnvelope} fontSize="20px" style={{ marginRight: "5px" }} /> Send Email
                        </Button>
                        <Button variant="contained" color="secondary">
                            <FontAwesomeIcon icon={faCommentSms} fontSize="20px" style={{ marginRight: "5px" }} /> Send SMS
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
}

export default ImportEmployeesDash;
