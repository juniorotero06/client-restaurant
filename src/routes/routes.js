import Home from "../pages/home";
import OrdersComponent from "../pages/orders-component";
import Orders from "../pages/orders";
import Recipes from "../pages/recipes";
import PurchaseHistory from "../pages/purchase-history";
import Inventary from "../pages/inventary";
import AIIntegration from "../pages/ai-integration";
import Documentation from "../pages/documentation";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/pedidos",
    exact: true,
    component: OrdersComponent,
  },
  {
    path: "/ordenes",
    exact: true,
    component: Orders,
  },
  {
    path: "/recetas",
    exact: true,
    component: Recipes,
  },
  {
    path: "/inventario",
    exact: true,
    component: Inventary,
  },
  {
    path: "/historial-compras",
    exact: true,
    component: PurchaseHistory,
  },
  {
    path: "/ai-integration",
    exact: true,
    component: AIIntegration,
  },
  {
    path: "/documentation",
    exact: true,
    component: Documentation,
  },
];

export default routes;
