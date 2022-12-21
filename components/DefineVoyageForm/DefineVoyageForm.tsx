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

const styles = styleFn();

const DefineVoyageForm = ({
  register,
  errors,
  control,
  handleSubmit,
  onSubmit,
}: any) => {
  const data = {
    plate: [
      { id: 1, label: "34 1234" },
      { id: 2, label: "34 1235" },
      { id: 3, label: "34 1236" },
    ],
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
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl sx={styles.container}>
        <Alert sx={styles.alert} severity="info">
          Sefer bilgillerini doldurunuz
        </Alert>
        <Grid
          container
          direction="column"
          height="50rem"
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
            <Controller
              name={"plate"}
              control={control}
              render={({ field: { onChange, ...controllerProps } }) => (
                <>
                  <Typography sx={styles.typography} variant="h5">
                    Otobüs seç
                  </Typography>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    onChange={(e, data) => {
                      onChange(data);
                    }}
                    options={data.plate}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.plate}
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
              error={!!errors.plate}
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
                <TextField {...params} sx={styles.root} />
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
            <Controller
              name={"from"}
              control={control}
              render={({ field: { onChange, ...controllerProps } }) => (
                <>
                  <Typography sx={styles.typography} variant="h5">
                    Nereden
                  </Typography>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    onChange={(e, data) => {
                      onChange(data);
                    }}
                    options={data.from}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.from}
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
            <Controller
              name={"to"}
              control={control}
              render={({ field: { onChange, ...controllerProps } }) => (
                <>
                  <Typography sx={styles.typography} variant="h5">
                    Nereye
                  </Typography>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    onChange={(e, data) => {
                      onChange(data);
                    }}
                    options={data.to}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.brand}
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
