"use client";
import {
  Button,
  Card,
  EmailField,
  NumberField,
  OptionRadioField,
  SelectWithSearch,
  TelephoneField,
  Textarea,
  TextField,
} from "@/core/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { Fragment, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ClaimInputsType, claimSchema } from "../models/claim-schema";
import { ClaimPost } from "../../claims-list/types/claim";
import { useEstablishmentWithCompany } from "../hooks/use-establishment-with-company";
import Image from "next/image";
// import { getCompanyLogo } from '@/core/helpers/company_logos'
import { useCreateClaim } from "../hooks/use-create-claim";
import { useCurrencyTypes } from "@/core/hooks/requests/global/use-currency-types";
import { useDocumentTypes } from "@/core/hooks/requests/global/use-document-types";
import { useDocumentTypeById } from "@/core/hooks/requests/global/use-document-type-by-id";
import { LoadingIcon } from "@/core/components/icons";

const ClaimForm = () => {
  const form = useForm<ClaimInputsType>({
    mode: "all",
    resolver: zodResolver(claimSchema),
    defaultValues: {
      under_age: "No",
      claim_yesno: "No",
      accept_terms: undefined,
    },
  });

  const params = useParams<{ id: string; link_establishment: string }>();

  const logo = "/28542127_7459345.svg";
  const { establishmentWithCompany, isLoading: isEstablishmentLoading } =
    useEstablishmentWithCompany(params.link_establishment, params.id);

  const { currencyTypesToSelect, isLoading: isCurrencyLoading } =
    useCurrencyTypes();
  const { documentTypesToSelect, isLoading: isDocumentTypesLoading } =
    useDocumentTypes();
  const { createClaimFn, isPending } = useCreateClaim();

  const onSubmit = async (data: ClaimInputsType) => {
    const claimToSend = {
      name: data.name,
      under_age: data.under_age === "Si" ? true : false,
      parent_name: data.parent_name,
      document_type_id: Number(data.document_type),
      document_number: data.document_number,
      email: data.email,
      phone: data.phone,
      type_asset: data.type_asset,
      description_asset: data.description_asset,
      currency_type_id: Number(data.currency_type),
      claim_mount: Number(data.claim_mount),
      claim_type: data.claim_type,
      claim_text: data.claim_text,
      request_text: data.request_text,

      establishment_id: establishmentWithCompany?.establishment.id,
      user_id: establishmentWithCompany?.user.id,
    } as ClaimPost;

    const resp = await createClaimFn(claimToSend);

    if (resp.status === 201 || resp.status === 200) {
      form.reset();
    } else {
      console.log("Error al crear el reclamo");
    }
  };

  const { watch, setValue } = form;
  const selectedUnderAge = watch("under_age");
  const selectedClaimMount = watch("claim_yesno");
  const selectedDocumentType = watch("document_type");

  const { documentType, isLoading } = useDocumentTypeById(selectedDocumentType);

  const maxLength = documentType?.character_count ?? 24;

  useEffect(() => {
    if (selectedUnderAge) {
      setValue("under_age", selectedUnderAge);
    }
    if (selectedClaimMount) {
      setValue("claim_yesno", selectedClaimMount);
    }
  }, [selectedUnderAge, selectedClaimMount, setValue]);

  useEffect(() => {
    setValue("document_number", "");
  }, [selectedDocumentType, setValue]);
  return (
    <Fragment>
      {isEstablishmentLoading ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingIcon className="animate-spin h-10 w-10 text-primary" />

          <p className="text-gray-500 text-lg ml-4">Cargando...</p>
        </div>
      ) : establishmentWithCompany ? (
        <>
          <div className="py-10 xl:px-96 lg:px-60 md:px-10">
            <div className="flex justify-center flex-col px-10 bg-white/80 border-2 rounded-md border-gray-300 shadow-md">
              <div>
                <div className="w-[150px] h-[150px] bg-white rounded-full flex items-center m-auto justify-center mt-10">
                  <Image
                    src={logo}
                    width={140}
                    height={140}
                    alt="Foto"
                    className="rounded-full"
                  />
                </div>

                <p className="font-bold text-2xl mt-5 text-center">
                  {establishmentWithCompany?.user.company_name}
                </p>
                <p className="text-center">
                  RUC: {establishmentWithCompany?.user.company_ruc}
                </p>
              </div>
              <div>
                <h1 className="font-bold text-4xl text-center mt-10">
                  Libro de reclamaciones
                </h1>
                <p className="text-center">
                  Codigo de identificación:{" "}
                  {establishmentWithCompany?.establishment.code}
                </p>
                <p className="font-bold text-2xl mt-10 text-center">
                  {establishmentWithCompany?.establishment.name}
                </p>
                <p className="text-center">
                  {establishmentWithCompany?.establishment.address}
                </p>
              </div>

              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="mx-auto w-full">
                    <Card title="Consumidor reclamante" className="my-5">
                      <div>
                        <TextField
                          label="Nombre"
                          inputName="name"
                          className="mb-5"
                          inputError={form.formState.errors.name}
                        />
                        <OptionRadioField
                          options={["Si", "No"]}
                          inputName="under_age"
                          question={"Soy menor de edad"}
                        />
                        {selectedUnderAge === "Si" && (
                          <div className="mt-5">
                            <TextField
                              label="Nombre del padre, madre o tutor"
                              inputName="parent_name"
                              inputError={form.formState.errors.parent_name}
                            />
                          </div>
                        )}
                        <div className="flex flex-row gap-4 my-5">
                          <SelectWithSearch
                            label="Tipo de documento"
                            inputName="document_type"
                            options={documentTypesToSelect}
                            isLoading={isDocumentTypesLoading}
                            inputError={form.formState.errors.document_type}
                          />

                          <TextField
                            label="Número de documento"
                            inputName="document_number"
                            inputError={form.formState.errors.document_number}
                            maxLength={maxLength}
                            disabled={isLoading || !selectedDocumentType}
                          />
                        </div>
                        <EmailField
                          label="Correo electrónico"
                          inputName="email"
                          inputError={form.formState.errors.email}
                        />
                        <TelephoneField
                          label="Teléfono"
                          inputName="phone"
                          inputError={form.formState.errors.phone}
                        />
                      </div>
                    </Card>
                    <Card title="Bien contratado" className="my-5">
                      <div>
                        <SelectWithSearch
                          label="Tipo de bien contratado"
                          inputName="type_asset"
                          options={[
                            { value: "Producto", label: "Producto" },
                            { value: "Servicio", label: "Servicio" },
                          ]}
                          inputError={form.formState.errors.type_asset}
                        />
                        <TextField
                          label="Descripción del producto o servicio"
                          inputName="description_asset"
                          className="mb-5"
                          inputError={form.formState.errors.description_asset}
                        />
                        <OptionRadioField
                          options={["Si", "No"]}
                          inputName="claim_yesno"
                          question={
                            "Deseo reclamar un monto por \nel producto o servicio"
                          }
                        />
                        {selectedClaimMount === "Si" && (
                          <div className="mt-5 flex flex-row gap-4">
                            <SelectWithSearch
                              label="Monto reclamado (moneda)"
                              inputName="currency_type"
                              options={currencyTypesToSelect}
                              isLoading={isCurrencyLoading}
                              inputError={form.formState.errors.currency_type}
                            />
                            <NumberField
                              label="Monto reclamado"
                              inputName="claim_mount"
                              inputError={form.formState.errors.claim_mount}
                            />
                          </div>
                        )}
                      </div>
                    </Card>
                    <Card title="Reclamación y pedido" className="my-5">
                      <div>
                        <SelectWithSearch
                          label="Tipo de reclamación"
                          inputName="claim_type"
                          options={[
                            { value: "queja", label: "Queja" },
                            { value: "reclamo", label: "Reclamo" },
                          ]}
                          inputError={form.formState.errors.claim_type}
                        />
                        <Textarea
                          label="¿Cual es su reclamación?"
                          inputName="claim_text"
                          inputError={form.formState.errors.claim_text}
                        />
                        <Textarea
                          label="¿Cual es su pedido?"
                          inputName="request_text"
                          inputError={form.formState.errors.request_text}
                        />
                      </div>
                    </Card>

                    <p className="text-sm p-2 text-gray-500 justify-items-stretch text-justify my-5">
                      Al enviar esta reclamación, usted acepta y consiente
                      expresamente que sus datos personales serán tratados para
                      gestionar su reclamación, conforme a nuestras políticas de
                      privacidad y las leyes peruanas aplicables, incluyendo la
                      Ley N° 29733. Nos comprometemos a tratar estos datos con
                      la máxima confidencialidad y seguridad. Para más
                      información, consulte nuestra política de privacidad y
                      nuestros términos y condiciones.
                    </p>

                    <div>
                      <OptionRadioField
                        options={["Si", "No"]}
                        inputName={"accept_terms"}
                        question={
                          "He leído y acepto el tratamiento de mis datos personales según lo descrito."
                        }
                      />
                      <p className="text-sm text-red-400">
                        {form.formState.errors.accept_terms?.message}
                      </p>
                    </div>

                    <div className="flex justify-center my-5">
                      <Button type="submit" disabled={isPending}>
                        <p className="text-lg">
                          {isPending ? "Enviando..." : "Enviar reclamación"}
                        </p>
                      </Button>
                    </div>

                    <p className="text-sm text-gray-500 justify-items-stretch text-justify rounded-lg p-5 mt-5 mb-10 border-gray-300 border-solid border-2">
                      ¿Qué sucede después de enviar su reclamación? La empresa
                      recibirá su reclamación y comenzará a procesarla. Usted
                      recibirá un correo electrónico de confirmación con un
                      código de seguimiento para monitorizar el estado de su
                      reclamación. La empresa responderá a su reclamación en un
                      plazo máximo de 15 días hábiles conforme a la Ley N°
                      29571.
                    </p>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </>
      ) : (
        <div>No se encontró esta página de reclamo</div>
      )}
    </Fragment>
  );
};

export default ClaimForm;
