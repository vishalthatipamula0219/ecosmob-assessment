import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  TableContainer,
  TableRow,
  Table,
  TableCell,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { useSelector } from "react-redux";

const PreviewPage = ({ onSubmit }) => {
  const registrationDetails = useSelector(
    (store) => store.registrationReducer.registration
  );
  const contactDetails = useSelector(
    (store) => store.registrationReducer.contact
  );

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Brand Registration</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TableContainer
              sx={{ width: ["100%", "40%"], textTransform: "capitalize" }}
            >
              <Table>
                <TableRow>
                  <TableCell>Legal Business Name</TableCell>
                  <TableCell>{registrationDetails.businessName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Country of Registration</TableCell>
                  <TableCell>{registrationDetails.country}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Enter Federal Business ID</TableCell>
                  <TableCell>{registrationDetails.businessId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Vertical</TableCell>
                  <TableCell>{registrationDetails.vertical}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Stock Symbol</TableCell>
                  <TableCell>{registrationDetails.stockSymbol}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Business Type</TableCell>
                  <TableCell>{registrationDetails.businessType}</TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Contact Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TableContainer
              sx={{ width: ["100%", "40%"], textTransform: "capitalize" }}
            >
              <Table>
                <TableRow>
                  <TableCell>Business Address</TableCell>
                  <TableCell>{contactDetails.businessAddress}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>City</TableCell>
                  <TableCell>{contactDetails.city}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Postal Code</TableCell>
                  <TableCell>{contactDetails.postalCode}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Primary Business Phone</TableCell>
                  <TableCell>{contactDetails.businessPhone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Support Phone Number</TableCell>
                  <TableCell>{contactDetails.alternatePhone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Business Website</TableCell>
                  <TableCell>{contactDetails.website}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Support email</TableCell>
                  <TableCell sx={{ textTransform: "none" }}>
                    {contactDetails.mailId}
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Stack sx={{ my: 2 }}>
        <Button
          onClick={onSubmit}
          sx={{ alignSelf: "flex-end" }}
          variant="contained"
        >
          Submit
        </Button>
      </Stack>
    </div>
  );
};

export default PreviewPage;
