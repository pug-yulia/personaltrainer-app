import { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { fetchCustomers } from "../api/customerApi";
import type { Customer } from "../types";

// Column definitions outside the component so they aren't re rendered
const columns: GridColDef[] = [
  { field: "firstname", headerName: "First name", width: 130 },
  { field: "lastname", headerName: "Last name", width: 130 },
  { field: "streetaddress", headerName: "Address", width: 180 },
  { field: "postcode", headerName: "Postcode", width: 100 },
  { field: "city", headerName: "City", width: 130 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "phone", headerName: "Phone", width: 150 },
];

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const getCustomers = () => {
    fetchCustomers()
      .then((data) => setCustomers(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={customers}
        columns={columns}
        // self link URL as uuid
        getRowId={(row) => row._links.self.href}
        disableRowSelectionOnClick
        // sorting and filtering built in
      />
    </div>
  );
}
