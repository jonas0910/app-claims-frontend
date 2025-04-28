/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  EstablishmentInputsType,
  establishmentSchema,
} from "../models/establishment-schema";

import {
  Button,
  ButtonSelectOption,
  Card,
  NumberField,
  SelectWithSearch,
  TextField,
  TextFieldReadOnly,
} from "@/core/components/ui";
import { useEffect, useState } from "react";
import { EstablishmentGet, EstablishmentPostPut } from "../types/establishment";
import { useCreateEstablishment } from "../hooks/requests/use-create-establishment";
import { codigoAleatorio } from "../helpers/generate-code-establishment";
// import { useAuthSessionStore } from '@/core/store/auth/auth-session-store'
import { useUpdateEstablishment } from "../hooks/requests/use-update-establishment";
import { useModal } from "@/core/hooks/utils/use-modal";
import { getUbigeoStructure } from "../helpers/address_ubigeo";
import { ubigeoData } from "@/core/helpers/ubigeosData";

interface CreateEstablishmentFormProps {
  elementById: string;
  establishment?: EstablishmentGet | null;
}

const CreateEstablishmentForm = ({
  elementById,
  establishment,
}: CreateEstablishmentFormProps) => {
  const form = useForm<EstablishmentInputsType>({
    mode: "all",
    resolver: zodResolver(establishmentSchema),
    defaultValues: {
      name: establishment?.name ?? "",
      custom_link: establishment?.custom_link ?? "",
      type_address: establishment?.type_address === "Online" ? 0 : 1,
      department: establishment?.department ?? "",
      province: establishment?.province ?? "",
      district: establishment?.district ?? "",
      address: establishment?.address ?? "",
      zip_code: establishment?.zip_code ?? "",
      web_page: establishment?.web_page ?? "",
    },
  });

  // const { company } = useAuthSessionStore()
  const { createEstablishmentFn, isPending } = useCreateEstablishment();
  const { updateEstablishmentFn, isPending: isPendingUpdate } =
    useUpdateEstablishment();

  const { closeModal } = useModal();

  const { watch, setValue } = form;
  const selectedType = watch("type_address");

  useEffect(() => {
    if (selectedType) {
      setValue("type_address", selectedType);
    }
  }, [selectedType, setValue]);

  //para departamento, provincia y distrito
  const ubigeoSimplificado = getUbigeoStructure(ubigeoData);
  const [selectedDepartment, setSelectedDepartment] = useState<string>(
    form.watch("department") || ""
  );
  const [selectedProvince, setSelectedProvince] = useState<string>(
    form.watch("province") || ""
  );

  // Lista de departamentos
  const departamentos = Object.keys(ubigeoSimplificado);

  // Lista de provincias y distritos según selección
  const provincias = selectedDepartment
    ? Object.keys(ubigeoSimplificado[selectedDepartment] || {})
    : [];
  const distritos = selectedProvince
    ? ubigeoSimplificado[selectedDepartment]?.[selectedProvince] || []
    : [];

  const onSubmit = async (data: EstablishmentInputsType) => {
    const establishmentToSend = {
      name: data.name,
      custom_link: data.custom_link,
      type_address: data.type_address === 1 ? "Fisico" : "Online",
      code: codigoAleatorio(10),
      department: data.type_address === 1 ? data.department : null,
      province: data.type_address === 1 ? data.province : null,
      district: data.type_address === 1 ? data.district : null,
      address: data.type_address === 1 ? data.address : null,
      zip_code: data.type_address === 1 ? data.zip_code : null,
      web_page: data.type_address === 0 ? data.web_page : null,
      // company_id: company?.id
      user_id: 1,
    } as EstablishmentPostPut;

    let resp;
    if (elementById === "edit-establishment") {
      resp = await updateEstablishmentFn({
        data: establishmentToSend,
        id: establishment?.id!,
      });
    } else {
      resp = await createEstablishmentFn(establishmentToSend);
    }

    if (resp.status === 201 || resp.status === 200) {
      form.reset();
      closeModal({ elementById: "create-establishment" });
      closeModal({ elementById: "edit-establishment" });
    } else {
      console.log("Error al crear el establecimiento");
    }
  };

  return (
    <Card
      title={
        elementById === "create-establishment"
          ? "Crear Establecimiento"
          : "Actualizar Establecimiento"
      }
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-4 my-5">
            <TextField
              label="Nombre"
              inputName="name"
              inputError={form.formState.errors.name}
            />
            <TextField
              label="Link personalizado"
              inputName="custom_link"
              inputError={form.formState.errors.custom_link}
            />
          </div>
          {
            // Mostrar el código del establecimiento si es una edición
            elementById === "edit-establishment" && (
              <div>
                <TextFieldReadOnly
                  inputName="code"
                  label="Código de Establecimiento"
                  value={establishment?.code ?? ""}
                />
              </div>
            )
          }

          <div className="flex flex-row w-2/6 my-5">
            <ButtonSelectOption
              label="Tipo de Establecimiento"
              inputName="type_address"
              options={["Local Fisico", "Canal Online"]}
            />
          </div>
          {
            // Capturar el tipo de establecimiento seleccionado
            selectedType === 1 && (
              <>
                <div className="flex flex-row gap-4 my-5">
                  <SelectWithSearch
                    label="Departamento"
                    inputName="department"
                    options={departamentos.map((dep) => ({
                      value: dep,
                      label: dep,
                    }))}
                    onChange={(value) => {
                      setSelectedDepartment(value as string);
                      setSelectedProvince(""); // Resetear provincia al cambiar de departamento
                      form.setValue("department", value as string);
                      form.setValue("province", "");
                      form.setValue("district", "");
                      console.log("departamento", value);
                    }}
                    value={form.watch("department")}
                    inputError={form.formState.errors.department}
                  />

                  {/* Select de Provincia */}
                  <SelectWithSearch
                    label="Provincia"
                    inputName="province"
                    options={provincias.map((prov) => ({
                      value: prov,
                      label: prov,
                    }))}
                    onChange={(value) => {
                      setSelectedProvince(value as string);
                      form.setValue("province", value as string);
                      form.setValue("district", "");
                    }}
                    value={form.watch("province")}
                    inputError={form.formState.errors.province}
                    // isDisabled={!selectedDepartment}
                  />

                  {/* Select de Distrito */}
                  <SelectWithSearch
                    label="Distrito"
                    inputName="district"
                    options={distritos.map((dist) => ({
                      value: dist,
                      label: dist,
                    }))}
                    onChange={(value) =>
                      form.setValue("district", value as string)
                    }
                    value={form.watch("district")}
                    inputError={form.formState.errors.district}
                    // isDisabled={!selectedProvince}
                  />
                </div>
                <div className="flex flex-row gap-4 my-5">
                  <TextField
                    label="Dirección detallada"
                    inputName="address"
                    inputError={form.formState.errors.address}
                  />
                  <NumberField
                    label="Código Postal"
                    inputName="zip_code"
                    inputError={form.formState.errors.zip_code}
                  />
                </div>
              </>
            )
          }
          {
            // Capturar el tipo de establecimiento seleccionado
            selectedType === 0 && (
              <TextField
                label="Página web"
                inputName="web_page"
                className="mb-5"
                inputError={form.formState.errors.web_page}
              />
            )
          }

          <div className="flex justify-center">
            <Button type="submit" disabled={isPending || isPendingUpdate}>
              {elementById === "create-establishment"
                ? "Crear Establecimiento"
                : "Actualizar Establecimiento"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Card>
  );
};

export default CreateEstablishmentForm;
