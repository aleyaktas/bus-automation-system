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

const styles = styleFn();

const DefineBusForm = ({
  register,
  errors,
  control,
  setSelectedBrand,
  defineBusData,
  selectedBrand,
  handleSubmit,
  onSubmit,
  setNumberOfSeats,
  numberOfSeats,
  setSelectedType,
}: any) => {
  return (
    <FormControl sx={styles.container}>
      <Alert sx={styles.alert} severity="info">
        Otobüs seçeneklerini doldurunuz
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
            Plaka
          </Typography>
          <TextField
            {...register("plate")}
            error={!!errors.plate}
            id="outlined-basic"
            helperText={errors.plate?.message}
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
                    onChange(data), setSelectedBrand(data);
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
                      label={
                        selectedBrand && selectedBrand?.id === -1
                          ? "Önce Marka Seçiniz"
                          : "Model"
                      }
                      helperText={errors.model?.label.message}
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
            name={"seatCount"}
            control={control}
            render={({ field: { onChange, ...controllerProps } }) => (
              <>
                <Typography sx={styles.typography} variant="h5">
                  Koltuk Sayısı
                </Typography>
                <TextField
                  onChange={(e: any) => {
                    onChange(parseInt(e.target.value));
                    setNumberOfSeats(parseInt(e.target.value));
                  }}
                  error={!!errors.seatCount}
                  value={numberOfSeats ? numberOfSeats : ""}
                  label="Koltuk Sayısı"
                  id="outlined-basic"
                  variant="outlined"
                  helperText={errors.seatCount?.message}
                  sx={styles.root}
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
                  onChange={(e, data: any) => {
                    onChange(data), setSelectedType(data?.id);
                  }}
                  options={defineBusData.types}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!errors.type}
                      label="Tip"
                      helperText={errors.type?.message}
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
                      label="Özellikler"
                      helperText={errors.properties?.message}
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
