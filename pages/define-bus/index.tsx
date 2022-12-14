import {
  Alert,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { useEffect } from "react";

import instance, { serverSideConfig } from "../../utils/axios";
interface DefineBusProps {
  data: object;
  err: string;
}
export const getServerSideProps = async (context: any) => {
  try {
    const res = await instance.get(
      "/api/bus-definition",
      serverSideConfig(context)
    );
    console.log(res?.data);
    return {
      props: {
        data: res.data,
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

export default function DefineBus({ data, err }: DefineBusProps) {
  useEffect(() => {
    console.log("token", Cookies.get("token"));
  }, []);

  const brands = Object.values(data)[0];
  const properties = Object.values(data)[1];
  const types = Object.values(data)[2];

  const names = [
    {
      id: 1,
      name: "Plaka",
      value: [],
      type: "input",
    },
    {
      id: 2,
      name: "Marka",
      value: brands,
      type: "select",
    },
    {
      id: 3,
      name: "model",
      value: ["Mercedes", "Volvo", "Scania"],
      type: "select",
    },
    {
      id: 4,
      name: "koltuk sayısı",
      value: ["20", "30", "40"],
      type: "input",
    },
    {
      id: 5,
      name: "tip",
      value: types,
      type: "select",
    },
    {
      id: 6,
      name: "özellik",
      value: properties,
      type: "select",
    },
  ];
  return (
    <Grid container height="93vh" marginTop="10rem">
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
            {names.map((name) => (
              <Grid
                container
                wrap="nowrap"
                width="auto"
                height="auto"
                alignItems="center"
              >
                <Typography sx={{ width: "8rem" }} variant="h5">
                  {name.name}
                </Typography>
                {name.type === "input" ? (
                  <TextField
                    sx={{ width: "30rem" }}
                    id="outlined-basic"
                    variant="outlined"
                  />
                ) : (
                  <Select
                    sx={{
                      width: "30rem",
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name.name}
                  >
                    {name.value &&
                      name.value?.map((val: any) => (
                        <MenuItem key={val} value={val}>
                          {val}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              </Grid>
            ))}
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
            >
              Kaydet
            </Button>
          </Grid>
        </FormControl>
      </Grid>
      <Grid item xs={6} container justifyContent="center">
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
