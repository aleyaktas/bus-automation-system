import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { object, string, number, array, InferType, TypeOf } from "yup";
import DefineVoyageForm from "../../components/DefineVoyageForm/DefineVoyageForm";
import VoyageDatePicker from "../../components/VoyageDatePicker/VoyageDatePicker";

const schema = object({
  plate: string().required("Plaka girilmesi zorunludur"),
  seatPrice: number()
    .default(20)
    .required("Koltuk ücreti girilmesi zorunludur")
    .typeError("Koltuk ücreti girilmesi zorunludur"),
  from: string().required("Nereden girilmesi zorunludur"),
  to: string().required("Nereye girilmesi zorunludur"),
});

type FormValues = InferType<typeof schema>;

export default function DefineVoyage() {
  const { register, handleSubmit, formState, control, resetField, setValue } =
    useForm<FormValues>({
      resolver: yupResolver(schema),
    });
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <Grid container marginTop="10rem">
      <Grid item xs={6} alignItems="center">
        <DefineVoyageForm
          register={register}
          errors={errors}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      </Grid>
      <Grid item xs={6} container justifyContent="flex-start">
        <VoyageDatePicker />
      </Grid>
    </Grid>
  );
}
