import { ApiResponse } from "@/services/request";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type JwtPayload = {
  exp: number;
  iat: number;
  id: number;
};

async function getToken(token: string) {
  const response: ApiResponse<{ accessToken: string; refreshToken: string }> =
    await axios.get(
      `${import.meta.env.VITE_STAGING_BASE_URL}auth/refresh-token`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
}

const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const removeToken = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  };

  const { refetch, isFetching } = useQuery({
    queryFn: () => getToken(Cookies.get("refreshToken") || ""),
    queryKey: ["refresh-token"],
    enabled: false,
    retry: 0,
    refetchOnWindowFocus: false,
    meta: {
      errorMessage: "Something went wrong",
    },
  });

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
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
              refetch()
                .then((res) => {
                  const response = res.data;
                  if (response?.status === 200) {
                    const newToken = response.data.accessToken;
                    Cookies.set("accessToken", newToken);
                    Cookies.set("refreshToken", response.data.refreshToken);
                  }
                })
                .catch(() => {
                  removeToken();
                  navigate("/login");
                });
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
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  return { isRefreshing: isFetching, isLoading };
};

export default useAuth;
