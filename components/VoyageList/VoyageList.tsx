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
import styleFn from "./VoyageList.styles";
import VoyageDatePicker from "../VoyageDatePicker/VoyageDatePicker";
import axios from "axios";
import { useState } from "react";

interface VoyageDataProps {
  allLocation: object;
  allVoyages: object;
  handleEventClick: any;
  handleSubmit: any;
  isOpen?: any;
  setIsOpen?: any;
  formState: any;
  control: any;
  onSubmit: any;
  voyages: any;
  register: any;
  resetField: any;
  setValue: any;
}

export default function VoyageList({
  allLocation,
  allVoyages,
  handleEventClick,
  handleSubmit,
  isOpen,
  setIsOpen,
  formState,
  control,
  onSubmit,
  voyages,
}: VoyageDataProps) {
  const styles = styleFn();
  const { errors } = formState;

  const locations = Object.values(allLocation).map((item: any) => {
    return {
      id: item.id,
      label: item.name,
    };
  });

  const [selectCity, setSelectCity] = useState<any>();

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
                      setSelectCity(data);
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
            setIsOpenModal={setIsOpen}
            allVoyages={allVoyages}
            handleEventClick={(data: any) => handleEventClick(data)}
            voyages={voyages}
          />
        </Grid>
      </Grid>
    </FormControl>
  );
}
