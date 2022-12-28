import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string, number, array, InferType, TypeOf } from "yup";
import DefineVoyageForm from "../../components/DefineVoyageForm/DefineVoyageForm";
import VoyageDatePicker from "../../components/VoyageDatePicker/VoyageDatePicker";
import instance, { serverSideConfig } from "../../utils/axios";
import { addVoyage, getLocations } from "../api";

export const getServerSideProps = async (context: any) => {
  try {
    const res = await instance.get("/api/busses/", serverSideConfig(context));
    const resLocation = await instance.get(
      "/api/locations/",
      serverSideConfig(context)
    );
    return {
      props: {
        getAllBus: res.data.data,
        getAllLocations: resLocation.data.data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "Token is not valid",
      },
    };
  }
};

interface BusDataProps {
  getAllBus: object;
  getAllLocations: object;
  err: string;
}

interface VoyageDataProps {
  ID: number;
  id?: number;
  Name?: string;
  Value?: string;
  value?: string;
}

const schema = object({
  plate: object().shape({
    id: number(),
    label: string().required("Plaka seçilmesi zorunludur"),
  }),
  seatPrice: number()
    .default(20)
    .required("Koltuk ücreti girilmesi zorunludur")
    .typeError("Koltuk ücreti girilmesi zorunludur"),
  date: string().required("Tarih seçilmesi zorunludur"),
  from: object().shape({
    id: number(),
    label: string().required("Nereden gidileceğinin seçilmesi zorunludur"),
  }),
  to: object().shape({
    id: number(),
    label: string().required("Nereye gidileceğinin seçilmesi zorunludur"),
  }),
});

const onSubmit = (data: any) => {
  console.log(data);
};

type FormValues = InferType<typeof schema>;

export default function DefineVoyage({
  getAllBus,
  getAllLocations,
}: BusDataProps) {
  const { register, handleSubmit, formState, control, resetField, setValue } =
    useForm<FormValues>({
      resolver: yupResolver(schema),
    });
  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    const findBus = Object.values(getAllBus).find(
      (bus: any) => bus.plate_number === data.plate.label
    );
    console.log(findBus);
    await addVoyage({
      bus_id: findBus.id,
      from: data.from.label,
      to: data.to.label,
      fee: data.seatPrice,
      date: data.date,
    });
    console.log(data);
  };

  return (
    <Grid container marginTop="10rem">
      <Grid item xs={6} alignItems="center">
        <DefineVoyageForm
          allBuses={getAllBus}
          allLocations={getAllLocations}
          register={register}
          errors={errors}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      </Grid>
      <Grid item xs={6} container justifyContent="flex-start">
        <VoyageDatePicker />
      </Grid>
    </Grid>
  );
}
