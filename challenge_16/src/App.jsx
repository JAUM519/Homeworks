import { useState, useMemo } from "react";
import GraphView from "./components/GraphView";
import { graphData, peopleByCity, cityOptions } from "./data/seed";

export default function App() {
    const [city, setCity] = useState(cityOptions[0].id);
    const people = useMemo(() => peopleByCity(city), [city]);

    return (
        <main style={{ fontFamily: "system-ui, sans-serif", padding: 16 }}>
            <h1>Amigos y Ciudades</h1>

            <section style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 16 }}>
                <aside>
                    <label htmlFor="city">Ciudad:</label>
                    <select
                        id="city"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        style={{ display: "block", marginTop: 8, padding: 8, width: "100%" }}
                    >
                        {cityOptions.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>

                    <h2 style={{ marginTop: 24 }}>Personas que viven aquí</h2>
                    <ul>
                        {people.map(p => (
                            <li key={p.id}>
                                {p.label} — {p.age} años
                            </li>
                        ))}
                        {people.length === 0 && <li>Sin registros</li>}
                    </ul>
                </aside>

                <section>
                    <GraphView data={graphData} />
                </section>
            </section>
        </main>
    );
}
