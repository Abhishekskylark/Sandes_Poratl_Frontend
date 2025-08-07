// import { Box, Typography, Grid, Button, useMediaQuery, useTheme } from "@mui/material";
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchActiveUserGraph, fetchMessageGraph, fetchRegistrationGraph, fetchStatistics, fetchUserGraph } from '../../redux/authSlice';
// import { faCube, faUsersLine, faSquareCheck, faChartLine } from '@fortawesome/free-solid-svg-icons';
// import ReactApexChart from 'react-apexcharts';
// import { Link } from "react-router-dom";
// import "../Dashboard/Dashboard.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import "apexcharts/dist/apexcharts.css";

// function Statistics() {
//     const dispatch = useDispatch();
//     const statisticsState = useSelector((state) => state.statistics);
//     const userGraphState = useSelector((state) => state.userGraph);
//     const activeUserGraphState = useSelector((state) => state.activeUserGraph);
//     const registrationGraphState = useSelector((state) => state.registrationGraph);
//     const messageGraphState = useSelector((state) => state.messageGraph);
//     const TotalStatistics = statisticsState.statistics
//     const TotalUserGraph = userGraphState.userGraph
//     const TotalActiveUserGraph = activeUserGraphState.activeUserGraph
//     const TotalRegistrationGraph = registrationGraphState.registrationGraph
//     const TotalMessageGraph = messageGraphState.messageGraph.message_data
//     useEffect(() => {
//         dispatch(fetchStatistics());
//         dispatch(fetchActiveUserGraph());
//         dispatch(fetchUserGraph());
//         dispatch(fetchRegistrationGraph());
//         dispatch(fetchMessageGraph());
//     }, [dispatch]);

//     const formatNumber = (num) => {
//         if (num >= 1e7) return (num / 1e7).toFixed(1).replace(/\.0$/, '') + 'Cr';
//         if (num >= 1e5) return (num / 1e5).toFixed(1).replace(/\.0$/, '') + 'L';
//         if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
//         return num;
//     };

//     const cards = [
//         {
//             icon: faCube,
//             label: 'Organizations Units',
//             value: formatNumber(TotalStatistics.organization_unit_count ?? 0),
//         },
//         {
//             icon: faUsersLine,
//             label: 'Onboarded Users',
//             value: formatNumber(TotalStatistics.user_count ?? 0),
//         },
//         {
//             icon: faSquareCheck,
//             label: 'Registered Users',
//             value: formatNumber(TotalStatistics.registration_related_count ?? 0),
//         },
//         {
//             icon: faChartLine,
//             label: 'Message Count',
//             value: formatNumber(TotalStatistics.message_related_count ?? 0),
//         },
//     ];

//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//     const [chartData1, setChartData1] = useState({
//         options: {
//             chart: {
//                 type: "area",
//                 zoom: { enabled: true },
//             },
//             xaxis: {
//                 type: "datetime",
//                 title: { text: "Date & Time" }
//             },
//             yaxis: {
//                 title: { text: "Message Count" }
//             },
//             dataLabels: { enabled: false },
//             stroke: { curve: "smooth" },
//             tooltip: {
//                 x: {
//                     format: "yyyy-MM-dd HH:mm"
//                 }
//             }
//         },
//         series: [
//             {
//                 name: "Message Count",
//                 data: []
//             }
//         ]
//     });

//     useEffect(() => {
//         if (!TotalRegistrationGraph?.registration_data) return;
//         const sortedData = TotalRegistrationGraph?.registration_data
//             .filter(item => item.reg_date && item.reg_count !== undefined)
//             .sort((a, b) => new Date(a.reg_date) - new Date(b.reg_date))
//             .map(item => [new Date(item.reg_date).getTime(), item.reg_count]);

//         setChartData1(prev => ({
//             ...prev,
//             series: [{ ...prev.series[0], data: sortedData }]
//         }));
//     }, [TotalRegistrationGraph]);

//     const [chartData2, setChartData2] = useState({
//         options: {
//             chart: {
//                 type: "area",
//                 zoom: { enabled: true },
//             },
//             xaxis: {
//                 type: "datetime",
//                 title: { text: "Date & Time" }
//             },
//             yaxis: {
//                 title: { text: "Message Count" }
//             },
//             dataLabels: { enabled: false },
//             stroke: { curve: "smooth" },
//             tooltip: {
//                 x: {
//                     format: "yyyy-MM-dd HH:mm"
//                 }
//             }
//         },
//         series: [
//             {
//                 name: "Message Count",
//                 data: []
//             }
//         ]
//     });

//     useEffect(() => {
//         if (!TotalMessageGraph?.message) return;
//         const sortedData = TotalMessageGraph?.message
//             .filter(item => item.date_hour && item.message_count !== undefined)
//             .sort((a, b) => new Date(a.date_hour) - new Date(b.date_hour))
//             .map(item => [new Date(item.date_hour).getTime(), item.message_count]);

//         setChartData2(prev => ({
//             ...prev,
//             series: [{ ...prev.series[0], data: sortedData }]
//         }));
//     }, [TotalMessageGraph]);

//     const [chartData3, setChartData3] = useState({
//         options: {
//             chart: {
//                 type: "bar",
//                 zoom: { enabled: true },
//             },
//             xaxis: {
//                 type: "datetime",
//                 title: { text: "Created At" },
//                 labels: {
//                     rotate: -45
//                 }
//             },
//             yaxis: {
//                 title: { text: "Iteration Count" }
//             },
//             dataLabels: {
//                 enabled: false
//             },
//             tooltip: {
//                 x: {
//                     format: "yyyy-MM-dd HH:mm"
//                 }
//             }
//         },
//         series: [
//             {
//                 name: "Iteration Count",
//                 data: []
//             }
//         ]
//     });

//     useEffect(() => {
//         if (!TotalUserGraph.users || !Array.isArray(TotalUserGraph.users)) return;

//         const cleanedData = TotalUserGraph.users
//             .filter(item => item.created_at && item.iterationcount !== undefined)
//             .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
//             .map(item => [
//                 new Date(item.created_at).getTime(),
//                 item.iterationcount
//             ]);
//         console.log("cleanedData", cleanedData);


//         setChartData3(prev => ({
//             ...prev,
//             series: [{ ...prev.series[0], data: cleanedData }]
//         }));
//     }, [TotalUserGraph]);

//     const [chartData4, setChartData4] = useState({
//         options: {
//             chart: {
//                 type: "area",
//                 zoom: { enabled: true },
//             },
//             xaxis: {
//                 type: "datetime",
//                 title: { text: "Date & Time" }
//             },
//             yaxis: {
//                 title: { text: "Message Count" }
//             },
//             dataLabels: { enabled: false },
//             stroke: { curve: "smooth" },
//             tooltip: {
//                 x: {
//                     format: "yyyy-MM-dd HH:mm"
//                 }
//             }
//         },
//         series: [
//             {
//                 name: "Message Count",
//                 data: []
//             }
//         ]
//     });

//     useEffect(() => {
//         if (!TotalActiveUserGraph.users) return;
//         const sortedData = TotalActiveUserGraph?.users
//             .filter(item => item.log_time && item.cnt !== undefined)
//             .sort((a, b) => new Date(a.log_time) - new Date(b.log_time))
//             .map(item => [new Date(item.log_time).getTime(), item.cnt]);

//         setChartData4(prev => ({
//             ...prev,
//             series: [{ ...prev.series[0], data: sortedData }]
//         }));
//     }, [TotalActiveUserGraph]);



//     return (
//         <Box mt={4}>
//             <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ textAlign: "center" }}>
//                 <p className="text-3xl pb-3 text-[#3D8E61] font-semibold">Sandes Statistics</p>
//             </Typography>
//             <div className="row mb-4" style={{ width: "95%", margin: "0 auto" }}>
//                 {cards.map(({ icon, label, value, link }, index) => {
//                     const cardContent = (
//                         <div className="card bgc-1 zoom-card" style={{ width: "100%" }}>
//                             <div className="card-body d-flex">
//                                 <FontAwesomeIcon icon={icon} className="card-text" fontSize="65" />
//                                 <p className="card-text ml-4">
//                                     {label} <br />
//                                     <strong style={{ fontSize: "30px" }}>{value}</strong>
//                                 </p>
//                             </div>
//                         </div>
//                     );

//                     return (
//                         <div key={index} className="col-md-3 mt-3">
//                             {link ? (
//                                 <Link to={link} style={{ textDecoration: "none", color: "inherit" }}>
//                                     {cardContent}
//                                 </Link>
//                             ) : (
//                                 cardContent
//                             )}
//                         </div>
//                     );
//                 })}
//             </div>

//             <Grid container spacing={3}>

//                 <Grid item xs={12} md={6} sx={{ width: isMobile ? "100%" : "48%" }}>
//                     <div id="chart">
//                         <div id="chart-timeline">
//                             <ReactApexChart
//                                 options={chartData1.options}
//                                 series={chartData1.series}
//                                 type="area"
//                                 height={400}
//                             />
//                         </div>
//                     </div>
//                 </Grid>

//                 <Grid item xs={12} md={6} sx={{ width: isMobile ? "100%" : "48%" }}>
//                     <div id="chart">

//                         <div id="chart-timeline" style={{ height: 350 }}>
//                             <ReactApexChart
//                                 options={chartData2.options}
//                                 series={chartData2.series}
//                                 type="area"
//                                 height={400}
//                             />
//                             {/* )} */}
//                         </div>
//                     </div>
//                 </Grid>

//                 <Grid item xs={12} md={6} sx={{ width: isMobile ? "100%" : "48%" }}>
//                     <div id="chart">
//                         <div id="chart-timeline">
//                             <ReactApexChart
//                                 options={chartData3.options}
//                                 series={chartData3.series}
//                                 type="area"
//                                 height={400}
//                             />
//                         </div>
//                     </div>
//                 </Grid>

//                 <Grid item xs={12} md={6} sx={{ width: isMobile ? "100%" : "48%" }}>
//                     <div id="chart">

//                         <div id="chart-timeline">
//                             <ReactApexChart
//                                 options={chartData4.options}
//                                 series={chartData4.series}
//                                 type="area"
//                                 height={400}
//                             />
//                         </div>
//                     </div>
//                 </Grid>

//             </Grid>
//         </Box>
//     );
// }

// export default Statistics;



































// import { Box, Typography, Grid, useMediaQuery, useTheme } from "@mui/material";
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//     fetchActiveUserGraph,
//     fetchMessageGraph,
//     fetchRegistrationGraph,
//     fetchStatistics,
//     fetchUserGraph
// } from '../../redux/authSlice';
// import {
//     faCube,
//     faUsersLine,
//     faSquareCheck,
//     faChartLine
// } from '@fortawesome/free-solid-svg-icons';
// import ReactApexChart from 'react-apexcharts';
// import { Link } from "react-router-dom";
// import "../Dashboard/Dashboard.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import "apexcharts/dist/apexcharts.css";

// function Statistics() {
//     const dispatch = useDispatch();

//     const {
//         statistics,
//         userGraph,
//         activeUserGraph,
//         registrationGraph,
//         messageGraph
//     } = useSelector((state) => ({
//         statistics: state.statistics.statistics,
//         userGraph: state.userGraph.userGraph,
//         activeUserGraph: state.activeUserGraph.activeUserGraph,
//         registrationGraph: state.registrationGraph.registrationGraph,
//         messageGraph: state.messageGraph.messageGraph.message_data,
//     }));

//     console.log("userGraph",userGraph);
    

//     useEffect(() => {
//         dispatch(fetchStatistics());
//         dispatch(fetchActiveUserGraph());
//         dispatch(fetchUserGraph());
//         dispatch(fetchRegistrationGraph());
//         dispatch(fetchMessageGraph());
//     }, [dispatch]);

//     const formatNumber = (num) => {
//         if (num >= 1e7) return (num / 1e7).toFixed(1).replace(/\.0$/, '') + 'Cr';
//         if (num >= 1e5) return (num / 1e5).toFixed(1).replace(/\.0$/, '') + 'L';
//         if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
//         return num;
//     };

//     const cards = [
//         {
//             icon: faCube,
//             label: 'Organizations Units',
//             value: formatNumber(statistics.organization_unit_count ?? 0),
//         },
//         {
//             icon: faUsersLine,
//             label: 'Onboarded Users',
//             value: formatNumber(statistics.user_count ?? 0),
//         },
//         {
//             icon: faSquareCheck,
//             label: 'Registered Users',
//             value: formatNumber(statistics.registration_related_count ?? 0),
//         },
//         {
//             icon: faChartLine,
//             label: 'Message Count',
//             value: formatNumber(statistics.message_related_count ?? 0),
//         },
//     ];

//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//     const baseOptions = {
//         chart: {
//             type: "area",
//             zoom: { enabled: true },
//             toolbar: { show: true }
//         },
//         xaxis: {
//             type: "datetime",
//             title: { text: "Date & Time" },
//             labels: { rotate: -45 }
//         },
//         yaxis: {
//             title: { text: "Count" }
//         },
//         dataLabels: { enabled: false },
//         stroke: { curve: "smooth" },
//         tooltip: { x: { format: "yyyy-MM-dd HH:mm" } },
//         legend: {
//             show: true,
//             position: "bottom",
//             horizontalAlign: "center"
//         },
//         colors: ['#3D8E61', '#FF5733', '#2980B9', '#8E44AD']
//     };

//     const [chartData1, setChartData1] = useState({ options: baseOptions, series: [{ name: "Registrations", data: [] }] });
//     const [chartData2, setChartData2] = useState({ options: baseOptions, series: [{ name: "Messages", data: [] }] });
//     const [chartData3, setChartData3] = useState({ options: baseOptions, series: [{ name: "Online Users", data: [] }] });
//     const [chartData4, setChartData4] = useState({ options: baseOptions, series: [{ name: "Active Users", data: [] }] });

//     // Registration Graph
//     useEffect(() => {
//         const raw = registrationGraph?.registration_data ?? [];
//         const data = raw
//             .filter(item => item.reg_date && item.reg_count !== undefined)
//             .sort((a, b) => new Date(a.reg_date) - new Date(b.reg_date))
//             .map(item => ({ x: new Date(item.reg_date).getTime(), y: item.reg_count }))
//             .slice(-100);
//         setChartData1({ options: baseOptions, series: [{ name: "Registrations", data }] });
//     }, [registrationGraph]);

//     // Message Graph
//     useEffect(() => {
//         const raw = messageGraph?.emp ?? [];
//         const data = raw
//             .filter(item => item.date_hour && item.message_count !== undefined)
//             .sort((a, b) => new Date(a.date_hour) - new Date(b.date_hour))
//             .map(item => ({ x: new Date(item.date_hour).getTime(), y: item.message_count }))
//             .slice(-100);
//         setChartData2({ options: baseOptions, series: [{ name: "Messages", data }] });
//     }, [messageGraph]);

//     // User Graph
//     useEffect(() => {
//         const raw = userGraph?.users ?? [];
//         const data = raw
//             .filter(item => item.created_at && item.iterationcount !== undefined)
//             .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
//             .map(item => ({ x: new Date(item.created_at).getTime(), y: item.iterationcount }))
//             .slice(-100);
//         setChartData3({ options: baseOptions, series: [{ name: "Online Users", data }] });
//     }, [userGraph]);

//     // Active User Graph
//     useEffect(() => {
//         const raw = activeUserGraph?.users ?? [];
//         const data = raw
//             .filter(item => item.log_time && item.cnt !== undefined)
//             .sort((a, b) => new Date(a.log_time) - new Date(b.log_time))
//             .map(item => ({ x: new Date(item.log_time).getTime(), y: item.cnt }))
//             .slice(-100);
//         setChartData4({ options: baseOptions, series: [{ name: "Active Users", data }] });
//     }, [activeUserGraph]);

//     const chartTitles = ["Registrations", "Messages", "Online Users", "Active Users"];
//     const chartDataArray = [chartData1, chartData2, chartData3, chartData4];

//     return (
//         <Box mt={4}>
//             <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ textAlign: "center" }}>
//                 <p className="text-3xl pb-3 text-[#3D8E61] font-semibold">Sandes Statistics</p>
//             </Typography>

//             <div className="row mb-4" style={{ width: "95%", margin: "0 auto" }}>
//                 {cards.map(({ icon, label, value, link }, index) => {
//                     const cardContent = (
//                         <div className="card bgc-1 zoom-card" style={{ width: "100%" }}>
//                             <div className="card-body d-flex">
//                                 <FontAwesomeIcon icon={icon} className="card-text" fontSize="65" />
//                                 <p className="card-text ml-4">
//                                     {label} <br />
//                                     <strong style={{ fontSize: "30px" }}>{value}</strong>
//                                 </p>
//                             </div>
//                         </div>
//                     );
//                     return (
//                         <div key={index} className="col-md-3 mt-3">
//                             {link ? (
//                                 <Link to={link} style={{ textDecoration: "none", color: "inherit" }}>
//                                     {cardContent}
//                                 </Link>
//                             ) : (
//                                 cardContent
//                             )}
//                         </div>
//                     );
//                 })}
//             </div>

//             <Grid container spacing={3}>
//                 {chartDataArray.map((chartData, index) => (
//                     <Grid item xs={12} md={6} key={index} sx={{ width: isMobile ? "100%" : "48%" }}>
//                         <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold', color: "#3D8E61" }}>
//                             {chartTitles[index]}
//                         </Typography>
//                         <ReactApexChart
//                             options={chartData.options}
//                             series={chartData.series}
//                             type="area"
//                             height={400}
//                         />
//                     </Grid>
//                 ))}
//             </Grid>
//         </Box>
//     );
// }

// export default Statistics;









import { Box, Typography, Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchActiveUserGraph,
    fetchMessageGraph,
    fetchRegistrationGraph,
    fetchStatistics,
    fetchUserGraph
} from '../../redux/authSlice';
import {
    faCube,
    faUsersLine,
    faSquareCheck,
    faChartLine
} from '@fortawesome/free-solid-svg-icons';
import ReactApexChart from 'react-apexcharts';
import { Link } from "react-router-dom";
import "../Dashboard/Dashboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "apexcharts/dist/apexcharts.css";

function Statistics() {
    const dispatch = useDispatch();

    const {
        statistics,
        userGraph,
        activeUserGraph,
        registrationGraph,
        messageGraph
    } = useSelector((state) => ({
        statistics: state.statistics.statistics,
        userGraph: state.userGraph.userGraph,
        activeUserGraph: state.activeUserGraph.activeUserGraph,
        registrationGraph: state.registrationGraph.registrationGraph,
        messageGraph: state.messageGraph.messageGraph.message_data,
    }));

    useEffect(() => {
        dispatch(fetchStatistics());
        dispatch(fetchActiveUserGraph());
        dispatch(fetchUserGraph());
        dispatch(fetchRegistrationGraph());
        dispatch(fetchMessageGraph());
    }, [dispatch]);

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
            value: formatNumber(statistics.organization_unit_count ?? 0),
        },
        {
            icon: faUsersLine,
            label: 'Onboarded Users',
            value: formatNumber(statistics.user_count ?? 0),
        },
        {
            icon: faSquareCheck,
            label: 'Registered Users',
            value: formatNumber(statistics.registration_related_count ?? 0),
        },
        {
            icon: faChartLine,
            label: 'Message Count',
            value: formatNumber(statistics.message_related_count ?? 0),
        },
    ];

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const baseOptions = {
        chart: {
            type: "area",
            zoom: { enabled: true },
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true
                }
            }
        },
        xaxis: {
            type: "datetime",
            title: { text: "Date & Time" },
            labels: { rotate: -45 }
        },
        yaxis: {
            title: { text: "Count" }
        },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth" },
        tooltip: { x: { format: "yyyy-MM-dd HH:mm" } },
        legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center"
        },
        colors: ['#3D8E61', '#FF5733', '#2980B9', '#8E44AD']
    };

    const [chartData1, setChartData1] = useState({ options: baseOptions, series: [{ name: "Registrations", data: [] }] });
    const [chartData2, setChartData2] = useState({ options: baseOptions, series: [{ name: "Messages", data: [] }] });
    const [chartData3, setChartData3] = useState({ options: baseOptions, series: [{ name: "Online Users", data: [] }] });
    const [chartData4, setChartData4] = useState({ options: baseOptions, series: [{ name: "Active Users", data: [] }] });

    // Registration Graph
    useEffect(() => {
        const raw = registrationGraph?.registration_data ?? [];
        const data = raw
            .filter(item => item.reg_date && item.reg_count !== undefined)
            .sort((a, b) => new Date(a.reg_date) - new Date(b.reg_date))
            .map(item => ({ x: new Date(item.reg_date).getTime(), y: item.reg_count }))
            .slice(-100);
        setChartData1({ options: baseOptions, series: [{ name: "Registrations", data }] });
    }, [registrationGraph]);

    // Message Graph
    useEffect(() => {
        const raw = messageGraph?.emp ?? [];
        const data = raw
            .filter(item => item.date_hour && item.message_count !== undefined)
            .sort((a, b) => new Date(a.date_hour) - new Date(b.date_hour))
            .map(item => ({ x: new Date(item.date_hour).getTime(), y: item.message_count }))
            .slice(-100);
        setChartData2({ options: baseOptions, series: [{ name: "Messages", data }] });
    }, [messageGraph]);

    // Online Users Graph (Grouped by hour)
    useEffect(() => {
        const raw = userGraph?.users ?? [];

        const countsMap = {};
        raw.forEach(item => {
            if (item.created_at) {
                const time = new Date(item.created_at);
                const dateKey = time.toISOString().slice(0, 13) + ":00"; // Group by hour
                countsMap[dateKey] = (countsMap[dateKey] || 0) + 1;
            }
        });

        const data = Object.entries(countsMap)
            .map(([key, value]) => ({
                x: new Date(key).getTime(),
                y: value
            }))
            .sort((a, b) => a.x - b.x)
            .slice(-100);

        setChartData3({
            options: baseOptions,
            series: [{ name: "Online Users", data }]
        });
    }, [userGraph]);

    // Active Users Graph
    useEffect(() => {
        const raw = activeUserGraph?.users ?? [];
        const data = raw
            .filter(item => item.log_time && item.cnt !== undefined)
            .sort((a, b) => new Date(a.log_time) - new Date(b.log_time))
            .map(item => ({ x: new Date(item.log_time).getTime(), y: item.cnt }))
            .slice(-100);
        setChartData4({ options: baseOptions, series: [{ name: "Active Users", data }] });
    }, [activeUserGraph]);

    const chartTitles = ["Registrations", "Messages", "Online Users", "Active Users"];
    const chartDataArray = [chartData1, chartData2, chartData3, chartData4];

    return (
        <Box mt={4}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ textAlign: "center" }}>
                <p className="text-3xl pb-3 text-[#3D8E61] font-semibold">Sandes Statistics</p>
            </Typography>

            <div className="row mb-4" style={{ width: "95%", margin: "0 auto" }}>
                {cards.map(({ icon, label, value, link }, index) => {
                    const cardContent = (
                        <div className="card bgc-1 zoom-card" style={{ width: "100%" }}>
                            <div className="card-body d-flex">
                                <FontAwesomeIcon icon={icon} className="card-text" fontSize="65" />
                                <p className="card-text ml-4">
                                    {label} <br />
                                    <strong style={{ fontSize: "30px" }}>{value}</strong>
                                </p>
                            </div>
                        </div>
                    );
                    return (
                        <div key={index} className="col-md-3 mt-3">
                            {link ? (
                                <Link to={link} style={{ textDecoration: "none", color: "inherit" }}>
                                    {cardContent}
                                </Link>
                            ) : (
                                cardContent
                            )}
                        </div>
                    );
                })}
            </div>

            <Grid container spacing={3}>
                {chartDataArray.map((chartData, index) => (
                    <Grid item xs={12} md={6} key={index} sx={{ width: isMobile ? "100%" : "48%" }}>
                        <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold', color: "#3D8E61" }}>
                            {chartTitles[index]}
                        </Typography>
                        <ReactApexChart
                            options={chartData.options}
                            series={chartData.series}
                            type="area"
                            height={400}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Statistics;
