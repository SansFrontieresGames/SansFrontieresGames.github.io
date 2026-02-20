export default function TabContent({ id, active, title, children }) {
  return (
    <section
      id={id}
      className={`tab-content ${active ? "active" : ""}`}
    >
      <h2>{title}</h2>
      <p>{children}</p>
    </section>
  );
}
