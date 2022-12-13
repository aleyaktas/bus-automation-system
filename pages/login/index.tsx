import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CarRentalOutlinedIcon from "@mui/icons-material/CarRentalOutlined";
import styleFn from "./Login.styles";

export default function Home() {
  const styles = styleFn();
  return (
    <Grid container justifyContent="center" alignItems="center" height="93vh">
      <Card
        sx={{
          minWidth: "35rem",
          height: "50rem",
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="center"
          direction="column"
          height="100%"
          padding="0 5rem"
        >
          <CardContent sx={styles.cardContent}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              width="12rem"
              height="12rem"
              border="2px dashed"
              borderRadius="8rem"
              margin="3rem auto"
              bgcolor="#f5f5f5"
            >
              <CarRentalOutlinedIcon strokeWidth="0.1" sx={styles.loginIcon} />
            </Grid>
            <Typography
              textAlign="center"
              fontSize="3rem"
              variant="h5"
              component="div"
              margin="3rem 0"
            >
              LOGIN
            </Typography>
            <Grid direction="column" container>
              <TextField
                InputLabelProps={{
                  style: styles.fontSizeLg,
                }}
                InputProps={{
                  style: styles.fontSizeLg,
                }}
                id="standard-basic"
                label="Email"
                variant="standard"
                type="email"
              >
                Email
              </TextField>
              <TextField
                InputLabelProps={{
                  style: styles.fontSizeLg,
                }}
                InputProps={{
                  style: styles.fontSizeLg,
                }}
                id="standard-basic"
                label="Password"
                variant="standard"
                type="password"
              >
                Password
              </TextField>
            </Grid>
          </CardContent>
          <CardActions sx={styles.cardContent}>
            <Button
              fullWidth
              variant="contained"
              color="info"
              sx={styles.fontSizeLg}
            >
              Login
            </Button>
          </CardActions>
        </Grid>
      </Card>
    </Grid>
  );
}
