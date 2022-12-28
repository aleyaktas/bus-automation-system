import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { object, string, number, array, InferType, TypeOf } from "yup";
import DefineBusModel from "../../components/DefineBusModel/DefineBusModel";
import BuyTicketModal from "../../components/modals/BuyTicketModal/BuyTicketModal";
import VoyageList from "../../components/VoyageList/VoyageList";
import instance, { serverSideConfig } from "../../utils/axios";
import { getBus, getVoyage } from "../api";

export const getServerSideProps = async (context: any) => {
  try {
    const res = await instance.get("/api/voyage/", serverSideConfig(context));
    const resLocation = await instance.get(
      "/api/locations/",
      serverSideConfig(context)
    );
    return {
      props: {
        getAllVoyages: res.data.data,
        getAllLocations: resLocation.data.data,
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
  from: object().shape({
    id: number(),
    label: string().required("Nereden gidileceğinin seçilmesi zorunludur"),
  }),
  to: object().shape({
    id: number(),
    label: string().required("Nereye gidileceğinin seçilmesi zorunludur"),
  }),
});

type FormValues = InferType<typeof schema>;

export default function BuyTicket({ getAllVoyages, getAllLocations }: any) {
  console.log(getAllVoyages);
  const { register, handleSubmit, formState, control, resetField, setValue } =
    useForm<FormValues>({
      resolver: yupResolver(schema),
    });

  const [numberOfSeats, setNumberOfSeats] = useState(20);
  const [fee, setFee] = useState(0);
  const [selectedSeat, setSelectedSeat] = useState<any>();
  const [selectedType, setSelectedType] = useState(2);
  const [voyages, setVoyages] = useState<any>();
  const [busId, setBusId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const onClickSeat = (data: any) => {
    setSelectedSeat(data);
    setIsOpen(true);
    const findBus = Object.values(getAllVoyages);
    findBus.map((bus: any) => {
      console.log(bus);
    });
  };

  const handleEventClick = async (event: any) => {
    console.log(event);
    const { busId, voyageId } = event;
    const id = parseInt(busId);

    const res = await getBus({ id });
    setBusId(id);
    setNumberOfSeats(res.seats);

    setSelectedType(res.type === "2+1" ? 1 : 2);
    const findFee = getAllVoyages.find((item: any) => item.id === voyageId).fee;
    setFee(findFee);
  };

  const onSubmit = async (data: any) => {
    const res = await getVoyage({
      from: data.from.label,
      to: data.to.label,
    });
    console.log("res", res);

    const newVoyage = res?.map((item: any) => {
      console.log("item", item);
      const voyageDate = item?.day?.split(" ");
      console.log(voyageDate);
      const voyageDate1 = voyageDate[0].split(".");
      console.log(voyageDate1);
      const voyageDate2 =
        voyageDate1[2] + "-" + voyageDate1[1] + "-" + voyageDate1[0];

      return {
        voyageId: item.id,
        busId: item.buses.map((bus: any) => bus.id)[0],
        title: item.buses.map((bus: any) => bus.brand)[0],
        start: voyageDate2 + "T" + voyageDate[1],
      };
    });
    setVoyages(newVoyage);
  };

  return (
    <>
      <Grid container marginTop="12rem">
        <Grid
          container
          item
          xs={6}
          alignItems="center"
          direction="column"
          height="70rem"
        >
          <VoyageList
            allVoyages={getAllVoyages}
            allLocation={getAllLocations}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            formState={formState}
            control={control}
            resetField={resetField}
            setValue={setValue}
            voyages={voyages}
            handleEventClick={(data: any) => handleEventClick(data)}
          />
        </Grid>
        <Grid
          item
          xs={6}
          container
          justifyContent="flex-start"
          flexDirection="column"
          sx={{
            height: "fit-content",
          }}
        >
          <DefineBusModel
            numberOfSeats={numberOfSeats}
            type={selectedType}
            setNumberOfSeats={setNumberOfSeats}
            onClickSeat={(data) => onClickSeat(data)}
            height="50rem"
          />
          <Grid container item xs={6} bgcolor="primary.main">
            <Typography fontSize="1.6rem">Koltuk Seçimi</Typography>
          </Grid>
        </Grid>
      </Grid>
      <BuyTicketModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        seatNumber={selectedSeat}
        price={fee}
      />
    </>
  );
}
