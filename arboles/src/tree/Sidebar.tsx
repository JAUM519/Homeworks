import { Link, useLocation } from 'react-router';
import type { MenuNode } from './Node';


function Item({ node }: { node: MenuNode }) {
const { pathname } = useLocation();
const active = pathname === node.path;
return (
<li>
<Link to={node.path} style={{ fontWeight: active ? 600 : 400 }}>{node.title}</Link>
{node.children.length > 0 && (
<ul className="menu children">
{node.children.map(child => (
<Item key={child.path} node={child} />
))}
</ul>
)}
</li>
);
}


export function Sidebar({ root }: { root: MenuNode }) {
return (
<aside className="sidebar">
<div className="brand">N-ary Menu</div>
<ul className="menu">
<Item node={root} />
</ul>
</aside>
);
}