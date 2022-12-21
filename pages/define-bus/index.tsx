import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import instance, { serverSideConfig } from "../../utils/axios";
import { object, string, number, array, InferType, TypeOf } from "yup";
import { addBusModel, editBusModel, getModel } from "../api";
import styleFn from "./DefineBus.styles";
import DefineBusForm from "../../components/DefineBusForm/DefineBusForm";
import DefineBusModel from "../../components/DefineBusModel/DefineBusModel";

interface DefineBusProps {
  getAllDefineBus: object;
  err: string;
}

interface BusDataProps {
  id: number;
  name: string;
}
interface BrandProps {
  id: number;
  label: string;
}

interface DefineBusDataProps {
  brands: Array<string>;
  types: Array<string>;
  properties: Array<string>;
  models: Array<string>;
}

export const getServerSideProps = async (context: any) => {
  try {
    const res = await instance.get(
      "/api/bus-definition",
      serverSideConfig(context)
    );
    return {
      props: {
        getAllDefineBus: res.data,
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
  plate: string()
    .required("Plaka girilmesi zorunludur")
    .matches(
      /^([0-8][0-1]|[0-8][0-1][0-9]|[0-8][0-1][0-9][0-9])\s[A-Z]{1,3}\s([0-9]{2,4})$/,
      "Plaka formatı uygun değil"
    )
    .test("plate", "Plaka formatı uygun değil", (value) => {
      if (value === undefined) return false;
      const plate = value.split(" ");
      if (plate[1]?.length === 1 && plate[2].length !== 4) return false;
      if (
        plate[1]?.length === 2 &&
        plate[2]?.length !== 3 &&
        plate[2]?.length !== 4
      )
        return false;
      if (plate[1]?.length === 3 && plate[2]?.length !== 2) return false;
      return true;
    }),
  brand: object().shape({
    id: number(),
    label: string().required("Marka girilmesi zorunludur"),
  }),
  model: object().shape({
    id: number(),
    label: string().required("Model girilmesi zorunludur"),
  }),

  seatCount: number()
    .default(20)
    .required("Koltuk sayısı girilmesi zorunludur")
    .typeError("Koltuk sayısı girilmesi zorunludur")
    // multiple of 3 or 4
    .test(
      "seatCount",
      "Koltuk sayısı 3 veya 4 ile tam bölünmelidir",
      (value) => value % 3 === 0 || value % 4 === 0
    ),

  type: object()
    .shape({
      id: number(),
      label: string().required("Tip girilmesi zorunludur"),
    })
    .test("type", "Tip girilmesi zorunludur", function (value: any) {
      return value.label === undefined ? false : true;
    })
    .test(
      "seatCount",
      "Koltuk sayısı ile tip uyumlu olmalıdır",
      function (value: any) {
        return this.parent.seatCount % 3 === 0 &&
          this.parent.seatCount % 4 !== 0
          ? value.label === "2+1"
          : this.parent.seatCount % 4 === 0 && this.parent.seatCount % 3 !== 0
          ? value.label === "2+2"
          : this.parent.seatCount % 4 === 0 && this.parent.seatCount % 3 === 0
          ? value.label === "2+1" || value.label === "2+2"
          : false;
      }
    )
    .typeError("Tip girilmesi zorunludur"),

  properties: array().min(1, "Özellik girilmesi zorunludur"),
});

type FormValues = InferType<typeof schema>;

export default function DefineBus({ getAllDefineBus, err }: DefineBusProps) {
  const [selectedType, setSelectedType] = useState<number>(2);

  const { register, handleSubmit, formState, control, resetField, setValue } =
    useForm<FormValues>({
      resolver: yupResolver(schema),
    });
  const [isSuccess, setIsSuccess] = useState(false);
  const [busId, setBusId] = useState(-1);

  const { fields } = useFieldArray({
    control,
    name: "properties",
  });

  const { errors } = formState;

  const [selectedBrand, setSelectedBrand] = useState<BrandProps>({
    id: -1,
    label: "",
  });
  const [numberOfSeats, setNumberOfSeats] = useState(20);

  useEffect(() => {
    setValue("seatCount", numberOfSeats);
  }, [numberOfSeats]);

  const findModel = async (id: number) => {
    const model = await getModel({ id: id });

    if (model) {
      setDefineBusData((prev) => {
        return {
          ...prev,
          models: model?.model?.map((item: BusDataProps) => {
            return {
              id: item.id,
              label: item.name,
            };
          }),
        };
      });
    }
  };
  useEffect(() => {
    if (selectedBrand) {
      selectedBrand?.id !== -1 && findModel(selectedBrand?.id);
    } else {
      setSelectedBrand({
        id: -1,
        label: "",
      });

      setDefineBusData((prev) => {
        return {
          ...prev,
          models: [],
        };
      });
      setValue("model", {
        id: -1,
        label: "",
      } as any);
      resetField("model");
    }
  }, [selectedBrand]);

  const [defineBusData, setDefineBusData] = useState<DefineBusDataProps>({
    brands: Object?.entries(getAllDefineBus)[0][1].map((item: BusDataProps) => {
      return {
        id: item.id,
        label: item.name,
      };
    }),
    properties: Object?.entries(getAllDefineBus)[1][1].map(
      (item: BusDataProps) => {
        return {
          id: item.id,
          label: item.name,
        };
      }
    ),
    types: Object?.entries(getAllDefineBus)[2][1].map((item: BusDataProps) => {
      return {
        id: item.id,
        label: item.name,
      };
    }),
    models: [] as Array<any>,
  });
  console.log(defineBusData);

  const onSubmit = async (data: FormValues) => {
    var res;
    {
      isSuccess && busId !== -1
        ? (res = await editBusModel({
            plate_number: data.plate,
            model_id: data.model?.id,
            id: busId,
            number_of_seats: numberOfSeats,
            type: data.type.id,
            properties: data?.properties?.map((item) => {
              return {
                id: item.id,
              };
            }),
          }))
        : (res = await addBusModel({
            plate_number: data.plate,
            model_id: data.model?.id,
            number_of_seats: numberOfSeats,
            type: data.type.id,
            properties: data?.properties?.map((item) => {
              return {
                id: item.id,
              };
            }),
          }));
    }
    res && res.message === "Bus created" && setIsSuccess(true);
    res && res.message === "Bus created" && setBusId(res.bus?.id);
  };

  return (
    <Grid container marginTop="10rem">
      <Grid item xs={6} alignItems="center">
        <DefineBusForm
          register={register}
          errors={errors}
          control={control}
          setSelectedBrand={setSelectedBrand}
          defineBusData={defineBusData}
          selectedBrand={selectedBrand}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isSuccess={isSuccess}
          setNumberOfSeats={setNumberOfSeats}
          setSelectedType={setSelectedType}
          numberOfSeats={numberOfSeats}
        />
      </Grid>
      <Grid item xs={6} container justifyContent="flex-start">
        <DefineBusModel
          numberOfSeats={numberOfSeats}
          type={selectedType}
          setNumberOfSeats={setNumberOfSeats}
        />
      </Grid>
    </Grid>
  );
}
