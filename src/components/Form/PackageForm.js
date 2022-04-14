import { useState } from "react";
import {
  Paper,
  Box,
  TextField,
  Typography,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function PackageForm({ callback, onBack, selectedPack }) {
  const [isPending, setIsPending] = useState(false);

  const validationSchema = Yup.object().shape({
    year: Yup.number()
      .required("Year is required")
      .typeError("You must specify a number")
      .min(0, "Min value 0.")
      .max(200, "Max value 200."),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    gender: Yup.string().required("Gender is required"),
  });

  const options = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    {
      label: `I don't want to answer`,
      value: `I don't want to answer`,
    },
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    let info = Object.assign(data, selectedPack);
    info = JSON.stringify(info, null, 2);
    setIsPending(true);
    // www.example.com
    try {
      let res = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: info,
      });
      setIsPending(false);
      if (res.status === 200) {
        alert(`User created successfully\n${info}`);
      } else {
        alert("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
    callback()
  };

  const goBack = () => {
    onBack(false);
  };

  return (
    <Paper
      sx={{
        width: { sx: "100%", md: "600px" },
        m: 0.5,
      }}
      elevation={4}
    >
      <Box px={3} py={2}>
        <Typography variant="h6" align="center" margin="dense">
          {selectedPack?.insurer_name}
        </Typography>
        <Stack spacing={{ xs: 1, sm: 2, md: 4 }} mt={1}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            margin="dense"
            {...register("email")}
            error={errors.email ? true : false}
            helperText={errors.email?.message}
          />

          <TextField
            required
            id="year"
            name="year"
            label="Year"
            fullWidth
            margin="dense"
            {...register("year")}
            error={errors.year ? true : false}
            helperText={errors.year?.message}
          />

          <Controller
            name="gender"
            control={control}
            render={({ field: { ref, onChange }, fieldState: { error } }) => (
              <TextField
                fullWidth
                inputRef={ref}
                select
                onChange={onChange}
                label="gender"
                defaultValue={""}
                error={errors.gender ? true : false}
                helperText={error ? error.message : null}
              >
                {options.map((option) => (
                  <MenuItem key={option.label} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent="space-between"
          mt={2}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
          <Button variant="contained" color="secondary" onClick={goBack}>
            Back
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
