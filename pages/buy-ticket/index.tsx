import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Typography } from "@mui/material";
import { GetServerSideProps } from "next/types";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { object, string, number, array, InferType, TypeOf } from "yup";
import DefineBusModel from "../../components/DefineBusModel/DefineBusModel";
import BuyTicketModal from "../../components/modals/BuyTicketModal/BuyTicketModal";
import VoyageList from "../../components/VoyageList/VoyageList";
import instance, { serverSideConfig } from "../../utils/axios";
import { buyTicket, getBus, getVoyage, getVoyages } from "../api";

export const getServerSideProps: GetServerSideProps = async (context) => {
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
  to: object()
    .shape({
      id: number(),
      label: string().required("Nereye gidileceğinin seçilmesi zorunludur"),
    })
    //if from value is equal to to value, return error
    .test("from-to", "Nereden ve nereye aynı olamaz", function (value) {
      return this.parent.from.label !== value.label;
    }),
});

type FormValues = InferType<typeof schema>;

export default function BuyTicket({ getAllVoyages, getAllLocations }: any) {
  const { register, handleSubmit, formState, control, resetField, setValue } =
    useForm<FormValues>({
      resolver: yupResolver(schema),
    });

  const [numberOfSeats, setNumberOfSeats] = useState(20);
  const [fee, setFee] = useState(0);
  const [selectedSeat, setSelectedSeat] = useState<any>();
  const [selectedType, setSelectedType] = useState(2);
  const [voyages, setVoyages] = useState<any>();
  const [voyageId, setVoyageId] = useState(0);
  const [updateVoyages, setUpdateVoyages] = useState<any>(getAllVoyages);
  const [soldSeats, setSoldSeats] = useState<any>([]);
  const [busId, setBusId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const onClickSeat = (data: any) => {
    if (busId === 0 || voyageId === 0) return alert("Lütfen otobüs seçiniz");
    setSelectedSeat(data);
    setIsOpen(true);
    const findBus = Object.values(getAllVoyages);
  };

  const handleEventClick = async (event: any) => {
    const { busId, voyageId } = event;
    const id = parseInt(busId);
    const res = await getBus({ id: busId });
    setBusId(busId);
    setVoyageId(voyageId);
    setNumberOfSeats(res.seats);
    setSelectedType(res.type === "2+1" ? 1 : 2);
    const findFee = getAllVoyages.find((item: any) => item.id === voyageId).fee;
    setFee(findFee);
  };

  useEffect(() => {
    findBus();
  }, [busId]);

  const findBus = async () => {
    const voyages = await getVoyages();
    const allSoldSeats = voyages
      .find((item: any) => item.buses[0].id === busId)
      ?.buses[0]?.seats[0]?.seat_properties?.map((item: any) => {
        return {
          no: item.no,
          gender: item.gender,
        };
      });

    setSoldSeats(allSoldSeats);
  };

  const onSubmit = async (data: any) => {
    const res = await getVoyage({
      from: data.from.label,
      to: data.to.label,
    });

    const newVoyage = res?.map((item: any) => {
      if (item && item.buses.length <= 0) return;
      if (item && item.buses.length > 0) {
        const voyageDate = item?.day?.split(" ");

        return {
          voyageId: item.id,
          busId: item.buses?.map((bus: any) => bus.id)[0],
          title: item.buses?.map((bus: any) => bus.brand)[0],
          start: voyageDate[0] + "T" + voyageDate[1],
        };
      }
    });

    setVoyages(newVoyage);
  };
  const handleBuyTicket = async (data: any) => {
    await buyTicket({
      bus_id: busId,
      travel_id: voyageId,
      seat_number: data.seatNumber,
      gender:
        data.gender === "Erkek"
          ? true
          : data.gender === "Kadın"
          ? false
          : undefined,
    });
    setIsOpen(false);
    findBus();
  };

  return (
    <>
      <Grid container marginTop="10rem">
        <Grid container item xs={6} alignItems="center" direction="column">
          <VoyageList
            allVoyages={getAllVoyages}
            allLocation={getAllLocations}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
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
        <Grid item xs={6} container justifyContent="flex-start">
          <DefineBusModel
            numberOfSeats={numberOfSeats}
            type={selectedType}
            soldSeats={soldSeats}
            setNumberOfSeats={setNumberOfSeats}
            onClickSeat={(data) => onClickSeat(data)}
          />
        </Grid>
      </Grid>
      <BuyTicketModal
        buyTicketButton={(data) => handleBuyTicket(data)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        seatNumber={selectedSeat}
        price={fee}
      />
    </>
  );
}
