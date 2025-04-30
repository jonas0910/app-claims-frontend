/* eslint-disable react/display-name */
"use client";
import { Button, Card, EmailField, TextField } from "@/core/components/ui";
import { FormProvider, useForm } from "react-hook-form";
import { UserSchemaInputsType } from "../models/user-schema";
import { User, UserPut } from "../types/user";
import useUserUpdate from "../hooks/use-user-update";
import LogoUploadInput from "@/modules/selection-pages/components/ui/logo-upload-input";
import buildFormData from "@/core/helpers/build-form-data";
import { useModal } from "@/core/hooks/utils/use-modal";
import { forwardRef, useImperativeHandle } from "react";

interface UserEditFormProps {
  user: User;
}

const UserEditForm = forwardRef(
  ({ user }: UserEditFormProps, ref: React.Ref<unknown>) => {
    const form = useForm<UserSchemaInputsType>({
      defaultValues: {
        name: user.name,
        email: user.email,
  
        company_ruc: user.company_ruc,
        company_name: user.company_name,
        company_address: user.company_address,
        company_postal_code: user.company_postal_code,
        company_link: user.company_link,
        company_logo: user.company_logo,
      },
    });
  
  
    const { updateUserFn, isPending } = useUserUpdate();
    const { closeModal } = useModal();
  
    const onSubmit = async (data: UserSchemaInputsType) => {
      const userToSend = {
        name: data.name,
        email: data.email,
  
        company_ruc: data.company_ruc,
        company_name: data.company_name,
        company_address: data.company_address,
        company_postal_code: data.company_postal_code,
        company_link: data.company_link,
        // company_logo: data.company_logo[0],
      } as Partial<UserPut>;
      
      const logo = data.company_logo?.[0];
      if (logo instanceof File) {
        userToSend.company_logo = logo;
      }
  
      const formData = buildFormData(userToSend);
      try {
        const res = await updateUserFn({ data: formData });
        if (res.status === 200 || res.status === 201) {
          
          closeModal({
            elementById: "user-edit-form",
          });
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    };

    useImperativeHandle(ref, () => ({
      resetForm: () => form.reset(), // o form.reset(newDefaults)
    }));
    return (
      <Card title="Editar Usuario" className="w-full">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <TextField label="Nombre" inputName="name" />
                </div>
                <div className="flex-1">
                  <EmailField label="Email" inputName="email" />
                </div>
              </div>
  
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <TextField label="RUC" inputName="company_ruc" />
                </div>
                <div className="flex-1">
                  <TextField
                    label="Nombre de la empresa"
                    inputName="company_name"
                  />
                </div>
              </div>
  
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <TextField
                    label="Dirección de la empresa"
                    inputName="company_address"
                  />
                </div>
                <div className="flex-1">
                  <TextField
                    label="Código postal"
                    inputName="company_postal_code"
                  />
                </div>
              </div>
  
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <TextField
                    label="Link de la empresa"
                    inputName="company_link"
                  />
                </div>
                <div className="flex-1">
                  <LogoUploadInput
                    title="Logo de la empresa"
                    label="Logo de la empresa"
                    inputName="company_logo"
                    initialPreview={user.company_logo as string}
                    key={crypto.randomUUID()}
                  />
                </div>
              </div>
            </div>
  
            <div>
              <Button>{isPending ? "Guardando..." : "Guardar"}</Button>
            </div>
          </form>
        </FormProvider>
      </Card>
    );
  }
);

export default UserEditForm;
