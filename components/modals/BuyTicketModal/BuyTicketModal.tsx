import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import styleFn from "./BuyTicketModal.styles";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35rem",
  height: "35rem",
  bgcolor: "white",
  boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
  outline: "none",
};

export default function BuyTicketModal({
  isOpen,
  setIsOpen,
  seatNumber,
  price,
  buyTicketButton,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  seatNumber: number;
  price: number;
  buyTicketButton: (data: any) => void;
}) {
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const [selectGender, setSelectGender] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectGender(event.target.value as string);
  };
  const gender = ["Erkek", "Kadın"];
  const styles = styleFn();

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid sx={style}>
          <Grid
            container
            width="100%"
            height="5rem"
            bgcolor="green"
            justifyContent="center"
            alignItems="center"
          >
            <Typography sx={styles.headerText} variant="h5" component="h2">
              Bilet Satın Al
            </Typography>
          </Grid>
          <Grid
            container
            direction="column"
            height="30rem"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={styles.typography}
            >
              Koltuk Numaranız: {seatNumber}
            </Typography>
            <Typography
              id="modal-modal-description"
              variant="h5"
              component="h2"
              sx={styles.typography}
            >
              Koltuk Ücretiniz: {price} TL
            </Typography>

            <FormControl sx={{ minWidth: "12rem" }} size="medium">
              <InputLabel id="demo-simple-select-label">Cinsiyet</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectGender}
                label="Cinsiyet"
                onChange={handleChange}
                sx={{ fontSize: "1.2rem" }}
              >
                {gender.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              sx={styles.button}
              variant="contained"
              color="success"
              onClick={() => {
                selectGender &&
                  buyTicketButton({
                    seatNumber,
                    gender: selectGender,
                  });
                setSelectGender("");
              }}
            >
              Satın Al
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
}
