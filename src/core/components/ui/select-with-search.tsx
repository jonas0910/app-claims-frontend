'use client'
import { useState, useRef, useEffect } from "react";
import { FieldError, useFormContext } from "react-hook-form";
import {
  ChevronDownIcon,
  ArrowPathIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";

interface Option {
  value: string | number;
  label: string;
}

interface SelectWithSearchProps {
  label?: string;
  inputName: string;
  options: Option[];
  inputError?: FieldError;
  loading?: boolean;
  onChange?: (value: string) => void; // Add the onChange prop
  value?: string; // Add the value prop
}

const SelectWithSearch = ({
  label = " ",
  inputName,
  options= [],
  inputError,
  loading = false,
}: SelectWithSearchProps) => {
  const { register, setValue, watch } = useFormContext();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedValue = watch(inputName);

  const handleSelect = (option: Option) => {
    setValue(inputName, option.value);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleClear = () => {
    setValue(inputName, "");
    setSearchTerm("");
    setIsOpen(false);
  };

  // Cerrar el dropdown si se hace clic fuera del componente
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const optionsFiltered = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // useEffect(() => {
  //   if (!watch(inputName)) {
  //     setValue(inputName, ""); // Asegura que siempre haya un valor
  //   }
  // }, [inputName, setValue, watch]);

  useEffect(() => {
    if (!watch(inputName) && watch(inputName) !== "") {
      setValue(inputName, ""); 
    }
  }, [inputName, setValue, watch]);
  

  return (
    <div className="w-full flex flex-col gap-1 relative" ref={dropdownRef}>
      <label
        htmlFor={inputName}
        className="font-semibold text-text dark:text-text-dark flex justify-between items-center"
      >
        {label}
        {loading && (
          <ArrowPathIcon className="w-4 h-4 text-accent dark:text-accent-dark animate-spin" />
        )}
      </label>
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          searchInputRef.current?.focus();
        }}
        className="relative w-full flex items-center border bg-secondary dark:bg-secondary-dark border-accent rounded-md px-3 py-3 focus:outline-none focus:ring-1 focus:ring-accent dark:focus:ring-accent-dark dark:border-accent-dark text-text dark:text-text-dark"
      >
        {isOpen ? (
          <input
            id="search"
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={searchInputRef}
            placeholder={
              options.find((option) => option.value === selectedValue)?.label ??
              "Selecciona una opción"
            }
            type="text"
            className="w-full bg-transparent focus:outline-none"
            value={searchTerm}
          />
        ) : (
          <input
            id={inputName}
            {...register(inputName)}
            ref={inputRef}
            type="text"
            value={
              options.find((option) => option.value === selectedValue)?.label ??
              ""
            }
            readOnly
            className="w-full bg-transparent focus:outline-none cursor-pointer"
          />
        )}

        {/* Ícono de limpiar (XCircleIcon) */}
        {selectedValue && (
          <XCircleIcon
            className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer mr-2"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
          />
        )}

        {/* Ícono de dropdown */}
        <ChevronDownIcon className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-secondary dark:bg-secondary-dark border border-accent rounded-md mt-1 max-h-48 overflow-y-auto shadow-md z-10">
          {loading ? (
            <p className="p-2 text-text dark:text-text-dark text-sm">
              Cargando...
            </p>
          ) : optionsFiltered.length > 0 ? (
            optionsFiltered.map((option) => (
              <div
                key={option.value}
                className={`p-2 cursor-pointer hover:bg-secondary-hover dark:hover:bg-secondary-hover-dark ${
                  selectedValue === option.value
                    ? "bg-accent dark:bg-accent-dark text-white hover:text-text dark:hover:text-text-dark"
                    : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <p className="p-2 text-text dark:text-text-dark text-sm">
              No se encontraron resultados
            </p>
          )}
        </div>
      )}

      {inputError && (
        <p className="mt-1 text-[14px] text-red-500 dark:text-red-400">
          {inputError.message}
        </p>
      )}
    </div>
  );
};

export default SelectWithSearch;
