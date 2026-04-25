import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CustomerForm from "../CustomerForm";
import { addCustomer } from "../../api/customerApi";
import type { Customer } from "../../types";

// A blank customer object to reset the form each time the dialog opens
// defined outside the component so it's not recreated on every render
const emptyCustomer: Omit<Customer, "_links"> = {
  firstname: "",
  lastname: "",
  streetaddress: "",
  postcode: "",
  city: "",
  email: "",
  phone: "",
};

type AddCustomerProps = {
  onCustomerAdded: () => void;
};

export default function AddCustomer({ onCustomerAdded }: AddCustomerProps) {
  // dialogue window
  const [open, setOpen] = useState(false);
  // current customer, starts empty
  const [customer, setCustomer] = useState(emptyCustomer);

  const handleOpen = () => {
    setCustomer(emptyCustomer); //empty
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    addCustomer(customer)
      .then(() => {
        onCustomerAdded(); // tell the list to refresh/ re fetch data
        handleClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Customer</DialogTitle>
        <CustomerForm customer={customer} setCustomer={setCustomer} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
