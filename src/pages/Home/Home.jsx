import React from "react";
import "./home.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const container = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

const Home = () => {
  return (
    <div className="home-container">
      {/* Orbes decorativos sutiles */}
      <motion.div
        className="home-orb home-orb--a"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.div
        className="home-orb home-orb--b"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
      />

      <motion.section
        className="home-hero"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1 variants={item}>Diseñamos Mundos Interactivos</motion.h1>

        <motion.p variants={item}>
          Somos un estudio independiente que combina narrativa, arte y tecnología
          para crear videojuegos y experiencias digitales con identidad propia.
        </motion.p>

        <motion.div variants={item} className="home-hero-actions">
          <Link to="/proyectos">
            <motion.button
              className="home-hero-btn"
              whileHover={{
                y: -3,
                boxShadow: "0 0 22px rgba(212,176,106,0.25)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              Explorar Nuestro Trabajo
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;
