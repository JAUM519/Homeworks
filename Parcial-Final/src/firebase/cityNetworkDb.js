import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config';
import { Graph } from '../structures/Graph';
import { ZoneNode } from '../structures/NaryTree';

const DOC_REF = doc(db, 'cityNetwork', 'main');

function serializeGraph(graph) {
    const nodes = graph.nodes || [];
    const adjacency = {};
    for (const c of nodes) {
        adjacency[c] = graph.getNeighbors(c) || [];
    }
    return { nodes, adjacency };
}

function serializeZoneNode(node) {
    return {
        name: node.name,
        children: node.children.map(serializeZoneNode),
    };
}

function serializeZones(zonesByCity) {
    const result = {};
    for (const cityName in zonesByCity) {
        result[cityName] = serializeZoneNode(zonesByCity[cityName]);
    }
    return result;
}

function deserializeGraph(data) {
    const g = new Graph();
    if (!data || !Array.isArray(data.nodes)) return g;

    data.nodes.forEach((name) => g.addNode(name));

    if (data.adjacency) {
        for (const from in data.adjacency) {
            (data.adjacency[from] || []).forEach((to) => {
                g.addEdge(from, to);
            });
        }
    }
    return g;
}

function deserializeZoneNode(data) {
    const node = new ZoneNode(data.name);
    if (Array.isArray(data.children)) {
        data.children.forEach((childData) => {
            node.children.push(deserializeZoneNode(childData));
        });
    }
    return node;
}

function deserializeZones(data) {
    const result = {};
    if (!data) return result;
    for (const cityName in data) {
        result[cityName] = deserializeZoneNode(data[cityName]);
    }
    return result;
}

export async function loadNetworkFromDb() {
    const snap = await getDoc(DOC_REF);
    if (!snap.exists()) {
        return null;
    }
    const data = snap.data();
    const graph = deserializeGraph(data.graph);
    const zonesByCity = deserializeZones(data.zonesByCity);
    return { graph, zonesByCity };
}

export async function saveNetworkToDb(graph, zonesByCity) {
    const graphPlain = serializeGraph(graph);
    const zonesPlain = serializeZones(zonesByCity);
    await setDoc(DOC_REF, {
        graph: graphPlain,
        zonesByCity: zonesPlain,
    });
}
