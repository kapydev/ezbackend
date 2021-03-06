import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      '&$selected, &$selected:hover': {
        backgroundColor: '#1C2023',
      },
      borderRadius: 6,
    },
    selected: {},
  }),
);

interface ISchemaListItem {
  text: string;
  handleListItemClick(key: string): void;
  selectedItem: string;
}

export default function SchemaListItem(props: ISchemaListItem) {
  
  const classes = useStyles()

  function checkSelected(text: string, match: string) {
    return text.replace(/^(db-ui\/)/, '') === match.replace(/^(db-ui\/)/, '');
  }

  const match = checkSelected(props.text, props.selectedItem);

  return (
    <ListItem
      button
      selected={match}
      onClick={() => props.handleListItemClick(props.text)}
      classes={{
        root: classes.listItem,
        selected: classes.selected,
      }}
    >
      <ListItemText>
        <Typography variant="body2" noWrap>
          <Box
            component="div"
            fontFamily="monospace"
            fontWeight="normal"
            fontSize={match ? 16 : 15}
            color={match ? '#F5EEEB' : '#404040'}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {props.text.replace(/^(db-ui\/)/, '')}
          </Box>
        </Typography>
      </ListItemText>
    </ListItem>
  );
}
