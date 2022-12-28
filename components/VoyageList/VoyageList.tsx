import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { object, string, number, array, InferType, TypeOf } from "yup";
import styleFn from "./VoyageList.styles";
import VoyageDatePicker from "../VoyageDatePicker/VoyageDatePicker";
import axios from "axios";
import { useState } from "react";

export default function VoyageList({
  allLocation,
  allVoyages,
  handleEventClick,
  handleSubmit,
  formState,
  control,
  onSubmit,
  voyages,
}: any) {
  const styles = styleFn();
  const { errors } = formState;

  const locations = Object.values(allLocation).map((item: any) => {
    return {
      id: item.id,
      label: item.name,
    };
  });

  return (
    <FormControl sx={styles.container}>
      <Grid container direction="column" alignItems="center">
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          flexWrap="nowrap"
          width="70% !important"
          height="auto"
          alignItems="center"
        >
          <Grid container wrap="nowrap" alignItems="center" width="auto">
            <Controller
              name={"from"}
              control={control}
              render={({ field: { onChange, ...controllerProps } }) => (
                <>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    onChange={(e, data) => {
                      onChange(data);
                    }}
                    options={locations}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.from}
                        helperText={errors.from?.label?.message}
                        label="Nereden"
                        sx={styles.root}
                      />
                    )}
                  />
                </>
              )}
            />
          </Grid>
          <Grid container wrap="nowrap" alignItems="center" width="auto">
            <Controller
              name={"to"}
              control={control}
              render={({ field: { onChange, ...controllerProps } }) => (
                <>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    onChange={(e, data) => {
                      onChange(data);
                    }}
                    options={locations}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.to}
                        helperText={errors.to?.label?.message}
                        label="Nereye"
                        sx={styles.root}
                      />
                    )}
                  />
                </>
              )}
            />
          </Grid>
          <Grid>
            <Button
              type="submit"
              variant="contained"
              sx={styles.button}
              onClick={handleSubmit(onSubmit)}
            >
              Filtrele
            </Button>
          </Grid>
        </Grid>
        <Grid marginTop="2rem">
          <VoyageDatePicker
            allVoyages={allVoyages}
            handleEventClick={(data: any) => handleEventClick(data)}
            voyages={voyages}
          />
        </Grid>
      </Grid>
    </FormControl>
  );
}
