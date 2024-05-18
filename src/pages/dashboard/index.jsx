import { useEffect } from "react";
import DashboardLayout from "../../components/Layout/Dashboard/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosConfig from "../../hooks/useAxiosConfig";

export default function Index() {
  const navigate = useNavigate();
  const AUTH_TOKEN = JSON.parse(localStorage.getItem("token"));
  // useAxiosConfig();

  useEffect(() => {
    if (!AUTH_TOKEN) navigate("/authentication");
  }, [AUTH_TOKEN, navigate]);

  if (!AUTH_TOKEN) return <></>;
  else
    return (
      <>
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </>
    );
}
