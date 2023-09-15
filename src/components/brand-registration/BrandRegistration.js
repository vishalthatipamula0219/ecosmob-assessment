import {
  Box,
  FormControlLabel,
  FormLabel,
  Grid,
  Stack,
  Typography,
  Checkbox,
  FormGroup,
  Button,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { MainHeading } from "../common/MainHeading";
import { useFormik } from "formik";
import * as yup from "yup";
import CustomTextInput from "../common/FormCustomInput";
import { Caption } from "../common/Caption";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSelector } from "react-redux";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import brandImage from "../../assets/images/brand-registration.png";

const BrandRegistration = ({ onNext }) => {
  const [countriesList, setCountriesList] = useState([]);
  useEffect(() => {
    fetchCountriesList();
  }, []);
  const validationSchema = yup.object({
    businessName: yup
      .string()
      .max(11)
      .required("Business Name is mandatory field"),
    country: yup.string().required("Country is mandatory field"),
    businessId: yup
      .string()
      .matches(/^[0-9]+$/, "Field must contain only numbers")
      .max(11, "Field cannot exceed 11 digits")
      .required("BusinessId is mandatory field"),
    vertical: yup.string().required("Verical is mandatory field"),
    stockSymbol: yup.string().required("Stock symbol is mandatory field"),
    businessType: yup.string().required("Please select this field"),
  });
  const fetchCountriesList = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const list = await response.json();
      setCountriesList(list);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const registrationVal = useSelector(
    (store) => store.registrationReducer.registration
  );

  const formik = useFormik({
    initialValues: registrationVal
      ? registrationVal
      : {
          businessName: "",
          country: "",
          businessId: "",
          vertical: "",
          stockSymbol: "",
          businessType: "",
        },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onNext({ values, type: "registration" });
    },
  });

  return (
    <Box sx={{ boxShadow: "0px 0px 20px -1px #00000012", mb: 5 }}>
      <MainHeading>Brand Registration</MainHeading>
      <Box sx={{ px: 4 }}>
        <img src={brandImage} alt="Brand Image" style={{ width: "100%" }} />
      </Box>
      <Stack
        direction={"row"}
        sx={{ bgcolor: "#fecaca", p: 1, mx: "2rem" }}
        columnGap={1}
      >
        <ErrorOutlineIcon color="disabled" />

        <Typography sx={{ fontSize: ["0.5rem", "1rem"] }}>
          Please make sure your business name and federal business ID (EIN for
          businesses, Corporation Number for Canadian registered businesses)
          match exactly.Mismatches (even minor) will result in immediate
          rejection
        </Typography>
      </Stack>

      <Box sx={{ bgcolor: "#FFFFFF" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            alignItems={"center"}
            rowGap={3}
            columnSpacing={5}
            sx={{ px: "2rem", pb: "3rem", pt: "1rem" }}
          >
            <Grid item lg={6}>
              <CustomTextInput
                name="businessName"
                formik={formik}
                label={"Legal Business Name"}
                caption="(Please make sure your business name matches with IRS records)"
                required
              />
            </Grid>
            <Grid item lg={6} width={"100%"}>
              <CustomTextInput
                name="country"
                formik={formik}
                label={"Country of registration"}
                select
                required
              >
                {countriesList.length > 0
                  ? countriesList
                      .sort(
                        (a, b) =>
                          a.name.official.toLowerCase().charCodeAt() -
                          b.name.official.toLowerCase().charCodeAt()
                      )
                      .map((country) => {
                        return (
                          <MenuItem
                            value={country.name.official}
                          >{`${country.name.official} - ${country.altSpellings[0]}`}</MenuItem>
                        );
                      })
                  : null}
              </CustomTextInput>
            </Grid>
            <Grid item lg={6}>
              <CustomTextInput
                name="businessId"
                formik={formik}
                label={"Enter Federal Business ID"}
                caption="(EIN for US companies, Corporation # for CA)"
                required
              />
            </Grid>
            <Grid item lg={6} width={"100%"}>
              <CustomTextInput
                name="vertical"
                formik={formik}
                label={"Vertical"}
                caption="(Select One)"
                select
                required
              >
                {[
                  "13289289982",
                  "13289703982",
                  "13289203982",
                  "67289203982",
                ].map((id) => {
                  return <MenuItem value={id}>{id}</MenuItem>;
                })}
              </CustomTextInput>
            </Grid>
            <Grid item lg={6} width={"100%"}>
              <CustomTextInput
                name="stockSymbol"
                formik={formik}
                label={"Stock Symbol"}
                caption="(For publicly traded company only)"
              />
            </Grid>
            <Grid item lg={6} md={12}>
              <FormLabel>Business Type</FormLabel>
              <Typography color="error" display={"inline-block"}>
                *
              </Typography>
              <Caption>(select business type you own)</Caption>
              <FormGroup>
                <Grid container lg={12}>
                  <Grid item lg={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="publiclyTradedCompany"
                          name="businessType"
                          onChange={() =>
                            formik.setFieldValue(
                              "businessType",
                              "publiclyTradedCompany"
                            )
                          }
                          checked={
                            formik.values.businessType ===
                            "publiclyTradedCompany"
                          }
                        />
                      }
                      label="Publicly Traded Company"
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="nonProfitOrganisation"
                          name="businessType"
                          onChange={() =>
                            formik.setFieldValue(
                              "businessType",
                              "nonProfitOrganisation"
                            )
                          }
                          checked={
                            formik.values.businessType ===
                            "nonProfitOrganisation"
                          }
                        />
                      }
                      label="Non Profit Organisation"
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="privateCompany"
                          name="businessType"
                          onChange={() =>
                            formik.setFieldValue(
                              "businessType",
                              "privateCompany"
                            )
                          }
                          checked={
                            formik.values.businessType === "privateCompany"
                          }
                        />
                      }
                      label="Private Company"
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="government"
                          name="businessType"
                          onChange={() =>
                            formik.setFieldValue("businessType", "government")
                          }
                          checked={formik.values.businessType === "government"}
                        />
                      }
                      label="Government"
                    />
                  </Grid>
                </Grid>
              </FormGroup>
              {formik.touched.businessType && formik.errors.businessType && (
                <Typography variant="caption" color="error">
                  {formik.errors.businessType}
                </Typography>
              )}
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

export default BrandRegistration;
