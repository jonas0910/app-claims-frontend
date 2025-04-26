"use client";
import { Fragment } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import { Button, Card, SelectWithSearch } from "@/core/components/ui";
import { useParams, useRouter } from "next/navigation";
// import { getCompanyLogo } from '@/core/helpers/company_logos'
import { useSelectionPageWithCompany } from "../hooks/use-selection-page-with-company";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingIcon } from "@/core/components/icons";

export const selectionPageSchema = z.object({
  establishment: z.string({
    message: "Debe seleccionar un establecimiento",
  }),
});

type selectionPageInputsType = z.infer<typeof selectionPageSchema>;

const SelectionPage = () => {
  const form = useForm<selectionPageInputsType>({
    mode: "all",
    resolver: zodResolver(selectionPageSchema),
  });

  const params = useParams<{ id: string; link_selection_page: string }>();

  // const logo = getCompanyLogo({ companyId: Number(params.id), usePdf: false })

  const logo = "/28542127_7459345.svg";
  const { selectionPageWithCompany, isLoading } = useSelectionPageWithCompany(
    params.link_selection_page,
    params.id
  );

  const router = useRouter();
  const onSubmit = async (data: selectionPageInputsType) => {
    router.push(
      `/reclamo-virtual/${selectionPageWithCompany?.user.id}/${data.establishment}`
    );
  };
  return (
    <Fragment>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingIcon className="animate-spin h-10 w-10 text-primary" />

          <p className="text-gray-500 text-lg ml-4">Cargando...</p>
        </div>
      ) : (
        <div className="py-10 xl:px-96 lg:px-60 md:px-10">
          <div className="flex justify-center flex-col px-10 bg-white/80 border-2 rounded-md border-gray-300 shadow-md">
            <div>
              <div className="w-[150px] h-[150px] bg-white rounded-full flex items-center justify-center mx-auto mt-10">
                {selectionPageWithCompany?.page.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selectionPageWithCompany?.page.logo_url}
                    alt="Foto"
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    src={logo}
                    width={140}
                    height={140}
                    alt="Foto"
                    className="rounded-full"
                  />
                )}
              </div>

              {selectionPageWithCompany?.page.brand_name ? (
                <>
                  <p className="font-bold text-2xl mt-5 text-center">
                    {selectionPageWithCompany?.page.brand_name}
                  </p>
                  <p className="text-center">
                    {selectionPageWithCompany?.user.company_name}
                  </p>
                </>
              ) : (
                <p className="font-bold text-2xl mt-5 text-center">
                  {selectionPageWithCompany?.user.company_name}
                </p>
              )}
              <p className="text-center">
                RUC: {selectionPageWithCompany?.user.company_ruc}
              </p>
            </div>
            <div>
              <h1 className="font-bold text-4xl mt-10 text-center">
                Libro de reclamaciones
              </h1>
            </div>

            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mx-auto w-full py-10">
                  <Card title="Seleccione el establecimiento" className="my-5">
                    <div>
                      <SelectWithSearch
                        label="Establecimientos"
                        inputName="establishment"
                        // inputError={form.formState.errors.document_type}
                        options={selectionPageWithCompany?.page?.establishments.map(
                          (establishment) => ({
                            label: establishment.name,
                            value: establishment.custom_link,
                          })
                        )}
                        inputError={form.formState.errors.establishment}
                      />
                    </div>
                  </Card>

                  <div className="flex justify-center my-10">
                    <Button type="submit">
                      <p className="text-lg">Continuar</p>
                    </Button>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500">
                      {selectionPageWithCompany?.user.company_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      RUC: {selectionPageWithCompany?.user.company_ruc}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectionPageWithCompany?.user.company_address}
                    </p>
                  </div>
                  <p className="p-2 text-sm text-gray-500 justify-items-stretch text-justify my-5">
                    La formulación del reclamo no impide acudir a otras vías de
                    solución de controversias ni es requisito previo para
                    interponer una denuncia ante el INDECOPI. El proveedor debe
                    dar respuesta al reclamo o queja en un plazo no mayor a
                    quince (15) días hábiles, el cual es improrrogable.
                  </p>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SelectionPage;
