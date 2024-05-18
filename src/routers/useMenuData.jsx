import { useSelector } from "react-redux";
import { MenuData } from "./MenuData";
import { user_role } from "../global";
/*****************************/
export function useMenuData() {
  const user = useSelector((state) => state.authentication.user);
  const roles = user?.role?.map((e) => user_role[e]);
  const data =
    roles?.includes(user_role.ADMIN) || roles?.includes(user_role.SUPER_ADMIN)
      ? MenuData
      : filterPermissions(MenuData, roles);
  // console.log(data);
  return data;
}

const contains = (arr1, arr2) => {
  return arr1?.some((element) => {
    return arr2?.includes(element);
  });
};

function filterPermissions(data, roles) {
  const temp = data
    ?.filter((e) => e?.children?.length > 0 || contains(roles, e?.permissions))
    ?.map((e) => {
      const c = filterPermissions(e?.children, roles);
      if (c === undefined) return e;
      else if (c.length > 0) return { ...e, children: c };
      else return null;
    });
  return temp?.filter((e) => e);
}
