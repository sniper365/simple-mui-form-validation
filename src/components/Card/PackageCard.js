import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

export default function PackageCard({ pack, onSelected }) {
  const selected = () => {
    onSelected(pack);
  };

  return (
    <Card
      onClick={selected}
      sx={{
        "&:hover": {
          background: "white",
          boxShadow: "5px 5px 30px 0px rgba(0, 0, 0, 0.2)",
        },
        cursor: "pointer",
      }}
    >
      <CardHeader
        title={pack.insurer_name}
        subheader={""}
        titleTypographyProps={{ align: "center" }}
        subheaderTypographyProps={{
          align: "center",
        }}
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[700],
        }}
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
            mb: 2,
          }}
        >
          <Typography component="h2" variant="h3" color="text.primary">
            {pack.price}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            /mo
          </Typography>
        </Box>
        <Typography component="li" variant="subtitle1" align="center">
          {pack.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
