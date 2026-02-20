import { useState } from "react";
import TabContent from "./TabContent";
import "./Tabs.css";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("proyectos");

  return (
    <>
      <div className="tabs">
        <button
          className={activeTab === "proyectos" ? "active" : ""}
          onClick={() => setActiveTab("proyectos")}
        >
          Proyectos
        </button>

        <button
          className={activeTab === "servicios" ? "active" : ""}
          onClick={() => setActiveTab("servicios")}
        >
          Servicios
        </button>

        <button
          className={activeTab === "equipo" ? "active" : ""}
          onClick={() => setActiveTab("equipo")}
        >
          Equipo
        </button>
      </div>

      <TabContent
        id="proyectos"
        title="Proyectos"
        active={activeTab === "proyectos"}
      >
        Aquí irán tarjetas con proyectos, trailers, imágenes y detalles de
        desarrollo.
      </TabContent>

      <TabContent
        id="servicios"
        title="Servicios"
        active={activeTab === "servicios"}
      >
        Listado de servicios: desarrollo de videojuegos, animación 3D,
        consultoría técnica, QA, porting, arte conceptual...
      </TabContent>

      <TabContent
        id="equipo"
        title="Equipo"
        active={activeTab === "equipo"}
      >
        Aquí irá información del equipo fundador, roles, fotos y perfiles.
      </TabContent>
    </>
  );
}
