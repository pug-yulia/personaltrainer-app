import { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { fetchTrainings } from "../api/trainingApi";
import type { TrainingWithCustomer } from "../types";

const columns: GridColDef[] = [
  {
    field: "date",
    headerName: "Date",
    width: 160,
    // dayjs to format returned date string
    valueFormatter: (value: string) => dayjs(value).format("DD.MM.YYYY HH:mm"),
  },
  { field: "duration", headerName: "Duration (min)", width: 140 },
  { field: "activity", headerName: "Activity", width: 160 },
  {
    field: "customer",
    headerName: "Customer",
    width: 180,
    valueGetter: (
      _value: TrainingWithCustomer["customer"],
      row: TrainingWithCustomer,
    ) =>
      row.customer ? `${row.customer.firstname} ${row.customer.lastname}` : "—",
    // "-" is case where customer is null
  },
];

export default function TrainingList() {
  const [trainings, setTrainings] = useState<TrainingWithCustomer[]>([]);

  useEffect(() => {
    fetchTrainings()
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={trainings}
        columns={columns}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
      />
    </div>
  );
}
