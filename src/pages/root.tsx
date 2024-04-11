import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "@/components/header/header";
import Modal from "@/components/UI/modal/modal";
import { useState } from "react";
import AuthenticationStepper from "@/auth/auth-stepper";
import { Provider } from "react-redux";
import { store } from "@/store/global-store";

export function Root() {
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <Provider store={store}>
      <Container maxWidth="xl">
        <Box display="flex" flexDirection="column" gap="16px">
          <Modal open={open} close={closeModal}>
            <AuthenticationStepper closeModal={closeModal} />
          </Modal>
          <Header openModal={openModal} />
          <Outlet />
        </Box>
      </Container>
    </Provider>
  );
}
