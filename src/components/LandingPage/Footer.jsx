import React from "react";
import { FaEnvelope, FaGlobe } from "react-icons/fa";
import ashoklogo from "../../assets/ashoklogo.png"
import sandes_logo from "../../assets/sandes_logo.png";
import nic_logo from "../../assets/nic.png"

const Footer = () => {
  return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 240"><path fill="#037fa1" fill-opacity="1" d="M0,96L1440,288L1440,320L0,320Z"></path></svg>
    <footer
      className="footer text-white pt-5 pb-4"
      style={{ backgroundColor: "#037fa1", border: "none" }}
    >
      <div className="container">
        <div className="row">
          {/* Column 1: Logos and Description */}
          <div className="col-md-3 col-sm-6 mb-4">
            <a
              className="navbar-brand d-inline-flex align-items-center"
              href="/"
              aria-label="Sandes"
            >
              <img
                src={ashoklogo}
                style={{ width: "36px" }}
                alt="Ashoka Logo"
              />
              <img
                src={sandes_logo}
                style={{ width: "54px", marginLeft: "16px" }}
                alt="Sandes Logo"
              />
            </a>
            <a
              className="d-inline-flex align-items-center mt-3"
              href="/"
              aria-label="Sandes"
              style={{ backgroundColor: "white" }}
            >
              <img
                src={nic_logo}
                style={{ width: "150px" }}
                alt="NIC Bilingual Logo"
              />
            </a>
          </div>

          {/* Column 2: Features */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className="text-uppercase mb-3">Features</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white-50">Profile Visiting</a></li>
              <li><a href="#" className="text-white-50">Group Management</a></li>
              <li><a href="#" className="text-white-50">Broadcast</a></li>
              <li><a href="#" className="text-white-50">Dashboard</a></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className="text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-white-50">
                  QRG - Android [3MB]
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-white-50">
                  QRG - iOS [2.1MB]
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-white-50">
                  Android Video (English)
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-white-50">
                  Android Video (Hindi)
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-white-50">
                  iOS Video (English)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className="text-uppercase mb-3">Contact Us</h5>
            <div className="text-white">
              <p className="mb-2" style={{ color: "white" }}>
                <a href="mailto:support-sandes@nic.in" className="text-white text-decoration-none">
                  <FaEnvelope className="me-2" /> support-sandes@nic.in
                </a>
              </p>
              <p>
                <FaGlobe className="me-2" />
                <a
                  href="https://www.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                >
                  www.nic.in
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <hr className="my-4 border-light" />
        <div className="text-center text-white-50 small">
          © 2025 Sandes, a product of NIC. All rights reserved.
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
