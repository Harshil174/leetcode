import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import LoadingSpinner from "./LoadingSpinner";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      setIsAuth(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const isTokenExpired = decodedToken.exp! * 1000 < Date.now();

      if (isTokenExpired) {
        localStorage.removeItem("authToken");
        setIsAuth(false);
      } else {
        setIsAuth(true);
      }
    } catch (err) {
      setIsAuth(false);
    }
  }, []);

  if (isAuth === null) {
    return <LoadingSpinner />;
  }

  return isAuth ? <>{children}</> : <Navigate to={"/auth/sign-in"} replace />;
};

export default ProtectedRoute;
