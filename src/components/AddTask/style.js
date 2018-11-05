export const styles = theme => ({
  layout: {
    width: "auto",
    display: "flex",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: "75vw",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  icon: {
    marginRight: theme.spacing.unit * 3 * 3,
    marginLeft: theme.spacing.unit * 3 * 3,
    fontSize: 175,
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.secondary.main
    },
    margin: theme.spacing.unit * 3
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  fileUpload: {
    display: "none"
  }
});
