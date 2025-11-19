import { createSlice } from '@reduxjs/toolkit';
import { Graph } from '../../structures/Graph';
import { ZoneNode } from '../../structures/NaryTree';

const initialGraph = new Graph();
initialGraph.addNode('Cali');
initialGraph.addNode('Jamundi');

const initialZones = {
    Cali: new ZoneNode('Zonas Verdes de Cali'),
    Jamundi: new ZoneNode('Zonas Verdes de Jamundi'),
};

const citiesSlice = createSlice({
    name: 'cities',
    initialState: {
        graph: initialGraph,
        zonesByCity: initialZones,
        lastVisitedCity: null,
        version: 0, // para saber cuándo cambió la red
    },
    reducers: {
        addCity: (state, action) => {
            const name = action.payload;
            if (!name) return;
            state.graph.addNode(name);
            if (!state.zonesByCity[name]) {
                state.zonesByCity[name] = new ZoneNode(`Zonas Verdes de ${name}`);
            }
            state.version += 1;
        },
        removeCity: (state, action) => {
            const name = action.payload;
            state.graph.removeNode(name);
            delete state.zonesByCity[name];
            if (state.lastVisitedCity === name) {
                state.lastVisitedCity = null;
            }
            state.version += 1;
        },
        connectCities: (state, action) => {
            const { cityA, cityB } = action.payload;
            state.graph.addEdge(cityA, cityB);
            state.version += 1;
        },
        addZoneToCity: (state, action) => {
            const { cityName, parentZoneName, newZoneName } = action.payload;
            const root = state.zonesByCity[cityName];
            if (!root) return;
            if (!newZoneName) return;

            const parentName =
                !parentZoneName || parentZoneName === '' ? root.name : parentZoneName;

            const parent = root.findZoneByName(parentName);
            if (parent) {
                parent.addChild(newZoneName);
                state.version += 1;
            }
        },
        editZoneInCity: (state, action) => {
            const { cityName, zoneName, newZoneName } = action.payload;
            const root = state.zonesByCity[cityName];
            if (!root) return;
            if (!zoneName || !newZoneName) return;
            root.editZoneName(zoneName, newZoneName);
            state.version += 1;
        },
        setLastVisitedCity: (state, action) => {
            state.lastVisitedCity = action.payload;
        },
        // para reemplazar todo desde Firestore
        replaceFromDb: (state, action) => {
            state.graph = action.payload.graph;
            state.zonesByCity = action.payload.zonesByCity;
            state.version += 1;
        },
    },
});

export const {
    addCity,
    removeCity,
    connectCities,
    addZoneToCity,
    editZoneInCity,
    setLastVisitedCity,
    replaceFromDb,
} = citiesSlice.actions;

export default citiesSlice.reducer;
