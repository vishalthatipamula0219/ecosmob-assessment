import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  registration: {
    businessName: "",
    country: "",
    businessId: "",
    vertical: "",
    stockSymbol: "",
    businessType: "",
  },
  contact: {
    businessAddress: "",
    city: "",
    postalCode: "",
    businessPhone: "",
    alternatePhone: "",
    website: "",
    mailId: "",
  },
  invoiceConsent: { agree: "false" },
};

const brandRegistrationSlice = createSlice({
  name: "brandRegistration",
  initialState: initialState,
  reducers: {
    brandRegistration: (state, { payload }) => {
      state.registration = payload;
    },
    contactDetails: (state, { payload }) => {
      state.contact = payload;
    },
    invoice: (state, { payload }) => {
      state.invoiceConsent = payload;
    },
    reset: (state) => {
      state.registration = {
        businessName: "",
        country: "",
        businessId: "",
        vertical: "",
        stockSymbol: "",
        businessType: "",
      };
      state.contact = {
        businessAddress: "",
        city: "",
        postalCode: "",
        businessPhone: "",
        alternatePhone: "",
        website: "",
        mailId: "",
      };
      state.invoiceConsent = { agree: "false" };
    },
  },
});

export const { brandRegistration, contactDetails, invoice, reset } =
  brandRegistrationSlice.actions;
export default brandRegistrationSlice.reducer;
