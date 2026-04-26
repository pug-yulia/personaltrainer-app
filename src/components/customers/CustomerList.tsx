import { useEffect, useState } from "react";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { fetchCustomers, deleteCustomer } from "../../api/customerApi";
import type { Customer } from "../../types";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import ConfirmDialog from "../ConfirmDialog";
import AddTraining from "../trainings/AddTraining";
import { CSVLink } from "react-csv";

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Tracks which customer is pending deletion, null means dialog is closed
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(
    null,
  );

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "First name", width: 120 },
    { field: "lastname", headerName: "Last name", width: 120 },
    { field: "streetaddress", headerName: "Address", width: 160 },
    { field: "postcode", headerName: "Postcode", width: 90 },
    { field: "city", headerName: "City", width: 120 },
    { field: "email", headerName: "Email", width: 190 },
    { field: "phone", headerName: "Phone", width: 130 },
    {
      field: "actions",
      headerName: "",
      flex: 1,
      sortable: false,
      filterable: false,
      //renderCell puts jsx component inside the cell
      renderCell: (params: GridRenderCellParams) => (
        <Stack
          direction="row"
          sx={{ alignItems: "center", height: "100%", gap: 1 }}
        >
          <EditCustomer
            customer={params.row}
            onCustomerUpdated={getCustomers}
          />
          <AddTraining customer={params.row} onTrainingAdded={getCustomers} />
          <Button
            size="small"
            color="error"
            // Store the customer to delete in state, this opens the confirm dialog
            onClick={() => setCustomerToDelete(params.row)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  const getCustomers = () => {
    fetchCustomers()
      .then((data) => setCustomers(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const handleDeleteConfirmed = () => {
    if (!customerToDelete) return;
    deleteCustomer(customerToDelete._links.self.href)
      .then(() => {
        setCustomerToDelete(null); // close dialog
        getCustomers();
      })
      .catch((err) => console.error(err));
  };

  // https://www.npmjs.com/package/react-csv
  const csvData = customers.map(
    ({ firstname, lastname, streetaddress, postcode, city, email, phone }) => ({
      firstname,
      lastname,
      streetaddress,
      postcode,
      city,
      email,
      phone,
    }),
  );

  return (
    <>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}
      >
        <Typography variant="h5">Customers</Typography>
        <Stack direction="row" sx={{ gap: 1 }}>
          <CSVLink data={csvData} filename="customers.csv">
            <Button variant="outlined">Export CSV</Button>
          </CSVLink>
          <AddCustomer onCustomerAdded={getCustomers} />
        </Stack>
      </Stack>

      <div style={{ height: 600, width: "100%", overflowX: "auto" }}>
        <DataGrid
          rows={customers}
          columns={columns}
          getRowId={(row) => row._links.self.href}
          disableRowSelectionOnClick
        />
      </div>

      <ConfirmDialog
        open={customerToDelete !== null}
        title="Delete Customer"
        message={`Are you sure you want to delete ${customerToDelete?.firstname} ${customerToDelete?.lastname}? This will also delete all their trainings.`}
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setCustomerToDelete(null)}
      />
    </>
  );
}
