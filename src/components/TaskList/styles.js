export const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 100,
    width: "100vw",
    minHeight: 260
  },
  title: {
    display: "flex",
    "& :nth-child(n)": {
      width: "100%",
      padding: 2,
      height: 50
    }
  },
  icon: {
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.secondary.main
    }
  },

  muiPaper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 210,
    width: "100%"
  },
  editPaper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    height: 210,
    width: "100%",
    display: "grid",
    gridTemplateColumns: "20% 80%"
  }
});

export const actionsStyles = theme => ({
  root: {
    width: 400,
    height: 60,
    marginTop: 25,
    display: "flex",
    justifyContent: "space-around",
    flexShrink: 1,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  },

  icon: {
    color: theme.palette.primary.main
  }
});
