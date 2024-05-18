import { useNavigate } from "react-router-dom";
import AuthLyout from "../../components/Layout/Authentication/AuthLayout";
import LoginForm from "./login/LoginForm";
import { useEffect } from "react";

export default function Index() {


  const navigate = useNavigate();
  const AUTH_TOKEN = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    if (AUTH_TOKEN) navigate("/dashboard/");
  }, [AUTH_TOKEN, navigate]);
  if (AUTH_TOKEN) return <></>;

  return (
    <>
      <AuthLyout>
        <LoginForm />
      </AuthLyout>
    </>
  );
}
