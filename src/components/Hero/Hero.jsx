import { useRef, useEffect } from "react";
import gsap from "gsap";
import "./Hero.css";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.set(heroRef.current, { opacity: 0, y: 40 });

    gsap.to(heroRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.4,
      ease: "power3.out",
    });
  }, []);

  return (
    <section className="hero-section" ref={heroRef}>
      <h1>Diseñamos Experiencias Interactivas</h1>
      <p>
        Sans Frontieres es un estudio dedicado al desarrollo de videojuegos y
        experiencias digitales memorables, fusionando creatividad, tecnología y
        un diseño centrado en el jugador.
      </p>
    </section>
  );
}
