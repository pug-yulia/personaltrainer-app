import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CustomerForm from "../CustomerForm";
import { updateCustomer } from "../../api/customerApi";
import type { Customer } from "../../types";

type EditCustomerProps = {
  customer: Customer; // the full customer row passed in from the DataGrid
  onCustomerUpdated: () => void;
};

export default function EditCustomer({
  customer,
  onCustomerUpdated,
}: EditCustomerProps) {
  const [open, setOpen] = useState(false);
  // Pre-fill the form with the existing customer data when dialog opens
  const [editedCustomer, setEditedCustomer] = useState<
    Omit<Customer, "_links">
  >({
    firstname: customer.firstname,
    lastname: customer.lastname,
    streetaddress: customer.streetaddress,
    postcode: customer.postcode,
    city: customer.city,
    email: customer.email,
    phone: customer.phone,
  });

  const handleOpen = () => {
    // Reset to current values each time in case user cancelled a previous edit
    setEditedCustomer({
      firstname: customer.firstname,
      lastname: customer.lastname,
      streetaddress: customer.streetaddress,
      postcode: customer.postcode,
      city: customer.city,
      email: customer.email,
      phone: customer.phone,
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    // customer._links.self.href is the unique url for this specific customer
    updateCustomer(customer._links.self.href, editedCustomer)
      .then(() => {
        onCustomerUpdated();
        handleClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Button size="small" onClick={handleOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <CustomerForm
          customer={editedCustomer}
          setCustomer={setEditedCustomer}
        />
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
