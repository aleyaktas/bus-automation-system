import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string, number, array, InferType, TypeOf } from "yup";
import DefineVoyageForm from "../../components/DefineVoyageForm/DefineVoyageForm";
import VoyageDatePicker from "../../components/VoyageDatePicker/VoyageDatePicker";
import instance, { serverSideConfig } from "../../utils/axios";
import { addVoyage, deleteVoyage, getLocations, getVoyages } from "../api";
import substractDate from "../../utils/substractDate";
import VoyageDetailModal from "../../components/modals/VoyageDetailModal/VoyageDetailModal";

export const getServerSideProps = async (context: any) => {
  try {
    const res = await instance.get("/api/busses/", serverSideConfig(context));
    const resLocation = await instance.get(
      "/api/locations/",
      serverSideConfig(context)
    );
    const resVoyages = await instance.get(
      "/api/voyage/",
      serverSideConfig(context)
    );
    return {
      props: {
        getAllBus: res.data.data,
        getAllLocations: resLocation.data.data,
        getAllVoyages: resVoyages.data.data,
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

interface BusDataProps {
  getAllBus: object;
  getAllLocations: object;
  getAllVoyages: object;
  err: string;
}

interface VoyageDataProps {
  ID: number;
  id?: number;
  Name?: string;
  Value?: string;
  value?: string;
}

const schema = object({
  plate: object().shape({
    id: number(),
    label: string().required("Plaka seçilmesi zorunludur"),
  }),
  seatPrice: number()
    .default(20)
    .min(20)
    .required("Koltuk ücreti girilmesi zorunludur")
    .typeError("Koltuk ücreti girilmesi zorunludur"),
  date: string().required("Tarih seçilmesi zorunludur"),
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

export default function DefineVoyage({
  getAllBus,
  getAllLocations,
  getAllVoyages,
}: BusDataProps) {
  const { register, handleSubmit, formState, control, resetField, setValue } =
    useForm<FormValues>({
      resolver: yupResolver(schema),
    });
  const { errors } = formState;
  const [voyageList, setVoyageList] = useState<any>(getAllVoyages);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [busId, setBusId] = useState<number>(0);
  const [voyageId, setVoyageId] = useState<number>(0);
  const [soldSeats, setSoldSeats] = useState<any>([]);
  const [voyageDate, setVoyageDate] = useState<string>("");
  const [numberEmptySeats, setNumberEmptySeats] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleEventClick = async (event: any) => {
    const findVoyage = Object.values(getAllVoyages).find(
      (item: any) => item.id === event.voyageId
    );
    setVoyageId(event.voyageId);

    setVoyageDate(findVoyage?.day);
    const seatCount = findVoyage?.buses[0]?.seats[0]?.count;

    setSoldSeats(findVoyage?.buses[0]?.seats[0]?.seat_properties?.length);
    setNumberEmptySeats(
      seatCount - findVoyage?.buses[0]?.seats[0]?.seat_properties?.length
    );
    setTotalPrice(
      findVoyage?.fee *
        (seatCount - findVoyage?.buses[0]?.seats[0]?.seat_properties?.length)
    );
  };

  const handleDeleteVoyage = async () => {
    await deleteVoyage({ id: voyageId });
    const newObj = await getVoyages();
    setVoyageList(newObj);
  };

  const onSubmit = async (data: FormValues) => {
    const findBus = Object.values(getAllBus).find(
      (bus: any) => bus.plate_number === data.plate.label
    );
    const convertDate = data.date.split(" ");
    const convertDate1 = convertDate[0].split(".");
    const convertDate2 =
      convertDate1[2] +
      "-" +
      convertDate1[1] +
      "-" +
      convertDate1[0] +
      " " +
      convertDate[1];

    await addVoyage({
      bus_id: findBus.id,
      from: data.from.label,
      to: data.to.label,
      fee: data.seatPrice,
      date: convertDate2,
    });
    const newObj = await getVoyages();
    setVoyageList(newObj);
  };

  const allVoyages = Object.values(voyageList)?.map((item: any) => {
    const voyageDate = item?.day?.split(" ");

    return {
      voyageId: item.id,
      busId: item.buses.map((bus: any) => bus.id)[0],
      title: item.buses.map((bus: any) => bus.brand)[0],
      start: voyageDate[0] + "T" + voyageDate[1],
    };
  });

  return (
    <>
      <Grid container marginTop="10rem">
        <Grid item xs={6} alignItems="center">
          <DefineVoyageForm
            allBuses={getAllBus}
            allLocations={getAllLocations}
            register={register}
            errors={errors}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </Grid>
        <Grid item xs={6} container justifyContent="flex-start">
          <VoyageDatePicker
            setIsOpenModal={setIsOpenModal}
            voyages={allVoyages}
            handleEventClick={(data: any) => handleEventClick(data)}
          />
        </Grid>
      </Grid>
      <VoyageDetailModal
        voyageDate={voyageDate}
        numberEmptySeats={numberEmptySeats}
        totalPrice={totalPrice}
        soldSeats={soldSeats}
        isOpen={isOpenModal}
        handleDeleteVoyage={handleDeleteVoyage}
        setIsOpen={setIsOpenModal}
      />
    </>
  );
}
