import React from 'react';
import { FaTwitter, FaFacebook, FaLinkedin, FaGlobe } from 'react-icons/fa';
import {  IoMdInformationCircleOutline } from 'react-icons/io';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r py-8 px-4" style={{backgroundColor: "#003566"}}>
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">


                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm font-light text-center sm:text-left">

                    <img
                        src="assets/images/Digital.svg"
                        alt="Digital India"
                        className="h-16"

                    />


                    <span className="hidden sm:inline">|</span>

                    <img
                        src="assets/images/Nic_logo.svg"
                        alt="NIC"
                        className="h-12"
                    />

                </div>


                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-blue-200 text-sm text-center">
                    <a href="#" className="flex items-center gap-1 hover:text-white transition"><FaTwitter /> Twitter</a>
                    <a href="#" className="flex items-center gap-1 hover:text-white transition"><FaFacebook /> Facebook</a>
                    <a href="#" className="flex items-center gap-1 hover:text-white transition"><FaLinkedin /> LinkedIn</a>
                    <a href="mailto:support-sandes@nic.in" className="flex items-center gap-1 hover:text-white transition"><FontAwesomeIcon icon={faComment} /> support-sandes[at]nic.in</a>
                    <a href="https://www.nic.in" className="flex items-center gap-1 hover:text-white transition"><FaGlobe /> www.nic.in</a>
                    <a href="#" className="flex items-center gap-1 hover:text-white transition"><IoMdInformationCircleOutline /> WEB_INFO_MANAGER</a>
                </div>

                <div className="text-green-400 text-xs text-center">
                    GO GREEN Version: P138.162-23.04.357 | 24-04-2025 08:18:59 am
                </div>
            </div>
        </footer>
    );
};

export default Footer;
