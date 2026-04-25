import { useEffect, useState } from "react";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { fetchTrainings, deleteTraining } from "../../api/trainingApi";
import type { TrainingWithCustomer } from "../../types";
import ConfirmDialog from "../ConfirmDialog";

export default function TrainingList() {
  const [trainings, setTrainings] = useState<TrainingWithCustomer[]>([]);
  const [trainingToDelete, setTrainingToDelete] =
    useState<TrainingWithCustomer | null>(null);

  const getTrainings = () => {
    fetchTrainings()
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTrainings();
  }, []);

  const handleDeleteConfirmed = () => {
    if (!trainingToDelete) return;
    deleteTraining(trainingToDelete.id)
      .then(() => {
        setTrainingToDelete(null);
        getTrainings();
      })
      .catch((err) => console.error(err));
  };

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      width: 160,
      valueFormatter: (value: string) =>
        dayjs(value).format("DD.MM.YYYY HH:mm"),
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
        row.customer
          ? `${row.customer.firstname} ${row.customer.lastname}`
          : "—",
    },
    {
      field: "actions",
      headerName: "",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          size="small"
          color="error"
          onClick={() => setTrainingToDelete(params.row)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}
      >
        <Typography variant="h5">Trainings</Typography>
      </Stack>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={trainings}
          columns={columns}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
        />
      </div>

      <ConfirmDialog
        open={trainingToDelete !== null}
        title="Delete Training"
        message={`Are you sure you want to delete this ${trainingToDelete?.activity} training?`}
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setTrainingToDelete(null)}
      />
    </>
  );
}
