import instance from "../../utils/axios";
import Cookies from "js-cookie";
import { AxiosRequestConfig } from "axios";

interface LoginProps {
  username: string;
  password: string;
}

interface BusModelProps {
  plate_number: string;
  model_id: number | undefined;
  number_of_seats: number;
  type: number | undefined;
  properties: Array<any> | undefined;
}

const token = Cookies.get("token");

var config: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
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
    config.headers!.Authorization = `Bearer ${res.data.data}`;

    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
console.log(config);

export const getModel = async ({ id }: { id: number }) => {
  try {
    const res = await instance.get(`/api/model/${id}`, config);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const addBusModel = async ({
  plate_number,
  model_id,
  number_of_seats,
  type,
  properties,
}: BusModelProps) => {
  try {
    const res = await instance.post(
      "/api/bus",
      { plate_number, model_id, number_of_seats, type, properties },
      config
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
