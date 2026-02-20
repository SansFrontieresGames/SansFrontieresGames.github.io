import React from "react";
import { motion } from "framer-motion";
import "./Servicios.css";

const page = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const card = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Servicios() {
  const servicios = [
    {
      titulo: "Desarrollo de Videojuegos",
      texto: "Diseño de sistemas, UI/UX, gameplay, animaciones y más en Unity y Unreal.",
    },
    {
      titulo: "Desarrollo Web",
      texto: "Sitios modernos, rápidos, responsive y optimizados.",
    },
    {
      titulo: "Diseño UI/UX",
      texto: "Interfaces limpias, intuitivas y atractivas.",
    },
    {
      titulo: "Branding",
      texto: "Identidad visual profesional para tu marca o producto.",
    },
  ];

  return (
    <motion.section className="servicios-container" variants={page} initial="hidden" animate="show">
      <motion.header className="services-header" variants={item}>
        <h1>Servicios</h1>
        <p>Servicios profesionales adaptados a tus necesidades.</p>
      </motion.header>

      <motion.div
        className="services-grid"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.10 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {servicios.map((s, index) => (
          <motion.article
            className="service-card"
            key={index}
            variants={card}
            whileHover={{
              y: -6,
              scale: 1.02,
              boxShadow: "0 0 24px rgba(212,176,106,0.16)",
            }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <motion.div
              className="service-card-bg"
              aria-hidden="true"
              animate={{ opacity: [0.14, 0.22, 0.14] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            <h3>{s.titulo}</h3>
            <p>{s.texto}</p>
            <span className="service-cta">Saber más →</span>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
