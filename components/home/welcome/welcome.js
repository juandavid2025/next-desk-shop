import Typography from "@mui/material/Typography";

function Welcome() {
  return (
    <Typography
      variant="h6"
      component="div"
      sx={{ flexGrow: 1 }}
      color="tertiary"
      className="center"
    >
      The place to find anything you need at the right price!
    </Typography>
  );
}

export default Welcome;
