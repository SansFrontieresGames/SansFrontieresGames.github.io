import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import transpLogo from "../../assets/transp.png";
import textLogo from "../../assets/logo.png";

import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledY =
        document.documentElement.scrollTop || document.body.scrollTop;
      setScrolled(scrolledY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    { path: "/", label: "Inicio" },
    { path: "/proyectos", label: "Proyectos" },
    { path: "/equipo", label: "Equipo" },
    { path: "/servicios", label: "Servicios" },
    { path: "/contacto", label: "Contacto" },
  ];

  return (
    <motion.nav
      className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-inner">
        {/* LOGO IZQUIERDO */}
        <div className="navbar-left">
          <div className="navbar-logo-wrapper">
            <div className="logo-bg"></div>

            <motion.img
              src={transpLogo}
              alt="logo"
              className="logo-overlay"
              animate={{
                scale: [1, 1.06, 1],
                filter: [
                  "drop-shadow(0 0 6px rgba(212,176,106,0.4))",
                  "drop-shadow(0 0 18px rgba(212,176,106,1))",
                  "drop-shadow(0 0 6px rgba(212,176,106,0.4))",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <img
            src={textLogo}
            alt="Sans Frontieres Games"
            className={`navbar-text-logo ${scrolled ? "small" : ""}`}
          />
        </div>

        {/* LINKS */}
        <div className="navbar-links">
          {links.map((item, index) => {
            const active = location.pathname === item.path;
            return (
              <div key={index} className="nav-link-wrapper">
                <Link className={active ? "active" : ""} to={item.path}>
                  {item.label}
                </Link>

                {active && (
                  <motion.div
                    layoutId="underline"
                    className="underline"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
