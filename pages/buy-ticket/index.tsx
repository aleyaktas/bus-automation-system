import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { object, string, number, array, InferType, TypeOf } from "yup";
import DefineBusModel from "../../components/DefineBusModel/DefineBusModel";
import VoyageList from "../../components/VoyageList/VoyageList";

const schema = object({
  from: string().required("Nereden girilmesi zorunludur"),
  to: string().required("Nereye girilmesi zorunludur"),
});

type FormValues = InferType<typeof schema>;

export default function BuyTicket({}) {
  const { register, handleSubmit, formState, control, resetField, setValue } =
    useForm<FormValues>({
      resolver: yupResolver(schema),
    });

  const data = {
    from: [
      { id: 1, label: "İstanbul" },
      { id: 2, label: "Ankara" },
      { id: 3, label: "İzmir" },
    ],
    to: [
      { id: 1, label: "İstanbul" },
      { id: 2, label: "Ankara" },
      { id: 3, label: "İzmir" },
    ],
  };

  const [numberOfSeats, setNumberOfSeats] = useState(20);

  const selectedType = 2;

  return (
    <Grid container marginTop="12rem">
      <Grid
        container
        item
        xs={6}
        alignItems="center"
        direction="column"
        height="70rem"
      >
        <VoyageList
          data={data}
          register={register}
          handleSubmit={handleSubmit}
          formState={formState}
          control={control}
          resetField={resetField}
          setValue={setValue}
        />
      </Grid>
      <Grid item xs={6} container justifyContent="flex-start">
        <DefineBusModel
          numberOfSeats={numberOfSeats}
          type={selectedType}
          setNumberOfSeats={setNumberOfSeats}
        />
      </Grid>
    </Grid>
  );
}
