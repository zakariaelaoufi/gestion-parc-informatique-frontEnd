import { Route } from "react-router-dom";
// import { MenuData } from "./MenuData";
import { useMenuData } from "./useMenuData";

const routeGenerator = (data, path = null) =>
  data.map((e, i) => {
    const subRouter = e.children;
    if (!subRouter) {
      return (
        <Route
          key={i + e.path}
          path={path ? `${path}/${e.path}` : e.path}
          element={e.component}
        />
      );
    } else {
      return [
        <Route key={i + e.path} path={e.path} element={e.component} />,
        ...routeGenerator(subRouter, path ? `${path}/${e.path}` : e.path),
      ];
    }
  });

export const useSideMenuRouter = () => {
  const menuData = useMenuData();
  return routeGenerator(menuData);
};
