import { Box, Typography, Grid, Button, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchOrganizationUnit, fetchRegistration, fetchMessageCount } from '../../redux/authSlice';
import ReactApexChart from 'react-apexcharts';
import Json from "../../Json/File.json"
import Chart from 'react-apexcharts';

function Statistics() {

    const dispatch = useDispatch();
    const usersState = useSelector((state) => state.users);
    const organizationUnitState = useSelector((state) => state.organizationUnit);
    const RegistrationState = useSelector((state) => state.registration);
    const messageCountState = useSelector((state) => state.messageCount);
    // const TotalUsers = usersState.users.totalCount
    // const TotalOrganizationUnit = organizationUnitState.organizationUnit.totalCount
    // const TotalRegistration = RegistrationState.registration.totalCount
    // const TotalMessageCount = messageCountState.messageCount.totalCount

    console.log("RegistrationState",RegistrationState.registration.data);
    

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchOrganizationUnit());
        dispatch(fetchRegistration());
        dispatch(fetchMessageCount());
    }, [dispatch]);

    const [chartData, setChartData] = useState(
        Json[0].series[0].data.map((item) => ({
            x: new Date(item.log_timestamp).getTime(),
            y: item.cnt,
        }))
    );

    const filterDataRegistration = (range) => {
        const now = new Date(Json[0].series[0].data[Json[0].series[0].data.length - 1].log_timestamp).getTime();
        let fromTime = 0;

        if (range === "lastHour") fromTime = now - 60 * 60 * 1000;
        else if (range === "1week") fromTime = now - 7 * 24 * 60 * 60 * 1000;
        else if (range === "1months") fromTime = now - 30 * 24 * 60 * 60 * 1000;
        else if (range === "3Months") fromTime = now - 90 * 24 * 60 * 60 * 1000;
        // else 'all' -> fromTime stays at 0

        const filtered = Json[0].series[0].data
            .filter((item) => new Date(item.log_timestamp).getTime() >= fromTime)
            .map((item) => ({
                x: new Date(item.log_timestamp).getTime(),
                y: item.cnt,
            }));

        setChartData(filtered);
    };

    const options = {
        chart: {
            id: "area-datetime",
            type: "bar",
            height: 350,
            zoom: { autoScaleYaxis: true },
        },
        title: { text: "Registrations", align: "left" },
        subtitle: { text: "Daily registrations", align: "left" },
        dataLabels: { enabled: false },
        markers: { size: 0, style: "hollow" },
        xaxis: { type: "datetime", tickAmount: 6 },
        tooltip: { x: { format: "dd MMM yyyy HH:mm" } },
        fill: {
            type: "gradient",
            gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.9, stops: [0, 100] },
        },
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [state, setState] = useState(Json[0]);
    const [state1, setState1] = useState(Json[1]);
    const [state2, setState2] = useState(Json[2]);
    const [state3, setState3] = useState(Json[3]);

    const fullData1 = Json[0].series[0].data.map(item => {
        return [new Date(item.log_timestamp).getTime(), item.cnt];
    });
    // const fullData1 = Json[0].series[0].data;
    const fullData2 = Json[1].series[0].data;
    const fullData3 = Json[2].series[0].data;
    const fullData4 = Json[3].series[0].data;


    // const filterDataRegistration = (range) => {
    //     const now = new Date().getTime();

    //     let fromTime;

    //     switch (range) {
    //         case "lastHour":
    //             fromTime = now - 3600 * 1000;
    //             break;
    //         case "1month":
    //             fromTime = now - 30 * 24 * 3600 * 1000;
    //             break;
    //         case "6months":
    //             fromTime = now - 6 * 30 * 24 * 3600 * 1000;
    //             break;
    //         case "1year":
    //             fromTime = now - 365 * 24 * 3600 * 1000;
    //             break;
    //         case "all":
    //         default:
    //             fromTime = 0;
    //     }

    //     const filteredData = range === "all"
    //         ? fullData1
    //         : fullData1.filter(([timestamp, value]) => timestamp >= fromTime && timestamp <= now);

    //     // Update chart data
    //     setState((prev) => ({
    //         ...prev,
    //         series: [{ ...prev.series[0], data: filteredData }],
    //         options: {
    //             ...prev.options,
    //             xaxis: {
    //                 ...prev.options.xaxis,
    //                 min: fromTime === 0 ? undefined : fromTime,
    //                 max: now,
    //                 type: "datetime"
    //             }
    //         }
    //     }));
    // };

    const filterDataMessage = (range) => {
        const now = new Date().getTime();

        let fromTime;

        switch (range) {
            case "lastHour":
                fromTime = now - 3600 * 1000;
                break;
            case "1month":
                fromTime = now - 30 * 24 * 3600 * 1000;
                break;
            case "6months":
                fromTime = now - 6 * 30 * 24 * 3600 * 1000;
                break;
            case "1year":
                fromTime = now - 365 * 24 * 3600 * 1000;
                break;
            case "all":
            default:
                fromTime = 0;
        }

        const filteredData = range === "all"
            ? fullData2
            : fullData2.filter(([timestamp, value]) => timestamp >= fromTime && timestamp <= now);

        // Update chart data
        setState1((prev) => ({
            ...prev,
            series: [{ ...prev.series[0], data: filteredData }],
            options: {
                ...prev.options,
                xaxis: {
                    ...prev.options.xaxis,
                    min: fromTime === 0 ? undefined : fromTime,
                    max: now,
                    type: "datetime"
                }
            }
        }));
    };
    const filterDataOnline = (range) => {
        const now = new Date().getTime();

        let fromTime;

        switch (range) {
            case "lastHour":
                fromTime = now - 3600 * 1000;
                break;
            case "1month":
                fromTime = now - 30 * 24 * 3600 * 1000;
                break;
            case "6months":
                fromTime = now - 6 * 30 * 24 * 3600 * 1000;
                break;
            case "1year":
                fromTime = now - 365 * 24 * 3600 * 1000;
                break;
            case "all":
            default:
                fromTime = 0;
        }

        const filteredData = range === "all"
            ? fullData3
            : fullData3.filter(([timestamp, value]) => timestamp >= fromTime && timestamp <= now);

        // Update chart data
        setState2((prev) => ({
            ...prev,
            series: [{ ...prev.series[0], data: filteredData }],
            options: {
                ...prev.options,
                xaxis: {
                    ...prev.options.xaxis,
                    min: fromTime === 0 ? undefined : fromTime,
                    max: now,
                    type: "datetime"
                }
            }
        }));
    };
    const filterDataActive = (range) => {
        const now = new Date().getTime();

        let fromTime;

        switch (range) {
            case "lastHour":
                fromTime = now - 3600 * 1000;
                break;
            case "1month":
                fromTime = now - 30 * 24 * 3600 * 1000;
                break;
            case "6months":
                fromTime = now - 6 * 30 * 24 * 3600 * 1000;
                break;
            case "1year":
                fromTime = now - 365 * 24 * 3600 * 1000;
                break;
            case "all":
            default:
                fromTime = 0;
        }

        const filteredData = range === "all"
            ? fullData4
            : fullData4.filter(([timestamp, value]) => timestamp >= fromTime && timestamp <= now);

        // Update chart data
        setState3((prev) => ({
            ...prev,
            series: [{ ...prev.series[0], data: filteredData }],
            options: {
                ...prev.options,
                xaxis: {
                    ...prev.options.xaxis,
                    min: fromTime === 0 ? undefined : fromTime,
                    max: now,
                    type: "datetime"
                }
            }
        }));
    };

    return (
        <Box mt={10}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ textAlign: "center" }}>
                <p className="text-3xl pb-3 text-[#3D8E61] font-semibold">Sandes Statistics</p>
            </Typography>

            <Grid container spacing={3}>

                <Grid item xs={12} md={6} sx={{ width: isMobile ? "100%" : "48%" }}>
                    <div id="chart">
                        <Button onClick={() => filterDataRegistration("lastHour")}>Hours</Button>
                        <Button onClick={() => filterDataRegistration("1week")}>1W</Button>
                        <Button onClick={() => filterDataRegistration("1months")}>1M</Button>
                        <Button onClick={() => filterDataRegistration("3Months")}>3M</Button>
                        <Button onClick={() => filterDataRegistration("all")}>ALL</Button>
                        <div id="chart-timeline">
                            <Chart
                                options={options}
                                series={[{ name: "Registration Count", data: chartData }]}
                                type="bar"
                                height={350}
                            />
                            {/* <Chart options={options} series={series} type="bar" height={350} /> */}
                            {/* <ReactApexChart options={state.options} series={state.series}
                                //  type="bar" height={350} 
                                type={state.options.chart.type}
                                height={state.options.chart.height}
                            /> */}
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12} md={6} sx={{ width: isMobile ? "100%" : "48%" }}>
                    <div id="chart">
                        <div className="toolbar">
                            <Button
                                id="one_month"
                                onClick={() => filterDataMessage("lastHour")}

                            >
                                Hours
                            </Button>
                            <Button
                                id="one_month"
                                onClick={() => filterDataMessage("1month")}

                            >
                                1M
                            </Button>
                            <Button
                                id="six_months"
                                onClick={() => filterDataMessage("6months")}

                            >
                                6M
                            </Button>
                            <Button
                                id="one_year"
                                onClick={() => filterDataMessage('1year')}

                            >
                                1Y
                            </Button>

                            <Button
                                id="all"
                                onClick={() => filterDataMessage("all")}

                            >
                                ALL
                            </Button>
                        </div>

                        <div id="chart-timeline">
                            <ReactApexChart options={state1.options} series={state1.series} type="area" height={350} />
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12} md={6} sx={{ width: isMobile ? "100%" : "48%" }}>
                    <div id="chart">
                        <div className="toolbar">
                            <Button
                                id="one_month"
                                onClick={() => filterDataOnline("lastHour")}

                            >
                                Hours
                            </Button>
                            <Button
                                id="one_month"
                                onClick={() => filterDataOnline("1month")}

                            >
                                1M
                            </Button>
                            <Button
                                id="six_months"
                                onClick={() => filterDataOnline("6months")}

                            >
                                6M
                            </Button>
                            <Button
                                id="one_year"
                                onClick={() => filterDataOnline('1year')}

                            >
                                1Y
                            </Button>

                            <Button
                                id="all"
                                onClick={() => filterDataOnline("all")}
                            // 
                            >
                                ALL
                            </Button>
                        </div>
                        <div id="chart-timeline">
                            <ReactApexChart options={state2.options} series={state2.series} type="bar" height={350} />
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12} md={6} sx={{ width: isMobile ? "100%" : "48%" }}>
                    <div id="chart">
                        <div className="toolbar">
                            <Button
                                id="one_month"
                                onClick={() => filterDataActive("lastHour")}

                            >
                                Hours
                            </Button>
                            <Button
                                id="one_month"
                                onClick={() => filterDataActive("1month")}

                            >
                                1M
                            </Button>
                            <Button
                                id="six_months"
                                onClick={() => filterDataActive("6months")}

                            >
                                6M
                            </Button>
                            <Button
                                id="one_year"
                                onClick={() => filterDataActive('1year')}

                            >
                                1Y
                            </Button>

                            <Button
                                id="all"
                                onClick={() => filterDataActive("all")}

                            >
                                ALL
                            </Button>
                        </div>

                        <div id="chart-timeline">
                            <ReactApexChart options={state3.options} series={state3.series} type="area" height={350} />
                        </div>
                    </div>
                </Grid>

            </Grid>
        </Box>
    );
}

export default Statistics;










































