import React, { useEffect, useState } from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Drawer, Typography, Box, Toolbar } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Json from "../../Json/Data.json"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';

function DesignationDash({ drawerWidth, collapsedDrawerWidth, desktopOpen }) {
    const location = useLocation();
    const permissionData = location.state?.permissionData;
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowData, setSelectedRowData] = useState(null); // Updated
    const [showSelect, setShowSelect] = useState(false);
    const [open, setOpen] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const [openDel, setOpenDel] = useState(false);
    const [columns, setColumns] = useState([]);
    const tableData = Json;

    const handlePopoverOpen = (event, rowData) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowData(rowData);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setSelectedRowData(null);
    };

    const handleMenuItemClick = (action) => {
        if (action === 'Edit') {
            setOpen(true);
        }
        if (action === 'Delete') {
            setOpenDel(true);
        }
        console.log(`Action: ${action} for Row ID: ${selectedRowData?.id}`);
        handlePopoverClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const toggleDrawerNew = (open) => () => setOpenNew(open);
    const toggleDrawer = (open) => () => setOpen(open);
    const toggleDrawerDel = (open) => () => setOpenDel(open);

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
            <div className="m-3" style={{ height: '100%' }}>
                <div className="overdata mb-3" style={{ justifyContent: 'space-between', display: 'flex' }}>
                    <Typography variant="h5" align="center" gutterBottom color='#003566' fontWeight="700">
                        Manage Designation
                    </Typography>
                    <div className="button">
                        <button
                            type="button"
                            className="btn btn-primary mr-3 btn-bg-1"
                            onClick={() => setShowSelect((prev) => !prev)}
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
                        <Typography margin={2}>DSP - Delhi Police</Typography>
                        <hr />
                        <ListItem button className='cursor-pointer' onClick={() => handleMenuItemClick('Edit')}>
                            <FontAwesomeIcon className='mr-1' style={{ color: "#158cba" }} icon={faPenToSquare} />
                            <ListItemText primary="Edit" />
                        </ListItem>
                        <ListItem button className='cursor-pointer' onClick={() => handleMenuItemClick('Delete')}>
                            <FontAwesomeIcon className='mr-1' icon={faTrash} style={{ color: "#ff0000b8" }} />
                            <ListItemText primary="Delete" />
                        </ListItem>
                    </List>
                </Popover>
            </div>

            <Drawer anchor="top" open={openNew} onClose={toggleDrawerNew(false)}>
                <div className="modal-content mt-14" style={{ padding: "2%" }}>
                    <div className="modal-header">
                        <Typography variant="h5" mb={2} color='#003566' fontWeight="700">Create New Designation</Typography>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-md-6 mt-3">
                                <input className="form-control" type="text" placeholder="Designation name" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success m-3">Save</button>
                        <button type="button" className="btn btn-danger" onClick={toggleDrawerNew(false)}>Close</button>
                    </form>
                </div>
            </Drawer>

            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
                <Box
                    component="form"
                    className='mt-14'
                    onSubmit={handleSubmit}
                    sx={{ p: 4, width: '100%', maxWidth: "80%", mx: 'auto' }}
                >
                    <Typography variant="h5" mb={5} sx={{ textAlign: "center" }} gutterBottom color='#003566' fontWeight="700">
                        Update Designation
                    </Typography>

                    <div className="row">
                        <div className="col-md-6">
                            <select className="form-select">
                                <option selected>Organization</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <input className="form-control" type="text" placeholder="Designation name" />
                        </div>
                    </div>

                    <Box display="flex" mt={3}>
                        <Button variant="contained" style={{ marginRight: "15px" }} color="success">Update</Button>
                        <Button variant="outlined" onClick={toggleDrawer(false)}>Close</Button>
                    </Box>
                </Box>
            </Drawer>

            <Drawer anchor="top" open={openDel} onClose={toggleDrawerDel(false)}>
                <Box
                    component="form"
                    className='mt-14'
                    onSubmit={handleSubmit}
                    sx={{ p: 4, width: '100%', maxWidth: "80%", mx: 'auto' }}
                >
                    <Typography variant="h5" mb={5} sx={{ textAlign: "center" }} gutterBottom color='#003566' fontWeight="700">
                        Delete Designation
                    </Typography>

                    <div className="row">
                        <div className="col-md-6">
                            <label>Designation Name</label>
                            <input className="form-control" type="text" value={selectedRowData?.designation || 'Inspector'} readOnly />
                        </div>
                        <div className="col-md-6">
                            <label>Organization</label>
                            <input className="form-control" type="text" value={selectedRowData?.organization || 'Organization for POC'} readOnly />
                        </div>
                    </div>

                    <Box display="flex" mt={3}>
                        <Button variant="contained" style={{ marginRight: "15px" }}>Delete</Button>
                        <Button variant="outlined" onClick={toggleDrawerDel(false)}>Close</Button>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
}

export default DesignationDash;
