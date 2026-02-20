import React from "react";
import { motion } from "framer-motion";
import "./Proyectos.css"; 

const page = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const card = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Proyectos() {
  const proyectos = [
    {
      id: 1,
      titulo: "Proyecto A",
      descripcion: "Videojuego estilo metroidvania en Unity.",
      imagen: "/img/proyecto1.jpg",
    },
    {
      id: 2,
      titulo: "Proyecto B",
      descripcion: "Sitio web corporativo moderno.",
      imagen: "/img/proyecto2.jpg",
    },
    {
      id: 3,
      titulo: "Proyecto C",
      descripcion: "Aplicación móvil multiplataforma.",
      imagen: "/img/proyecto3.jpg",
    },
    {
      id: 4,
      titulo: "Proyecto D",
      descripcion: "Sistema de inventario estilo Hollow Knight.",
      imagen: "/img/proyecto4.jpg",
    },
  ];

  return (
    <motion.section
      className="proyectos-container"
      variants={page}
      initial="hidden"
      animate="show"
    >
      <motion.h1 variants={item}>Proyectos</motion.h1>

      <motion.p variants={item} className="intro">
        Algunos de nuestros trabajos más recientes.
      </motion.p>

      <motion.div
        className="proyectos-grid"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.10 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {proyectos.map((p) => (
          <motion.article
            key={p.id}
            className="proyecto-card"
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
              className="card-bg"
              aria-hidden="true"
              animate={{ opacity: [0.18, 0.28, 0.18] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="proyecto-media">
              <img src={p.imagen} alt={p.titulo} loading="lazy" />
            </div>

            <div className="proyecto-body">
              <h3>{p.titulo}</h3>
              <p>{p.descripcion}</p>
              <span className="proyecto-cta">Ver detalles →</span>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
