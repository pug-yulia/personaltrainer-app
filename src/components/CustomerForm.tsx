import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import type { Customer } from "../types";

// Omit<> removes _links from the type since the form only deals with data fields
// not the API links that the backend generates
type CustomerFormProps = {
  customer: Omit<Customer, "_links">;
  setCustomer: React.Dispatch<React.SetStateAction<Omit<Customer, "_links">>>;
};

// Shared form for both AddCustomer and EditCustomer dialogs
export default function CustomerForm({
  customer,
  setCustomer,
}: CustomerFormProps) {
  return (
    <DialogContent>
      <TextField
        margin="dense"
        label="First name"
        fullWidth
        variant="standard"
        value={customer.firstname}
        onChange={(e) =>
          setCustomer({ ...customer, firstname: e.target.value })
        }
      />
      <TextField
        margin="dense"
        label="Last name"
        fullWidth
        variant="standard"
        value={customer.lastname}
        onChange={(e) => setCustomer({ ...customer, lastname: e.target.value })}
      />
      <TextField
        margin="dense"
        label="Street address"
        fullWidth
        variant="standard"
        value={customer.streetaddress}
        onChange={(e) =>
          setCustomer({ ...customer, streetaddress: e.target.value })
        }
      />
      <TextField
        margin="dense"
        label="Postcode"
        fullWidth
        variant="standard"
        value={customer.postcode}
        onChange={(e) => setCustomer({ ...customer, postcode: e.target.value })}
      />
      <TextField
        margin="dense"
        label="City"
        fullWidth
        variant="standard"
        value={customer.city}
        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
      />
      <TextField
        margin="dense"
        label="Email"
        fullWidth
        variant="standard"
        value={customer.email}
        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
      />
      <TextField
        margin="dense"
        label="Phone"
        fullWidth
        variant="standard"
        value={customer.phone}
        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
      />
    </DialogContent>
  );
}
