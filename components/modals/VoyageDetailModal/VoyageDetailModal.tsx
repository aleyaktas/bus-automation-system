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
import styleFn from "./VoyageDetailModal.styles";

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

export default function VoyageDetailModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

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
              Sefer Detayları
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
              Sefer Tarihi: 01.01.2023
            </Typography>
            <Typography
              id="modal-modal-description"
              variant="h5"
              component="h2"
              sx={styles.typography}
            >
              Satılan Koltuk Sayısı: 10
            </Typography>
            <Typography
              id="modal-modal-description"
              variant="h5"
              component="h2"
              sx={styles.typography}
            >
              Toplam Kazanılan Miktar: 1000 TL
            </Typography>
            <Typography
              id="modal-modal-description"
              variant="h5"
              component="h2"
              sx={styles.typography}
            >
              Boş Koltuk: 10
            </Typography>

            <Button sx={styles.button} variant="contained" color="error">
              Seferi Sil
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
}
