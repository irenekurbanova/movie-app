import { Alert, AlertTitle, Snackbar } from "@mui/material";

type AlertProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
};

const UserAlert = ({ open, onClose, title, message }: AlertProps) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default UserAlert;
