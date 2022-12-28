import * as React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styleFn from "./DefineBusModel.styles";
import BuyTicketModal from "../modals/BuyTicketModal/BuyTicketModal";

interface DefineBusModelProps {
  numberOfSeats: number;
  type: number;
  setNumberOfSeats: (numberOfSeats: number) => void;
  onClickSeat: (data: number) => void;
  height?: string;
}

const DefineBusModel = ({
  numberOfSeats,
  type,
  setNumberOfSeats,
  onClickSeat,
  height,
}: DefineBusModelProps) => {
  const styles = styleFn();

  let seatCounter = 1;

  const [seatCounterState, setSeatCounterState] = React.useState(0);

  useEffect(() => {
    console.log(
      seatCounter,
      "seatCounter",
      seatCounterState,
      "seatCounterState"
    );
  }, [seatCounter, seatCounterState]);

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

  const findEvenSeatCount = (seat: number, value: number) => {
    if (seat !== 10 && value === 0) {
      return (seat - 1) * 4 + 1;
    }
    if (seat !== 0 && value === 1) {
      return seat * 4 - 1;
    }
  };

  const findSeatCount = (seat: number) => {
    if (seat === 1) {
      return seat + 0;
    }
    return seat + (seat - 1) * 2;
  };

  return (
    <Grid
      bgcolor="white"
      maxHeight="70rem"
      height={height ? height : "auto"}
      overflow="auto"
      container
      ref={ref}
      alignContent="flex-start"
      borderRadius="0.4rem"
      xs={6}
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
        item
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

      <Grid xs={12} item container minHeight="20vh" height="auto">
        {(() => {
          const seat = [];
          if (type === 1) {
            for (let i = 1; i <= numberOfSeats / 3; i++) {
              seat.push(
                <>
                  <Grid
                    container
                    xs={6}
                    item
                    justifyContent="center"
                    marginBottom="2rem"
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <Grid
                      xs={3}
                      item
                      container
                      justifyContent="center"
                      alignItems="center"
                      sx={styles.seat}
                      onClick={() => {
                        const value = findSeatCount(i);
                        onClickSeat(value);
                      }}
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
                      onClick={() => {
                        const value = findSeatCount(i);
                        onClickSeat(value + 1);
                      }}
                    >
                      <Typography fontSize="1.8rem">{seatCounter}</Typography>
                    </Grid>
                    {seatCounter++}
                  </Grid>
                  <Grid
                    container
                    xs={6}
                    item
                    justifyContent="center"
                    marginBottom="2rem"
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <Grid
                      xs={3}
                      item
                      container
                      justifyContent="center"
                      alignItems="center"
                      sx={styles.seat}
                      onClick={() => {
                        const value = findSeatCount(i);
                        onClickSeat(value + 2);
                      }}
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
                      item
                      justifyContent="center"
                      marginBottom="2rem"
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      <Grid
                        xs={3}
                        item
                        container
                        justifyContent="center"
                        alignItems="center"
                        sx={styles.seat}
                        onClick={() => {
                          const val = findEvenSeatCount(i, j);
                          val && onClickSeat(val);
                        }}
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
                        onClick={() => {
                          const val = findEvenSeatCount(i, j);
                          val && onClickSeat(val + 1);
                        }}
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
