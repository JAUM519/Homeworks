export class Graph {
    constructor() {
        // lista de nodos (ciudades)
        this.nodes = [];
        // lista de adyacencia: { ciudad: Set(ciudadesVecinas) }
        this.adjacency = {};
    }

    addNode(cityName) {
        if (!this.nodes.includes(cityName)) {
            this.nodes.push(cityName);
            this.adjacency[cityName] = new Set();
        }
    }

    removeNode(cityName) {
        this.nodes = this.nodes.filter((name) => name !== cityName);
        delete this.adjacency[cityName];

        for (const node of Object.keys(this.adjacency)) {
            this.adjacency[node].delete(cityName);
        }
    }

    addEdge(cityA, cityB) {
        if (!this.adjacency[cityA] || !this.adjacency[cityB]) return;
        this.adjacency[cityA].add(cityB);
        this.adjacency[cityB].add(cityA);
    }

    getNeighbors(cityName) {
        return this.adjacency[cityName]
            ? Array.from(this.adjacency[cityName])
            : [];
    }

    print() {
        console.log('Cities:', this.nodes);
        console.log('Adjacency:', this.adjacency);
    }
}
