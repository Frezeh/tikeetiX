import { getRefreshToken } from "@/services/api/auth";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type JwtPayload = {
  exp: number;
  iat: number;
  id: number;
};

const useAuth = () => {
  const navigate = useNavigate();
  const removeToken = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          if (refreshToken) {
            const decodedRefreshToken = jwtDecode<JwtPayload>(refreshToken);
            if (decodedRefreshToken.exp < currentTime) {
              // Both JWT and refresh token have expired
              removeToken();
              navigate("/login");
              return;
            } else {
              const response = await getRefreshToken(refreshToken);

              if (response.status === 200) {
                const newToken = response.data.accessToken;
                Cookies.set("accessToken", newToken);
                Cookies.set("refreshToken", response.data.refreshToken);
              }
            }
          } else {
            // No refresh token found, redirect to login
            removeToken();
            navigate("/login");
            return;
          }
        }
      } catch (error) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        navigate("/login");
      } finally {
      }
    };

    checkAuth();
  }, [navigate]);
};

export default useAuth;
