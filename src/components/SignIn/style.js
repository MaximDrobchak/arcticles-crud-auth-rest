export const styles = theme => ({
  root: {
    textAlign: "center"
  },
  model: {
    heigth: "100%",
    textAlign: "center",
    "overflow-x": "hidden",
    "overflow-y": "hidden",
    padding: {
      bottom: 30,
      left: 30,
      rigth: 30
    }
  },
  icon: {
    fontSize: 75,
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.secondary.main
    },
    margin: theme.spacing.unit * 3
  },
  layout: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});
