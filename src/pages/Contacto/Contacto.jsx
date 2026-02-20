import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Contacto.css";

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

const panel = {
  hidden: { opacity: 0, y: 16, scale: 0.99 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const enviar = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
    setForm({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <motion.section
      className="contact-container-page"
      variants={page}
      initial="hidden"
      animate="show"
    >
      <motion.header className="contact-header" variants={item}>
        <h1>Contacto</h1>
        <p>
          ¿Tienes un proyecto? Escríbenos y te responderemos pronto.
        </p>
      </motion.header>

      <motion.div
        className="contact-container"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* FORM */}
        <motion.form
          className="contact-form"
          onSubmit={enviar}
          variants={panel}
        >
          <motion.div
            className="contact-form-bg"
            aria-hidden="true"
            animate={{ opacity: [0.16, 0.24, 0.16] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Correo</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="tu@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="6"
            placeholder="Escribe tu mensaje..."
            value={form.mensaje}
            onChange={handleChange}
            required
          />

          <motion.button
            type="submit"
            whileHover={{
              y: -3,
              boxShadow: "0 0 22px rgba(212,176,106,0.22)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            Enviar
          </motion.button>

          {sent && (
            <motion.p
              className="contact-sent"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              ✅ Mensaje enviado (demo).
            </motion.p>
          )}
        </motion.form>

        {/* INFO */}
        <motion.aside className="contact-info" variants={panel}>
          <motion.div
            className="info-box"
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <h3>Escríbenos</h3>
            <p>
              <strong>Correo:</strong> contacto@sansfrontieres.com
            </p>
          </motion.div>

          <motion.div
            className="info-box"
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <h3>Ubicación</h3>
            <p>
              <strong>San José, Costa Rica</strong> — Disponible internacionalmente
            </p>
          </motion.div>

          <motion.div
            className="info-box rrss"
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <h3>Redes</h3>
            <p>
              <strong>Instagram:</strong>{" "}
              <a
                href="https://www.instagram.com/sansfrontieresgames"
                target="_blank"
                rel="noreferrer"
              >
                @sansfrontieresgames
              </a>
            </p>
          </motion.div>
        </motion.aside>
      </motion.div>
    </motion.section>
  );
}
