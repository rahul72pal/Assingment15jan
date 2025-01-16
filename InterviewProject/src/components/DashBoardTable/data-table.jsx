import React, { useState } from "react";
import {
  useReactTable,
  flexRender,
  getPaginationRowModel,
  getCoreRowModel,
} from "@tanstack/react-table";
import { columns } from "./column"; // Adjust the import path
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { IoFilter } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import RecentData from "../Dashboard/RecentData";
import InventoryBarChart from "../Dashboard/InventoryBarChart";
import AverageMSRP from "../Dashboard/AverageMSRP";
import { getFilterVehicles } from "@/service/getvehicle";
import { useDispatch } from "react-redux";
import { setAvgmsrp, setinventorycount, setjsonData, setpriceStats } from "@/slices/data";

// Function to calculate date ranges based on filters
const calculateDateRange = (filter) => {
  const today = new Date();
  let startDate = new Date();

  switch (filter) {
    case "lastMonth":
      startDate.setMonth(today.getMonth() - 1);
      startDate.setDate(1);
      break;
    case "thisMonth":
      startDate.setMonth(today.getMonth());
      startDate.setDate(1);
      break;
    case "last3Months":
      startDate.setMonth(today.getMonth() - 3);
      startDate.setDate(1);
      break;
    case "last6Months":
      startDate.setMonth(today.getMonth() - 6);
      startDate.setDate(1);
      break;
    case "lastYear":
      startDate.setFullYear(today.getFullYear() - 1);
      startDate.setMonth(0);
      startDate.setDate(1);
      break;
    case "thisYear":
      startDate.setFullYear(today.getFullYear());
      startDate.setMonth(0);
      startDate.setDate(1);
      break;
    default:
      startDate = today;
  }

  // Format the date to 'YYYY-MM-DD'
  const formattedStartDate = `${startDate.getFullYear()}-${(
    startDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${startDate.getDate().toString().padStart(2, "0")}`;
  const formattedEndDate = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

  return { startDate: formattedStartDate, endDate: formattedEndDate };
};

const VehicleDataTable = ({ data, priceStats, inventoryCount, avgmsrp }) => {
  const [selectedFilter, setSelectedFilter] = useState("thisMonth");
  const [filterResult, setFilterResult] = useState();
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState(calculateDateRange("thisMonth"));
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0, //custom initial page index
        pageSize: 10, //custom default page size
      },
    },
  });

  const dealers = [
    { id: 1, name: "AAA MITSUBISHI DEALER" },
    { id: 2, name: "BBB TOYOTA DEALER" },
    { id: 3, name: "CCC FORD DEALER" },
    { id: 4, name: "DDD HONDA DEALER" },
    { id: 5, name: "EEE NISSAN DEALER" },
  ];

  const filters = [
    { label: "Last Month", value: "lastMonth" },
    { label: "This Month", value: "thisMonth" },
    { label: "Last 3 Months", value: "last3Months" },
    { label: "Last 6 Months", value: "last6Months" },
    { label: "Last Year", value: "lastYear" },
    { label: "This Year", value: "thisYear" },
  ];

  const fetchFilterData = async () => {
    const result = await getFilterVehicles(
      dateRange.startDate,
      dateRange.endDate
    );
    console.log("FilterData =", result)
    if (result.data.status === 200) {
      dispatch(setjsonData(data.data.jsonData));

      dispatch(setpriceStats(data.data.priceStats));

      dispatch(setinventorycount(data.data.result.inventory_count));

      dispatch(setAvgmsrp(data.data.result.avg_msrp));
    }
  };

  // Handle filter selection and update date range
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    const range = calculateDateRange(filter);
    setDateRange(range);
    console.log(`Selected Filter: ${filter}`, range);
    fetchFilterData() // This can be used to filter data or update charts
  };

  console.log(selectedFilter, dateRange);

  return (
    <>
      <div className="flex justify-between border-b-2 mb-4 border-gray-500 h-[90px] items-baseline w-full">
        <span className="text-2xl font-semibold">Inventory</span>

        <div className="flex gap-3">
          <div>
            <span>Select Dealer </span>
            <DropdownMenu>
              <DropdownMenuTrigger className="my-7 sm:text-xs">
                <Button className="ml-auto sm:text-xs bg-white text-black">
                  {" "}
                  <span className="mr-16">AAA MITSUBISHI DEALER</span>{" "}
                  <FaCaretDown className="text-[#FF9926]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {dealers.map((dealer) => (
                  <DropdownMenuItem
                    key={dealer.id}
                    onClick={() => console.log(`Selected: ${dealer.name}`)}
                  >
                    {dealer.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="my-7 sm:text-xs">
                <Button className="ml-auto sm:text-xs bg-white text-black hover:bg-transparent">
                  <span className="mr-16">
                    {selectedFilter ? selectedFilter : "FILTERS BY DATA"}
                  </span>
                  <FaCaretDown className="text-[#FF9926]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {filters.map((filter) => (
                  <DropdownMenuItem
                    key={filter.value}
                    onClick={() => handleFilterSelect(filter.value)}
                  >
                    {filter.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="my-8">
        <span className="py-5">Recent Gathered Data 04/01/24</span>
        <div>
          <RecentData prices={priceStats} />
        </div>
      </div>

      <div className="my-8">
        <div>
          <InventoryBarChart inventoryCount={inventoryCount} />
        </div>
      </div>

      <div className="my-6">
        <div>
          <AverageMSRP angmsrp={avgmsrp} />
        </div>
      </div>

      <div className="">
        <span className="px-5 py-4 text-xl font-semibold">History Log</span>
        <Table className="bg-white mt-4">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* pagination  */}
      <div className="flex items-center justify-start space-x-2 py-4">
        <Button
          className=""
          size="sm"
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          className=""
          size="sm"
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default VehicleDataTable;
