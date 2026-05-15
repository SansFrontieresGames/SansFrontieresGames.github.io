import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { m } from "framer-motion";

import transpLogo from "../../assets/transp.png";
import textLogo from "../../assets/logo.png";

import "./Navbar.css";

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Manejar el scroll del Navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrolledY =
        document.documentElement.scrollTop || document.body.scrollTop;
      setScrolled(scrolledY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Accesibilidad: Cerrar con Escape y bloquear scroll cuando está abierto
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Función para cerrar el menú explícitamente al navegar
  const closeMenu = () => setMenuOpen(false);

  const links = [
    { path: "/", label: "Inicio" },
    { path: "/proyectos", label: "Proyectos" },
    { path: "/equipo", label: "Equipo" },
    { path: "/servicios", label: "Servicios" },
    { path: "/contacto", label: "Contacto" },
  ];

  return (
    <m.nav
      className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-inner">
        {/* Overlay para cerrar el menú al hacer click fuera o navegar */}
        <div
          className={`navbar-overlay ${menuOpen ? "is-visible" : ""}`}
          onClick={() => setMenuOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setMenuOpen(false);
          }}
          role="button"
          tabIndex={0}
          aria-label="Cerrar menú"
        />

        {/* LOGO IZQUIERDO */}
        <div className="navbar-left">
          <div className="navbar-logo-wrapper">
            <div className="logo-bg"></div>

            <m.img
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

        {/* BOTÓN HAMBURGUESA (SOLO MÓVIL) */}
        <button
          className="hamburger-btn"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Alternar menú de navegación"
        >
          <span className={`hamburger-line ${menuOpen ? "open-1" : ""}`}></span>
          <span className={`hamburger-line ${menuOpen ? "open-2" : ""}`}></span>
          <span className={`hamburger-line ${menuOpen ? "open-3" : ""}`}></span>
        </button>

        {/* LINKS */}
        <div
          id="mobile-menu"
          className={`navbar-links ${menuOpen ? "is-open" : ""}`}
        >
          {links.map((item) => {
            const active = pathname === item.path;
            return (
              <div key={item.path} className="nav-link-wrapper">
                <Link
                  className={active ? "active" : ""}
                  to={item.path}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>

                {active && (
                  <m.div
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
    </m.nav>
  );
}