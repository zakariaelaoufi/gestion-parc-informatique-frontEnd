import { useSelector } from "react-redux";
import { user_role } from "../../global";

export default function Permission({ children, permission = [] }) {
  const user = useSelector((state) => state.authentication.user);
  const roles = user?.role?.map(e=>user_role[e]);

  const state =
    roles?.includes(user_role.ADMIN)  || roles?.includes(user_role.SUPER_ADMIN) || 
    roles?.some((element) => {
      return permission?.includes(element);
    });
//   console.log("roles", roles);
//   console.log("state", state);
  return <>{state && children}</>;
}
