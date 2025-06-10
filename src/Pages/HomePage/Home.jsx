import React from 'react'
import Navbar from '../../components/LandingPage/Navbar'
import Landing from '../../components/LandingPage/Landing'
import Features from '../../components/LandingPage/Features'
import About from '../../components/LandingPage/About'
import Statistics from '../../components/LandingPage/Statistics'
import Footer from '../../components/LandingPage/Footer'
import ConnectAndChat from '../../components/LandingPage/ConnectAndChat'

function Home() {
    return (
        <>
            <div className="home_comp" style={{ padding: "0% 4%" }}>
                <Navbar />
                <Landing />
                <Features />
                <About />
                <Statistics />
                {/* <LatestNews /> */}
                <ConnectAndChat />
            </div>
            <Footer />
        </>
    )
}

export default Home