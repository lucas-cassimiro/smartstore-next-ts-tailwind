import React, { useMemo, useState, useCallback, useEffect } from "react";

export default function useTable() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  // const [visibleColumns, setVisibleColumns] = React.useState(
  //   new Set(INITIAL_VISIBLE_COLUMNS)
  // );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  console.log(rowsPerPage);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState<any>([]);

  function recebeDados(data: any) {
    setData(data);
  }

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredData = [...data];

    if (hasSearchFilter) {
      filteredData = filteredData.filter((data) =>
        data.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    // if (
    //   statusFilter !== "all" &&
    //   Array.from(statusFilter).length !== statusOptions.length
    // ) {
    //   filteredData = filteredData.filter((data) =>
    //     Array.from(statusFilter).includes(data.status)
    //   );
    // }

    return filteredData;
  }, [data, filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: any) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value: any) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  return {
    items,
    onSearchChange,
    onPreviousPage,
    onNextPage,
    pages,
    onClear,
    filteredItems,
    hasSearchFilter,
    onRowsPerPageChange,
    recebeDados,
    page,
    statusFilter,
    //statusOptions,
    setStatusFilter,
    setFilterValue,
    isLoading,
    setIsLoading,
    filterValue,
    setPage,
    data,
    sortedItems,
    sortDescriptor,
  };
}
