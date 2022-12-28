import instance from "../../utils/axios";
import Cookies from "js-cookie";
import { AxiosRequestConfig } from "axios";

interface LoginProps {
  email: string;
  password: string;
}

interface BusModelProps {
  plate_number: string;
  model_id: number | undefined;
  number_of_seats: number;
  id?: number;
  type: number | undefined;
  properties: Array<any> | undefined;
}

interface VoyageDataProps {
  bus_id: number;
  from: string;
  to: string;
  fee: number;
  date: string;
}

const token = Cookies.get("token");

var config: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const handleLogin = async ({ email, password }: LoginProps) => {
  const data = JSON.stringify({ email, password });
  try {
    const res = await instance.post("/api/auth/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    Cookies.set("token", res.data.data);
    config.headers!.Authorization = `Bearer ${res.data.data}`;

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getModel = async ({ id }: { id: number }) => {
  try {
    const res = await instance.get(`/api/models/?brandId=${id}`, config);
    return res.data.data;
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
    const res = await instance.post("/api/busses", {
      plate_number,
      bus_model_id: model_id,
      seats: number_of_seats,
      type_id: type,
      properties,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const editBusModel = async ({
  plate_number,
  model_id,
  id,
  number_of_seats,
  type,
  properties,
}: BusModelProps) => {
  try {
    const res = await instance.put(
      "/api/bus",
      { plate_number, model_id, number_of_seats, id, type, properties },
      config
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getLocations = async () => {
  try {
    const res = await instance.get("/api/locations", config);
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const addVoyage = async ({
  bus_id,
  from,
  to,
  fee,
  date,
}: VoyageDataProps) => {
  try {
    const res = await instance.post(
      "/api/voyage",
      { bus_id, from, to, fee, date },
      config
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getBus = async ({ id }: { id: number }) => {
  try {
    const res = await instance.get(`/api/busses/${id}`, config);
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getVoyages = async () => {
  try {
    const res = await instance.get("/api/voyage", config);
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getVoyage = async ({ from, to }: { from: string; to: string }) => {
  try {
    const res = await instance.get(
      `/api/voyage/${from}-${to}/day:19-12-2022-time:12`,
      config
    );
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
