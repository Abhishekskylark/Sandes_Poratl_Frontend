
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchOrganizationUnit, fetchRegistration, fetchMessageCount } from '../../redux/authSlice';
import Statistics from '../LandingPage/Statistics';
import {Drawer, Button, Box, Toolbar, Typography, TextField} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faUsersLine, faSquareCheck, faChartLine, faEnvelope, faMessage} from '@fortawesome/free-solid-svg-icons';
import "./Dashboard.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Dashboard_Admin({ drawerWidth, collapsedDrawerWidth, desktopOpen }) {
    const [open, setOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const toggleDrawer = (newOpen) => () => setOpen(newOpen);
    const dispatch = useDispatch();
    const usersState = useSelector((state) => state.users);
    const organizationUnitState = useSelector((state) => state.organizationUnit);
    const RegistrationState = useSelector((state) => state.registration);
    const messageCountState = useSelector((state) => state.messageCount);
    const TotalUsers = usersState.users.totalCount
    const TotalOrganizationUnit = organizationUnitState.organizationUnit.totalCount
    const TotalRegistration = RegistrationState.registration.totalCount
    const TotalMessageCount = messageCountState.messageCount.totalCount

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchOrganizationUnit());
        dispatch(fetchRegistration());
        dispatch(fetchMessageCount());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setOpen(false);
    };
    const formatNumber = (num) => {
        if (num >= 1e7) return (num / 1e7).toFixed(1).replace(/\.0$/, '') + 'Cr';
        if (num >= 1e5) return (num / 1e5).toFixed(1).replace(/\.0$/, '') + 'L';
        if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
        return num;
    };

    const cards = [
        {
            icon: faCube,
            label: 'Organizations Units',
            value: formatNumber(TotalOrganizationUnit ?? 0),
        },
        {
            icon: faUsersLine,
            label: 'Onboarded Users',
            value: formatNumber(TotalUsers ?? 0),
        },
        {
            icon: faSquareCheck,
            label: 'Registered Users',
            value: formatNumber(TotalRegistration ?? 0),
        },
        {
            icon: faChartLine,
            label: 'Message Count',
            value: formatNumber(TotalMessageCount ?? 0),
        },
    ];


    return (
        <>
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


                <div className="row">
                    <div className="dash-top d-flex" style={{ justifyContent: "space-between" }}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom color="#003566" sx={{ fontWeight: "700" }}>
                            Dashboard
                        </Typography>
                        <div className="dash-top-btn">

                            <Button className="Dashbtn btn-bg-1" variant="contained" onClick={toggleDrawer(true)}>
                                <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> BROADCAST MESSAGE
                            </Button>

                        </div>
                    </div>


                    <Statistics />

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
                                            // value={age}
                                            label="Sender ID/App"
                                        // onChange={handleChange}
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
                                <Button variant="contained" sx={{ marginRight: "15px" }} color="success">
                                    <FontAwesomeIcon icon={faMessage} fontSize="20px" style={{ marginRight: "5px" }} /> Send Message
                                </Button>
                            </Box>
                        </Box>
                    </Drawer>
                </div>

            </Box>
        </>
    );
}

export default Dashboard_Admin;

