import React from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";

import BrandRegistration from "../../components/brand-registration/BrandRegistration";
import ContactDetails from "../../components/contact-details";
import InvoicePage from "../../components/invoice";
import { useDispatch, useSelector } from "react-redux";
import {
  brandRegistration,
  contactDetails,
  initialState,
  invoice,
  reset,
} from "../../components/redux/redux-slice/brandRegistrationSlice";
import PreviewPage from "../preview/PreviewPage";

const steps = ["BRAND REGISTRATION", "ADDRESS & CONTACT", "CONFIRM DETAILS"];

const BrandRegistrationPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

  const dispatch = useDispatch();
  const store = useSelector((store) => store.registrationReducer);

  const handleNext = (data) => {
    if (data.type === "registration") {
      dispatch(brandRegistration(data.values));
    } else if (data.type === "contact") {
      dispatch(contactDetails(data.values));
    } else {
      dispatch(invoice(data.values));
    }

    setActiveStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleFormSubmit = () => {
    setDialogIsOpen(true);
  };

  const isLastStep = activeStep === steps.length - 1;
  const isFirstStep = activeStep === 0;

  const handleDialogClose = () => {
    setDialogIsOpen(false);
    dispatch(reset());
    setActiveStep(0);
  };

  return (
    <Box
      sx={{
        bgcolor: "#FBFCFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: "100%", mt: "2rem" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box sx={{ width: "80%", mt: "2rem" }}>
        <Box>
          {activeStep === 0 && <BrandRegistration onNext={handleNext} />}
          {activeStep === 1 && (
            <ContactDetails onNext={handleNext} onBack={handleBack} />
          )}
          {activeStep === 2 && (
            <InvoicePage onNext={handleNext} onBack={handleBack} />
          )}
          {activeStep === 3 && <PreviewPage onSubmit={handleFormSubmit} />}
        </Box>
        <Box></Box>
      </Box>
      <Dialog open={dialogIsOpen}>
        <DialogTitle>{"Brand Registration Successful"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can check the status in the official website
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BrandRegistrationPage;
