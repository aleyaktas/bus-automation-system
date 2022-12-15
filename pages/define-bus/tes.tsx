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
} from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import instance, { serverSideConfig } from "../../utils/axios";
import { object, string, number, array, InferType, TypeOf } from "yup";
import { getModel } from "../api";

interface DefineBusProps {
  getAllDefineBus: object;
  err: string;
}

interface SelectedDataProps {
  brand: string;
  model: string;
  type: string;
  properties: Array<string>;
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

const schema = object({
  plate: string().required("Plaka girilmesi zorunludur"),
  brand: string().required("Marka girilmesi zorunludur"),
  model: string().required("Model girilmesi zorunludur"),
  seatCount: number().required("Koltuk sayısı girilmesi zorunludur"),
  type: string().required("Tip girilmesi zorunludur"),
  properties: string().required("Özellik girilmesi zorunludur"),
});

type FormValues = InferType<typeof schema>;

export default function Test({ getAllDefineBus, err }: DefineBusProps) {
  useEffect(() => {
    console.log("token", Cookies.get("token"));
  }, []);

  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
  console.log("errors", errors);

  const [selectedData, setSelectedData] = useState({
    brand: "",
    model: "",
    type: "",
    properties: [],
  });
  const [modelData, setModelData] = useState([]);

  const brands = getAllDefineBus && Object.values(getAllDefineBus)[0];
  const properties = getAllDefineBus && Object.values(getAllDefineBus)[1];
  const types = getAllDefineBus && Object.values(getAllDefineBus)[2];

  const onSubmit = (data: any) => {
    console.log("data", data);
    setSelectedData(data);
  };

  const defineBusData = [
    {
      id: 1,
      label: "Plaka",
      name: "plate",
      value: [],
      type: "input",
    },
    {
      id: 2,
      label: "Marka",
      name: "brand",
      value: brands,
      type: "select",
    },
    {
      id: 3,
      label: "Model",
      name: "model",
      value: modelData || [],
      type: "select",
    },
    {
      id: 4,
      label: "Koltuk Sayısı",
      name: "seatCount",
      value: [],
      type: "input",
    },
    {
      id: 5,
      label: "Tip",
      name: "type",
      value: types,
      type: "select",
    },
    {
      id: 6,
      label: "Özellik",
      name: "properties",
      value: properties,
      type: "select",
    },
  ];
  const newArray = defineBusData[1].value.map((data: any) => {
    return {
      ...data,
      label: data.name,
    };
  });
  const newAllArray = defineBusData.map((data) => {
    return {
      ...data,
      value: data.value.map((data: any) => {
        return {
          ...data,
          label: data.name,
        };
      }),
    };
  });
  useEffect(() => {
    console.log(newArray);
  }, []);

  const findModel = async () => {
    if (selectedData.brand) {
      const id = defineBusData
        .find((data) => data.name === "brand")
        ?.value.find((data: any) => data.name === selectedData.brand)?.id;
      const modelData = await getModel({ id });
      const modelArr = modelData?.model?.map((data: any) => data.name);
      setModelData(modelArr);
    }
  };
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
            <Autocomplete
              options={newArray}
              renderInput={(params) => <TextField {...params} label="Brand" />}
            />
            {/* <Autocomplete
              options={defineBusData[1].value}
              renderInput={(params) => <TextField {...params} label="Brand" />} */}

            {/* {defineBusData.map((data: any) => (
              <Grid
                container
                wrap="nowrap"
                width="auto"
                height="auto"
                alignItems="center"
              >
                <Typography sx={{ width: "8rem" }} variant="h5">
                  {data.label}
                </Typography> */}

            {/* {data.type === "input" ? (
                  <TextField
                    sx={{
                      width: "30rem",
                      border: "1px solid white !important",
                    }}
                    id="value-input"
                    variant="outlined"
                    {...register(`${data.name.toLowerCase()}` as any)}
                  />
                ) : (
                  
                  <Select
                    sx={{
                      width: "30rem",
                      color: "white",
                      fontSize: "1.8rem",
                      border: "1px solid white !important",
                      "&.Mui-disabled": {
                        border: "1px solid gray !important",
                      },
                    }}
                    disabled={data.name === "model" && !selectedData.brand}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={
                      selectedData[data.name as keyof typeof selectedData] || ""
                    }
                    {...register(`${data.name}` as any)}
                  >
                    {data &&
                      data.name !== "model" &&
                      data.value &&
                      data.value?.map((val: any) => (
                        <MenuItem
                          key={val}
                          value={val.name}
                          onClick={() => {
                            setSelectedData({
                              ...selectedData,
                              [data.name]: val.name,
                            });
                          }}
                        >
                          {val.name}
                        </MenuItem>
                      ))}
                    {data &&
                      data.name === "model" &&
                      data.value &&
                      modelData?.map((val: any) => (
                        <MenuItem
                          key={val}
                          value={val}
                          onClick={() => {
                            setSelectedData({
                              ...selectedData,
                              [data.name]: val,
                            });
                          }}
                        >
                          {val}
                        </MenuItem>
                      ))}
                  </Select>
                )} */}
            {/* </Grid> */}
            {/* ))} */}
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
