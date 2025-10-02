export default class Cola {
    constructor() {
        this.personas = [
            {nombre: "Ana García", retiro: 15000, fecha: "2025-10-01" },
            {nombre: "Luis Pérez", retiro: 30000, fecha: "2025-10-05" },
            {nombre: "María López", retiro: 5000, fecha: "2025-10-10" }];
        this.ordenarPorFecha()
    }

    ordenarPorFecha() {
        this.personas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    }

    enqueue(item) {
        this.personas.push(item);
        this.ordenarPorFecha();
    }

    dequeue() {
        return this.personas.length > 0 ? this.personas.shift() : null;
    }

    peek() {
        return this.personas.length > 0 ? this.personas[0] : null;
    }

    length() {
        return this.personas.length;
    }

    isEmpty() {
        return this.personas.length === 0;
    }

    print() {
        this.personas.forEach(i => console.log(i));
    }

    toArray() {
        return [...this.personas];
    }

}