import { createNode, type MenuNode } from './Node';
import { Home } from '../pages/Home';
import { Products } from '../pages/Products';
import { ProductsPhones } from '../pages/Phones';
import { ProductsLaptops } from '../pages/Laptops';
import { About } from '../pages/About';
import { Help } from '../pages/Help';

export function buildMenuTree(): MenuNode {
const root = createNode('Home', '/', Home, [
createNode('Products', '/products', Products, [
createNode('Phones', '/products/phones', ProductsPhones),
createNode('Laptops', '/products/laptops', ProductsLaptops),
]),
createNode('About', '/about', About),
createNode('Help', '/help', Help),
]);
return root;
}