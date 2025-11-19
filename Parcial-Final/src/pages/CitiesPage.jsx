import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    addCity,
    removeCity,
    connectCities,
    setLastVisitedCity,
} from '../store/slices/citiesSlice';
import { Graph as D3Graph } from 'react-d3-graph';
import './CitiesPage.scss';

export function CitiesPage() {
    const dispatch = useDispatch();
    const { graph } = useSelector((state) => state.cities);

    const [newCityName, setNewCityName] = useState('');
    const [cityA, setCityA] = useState('');
    const [cityB, setCityB] = useState('');

    const handleAddCity = () => {
        if (!newCityName.trim()) return;
        dispatch(addCity(newCityName.trim()));
        setNewCityName('');
    };

    const handleRemoveCity = (name) => {
        dispatch(removeCity(name));
    };

    const handleConnect = () => {
        if (!cityA || !cityB || cityA === cityB) return;
        dispatch(connectCities({ cityA, cityB }));
        setCityA('');
        setCityB('');
    };

    const neighborsInfo = {};
    if (graph && graph.nodes) {
        for (const c of graph.nodes) {
            neighborsInfo[c] = graph.getNeighbors(c) || [];
        }
    }

    const handleSelectCity = useCallback(
        (name) => {
            dispatch(setLastVisitedCity(name));
        },
        [dispatch]
    );

    const graphData = {
        nodes: graph.nodes.map((name) => ({ id: name })),
        links: [],
    };

    const linkSet = new Set();
    graph.nodes.forEach((from) => {
        (neighborsInfo[from] || []).forEach((to) => {
            const key = [from, to].sort().join('---');
            if (!linkSet.has(key)) {
                linkSet.add(key);
                graphData.links.push({ source: from, target: to });
            }
        });
    });

    const graphConfig = {
        directed: false,
        nodeHighlightBehavior: true,
        linkHighlightBehavior: true,
        height: 400,
        width: 600,
    };

    return (
        <div className="cities-page">
            <h2>Red de Ciudades</h2>

            <div className="section-card">
                <h3>Añadir Ciudad</h3>
                <div className="form-group">
                    <input
                        placeholder="Nombre de la Ciudad"
                        value={newCityName}
                        onChange={(evt) => setNewCityName(evt.target.value)}
                    />
                    <button onClick={handleAddCity}>Añadir Ciudad</button>
                </div>
            </div>

            <div className="section-card">
                <h3>Conectar Ciudades</h3>
                <div className="form-group">
                    <select value={cityA} onChange={(e) => setCityA(e.target.value)}>
                        <option value="">Ciudad A</option>
                        {graph.nodes.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>

                    <select value={cityB} onChange={(e) => setCityB(e.target.value)}>
                        <option value="">Ciudad B</option>
                        {graph.nodes.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>

                    <button onClick={handleConnect}>Conectar</button>
                </div>
            </div>

            <div className="section-card">
                <h3>Lista de Ciudades</h3>
                {graph.nodes.length === 0 ? (
                    <p className="empty-state">No hay ciudades registradas</p>
                ) : (
                    <ul className="cities-list">
                        {graph.nodes.map((c) => (
                            <li key={c}>
                                <Link to={`/cities/${c}`} onClick={() => handleSelectCity(c)}>
                                    {c}
                                </Link>
                                <button onClick={() => handleRemoveCity(c)}>Eliminar</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="section-card">
                <h3>Ciudades Vecinas (Lista de Adyacencia)</h3>
                <ul className="adjacency-list">
                    {graph.nodes.map((c) => (
                        <li key={c}>
                            <strong>{c}:</strong> {(neighborsInfo[c] || []).join(', ') || 'Sin conexiones'}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="section-card">
                <h3>Visualización del Grafo</h3>
                <div className="graph-container">
                    <D3Graph
                        id="city-network-graph"
                        data={graphData}
                        config={graphConfig}
                    />
                </div>
            </div>
        </div>
    );
}