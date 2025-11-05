export class Graph {
    constructor() {
        this.nodes = [];
        this.adjList = {}; // id -> [ids]
    }

    addNode(node) {
        this.nodes.push(node);
        this.adjList[node.id] = [];
    }

    addEdge(n1, n2) {
        this.adjList[n1].push(n2);
        this.adjList[n2].push(n1);
    }

    searchNode(id) {
        if (!this.nodes.length) return null;
        return this.nodes.find(n => n.id === id) || null;
    }

    printAdjacency(id) {
        if (this.searchNode(id)) console.log(this.adjList[id]);
    }

    dataForReactD3() {
        const links = [];
        Object.entries(this.adjList).forEach(([a, neighs]) => {
            neighs.forEach(b => {
                if (a < b) links.push({ source: a, target: b, label: "Vive en" });
            });
        });
        return { nodes: this.nodes, links };
    }
}
