// src/pages/CityDetailPage.jsx
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addZoneToCity, editZoneInCity } from '../store/slices/citiesSlice';
import { Stack } from '../structures/Stack';
import { ZoneNode } from '../structures/NaryTree';
import { Graph as D3Graph } from 'react-d3-graph';

const historyStack = new Stack();

function renderZones(node) {
    if (!node) return null;
    return (
        <li>
            {node.name}
            {node.children.length > 0 && (
                <ul>
                    {node.children.map((child) => (
                        <div key={child.name}>{renderZones(child)}</div>
                    ))}
                </ul>
            )}
        </li>
    );
}

// Obtener listado plano de nombres de zonas (todas: raíz + subzonas)
function collectZoneNames(node, result = []) {
    if (!node) return result;
    result.push(node.name);
    for (const child of node.children) {
        collectZoneNames(child, result);
    }
    return result;
}

// Construir data para react-d3-graph a partir del árbol de zonas
function buildZoneGraphData(root) {
    const nodes = [];
    const links = [];
    const nodeIds = new Set();

    const traverse = (node) => {
        if (!node) return;

        if (!nodeIds.has(node.name)) {
            nodeIds.add(node.name);
            nodes.push({ id: node.name });
        }

        node.children.forEach((child) => {
            if (!nodeIds.has(child.name)) {
                nodeIds.add(child.name);
                nodes.push({ id: child.name });
            }

            links.push({
                source: node.name,
                target: child.name,
            });

            traverse(child);
        });
    };

    traverse(root);
    return { nodes, links };
}

export function CityDetailPage() {
    const { cityName } = useParams();
    const dispatch = useDispatch();
    const { zonesByCity } = useSelector((state) => state.cities);

    const root = zonesByCity[cityName];

    // Agregar zona
    const [parentZoneName, setParentZoneName] = useState('');
    const [newZoneName, setNewZoneName] = useState('');

    // Editar zona
    const [zoneToEdit, setZoneToEdit] = useState('');
    const [newNameForEdit, setNewNameForEdit] = useState('');

    if (!root) {
        return <h2>City "{cityName}" not found</h2>;
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

    // Grafo de zonas verdes
    const zoneGraphData = buildZoneGraphData(root);
    const zoneGraphConfig = {
        directed: false,
        nodeHighlightBehavior: true,
        linkHighlightBehavior: true,
        height: 400,
        width: 600,
    };

    return (
        <div>
            <h2>Detalles de la Ciudad: {cityName}</h2>

            {/* CREACIÓN DE ZONAS VERDES */}
            <div>
                <h3>Añadir Zona Verde</h3>
                <p>
                    Si no seleccionas zona padre, la nueva zona se agregará bajo la raíz
                    de la ciudad.
                </p>

                {/* SELECCIÓN DE ZONA PADRE */}
                <label>
                    Zona Padre:
                    <select
                        value={parentZoneName}
                        onChange={(e) => setParentZoneName(e.target.value)}
                    >
                        <option value="">Ninguna</option>
                        {parentOptions.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </label>

                <div>
                    <input
                        placeholder="Nombre de la nueva Zona"
                        value={newZoneName}
                        onChange={(e) => setNewZoneName(e.target.value)}
                    />
                    <button onClick={handleAddZone}>Añadir Zona</button>
                </div>
            </div>

            {/* EDICIÓN DE TODAS LAS ZONAS VERDES */}
            <div>
                <h3>Editar Zonas Verdes</h3>
                {allZoneNames.length === 0 ? (
                    <p>No hay Zonas para Editar.</p>
                ) : (
                    <div>
                        <select
                            value={zoneToEdit}
                            onChange={(e) => setZoneToEdit(e.target.value)}
                        >
                            <option value="">Selecciónar Zona</option>
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
            <div>
                <h3>Estadisticas de la Ciudad</h3>
                <p>Número total de Zonas verdes: {totalZones}</p>
                <p>Longitud más larga de la Zonas: {height}</p>
            </div>

            {/* ÁRBOL DE ZONAS VERDES */}
            <div>
                <h3>Arbol de Zonas</h3>
                <ul>{renderZones(root)}</ul>
            </div>

            {/* GRAFO DE ZONAS VERDES */}
            <div>
                <h3>Grafo de Zonas Verdes</h3>
                <D3Graph
                    id={`zones-graph-${cityName}`}
                    data={zoneGraphData}
                    config={zoneGraphConfig}
                />
            </div>
        </div>
    );
}
