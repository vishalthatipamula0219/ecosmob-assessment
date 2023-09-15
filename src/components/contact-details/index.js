import { Box, Grid, Stack, Button, MenuItem } from "@mui/material";
import React from "react";
import { MainHeading } from "../common/MainHeading";
import { useFormik } from "formik";
import * as yup from "yup";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CustomTextInput from "../common/FormCustomInput";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSelector } from "react-redux";
import brandImage from '../../assets/images/brand-registration.png'

const ContactDetails = ({ onNext, onBack }) => {
  const validationSchema = yup.object({
    businessAddress: yup
      .string()
      .required("Business Address is mandatory field"),
    city: yup.string().required("city is mandatory field"),
    postalCode: yup
      .string()
      .matches(/^[1-9][0-9]{5}$/, "Invalid postal code")
      .required("Postal Code is mandatory field"),
    businessPhone: yup
      .string()
      .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
      .required("Mobile number is required"),
    alternatePhone: yup
      .string()
      .matches(/^[6-9]\d{9}$/, "Invalid mobile number"),
    website: yup
      .string()
      .url("Invalid website URL")
      .required("Business Website is mandatory field"),
    mailId: yup
      .string()
      .email("Enter a valid email")
      .required("Email is manddatory field"),
  });

  const contactVal = useSelector((store) => store.registrationReducer.contact);

  const formik = useFormik({
    initialValues: contactVal
      ? contactVal
      : {
          businessAddress: "",
          city: "",
          postalCode: "",
          businessPhone: "",
          alternatePhone: "",
          website: "",
          mailId: "",
        },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onNext({ values, type: "contact" });
    },
  });

  const cities = [
    "",
    "Delhi",
    "Mumbai",
    "Banglore",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Noida",
  ];

  const postalCodes = ["546456", "585698", "578458", "578458"];

  return (
    <Box sx={{ boxShadow: "0px 0px 20px -1px #00000012" }}>
      <MainHeading>Address & Contact details</MainHeading>
      <Box sx={{ px: 4 }}>
        <img src={brandImage} alt="Brand Image" style={{ width: "100%" }} />
      </Box>

      <Box sx={{ bgcolor: "#FFFFFF" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            alignItems={"center"}
            rowGap={3}
            columnSpacing={5}
            sx={{ px: "2rem", pb: "3rem", pt: "2rem" }}
          >
            <Grid item lg={6} width={"100%"}>
              <CustomTextInput
                name="businessAddress"
                formik={formik}
                label={"Business Address"}
              />
            </Grid>
            <Grid item lg={6} width={"100%"}>
              <Grid container columnSpacing={4} rowSpacing={3}>
                <Grid item lg={6} md={12} width={"100%"}>
                  <CustomTextInput
                    placeholder="Enter City,State"
                    name="city"
                    formik={formik}
                    select
                    label={"Select City"}
                  >
                    {cities.map((city) => {
                      return <MenuItem value={city}>{city}</MenuItem>;
                    })}
                  </CustomTextInput>
                </Grid>
                <Grid item lg={6} width={"100%"}>
                  <CustomTextInput
                    placeholder="Postal Code"
                    name="postalCode"
                    formik={formik}
                    select
                    label={"Select Postalcode"}
                  >
                    {postalCodes.map((code) => {
                      return <MenuItem value={code}>{code}</MenuItem>;
                    })}
                  </CustomTextInput>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={6} width={"100%"}>
              <CustomTextInput
                name="businessPhone"
                formik={formik}
                label={"Primary business phone"}
              />
            </Grid>
            <Grid item lg={6} width={"100%"}>
              <CustomTextInput
                name="alternatePhone"
                formik={formik}
                label={"Support phone number"}
              />
            </Grid>
            <Grid item lg={6} width={"100%"}>
              <CustomTextInput
                name="website"
                formik={formik}
                label={"Business website"}
              />
            </Grid>
            <Grid item lg={6} width={"100%"}>
              <CustomTextInput
                name="mailId"
                formik={formik}
                label={"Support mail"}
                required
              />
            </Grid>
          </Grid>
          <Stack
            direction={"row"}
            justifyContent={"flex-end"}
            columnGap={5}
            sx={{
              width: "100%",
              borderTop: "1px solid #bfbfbf",
              bgcolor: "#dde3e2",
              py: 3,
            }}
          >
            <Button
              variant="contained"
              startIcon={<ChevronLeftIcon />}
              color="inherit"
              sx={{
                borderRadius: 20,
              }}
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{
                bgcolor: "#33cc00",
                "&:hover": { backgroundColor: "#33cc00" },
                borderRadius: 20,
                mr: "2rem",
              }}
              endIcon={<ChevronRightIcon />}
            >
              Next
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default ContactDetails;
