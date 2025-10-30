export type MenuNode = {
title: string;
path: string;
component?: React.ComponentType;
children: MenuNode[];
};


export function createNode(
title: string,
path: string,
component?: React.ComponentType,
children: MenuNode[] = []
): MenuNode {
return { title, path, component, children };
}