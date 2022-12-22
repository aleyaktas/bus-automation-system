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

export default function VoyageList({
  data,
  handleSubmit,
  formState,
  control,
}: any) {
  const styles = styleFn();
  const { errors } = formState;

  const onSubmit = (data: any) => {
    console.log(data);
  };
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
                    options={data.from}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.from}
                        helperText={errors.from?.message}
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
                    options={data.to}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.to}
                        helperText={errors.to?.message}
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
          <VoyageDatePicker />
        </Grid>
      </Grid>
    </FormControl>
  );
}
