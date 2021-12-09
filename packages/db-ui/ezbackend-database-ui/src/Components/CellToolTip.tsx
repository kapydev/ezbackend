import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(() =>
  createStyles({
    tooltip: {
      backgroundColor: "#FFF",
      color: "#EEE",
      boxShadow: "1px",
      fontSize: 11,
      maxWidth: 350,
    },
  }),
);

interface ICellToolTip {
  title: string;
  children: any;
}

export default function CellToolTip(props: ICellToolTip) {
  const classes = useStyles();
  return (
    <Tooltip title={props.title} className={classes.tooltip} arrow>
      {props.children}
    </Tooltip>
  );
}
