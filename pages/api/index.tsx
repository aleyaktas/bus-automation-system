import instance from "../../utils/axios";
import Cookies from "js-cookie";
import { AxiosRequestConfig } from "axios";

interface LoginProps {
  username: string;
  password: string;
}

const config: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: Cookies.get("token") ? `Bearer ${Cookies.get("token")}` : "",
  },
};

export const handleLogin = async ({ username, password }: LoginProps) => {
  try {
    const res = await instance.post(
      "/api/login",
      { username, password },
      config
    );
    Cookies.set("token", res.data.data);

    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
