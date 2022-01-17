import { ListItem, Typography, Box } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

interface IDrawerItem {
  name: string;
  route: string;
}

function DrawerItem(props: IDrawerItem) {
  const location = useLocation();
  return (
    <ListItem button={true}>
      <Typography>
        <Box
          color={location.pathname === props.route ? '#1C2023' : 'white'}
          fontFamily="monospace"
          padding={1}
          paddingX={2}
          borderRadius={6}
          fontWeight={location.pathname === props.route ? 'bold' : 'normal'}
          style={{
            backgroundColor:
              location.pathname === props.route ? 'white' : '#1C2023',
          }}
        >
          {props.name}
        </Box>
      </Typography>
    </ListItem>
  );
}

export default DrawerItem;
