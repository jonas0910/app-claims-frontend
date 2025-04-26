import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { useFormContext, Controller } from "react-hook-form";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale"; // 📌 Importa el idioma español

interface DateFieldByServiceProps {
  label: string;
  inputName: string;
}

const DateFieldByService = ({ inputName, label }: DateFieldByServiceProps) => {
  const { control } = useFormContext();
  const [, setSelectedDate] = useState<Date | null>(null);
  const datepickerRef = useRef<DatePicker | null>(null); // 📌 Referencia al DatePicker

  // 🔹 Permitir solo domingos (0) y martes (2)
  const isValidDay = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 2;
  };

  return (
    <div className="relative w-full flex flex-col gap-1">
      <label className="font-semibold text-text dark:text-text-dark">
        {label}
      </label>

      <div className="relative border text-text dark:text-text-dark bg-secondary dark:bg-secondary-dark border-accent rounded-md px-3 py-3 focus:outline-none focus:ring-1 focus:ring-accent w-full flex items-center">
        <Controller
          name={inputName}
          control={control}
          render={({ field }) => (
            <DatePicker
              ref={(el) => (datepickerRef.current = el)} // 📌 Guarda la referencia
              selected={field.value ? parseISO(field.value) : null} // 🔹 Manejar correctamente la fecha
              onChange={(date) => {
                if (date) {
                  setSelectedDate(date);
                  field.onChange(format(date, "yyyy-MM-dd")); // 🔹 Guardar fecha correctamente
                }
              }}
              filterDate={isValidDay}
              locale={es} // 📌 Traducir a español
              dateFormat="dd 'de' MMMM 'de' yyyy" // 📌 Formato visual: "23 de julio de 2024"
              placeholderText="Selecciona una fecha"
              className="w-full bg-transparent focus:outline-none" // 🔹 Hace que el input se vea bien
            />
          )}
        />
        {/* 📌 Icono dentro del input que abre el DatePicker */}
        <button
          type="button"
          onClick={() => datepickerRef.current?.setOpen(true)} // 📌 Abre el calendario
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <CalendarIcon className="w-5 h-5 text-text dark:text-text-dark cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default DateFieldByService;
