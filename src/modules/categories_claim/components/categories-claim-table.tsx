"use client";
import { DeleteIcon, EditIcon } from "@/core/components/icons";
import Modal from "@/core/components/modal";
import { FetchTable } from "@/core/components/table";
import { Badge, Button, Card, SearchField } from "@/core/components/ui";
import { createColumnHelper } from "@tanstack/react-table";
import { Fragment, useCallback, useMemo, useState } from "react";
import { getAllCategoriesClaimWithParams } from "../actions/categories-claim";
import { useModal } from "@/core/hooks/utils/use-modal";
import CategoriesClaimForm from "./categories-claim-form";
import { CategoryClaimGet } from "../types/categories-claim";
import { Claim } from "../../claims-list/types/claim";
import { Establishment } from "../../establishments/types/establishment";

const QUERY_KEY = "category-claim-with-params";

const CategoriesClaimTable = () => {
  const { openModal } = useModal();

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryClaimGet | null>(null);
  const openCategoryModal = useCallback(
    (category: CategoryClaimGet | null) => {
      setSelectedCategory(category);
      openModal({
        elementById: "edit-category-claim",
      });
    },
    [openModal]
  );
  //para la tabla
  const columnHelper = createColumnHelper<any>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: () => <p className="text-center text-sm">Nombre</p>,
        size: 30,
        cell: (info) => {
          return <p className="text-center">{info.getValue()}</p>;
        },
      }),
      columnHelper.accessor("establishment", {
        header: () => <p className="text-center text-sm">Establecimiento</p>,
        size: 30,
        cell: (info) => {
          return (
            <p className="text-center">
              {(info.getValue() as Establishment)?.name}
            </p>
          );
        },
      }),
      columnHelper.accessor("claims", {
        header: () => <p className="text-center text-sm">Reclamaciones</p>,
        size: 30,
        cell: (info) => {
          //TODO: Numero de reclamaciones para el establecimiento
          return (
            <p className="text-center">{(info.getValue() as Claim[]).length}</p>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        header: () => <p className="text-center text-sm ">Acciones</p>,
        cell: (props) => (
          <Fragment>
            <div className="flex justify-center gap-2">
              <Badge
                className="cursor-pointer w-10 h-10"
                handleClick={() => {
                  openCategoryModal(props.row.original);
                }}
              >
                <EditIcon className="w-4 h-4" />
              </Badge>
              <Badge
                className="cursor-pointer w-10 h-10 bg-red-400 border-red-400"
                handleClick={() => {
                  // deleteCategoryClaim(props.row.original.id)
                  console.log("delete");
                }}
              >
                <DeleteIcon className="w-4 h-4" />
              </Badge>
            </div>
          </Fragment>
        ),
      }),
    ],
    [columnHelper, openCategoryModal]
  );

  const [filters, setFilters] = useState({});
  const captureValue = (value: string) => {
    setFilters({ ...filters, name: value });
  };

  const resetFilters = () => {
    setFilters({});
  };
  return (
    <Fragment>
      <Card title="Categorias" className="w-full max-w-7xl">
        {/* <div className='flex justify-end items-center mb-4'>
          <div className='flex gap-5'>
            <PdfExcelDownloader
              dataToExport={dataToExport || []}
              columnsToExport={columnsToExport || []}
              filename='Lista de Agencias'
            />
          </div>
        </div> */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <SearchField
              label="Buscar Categoria"
              inputName="name"
              captureValue={captureValue}
            />
          </div>
          <div className="flex gap-5">
            <Button variant="secondary" onClick={resetFilters}>
              Resetear Filtros
            </Button>
            <Button
              variant="primary"
              onClick={
                //   () => console.log('Crear categoria')
                () =>
                  openModal({
                    elementById: "create-category-claim",
                  })
              }
            >
              Crear Categoria
            </Button>
          </div>
        </div>

        <FetchTable
          columns={columns}
          fetchData={getAllCategoriesClaimWithParams}
          queryKey={QUERY_KEY}
          externalfilters={filters}
        />
      </Card>

      <Modal elementById="create-category-claim" size="tiny">
        <CategoriesClaimForm type="create" key={crypto.randomUUID()} />
      </Modal>
      <Modal elementById="edit-category-claim" size="tiny">
        <CategoriesClaimForm
          type="edit"
          category={selectedCategory}
          key={crypto.randomUUID()}
        />
      </Modal>
    </Fragment>
  );
};

export default CategoriesClaimTable;
