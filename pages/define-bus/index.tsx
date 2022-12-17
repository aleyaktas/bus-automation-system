import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import instance, { serverSideConfig } from "../../utils/axios";
import { object, string, number, array, InferType, TypeOf } from "yup";
import { addBusModel, getModel } from "../api";
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
  plate: string().required("Plaka girilmesi zorunludur"),
  brand: object().shape({
    id: number(),
    label: string().required("Marka girilmesi zorunludur"),
  }),
  model: object().shape({
    id: number(),
    label: string().required("Model girilmesi zorunludur"),
  }),
  seatCount: number()
    .required("Koltuk sayısı girilmesi zorunludur")
    .typeError("Koltuk sayısı girilmesi zorunludur"),
  type: object().shape({
    id: number(),
    label: string().required("Tip girilmesi zorunludur"),
  }),
  properties: array().min(1, "Özellik girilmesi zorunludur"),
});

type FormValues = InferType<typeof schema>;

export default function DefineBus({ getAllDefineBus, err }: DefineBusProps) {
  const { register, handleSubmit, formState, control, resetField, setValue } =
    useForm<FormValues>({
      resolver: yupResolver(schema),
    });

  const { fields } = useFieldArray({
    control,
    name: "properties",
  });

  const { errors } = formState;

  const [selectedBrand, setSelectedBrand] = useState<BrandProps>({
    id: -1,
    label: "",
  });

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

  const onSubmit = async (data: FormValues) => {
    data &&
      (await addBusModel({
        plate_number: data.plate,
        model_id: data.model?.id,
        number_of_seats: data.seatCount,
        type: data.type?.id,
        properties: data?.properties?.map((item) => {
          return {
            id: item.id,
            name: item.label,
          };
        }),
      }));
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
        />
      </Grid>
      <Grid item xs={6} container justifyContent="flex-start">
        <DefineBusModel />
      </Grid>
    </Grid>
  );
}
