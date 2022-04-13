import {
  Paper,
  Box,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function PackageForm({ callback, onBack, selectedPack }) {
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
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {    
    callback(data);
  };

  const goBack = () => {
    onBack(false);
  };

  return (
    <Paper>
      <Box px={3} py={2}>
        <Typography variant="h6" align="center" margin="dense">
          {selectedPack?.insurer_name}
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              margin="dense"
              {...register("email")}
              error={errors.email ? true : false}
            />
            <Typography variant="inherit" color="error">
              {errors.email?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="year"
              name="year"
              label="Year"
              fullWidth
              margin="dense"
              {...register("year")}
              error={errors.year ? true : false}
            />
            <Typography variant="inherit" color="error">
              {errors.year?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              inputRef={register("gender")}
              select
              onChange={(e) => setValue("gender", e.target.value, true)}
              label="gender"
              error={errors.gender ? true : false}
            >
              {options.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Typography variant="inherit" color="error">
              {errors.gender?.message}
            </Typography>
          </Grid>
        </Grid>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          mt="1rem"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Register
          </Button>
          <Button variant="contained" color="secondary" onClick={goBack}>
            Back
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
