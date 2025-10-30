import type { MenuNode } from '../tree/Node';
import { Navigate } from 'react-router';


export function findByPath(root: MenuNode, path: string): MenuNode | null {
if (root.path === path) return root;
for (const c of root.children) {
const f = findByPath(c, path);
if (f) return f;
}
return null;
}


export function PageLoader({ node }: { node?: MenuNode }) {
if (!node) return <Navigate to="/" replace />;
const Cmp = node.component ?? (() => <div>No component</div>);
return <Cmp />;
}