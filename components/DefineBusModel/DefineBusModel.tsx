import * as React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styleFn from "./DefineBusModel.styles";

interface DefineBusModelProps {
  numberOfSeats: number;
  type: number;
  setNumberOfSeats: (numberOfSeats: number) => void;
}

const DefineBusModel = ({
  numberOfSeats,
  type,
  setNumberOfSeats,
}: DefineBusModelProps) => {
  const styles = styleFn();
  let seatCounter = 1 as number;
  const onClickAddSeat = () => {
    if (numberOfSeats < 60 && numberOfSeats % 4 === 0) {
      setNumberOfSeats(numberOfSeats + 4);
    } else if (numberOfSeats < 60 && numberOfSeats % 3 === 0) {
      setNumberOfSeats(numberOfSeats + 3);
    }
  };

  const onClickRemoveSeat = () => {
    if (numberOfSeats > 4 && numberOfSeats % 4 === 0) {
      setNumberOfSeats(numberOfSeats - 4);
    } else if (numberOfSeats > 3 && numberOfSeats % 3 === 0) {
      setNumberOfSeats(numberOfSeats - 3);
    }
  };
  const ref = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [numberOfSeats]);
  return (
    <Grid
      bgcolor="white"
      width="40rem"
      maxHeight="70vh"
      height="auto"
      overflow="auto"
      container
      ref={ref}
      alignContent="flex-start"
      borderRadius="0.4rem"
      xs={8}
      md={6}
      item
      sx={styles.container}
    >
      <Grid container justifyContent="end" marginTop="1.2rem">
        <div
          style={{
            position: "fixed",
          }}
        >
          <Button
            variant="contained"
            sx={styles.button}
            onClick={onClickAddSeat}
          >
            <AddIcon />
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={styles.button}
            onClick={onClickRemoveSeat}
          >
            <RemoveIcon />
          </Button>
        </div>
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
            for (let i = 1; i <= numberOfSeats / 3; i++) {
              seat.push(
                <>
                  <Grid
                    container
                    xs={6}
                    justifyContent="center"
                    marginBottom="2rem"
                  >
                    <Grid
                      xs={3}
                      item
                      container
                      justifyContent="center"
                      alignItems="center"
                      sx={styles.seat}
                    >
                      <Typography fontSize="1.6rem">{seatCounter}</Typography>
                    </Grid>
                    {seatCounter++}

                    <Grid
                      xs={3}
                      item
                      container
                      justifyContent="center"
                      alignItems="center"
                      sx={styles.seat}
                    >
                      <Typography fontSize="1.8rem">{seatCounter}</Typography>
                    </Grid>
                    {seatCounter++}
                  </Grid>
                  <Grid
                    container
                    xs={6}
                    justifyContent="center"
                    marginBottom="2rem"
                  >
                    <Grid
                      xs={3}
                      item
                      container
                      justifyContent="center"
                      alignItems="center"
                      sx={styles.seat}
                    >
                      <Typography fontSize="1.6rem">{seatCounter}</Typography>
                    </Grid>
                    {seatCounter++}
                  </Grid>
                </>
              );
            }
            return seat;
          } else if (type === 2) {
            for (let i = 1; i <= numberOfSeats / 4; i++) {
              for (let j = 0; j < 2; j++) {
                seat.push(
                  <>
                    <Grid
                      container
                      xs={6}
                      justifyContent="center"
                      marginBottom="2rem"
                    >
                      <Grid
                        xs={3}
                        item
                        container
                        justifyContent="center"
                        alignItems="center"
                        sx={styles.seat}
                      >
                        <Typography fontSize="1.6rem">{seatCounter}</Typography>
                      </Grid>
                      {seatCounter++}
                      <Grid
                        xs={3}
                        item
                        container
                        justifyContent="center"
                        alignItems="center"
                        sx={styles.seat}
                      >
                        <Typography fontSize="1.6rem">{seatCounter}</Typography>
                      </Grid>
                      {seatCounter++}
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
