import { Routes, Route } from 'react-router';
import type { MenuNode } from '../tree/Node';
import { PageLoader } from './PageLoader';
import type { JSX } from 'react';


function buildRoutes(node: MenuNode, acc: JSX.Element[] = []): JSX.Element[] {
acc.push(
<Route key={node.path} path={node.path} element={<PageLoader node={node} />} />
);
for (const child of node.children) buildRoutes(child, acc);
return acc;
}


export function RoutesFromTree({ root }: { root: MenuNode }) {
return (
<Routes>
{buildRoutes(root)}
</Routes>
);
}