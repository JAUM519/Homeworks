export class ZoneNode {
    constructor(name) {
        this.name = name;
        this.children = [];
    }

    addChild(zoneName) {
        const child = new ZoneNode(zoneName);
        this.children.push(child);
        return child;
    }

    countZones() {
        let count = 1;
        for (const child of this.children) {
            count += child.countZones();
        }
        return count;
    }

    // Longitud máxima desde este nodo
    getHeight() {
        if (this.children.length === 0) return 1;
        let maxChildHeight = 0;
        for (const child of this.children) {
            const childHeight = child.getHeight();
            if (childHeight > maxChildHeight) {
                maxChildHeight = childHeight;
            }
        }
        return 1 + maxChildHeight;
    }

    // Buscar zona por nombre
    findZoneByName(name) {
        if (this.name === name) return this;
        for (const child of this.children) {
            const found = child.findZoneByName(name);
            if (found) return found;
        }
        return null;
    }

    // Editar el nombre de una zona
    editZoneName(oldName, newName) {
        const target = this.findZoneByName(oldName);
        if (target) {
            target.name = newName;
        }
    }
}
