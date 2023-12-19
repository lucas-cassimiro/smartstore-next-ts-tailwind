"use client";

import { useEffect, useMemo, useState } from "react";

import { OrdersData } from "@/interfaces/OrdersData";
import { getOrders } from "@/services/api";
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { SearchIcon } from "@/svg/SearchIcon";
import { ChevronDownIcon } from "@/svg/ChevronDownIcon";
import { PlusIcon } from "@/svg/PlusIcon";
import { BsXCircleFill } from "react-icons/bs";
import currencyFormat from "@/helpers/currencyFormat";

import useTable from "@/components/Logic/useFormTableLogic";

export default function Orders() {
  const [orders, setOrders] = useState<OrdersData[]>([]);

  console.log(orders);

  const {
    filteredProducts,
    hasSearchFilter,
    items,
    onClear,
    onNextPage,
    onPreviousPage,
    onRowsPerPageChange,
    onSearchChange,
    pages,
    recebeDados,
    page,
    isLoading,
    setIsLoading,
    setFilterValue,
    setStatusFilter,
    statusFilter,
    statusOptions,
    filterValue,
    setPage,
  } = useTable();

  useEffect(() => {
    async function fetchData() {
      const data = await getOrders();
      setOrders(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              ></DropdownMenu>
            </Dropdown>

            <Button
              color="primary"
              endContent={<PlusIcon />}
              //onClick={() => setMethod("POST")}
            >
              Adicionar Novo
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total de {orders.length} pedidos
          </span>
          <label className="flex items-center text-default-400 text-small">
            Pedidos por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    statusFilter,
    setStatusFilter,
    orders.length,
    onRowsPerPageChange,
    onClear,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, setPage, onPreviousPage, onNextPage]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>ID DO CLIENTE</TableColumn>
        <TableColumn>PRODUTO</TableColumn>
        <TableColumn>PREÇO UNITÁRIO</TableColumn>
        <TableColumn>DESCONTO</TableColumn>
        <TableColumn>PREÇO TOTAL</TableColumn>
        <TableColumn>QUANTIDADE DO PRODUTO</TableColumn>
        <TableColumn>VALOR TOTAL DA COMPRA</TableColumn>
      </TableHeader>

      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
      >
        {orders.map((order) => (
          <TableRow key="1">
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.orders.user_id}</TableCell>
            <TableCell>{order.products.name}</TableCell>
            <TableCell>{currencyFormat(order.unit_price)}</TableCell>
            <TableCell>
              {" "}
              {order.discount ? (
                <span>{order.discount}%</span>
              ) : (
                <BsXCircleFill className="text-red-500 w-5 h-5" />
              )}
            </TableCell>
            <TableCell>{currencyFormat(order.total_price)}</TableCell>
            <TableCell>{order.quantity}</TableCell>
            <TableCell>{currencyFormat(order.orders.total_amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
