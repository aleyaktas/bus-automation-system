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
import styleFn from "./DefineBusForm.styles";

const DefineBusForm = ({
  register,
  errors,
  control,
  setSelectedBrand,
  defineBusData,
  selectedBrand,
  handleSubmit,
  onSubmit,
}: any) => {
  const styles = styleFn();
  return (
    <FormControl sx={styles.container}>
      <Alert sx={styles.alert} severity="info">
        Otobüs seçeneklerini doldurunuz
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
          <Typography sx={styles.typography} variant="h5">
            Plaka
          </Typography>
          <TextField
            {...register("plate")}
            error={!!errors.plate}
            helperText={errors.plate?.message}
            id="outlined-basic"
            label="Plaka"
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
          <Controller
            name={"brand"}
            control={control}
            render={({ field: { onChange, ...controllerProps } }) => (
              <>
                <Typography sx={styles.typography} variant="h5">
                  Marka
                </Typography>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(e, data) => {
                    onChange(data), setSelectedBrand(data), console.log(data);
                  }}
                  options={defineBusData.brands}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!errors.brand}
                      helperText={errors.brand?.label?.message}
                      label="Marka"
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
            name={"model"}
            control={control}
            render={({ field: { onChange, ...controllerProps } }) => (
              <>
                <Typography sx={styles.typography} variant="h5">
                  Model
                </Typography>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(e, data) => onChange(data)}
                  options={
                    defineBusData?.models && defineBusData.models.length > 0
                      ? defineBusData?.models
                      : []
                  }
                  disabled={selectedBrand && selectedBrand?.id === -1}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!errors.model}
                      helperText={errors.model?.label?.message}
                      label={
                        selectedBrand && selectedBrand?.id === -1
                          ? "Önce Marka Seçiniz"
                          : "Model"
                      }
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
            Koltuk Sayısı
          </Typography>
          <TextField
            {...register("seatCount")}
            error={!!errors.seatCount}
            helperText={errors.seatCount?.message}
            id="outlined-basic"
            label="Koltuk Sayısı"
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
          <Controller
            name={"type"}
            control={control}
            render={({ field: { onChange, ...controllerProps } }) => (
              <>
                <Typography sx={styles.typography} variant="h5">
                  Tip
                </Typography>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(e, data) => {
                    onChange(data);
                  }}
                  options={defineBusData.types}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!errors.type}
                      helperText={errors.type?.label?.message}
                      label="Tip"
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
            name={"properties"}
            control={control}
            render={({ field: { onChange, ...controllerProps } }) => (
              <>
                <Typography sx={styles.typography} variant="h5">
                  Özellikler
                </Typography>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  multiple
                  onChange={(e, data) => onChange(data)}
                  options={defineBusData.properties}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!errors.properties}
                      helperText={errors.properties?.message}
                      label="Özellikler"
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
  );
};

export default DefineBusForm;