import styled from "@emotion/styled";
import { Button, Grid, Icon, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styleFn from "./DefineBusModel.styles";

const DefineBusModel = () => {
  const [seatCount, setSeatCount] = useState(10);
  const [type, setType] = useState(1);
  const styles = styleFn();
  return (
    <Grid
      bgcolor="white"
      width="40rem"
      maxHeight="70vh"
      height="auto"
      overflow="auto"
      container
      alignContent="flex-start"
      borderRadius="0.4rem"
      sx={styles.container}
    >
      <Grid container justifyContent="end" marginTop="1.2rem">
        <Button variant="contained" sx={styles.button}>
          <AddIcon />
        </Button>
        <Button variant="contained" color="primary" sx={styles.button}>
          <RemoveIcon />
        </Button>
      </Grid>
      <Grid
        xs={6}
        width="100%"
        height="10rem"
        container
        justifyContent="center"
        alignItems="center"
      >
        <img
          style={{ width: "5rem", height: "5rem" }}
          src="/steering-wheel.svg"
          alt="Logo"
        />
      </Grid>

      <Grid xs={12} container minHeight="20vh" height="auto">
        {(() => {
          const seat = [];
          if (type === 1) {
            for (let i = 0; i <= seatCount / 3; i++) {
              seat.push(
                <>
                  <Grid
                    container
                    xs={6}
                    justifyContent="space-evenly"
                    marginBottom="2rem"
                  >
                    <Grid xs={3} item container>
                      <div style={styles.seat}>{i}</div>
                    </Grid>
                    <Grid xs={3} item container>
                      <div style={styles.seat}>{i}</div>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    xs={6}
                    justifyContent="center"
                    marginBottom="2rem"
                  >
                    <Grid xs={3} item container>
                      <div style={styles.seat}>{i}</div>
                    </Grid>
                  </Grid>
                </>
              );
            }
            return seat;
          } else if (type === 2) {
            for (let i = 0; i <= seatCount / 4; i++) {
              for (let j = 0; j < 2; j++) {
                seat.push(
                  <>
                    <Grid
                      container
                      xs={6}
                      justifyContent="space-evenly"
                      marginBottom="2rem"
                    >
                      <Grid xs={3} item container>
                        <div style={styles.seat}>{i}</div>
                      </Grid>
                      <Grid xs={3} item container>
                        <div style={styles.seat}>{i}</div>
                      </Grid>
                    </Grid>
                  </>
                );
              }
            }
            return seat;
          }
        })()}
      </Grid>
    </Grid>
  );
};

export default DefineBusModel;
