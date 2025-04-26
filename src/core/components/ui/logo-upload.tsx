import { useState } from "react";
import {
  CloudArrowUpIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useFormContext } from "react-hook-form";

interface LogoUploadProps {
  title: string;
  label: string;
  inputName: string;
  acceptFormats?: string;
}

const LogoUpload = ({
  title,
  label,
  inputName,
  acceptFormats = "image/*",
}: LogoUploadProps) => {
  const { setValue, register } = useFormContext(); // Hook de react-hook-form
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Guardar el archivo en react-hook-form para enviarlo en FormData
      setValue(inputName, file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setValue(inputName, null); // Eliminar el archivo del formulario
  };

  return (
    <div className="flex flex-col gap-4 p-4 border border-accent rounded-lg shadow-sm bg-secondary dark:bg-secondary-dark">
      <div className="flex items-center gap-4">
        {preview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Vista previa del logo"
              className="w-16 h-16 object-contain border rounded-lg"
            />
            <button
              type="button"
              onClick={removeImage}
              className="ml-2 p-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center w-16 h-20 border border-accent rounded-lg bg-background-alt dark:bg-background-dark-alt">
            <CloudArrowUpIcon className="w-8 h-8 text-gray-500 dark:text-gray-300" />
          </div>
        )}
        <div className="flex flex-col">
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
        <div className="ml-auto">
          <label
            htmlFor={inputName}
            className=" text-sm font-semibold text-white rounded-lg cursor-pointer "
          >
            <div className="text-center px-4 py-2 bg-primary hover:bg-primary-hover rounded-lg">
              Agregar foto
            </div>
          </label>
          <input
            id={inputName}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept={acceptFormats}
            {...register}
          />
        </div>
      </div>
    </div>
  );
};

export default LogoUpload;
