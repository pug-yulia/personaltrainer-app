import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";
import { addTraining } from "../../api/trainingApi";
import type { Customer } from "../../types";

type AddTrainingProps = {
  customer: Customer; // which customer this training belongs to
  onTrainingAdded: () => void;
};

export default function AddTraining({
  customer,
  onTrainingAdded,
}: AddTrainingProps) {
  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  // Dayjs object for the date picker, null means nothing selected yet
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (!date) return;

    addTraining({
      date: date.toISOString(), // convert Dayjs to ISO string the API expects
      activity,
      duration: Number(duration),
      customer: customer._links.self.href, // link the training to this customer
    })
      .then(() => {
        onTrainingAdded();
        handleClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Button size="small" variant="outlined" onClick={() => setOpen(true)}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Add Training for {customer.firstname} {customer.lastname}
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Date & Time"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              sx={{ mt: 1, mb: 1, width: "100%" }}
            />
          </LocalizationProvider>
          <TextField
            margin="dense"
            label="Activity"
            fullWidth
            variant="standard"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Duration (min)"
            fullWidth
            variant="standard"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </DialogContent>
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
