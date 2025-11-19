import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addZoneToCity, editZoneInCity } from '../store/slices/citiesSlice';
import { Stack } from '../structures/Stack';
import { ZoneNode } from '../structures/NaryTree';
import { Graph as D3Graph } from 'react-d3-graph';
import './CityDetailPage.scss';

const historyStack = new Stack();

function renderZones(node, depth = 0) {
    if (!node) return null;

    // Iconos diferentes según la profundidad/nivel
    const getIcon = (level, hasChildren) => {
        if (level === 0) return '🌳'; // Raíz principal (ciudad)
        if (hasChildren) return '🌲'; // Padres intermedios
        return '🌿'; // Hojas (sin hijos)
    };

    const icon = getIcon(depth, node.children.length > 0);

    return (
        <li>
            <span className="zone-icon">{icon}</span> {node.name}
            {node.children.length > 0 && (
                <ul>
                    {node.children.map((child) => (
                        <div key={child.name}>{renderZones(child, depth + 1)}</div>
                    ))}
                </ul>
            )}
        </li>
    );
}

function collectZoneNames(node, result = []) {
    if (!node) return result;
    result.push(node.name);
    for (const child of node.children) {
        collectZoneNames(child, result);
    }
    return result;
}

function greenByDepth(depth) {
    const max = 20;
    const d = Math.min(depth, max);

    const r = 0 + d * 15;
    const g = 150 + d * 8;
    const b = 0 + d * 30;

    return `rgb(${r}, ${g}, ${b})`;
}

function buildZoneGraphData(root) {
    const nodes = [];
    const links = [];

    const visited = new Set();

    function traverse(node, depth) {
        if (!node) return;

        if (!visited.has(node.name)) {
            visited.add(node.name);

            nodes.push({
                id: node.name,
                color: greenByDepth(depth),   // color según profundidad
            });
        }

        // recorrer hijos
        node.children.forEach((child) => {
            links.push({
                source: node.name,
                target: child.name,
            });

            traverse(child, depth + 1);
        });
    }

    traverse(root, 0);

    return { nodes, links };
}

export function CityDetailPage() {
    const { cityName } = useParams();
    const dispatch = useDispatch();
    const { zonesByCity } = useSelector((state) => state.cities);

    const root = zonesByCity[cityName];

    const [parentZoneName, setParentZoneName] = useState('');
    const [newZoneName, setNewZoneName] = useState('');
    const [zoneToEdit, setZoneToEdit] = useState('');
    const [newNameForEdit, setNewNameForEdit] = useState('');

    if (!root) {
        return <h2>Ciudad "{cityName}" no encontrada</h2>;
    }

    const totalZones = root.countZones();
    const height = root.getHeight();
    const allZoneNames = collectZoneNames(root, []);
    const parentOptions = allZoneNames.filter((name) => name !== root.name);

    const handleAddZone = () => {
        if (!newZoneName.trim()) return;

        const cloneNode = (node) => {
            const cloned = new ZoneNode(node.name);
            cloned.children = node.children.map((child) => cloneNode(child));
            return cloned;
        };
        historyStack.push(cloneNode(root));

        dispatch(
            addZoneToCity({
                cityName,
                parentZoneName,
                newZoneName: newZoneName.trim(),
            })
        );
        setNewZoneName('');
    };

    const handleEditZone = () => {
        if (!zoneToEdit || !newNameForEdit.trim()) return;

        dispatch(
            editZoneInCity({
                cityName,
                zoneName: zoneToEdit,
                newZoneName: newNameForEdit.trim(),
            })
        );

        setZoneToEdit('');
        setNewNameForEdit('');
    };

    const zoneGraphData = buildZoneGraphData(root);
    const zoneGraphConfig = {
        directed: false,
        nodeHighlightBehavior: true,
        linkHighlightBehavior: true,
        height: 400,
        width: 600,
        node: {
            color: "#00aa00",
            highlightColor: "orange",
        },
        link: {
            color: "#888",
            highlightColor: "red",
        },
    };

    return (
        <div className="city-detail-page">
            <div className="page-header">
                <h2>{cityName}</h2>
            </div>

            {/* CREACIÓN DE ZONAS VERDES */}
            <div className="section-card form-section">
                <h3>
                    <span className="zone-icon">🌳</span>
                    Añadir Zona Verde
                </h3>
                <p className="help-text">
                    Si no seleccionas zona padre, la nueva zona se agregará bajo la raíz
                    de la ciudad.
                </p>

                <div className="form-row">
                    <label>Zona Padre:</label>
                    <select
                        value={parentZoneName}
                        onChange={(e) => setParentZoneName(e.target.value)}
                    >
                        <option value="">Ninguna (Raíz)</option>
                        {parentOptions.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <input
                        placeholder="Nombre de la nueva Zona"
                        value={newZoneName}
                        onChange={(e) => setNewZoneName(e.target.value)}
                    />
                    <button onClick={handleAddZone}>Añadir Zona</button>
                </div>
            </div>

            {/* EDICIÓN DE ZONAS VERDES */}
            <div className="section-card form-section">
                <h3>
                    <span className="zone-icon">✏️</span>
                    Editar Zonas Verdes
                </h3>
                {allZoneNames.length === 0 ? (
                    <p className="empty-state">No hay Zonas para Editar.</p>
                ) : (
                    <div className="form-group">
                        <select
                            value={zoneToEdit}
                            onChange={(e) => setZoneToEdit(e.target.value)}
                        >
                            <option value="">Seleccionar Zona</option>
                            {allZoneNames.map((name) => (
                                <option key={name} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <input
                            placeholder="Nuevo nombre de la Zona"
                            value={newNameForEdit}
                            onChange={(e) => setNewNameForEdit(e.target.value)}
                        />
                        <button onClick={handleEditZone}>Editar Zona</button>
                    </div>
                )}
            </div>

            {/* ESTADÍSTICAS DE LA CIUDAD */}
            <div className="section-card">
                <h3>
                    <span className="zone-icon">📊</span>
                    Estadísticas de la Ciudad
                </h3>
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-label">Número total de Zonas verdes</div>
                        <div className="stat-value">{totalZones}</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-label">Profundidad máxima del árbol</div>
                        <div className="stat-value">{height}</div>
                    </div>
                </div>
            </div>

            {/* ÁRBOL DE ZONAS VERDES */}
            <div className="section-card">
                <h3>
                    <span className="zone-icon">🌲</span>
                    Árbol de Zonas
                </h3>
                <div className="zone-tree">
                    <ul>{renderZones(root)}</ul>
                </div>
            </div>

            {/* GRAFO DE ZONAS VERDES */}
            <div className="section-card">
                <h3>
                    <span className="zone-icon">🗺️</span>
                    Grafo de Zonas Verdes
                </h3>
                <div className="graph-container">
                    <D3Graph
                        id={`zones-graph-${cityName}`}
                        data={zoneGraphData}
                        config={zoneGraphConfig}
                    />
                </div>
            </div>
        </div>
    );
}