import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import React from "react";
import { MainHeading } from "../common/MainHeading";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useFormik } from "formik";
import * as yup from "yup";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useSelector } from "react-redux";

const tableHeadValues = [
  "Period",
  "Charges & Credits",
  "Quantity",
  "Unit Price",
  "Amount",
];

const tableDataValues = [
  "One Time Charge",
  "10 DLC SMS TCR Registration-Standard brand",
  "1",
  "$4.00",
  "$4.00",
];

const InvoicePage = ({ onNext, onBack }) => {
  const validationSchema = yup.object({
    agree: yup.string().required("Please agree Terms and Conditions"),
  });

  const formik = useFormik({
    initialValues: {
      agree: "false",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onNext({ values, type: "invoice" });
    },
  });
  const agreeTerms = useSelector(
    (store) => store.registrationReducer.invoiceConsent.agree
  );

  return (
    <Box sx={{ boxShadow: "0px 0px 20px -1px #00000012", mb: 5 }}>
      <MainHeading>Brand Registration Payment Confirmation</MainHeading>
      <Stack
        direction={"row"}
        sx={{ bgcolor: "#fecaca", p: 1, mx: "2rem" }}
        columnGap={1}
      >
        <ErrorOutlineIcon color="disabled" />
        <Typography sx={{ fontSize: ["0.5rem", "1rem"] }}>
          TCR fees are non-refundable and are set by mobile carriers and their
          registrar. Phone.com is not charging any additional fees or TCS
          registration and pays a portion of the per-message carrier fees for
          our customer.
        </Typography>
      </Stack>
      <Box sx={{ display: ["none", "unset"] }}>
        <Box sx={{ px: 4, my: 2 }}>
          <TableContainer sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeadValues.map((value) => {
                    return <TableCell>{value}</TableCell>;
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {tableDataValues.map((value) => {
                    return <TableCell>{value}</TableCell>;
                  })}
                </TableRow>
                <TableRow>
                  <TableCell align="left" colSpan={4}>
                    Charge after discounts and Pro-rates
                  </TableCell>
                  <TableCell align="left">$ 4.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Box sx={{ px: 4, my: 2, display: ["unset", "none"] }}>
        <TableContainer
          sx={{
            border: "1px solid rgba(224, 224, 224, 1)",
            maxWidth: "80%",
            ml: 4,
          }}
        >
          <Table>
            <TableRow>
              <TableCell>Period</TableCell>
              <TableCell>One Time Charge</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Charges & Credits</TableCell>
              <TableCell align="start">
                10 DLC SMS TCR Registration-Standard brand
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Quantity</TableCell>
              <TableCell align="center">1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Unit Price</TableCell>
              <TableCell align="center">$4.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell align="center">$4.00</TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ px: 4, my: 2 }}>
        <TableContainer sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Taxes</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="center">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={4}>
                  State and Local taxes{" "}
                  <span style={{ color: "#33cc00" }}>(View breakup)</span>
                </TableCell>
                <TableCell align="center">$ 0.60</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}>State and Local taxes</TableCell>
                <TableCell align="center">$ 0.60</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ px: 4, my: 2 }}>
        <TableContainer sx={{ "& .MuiTableCell-root": { padding: "4px" } }}>
          <Table>
            <TableBody>
              <TableRow style={{ borderBottom: "none" }}>
                <TableCell colSpan={4} sx={{ width: ["80%", "unset"] }}>
                  Charges after Discounts and Pro-rates:
                </TableCell>
                <TableCell align="center">$ 4.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}>State and Local taxes</TableCell>
                <TableCell align="center">$ 0.60</TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={4}
                  sx={{ fontWeight: 700, fontSize: "1rem" }}
                >
                  Subtotal
                </TableCell>
                <TableCell align="center">$ 4.60</TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={4}
                  sx={{ fontWeight: 700, fontSize: "1rem" }}
                >
                  Total Charges to Credit Card :
                </TableCell>
                <TableCell align="center">$ 4.60</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Typography sx={{ px: 4, pb: 3, fontSize: ["0.7rem", "unset"] }}>
        All the charges will appear on your statement this way Phone.com. We'll
        use this payment method on file for the account. Your payment
        information is encrypted and processed on a secured server.
      </Typography>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <FormControlLabel
            control={
              <Checkbox
                value="true"
                name="agree"
                sx={{ px: 4 }}
                onChange={() =>
                  formik.setFieldValue(
                    "agree",
                    formik.values.agree === "true" ? "false" : "true"
                  )
                }
                checked={formik.values.agree === "true" ? true : false}
              />
            }
            label={
              <span style={{ fontSize: "0.7rem" }}>
                I understand that my use of the services is governed by the
                <span style={{ color: "#33cc00" }}>{` Terms of Service `}</span>
                or Master Service Agreement,
                <span style={{ color: "#33cc00" }}>
                  {` Accepted Use Policy `}
                </span>{" "}
                and
                <span
                  style={{ color: "#33cc00" }}
                >{` SMS message Policy `}</span>
              </span>
            }
          />
          <Stack
            direction={"row"}
            justifyContent={"flex-end"}
            columnGap={5}
            sx={{
              width: "100%",
              borderTop: "1px solid #bfbfbf",
              bgcolor: "#dde3e2",
              py: 3,
              mt: 2,
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
                mr: 3,
              }}
              endIcon={<RemoveRedEyeOutlinedIcon />}
              disabled={!JSON.parse(formik.values.agree)}
            >
              Preview
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default InvoicePage;
