import { InputLabel, TextField, Typography, MenuItem } from "@mui/material";
import { Caption } from "./Caption";

export default function CustomTextInput({
  label,
  placeholder = `Enter ${label}`,
  name,
  formik,
  caption,
  select,
  children,
  required,
}) {
  const shouldCapitalize = name !== "mailId" && name !== "website";
  return (
    <>
      <InputLabel>
        {label}{" "}
        {required ? (
          <Typography color="error" display={"inline-block"}>
            *
          </Typography>
        ) : null}
      </InputLabel>
      {caption && <Caption>{caption}</Caption>}
      <TextField
        size="small"
        fullWidth
        name={name}
        variant="filled"
        select={select}
        placeholder={placeholder}
        onChange={(e) => formik.handleChange(e)}
        value={formik.values[name]}
        error={
          formik ? formik.touched[name] && Boolean(formik.errors[name]) : ""
        }
        helperText={formik ? formik.touched[name] && formik.errors[name] : ""}
        inputProps={{
          style: shouldCapitalize
            ? {
                textTransform: "capitalize",
              }
            : {},
        }}
      >
        {children}
      </TextField>
    </>
  );
}
