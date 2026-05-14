import React from "react";
import { motion } from "framer-motion";
import "./Equipo.css";
const images = import.meta.glob('../../assets/Imagenes/*.{png,jpg,jpeg,svg}', { eager: true });

const getImg = (name) => {
  const lower = name.toLowerCase();
  const key = Object.keys(images).find(p => p.toLowerCase().includes(lower));
  const mod = images[key];
  return mod ? (mod.default || mod) : "/img/placeholder.png";
};
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

export default function Equipo() {
  const equipo = [
    {
      nombre: "Jehosua",
      rol: "Game Director and Lead Programmer",
      desc: "Experto en sistemas, frontend y experiencias interactivas.",
      img: getImg('jehosua'),
    },
    {
      nombre: "Kenneth Umaña (Kus)",
      rol: "Lead Designer and Programmer",
      desc: "APIs, backend, bases de datos y optimización.",
      img: getImg('kus'),
    },
    {
      nombre: "Andres",
      rol: "Lead Animator",
      desc: "Animación, ritmo visual y dirección artística.",
      img: getImg('huesos'),
    },
    {
      nombre: "Kendall",
      rol: "Animator and Technical Artist",
      desc: "Da vida a personajes y mundos interactivos.",
      img: getImg('animador'),
    },
    {
      nombre: "Estefania",
      rol: "2D & Character Artist",
      desc: "Arte 2D, personajes y estilo visual.",
      img: getImg('fanny'),
    },
    {
      nombre: "Jorge",
      rol: "SFX & Music Composer",
      desc: "Diseño sonoro y música para experiencias memorables.",
      img: getImg('jorge'),
    },
    {
      nombre: "Jorge",
      rol: "SFX & Music Composer",
      desc: "Diseño sonoro y música para experiencias memorables.",
      img: getImg('jorge'),
    },
    {
      nombre: "Jorge",
      rol: "SFX & Music Composer",
      desc: "Diseño sonoro y música para experiencias memorables.",
      img: getImg('jorge'),
    },
    {
      nombre: "Jorge",
      rol: "SFX & Music Composer",
      desc: "Diseño sonoro y música para experiencias memorables.",
      img: getImg('jorge'),
    },
  ];

  return (
    <motion.section className="equipo-container" variants={page} initial="hidden" animate="show">
      <motion.h1 variants={item}>Nuestro Equipo</motion.h1>

      <motion.p variants={item} className="equipo-intro">
        Conoce a las personas detrás de Sans Frontieres, expertos en desarrollo digital.
      </motion.p>

      <motion.div
        className="equipo-grid"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.10 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {equipo.map((e, i) => (
          <motion.article
            className="equipo-card"
            key={i}
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
              className="equipo-card-bg"
              aria-hidden="true"
              animate={{ opacity: [0.18, 0.28, 0.18] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="equipo-media">
              <img src={e.img} alt={e.nombre} loading="lazy" />
            </div>

            <div className="equipo-body">
              <h3>{e.nombre}</h3>
              <p className="equipo-rol">{e.rol}</p>
              <p className="equipo-desc">{e.desc}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
