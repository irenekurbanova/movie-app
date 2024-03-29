import { Dialog, DialogContent } from "@mui/material";

type ModalProps = {
  open: boolean;
  close: () => void;
  children: JSX.Element;
};

const Modal = ({ open, close, children }: ModalProps) => {
  return (
    <Dialog open={open} onClose={close} maxWidth="xs" fullWidth={true}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
