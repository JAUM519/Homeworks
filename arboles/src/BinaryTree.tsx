import { useMemo } from 'react';
import Tree from 'react-d3-tree';
import { bstToHierarchy } from './bstToHierarchy';
import type { Nodo } from './types';

export default function BinaryTree({ root }: { root: Nodo }) {
  const data = useMemo(() => bstToHierarchy(root), [root]);
  if (!data) return null;

  const container: React.CSSProperties = { width: '100%', height: '75vh' };

  return (
    <div style={container}>
      <Tree
        data={data}
        orientation="vertical"
        translate={{ x: 420, y: 80 }}
        collapsible={false}
        zoomable={true}
        separation={{ siblings: 1, nonSiblings: 1.25 }}
      />
    </div>
  );
}