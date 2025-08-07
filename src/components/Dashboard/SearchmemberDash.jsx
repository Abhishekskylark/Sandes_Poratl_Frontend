import React, { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {
    Drawer, Button, Typography, Box, Toolbar
} from '@mui/material';
import "./Dashboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faMagnifyingGlass, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DiAndroid } from "react-icons/di";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { useDispatch, useSelector } from "react-redux";
import { fetchDesignation, fetchMember, fetchOrganizationUnit } from "../../redux/authSlice";



function SearchmemberDash({ drawerWidth, collapsedDrawerWidth, desktopOpen }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [filteredTableData, setFilteredTableData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const dispatch = useDispatch();
    const memberState = useSelector((state) => state.member);
    const designationState = useSelector((state) => state.designation);
    const organizationUnitState = useSelector((state) => state.organizationUnit);
    const tableData = memberState.member
    const Designation = designationState.designation
    const OrganizationUnit = organizationUnitState.organizationUnit?.data
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

    const handlePopoverOpen = (event, rowId) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowId(rowId);
    };

    // useEffect(() => {
    //     if (tableData && Designation.length && OrganizationUnit?.length
    //     ) {

    //         // Remove duplicate rows based on `user_id` or `id`
    //         const uniqueRowsMap = new Map();
    //         tableData.forEach(row => {
    //             if (!uniqueRowsMap.has(row.user_id)) {  // change to 'id' if you want to filter by 'id'
    //                 uniqueRowsMap.set(row.user_id, row);
    //             }
    //         });
    //         const uniqueTableData = Array.from(uniqueRowsMap.values());

    //         // Set filtered data
    //         setFilteredTableData(uniqueTableData);

    //         // Define Columns
    //         const displayColumns = [
    //             { field: 'id', headerName: 'ID', sort: 'asc' },
    //             { field: 'name', headerName: 'Name' },
    //             { field: 'employee_code', headerName: 'Code' },
    //             { field: 'designation_code', headerName: 'Designation' },
    //             { field: 'email', headerName: 'Email' },
    //             { field: 'mobile_no', headerName: 'Mobile' },
    //             { field: 'ou_id', headerName: 'OU' },
    //             { field: 'action', headerName: 'Action' }
    //         ];

    //         const formattedColumns = displayColumns.map(col => {
    //             if (col.field === 'designation_code') {
    //                 return {
    //                     ...col,
    //                     valueGetter: (params) => {
    //                         const match = Designation.find(item => item.id === params.data.designation_code);
    //                         return match ? match.designation_name : '';
    //                     },
    //                     flex: 1,
    //                     resizable: true,
    //                 };
    //             }
    //             else if (col.field === 'ou_id') {
    //                 return {
    //                     ...col,
    //                     valueGetter: (params) => {
    //                         const match = OrganizationUnit.find(item => item.ou_id === params.data.ou_id);
    //                         return match ? match.ou_name : '';
    //                     },
    //                     flex: 1,
    //                     resizable: true,
    //                 };
    //             } else if (col.field === 'action') {
    //                 return {
    //                     ...col,
    //                     cellRenderer: (params) => (
    //                         <Button
    //                             variant="outlined"
    //                             sx={{ color: '#fff', backgroundColor: '#003566', fontSize: ".8rem" }}
    //                             onClick={(event) => handlePopoverOpen(event, params.data)}
    //                         >
    //                             Actions
    //                         </Button>
    //                     ),
    //                     flex: 1,
    //                     resizable: true,
    //                 };
    //             }
    //             else {
    //                 return {
    //                     ...col,
    //                     headerName: formatHeader(col.headerName || col.field),
    //                     flex: 1,
    //                     resizable: true,
    //                 };
    //             }
    //         });

    //         setColumns(formattedColumns);
    //     }
    // }, [tableData, Designation, OrganizationUnit]);


    useEffect(() => {
        if (
            tableData &&
            Designation.length &&
            OrganizationUnit?.length &&
            searchKeyword.trim() !== ''
        ) {
            // Remove duplicate rows
            const uniqueRowsMap = new Map();
            tableData.forEach(row => {
                if (!uniqueRowsMap.has(row.user_id)) {
                    uniqueRowsMap.set(row.user_id, row);
                }
            });

            let uniqueTableData = Array.from(uniqueRowsMap.values());

            // ✅ Filter only if mobile number matches
            uniqueTableData = uniqueTableData.filter(row =>
                row.mobile_no && row.mobile_no.includes(searchKeyword.trim())
            );

            setFilteredTableData(uniqueTableData);
        } else {
            // ✅ Clear the table if no searchKeyword
            setFilteredTableData([]);
        }

        // Set columns only once (when Designation or OrganizationUnit changes)
        if (Designation.length && OrganizationUnit?.length && columns.length === 0) {
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
                } else if (col.field === 'ou_id') {
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
    }, [tableData, Designation, OrganizationUnit, searchKeyword]);


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

        // console.log(`Action: ${action} for Row ID: ${rowId}`);
        handlePopoverClose();
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
                        Search member
                    </Typography>
                    <div className="button d-flex">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search by Mobile"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                    </div>
                </div>

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

                    </List>
                </Popover>

            </div>


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

                    <button type="button" className="btn btn-danger mt-4">Close</button>

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
                                    <button type="button" class="btn btn-success m-3">Update</button>
                                    <button type="button" class="btn btn-danger">Close</button>
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
                    <button type="button" className="btn btn-danger mt-4 mr-2">Delete</button>
                    <button type="button" className="btn btn-info mt-4">Close</button>

                </Box>
            </Drawer>



        </Box>
    )
}

export default SearchmemberDash

