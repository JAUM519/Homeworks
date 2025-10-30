import { useMemo } from 'react';
import { Sidebar } from './tree/Sidebar';
import { buildMenuTree } from './tree/buildTree';
import { RoutesFromTree } from './router/RoutesFromTree';
import { useLocation, Navigate } from 'react-router';


export default function App() {
const root = useMemo(() => buildMenuTree(), []);
const { pathname } = useLocation();
const validPaths = new Set<string>();
(function collect(n: any){ validPaths.add(n.path); n.children?.forEach(collect); })(root);

// Redirigir a / si la ruta no existe en el árbol
if (!validPaths.has(pathname)) {
return <Navigate to="/" replace />;
}

return (
<div className="app">
<Sidebar root={root} />
<main className="content">
<div className="breadcrumbs">Ruta actual: {pathname}</div>
<RoutesFromTree root={root} />
</main>
</div>
);
}