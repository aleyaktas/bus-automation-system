import {
  Alert,
  Autocomplete,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import styleFn from "./DefineVoyageForm.styles";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import instance, { serverSideConfig } from "../../utils/axios";
import "dayjs/locale/tr";

const styles = styleFn();
const locales = ["tr"] as const;

const DefineVoyageForm = ({
  register,
  errors,
  control,
  handleSubmit,
  onSubmit,
  allBuses,
  allLocations,
}: any) => {
  const plate_number = allBuses?.map((bus: any) => {
    return { id: bus.id, label: bus.plate_number };
  });
  const location = allLocations?.map((location: any) => {
    return { id: location.id, label: location.name };
  });

  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  console.log(value);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locales[0]}>
      <FormControl sx={styles.container}>
        <Alert sx={styles.alert} severity="info">
          Sefer bilgillerini doldurunuz
        </Alert>
        <Grid
          container
          direction="column"
          height="60rem"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid
            container
            wrap="nowrap"
            width="auto"
            height="auto"
            alignItems="center"
          >
            <Typography sx={styles.typography} variant="h5">
              Otobüs seç
            </Typography>
            <Controller
              name={"plate"}
              control={control}
              render={({ field: { onChange, ...controllerProps } }) => (
                <>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    onChange={(e, data) => {
                      onChange(data);
                    }}
                    options={plate_number}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.plate}
                        helperText={errors.plate?.label?.message}
                        label="Plaka"
                        sx={styles.root}
                      />
                    )}
                  />
                </>
              )}
            />
          </Grid>
          <Grid
            container
            wrap="nowrap"
            width="auto"
            height="auto"
            alignItems="center"
          >
            <Typography sx={styles.typography} variant="h5">
              Koltuk Ücreti
            </Typography>
            <TextField
              {...register("seatPrice")}
              error={!!errors.seatPrice}
              helperText={errors.seatPrice?.message}
              id="outlined-basic"
              label="Koltuk ücreti"
              variant="outlined"
              sx={styles.root}
            />
          </Grid>

          <Grid
            container
            wrap="nowrap"
            width="auto"
            height="auto"
            alignItems="center"
          >
            <Typography sx={styles.typography} variant="h5">
              Gün ve saat seçin
            </Typography>
            <DateTimePicker
              label="Gün & Saat"
              value={value}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...register("date")}
                  sx={styles.root}
                  error={!!errors.date}
                  helperText={errors.date?.message}
                />
              )}
            />
          </Grid>
          <Grid
            container
            wrap="nowrap"
            width="auto"
            height="auto"
            alignItems="center"
          >
            <Typography sx={styles.typography} variant="h5">
              Nereden
            </Typography>
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
                    options={location}
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
          <Grid
            container
            wrap="nowrap"
            width="auto"
            height="auto"
            alignItems="center"
          >
            <Typography sx={styles.typography} variant="h5">
              Nereye
            </Typography>
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
                    options={location}
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

          <Button
            variant="contained"
            sx={styles.button}
            onClick={handleSubmit(onSubmit)}
          >
            Kaydet
          </Button>
        </Grid>
      </FormControl>
    </LocalizationProvider>
  );
};

export default DefineVoyageForm;
