import { Graph as D3Graph } from "react-d3-graph";

const baseConfig = {
    directed: false,
    nodeHighlightBehavior: true,
    linkHighlightBehavior: false,
    height: 520,
    width: 920,
    panAndZoom: true,
    d3: { gravity: -200 },
    node: {
        labelProperty: "label",
        size: 400,
        highlightStrokeWidth: 2,
        fontSize: 12,
        color: "#87CEFA"
    },
    link: { renderLabel: true, fontSize: 10 }
};

export default function GraphView({ data }) {
    // Colorear distinto por tipo
    const styled = {
        nodes: data.nodes.map(n => ({
            ...n,
            color: n.type === "city" ? "#2e9fdc" : "#d40d0d",
            svg: undefined
        })),
        links: data.links
    };

    return (
        <div className="p-4">
            <D3Graph id="friends-cities-graph" data={styled} config={baseConfig} />
        </div>
    );
}
