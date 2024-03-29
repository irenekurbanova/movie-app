import { useEffect, useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Paper, Typography, MobileStepper, Button, useTheme } from "@mui/material";
import { useAuthDispatch } from "@/contexts/authentication/auth-context";
import { isValidEmail } from "@/utilities/helpers";
import Input from "./input-form";
import Cookies from "js-cookie";
import { getAccountID } from "@/api/authentication";
import { API_ACCESS_TOKEN } from "@/api/config";

type AuthenticationStepperProps = {
  closeModal: () => void;
};

const steps = [
  {
    label: "Запросить токен",
  },
  {
    label: "Введите токен",
  },
];

const AuthenticationStepper = ({ closeModal }: AuthenticationStepperProps) => {
  const theme = useTheme();
  const maxSteps = steps.length;
  const [activeStep, setActiveStep] = useState(0);
  const [inputValue, setInputValue] = useState({ email: "", token: API_ACCESS_TOKEN });

  const dispatch = useAuthDispatch();

  const handleNext = () => {
    if (isValidEmail(inputValue.email)) {
      dispatch({ type: "setEmail", email: inputValue.email });
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = () => {
    dispatch({ type: "setToken", token: inputValue.token });
    dispatch({ type: "setIsLoggedIn", isLoggedIn: true });

    Cookies.set("token", inputValue.token);
    Cookies.set("email", inputValue.email);
    closeModal();
  };

  useEffect(() => {
    async function getAccount() {
      const account = await getAccountID();
      dispatch({ type: "setSessionId", id: account.id });
      Cookies.set("accountID", account.id);
    }
    getAccount();
  }, [dispatch]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.target.name === "email" && setInputValue({ ...inputValue, email: event.target.value });
    event.target.name === "token" && setInputValue({ ...inputValue, token: event.target.value });
  }

  return (
    <>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          backgroundColor: "#383838",
        }}
      >
        <Typography>{steps[activeStep].label}</Typography>
      </Paper>
      {activeStep === 0 && (
        <Input onChange={handleChange} value={inputValue.email} label="Почта" type="email" name="email" />
      )}
      {activeStep === 1 && (
        <Input onChange={handleChange} value={inputValue.token} label="Токен" type="text" name="token" />
      )}
      <MobileStepper
        variant="text"
        sx={{ backgroundColor: "#383838" }}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <>
            {maxSteps - 1 === activeStep ? (
              <Button size="small" onClick={handleComplete} disabled={inputValue.token.length === 0}>
                Complete
                <KeyboardArrowRight />
              </Button>
            ) : (
              <Button size="small" onClick={handleNext} disabled={!isValidEmail(inputValue.email)}>
                Next
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            )}
          </>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </>
  );
};

export default AuthenticationStepper;
