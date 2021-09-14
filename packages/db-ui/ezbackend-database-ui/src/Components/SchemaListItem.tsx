import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import removeDbui from '../Utils/removeDbui';
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
        listItem: {
            '&$selected, &$selected:hover': {
                backgroundColor: "#3B3228",
            },
            borderRadius: 6
        },
        selected: {}
    })
);

interface ISchemaListItem {
    text: string,
    handleListItemClick(key: string): void,
    selectedItem: string
}

export default function SchemaListItem(props: ISchemaListItem) {

    const classes = useStyles();

    let match = (removeDbui(props.selectedItem) === removeDbui(props.text))

    return (
        <ListItem
            button
            selected={match}
            onClick={() => props.handleListItemClick(props.text)}
            classes={{
                root: classes.listItem,
                selected: classes.selected
            }}
        >
            <ListItemText>
                <Typography variant="body2" noWrap>
                    <Box
                        component="div"
                        fontFamily={(match) ? "monospace" : "Inter"}
                        fontWeight="normal"
                        color={(match) ? "#F5EEEB" : "#404040"}
                        overflow="hidden"
                        textOverflow="ellipsis"
                    >
                        {removeDbui(props.text)}
                    </Box>
                </Typography>
            </ListItemText>
        </ListItem>
    )
}