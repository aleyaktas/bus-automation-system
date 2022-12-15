import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Autocomplete,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  createStyles,
} from "@mui/material";
import { makeStyles, DefaultTheme } from "@mui/styles";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import instance, { serverSideConfig } from "../../utils/axios";
import { object, string, number, array, InferType, TypeOf } from "yup";
import { getModel } from "../api";
import { Stack } from "@mui/system";
import styleFn from "./DefineBus.styles";

interface DefineBusProps {
  getAllDefineBus: object;
  err: string;
}
interface BrandProps {
  id: number;
  name: string;
}

interface DefineBusDataProps {
  brands: Array<string>;
  types: Array<string>;
  properties: Array<string>;
  models: Array<string>;
}

export const getServerSideProps = async (context: any) => {
  try {
    const res = await instance.get(
      "/api/bus-definition",
      serverSideConfig(context)
    );
    return {
      props: {
        getAllDefineBus: res.data,
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
// const useStyles = makeStyles<DefaultTheme>(() =>
//   createStyles({
//     root: {
//       width: "30rem",
//       fieldset: {
//         borderColor: "white",
//       },
//       "& label.Mui-focused": {
//         color: "purple",
//         borderColor: "purple",
//       },
//       "& .MuiInput-underline:after": {
//         borderBottomColor: "gray",
//       },

//       "& .MuiFilledInput-underline:after": {
//         borderBottomColor: "red",
//       },

//       "& .MuiOutlinedInput-root": {
//         "&.Mui-focused fieldset": {
//           borderColor: "black",
//         },
//       },
//     },
//   })
// );
const schema = object({
  plate: string().required("Plaka girilmesi zorunludur"),
  brand: string().required("Marka girilmesi zorunludur"),
  model: string().required("Model girilmesi zorunludur"),
  seatCount: number().required("Koltuk sayısı girilmesi zorunludur"),
  type: string().required("Tip girilmesi zorunludur"),
  properties: array().required("Özellik girilmesi zorunludur"),
});

type FormValues = InferType<typeof schema>;

export default function DefineBus({ getAllDefineBus, err }: DefineBusProps) {
  const { register, handleSubmit, formState, control, reset } =
    useForm<FormValues>({
      resolver: yupResolver(schema),
    });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "properties",
    }
  );
  const { errors } = formState;
  console.log("errors", errors);
  const [selectedBrand, setSelectedBrand] = useState<any>([]);

  const findModel = async (id: number) => {
    const model = await getModel({ id: id });

    setDefineBusData((prev) => {
      return {
        ...prev,
        models: model?.model?.map((item: BrandProps) => {
          return {
            id: item.id,
            label: item.name,
          };
        }),
      };
    });
  };
  useEffect(() => {
    if (selectedBrand) {
      selectedBrand.id && findModel(selectedBrand.id);
    } else {
      setSelectedBrand([]);
      setDefineBusData((prev) => {
        return {
          ...prev,
          models: [],
        };
      });
    }
  }, [selectedBrand]);
  // const styles = useStyles();
  const styles = styleFn();
  const [defineBusData, setDefineBusData] = useState<DefineBusDataProps>({
    brands: Object.entries(getAllDefineBus)[0][1].map((item: BrandProps) => {
      return {
        id: item.id,
        label: item.name,
      };
    }),
    properties: Object.entries(getAllDefineBus)[1][1].map(
      (item: BrandProps) => {
        return {
          id: item.id,
          label: item.name,
        };
      }
    ),
    types: Object.entries(getAllDefineBus)[2][1].map((item: BrandProps) => {
      return {
        id: item.id,
        label: item.name,
      };
    }),
    models: [],
  });

  const onSubmit = (data: FormValues) => {
    console.log("data", data);
    reset();
  };

  console.log("defineBusData", defineBusData);
  return (
    <Grid container marginTop="10rem">
      <Grid item xs={6} alignItems="center">
        <FormControl
          sx={{
            height: "100%",
            width: "100%",
            marginTop: "2rem",
            alignItems: "center",
          }}
        >
          <Alert
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.3rem",
              width: "30rem",
              marginLeft: "8rem",
            }}
            severity="info"
          >
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
              <Typography sx={{ width: "8rem" }} variant="h5">
                Plaka
              </Typography>
              <TextField
                {...register("plate")}
                error={!!errors.plate}
                helperText={errors.plate?.message}
                id="outlined-basic"
                InputProps={{
                  style: {
                    fontSize: "1.2rem",
                    color: "white",
                  },
                }}
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
              <Typography sx={{ width: "8rem" }} variant="h5">
                Marka
              </Typography>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={defineBusData.brands}
                sx={{ width: "30rem" }}
                onChange={(event, newValue) => {
                  setSelectedBrand(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...register("brand")}
                    {...params}
                    label="Marka"
                    sx={styles.root}
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
              <Typography sx={{ width: "8rem" }} variant="h5">
                Model
              </Typography>
              <Autocomplete
                disabled={selectedBrand?.length === 0}
                disablePortal
                id="combo-box-demo"
                options={defineBusData?.models}
                sx={{ width: "30rem" }}
                value={
                  defineBusData?.models?.length === 0
                    ? "Önce marka seçiniz"
                    : ""
                }
                renderInput={(params) => (
                  <TextField
                    {...register("model")}
                    {...params}
                    label="Model"
                    sx={styles.root}
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
              <Typography sx={{ width: "8rem" }} variant="h5">
                Koltuk Sayısı
              </Typography>
              <TextField
                {...register("seatCount")}
                error={!!errors.plate}
                helperText={errors.plate?.message}
                id="outlined-basic"
                label="Koltuk Sayısı"
                variant="outlined"
                InputProps={{
                  style: {
                    fontSize: "1.2rem",
                    color: "white",
                  },
                }}
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
              <Typography sx={{ width: "8rem" }} variant="h5">
                Tip
              </Typography>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={defineBusData.types}
                sx={{ width: "30rem" }}
                renderInput={(params) => (
                  <TextField
                    {...register("type")}
                    {...params}
                    error={!!errors.plate}
                    helperText={errors.plate?.message}
                    label="Tip"
                    sx={styles.root}
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
              <Controller
                name={"properties"}
                control={control}
                render={({ field: { onChange, ...controllerProps } }) => (
                  <>
                    <Typography sx={{ width: "8rem" }} variant="h5">
                      Özellikler
                    </Typography>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      sx={{ width: "30rem" }}
                      multiple
                      {...controllerProps}
                      onChange={(e, data) => onChange(data)}
                      options={defineBusData.properties}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.plate}
                          helperText={errors.plate?.message}
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
              sx={{
                width: "30rem",
                height: "4rem",
                backgroundColor: "#ffcf70",
                color: "black",
                fontSize: "1.3rem",
                marginTop: "2rem",
                marginLeft: "8rem",
              }}
              onClick={handleSubmit(onSubmit)}
            >
              Kaydet
            </Button>
          </Grid>
        </FormControl>
      </Grid>
      <Grid item xs={6} container justifyContent="flex-start">
        <Grid
          bgcolor="white"
          width="40rem"
          height="60rem"
          container
          justifyContent="space-around"
          alignContent="flex-start"
        >
          <div style={{ width: "100%", margin: "2rem 0" }}>
            <div style={{ width: "50%", textAlign: "center" }}>
              <img
                style={{ width: "5rem", height: "5rem" }}
                src="/steering-wheel.svg"
                alt="Logo"
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "50%",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: "5rem",
                height: "5rem",
                marginRight: "1rem",
                backgroundColor: "black",
              }}
            ></div>
            <div
              style={{
                width: "5rem",
                height: "5rem",
                backgroundColor: "black",
              }}
            ></div>
          </div>
          <div
            style={{ display: "flex", width: "50%", justifyContent: "center" }}
          >
            {" "}
            <div
              style={{
                width: "5rem",
                height: "5rem",
                marginRight: "1rem",
                backgroundColor: "black",
              }}
            ></div>
            <div
              style={{
                width: "5rem",
                height: "5rem",
                backgroundColor: "black",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              width: "50%",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            {" "}
            <div
              style={{
                width: "5rem",
                height: "5rem",
                marginRight: "1rem",
                backgroundColor: "black",
              }}
            ></div>
            <div
              style={{
                width: "5rem",
                height: "5rem",
                backgroundColor: "black",
              }}
            ></div>
          </div>
          <div
            style={{ display: "flex", width: "50%", justifyContent: "center" }}
          >
            {" "}
            <div
              style={{
                width: "5rem",
                height: "5rem",
                marginRight: "1rem",
                backgroundColor: "black",
              }}
            ></div>
            <div
              style={{
                width: "5rem",
                height: "5rem",
                backgroundColor: "black",
              }}
            ></div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
