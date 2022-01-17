import {
  Grid,
  Hidden,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Button,
} from '@material-ui/core';
import DrawerItem from './DrawerItem';
import MenuIcon from '@material-ui/icons/Menu';
import Database from '../Pages/Database';
import Docs from '../Pages/Docs';
import SocketIODocs from '../Pages/SocketIODocs';
import openInNewTab from '../Utils/openInNewTab';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const drawerItems = (
  <>
    <Link to="/" style={{ textDecoration: 'none' }}>
      <DrawerItem name="Database" />
    </Link>
    <Link to="/api-documentation" style={{ textDecoration: 'none' }}>
      <DrawerItem name="API Docs" />
    </Link>
    <Link to="/socket-io-documentation" style={{ textDecoration: 'none' }}>
      <DrawerItem name="Socket IO Docs" />
    </Link>
  </>
);

interface ILayout {
  open: boolean;
  handleOpen(): void;
  handleClose(): void;
}

function Layout(props: ILayout) {
  return (
    <Box bgcolor="eee" minHeight="100vh">
      <Router basename="/db-ui">
        <Grid
          container
          direction="column"
          style={{ backgroundColor: '#eee', minHeight: '100vh' }}
        >
          <Grid item>
            <AppBar
              position="relative"
              elevation={0}
              style={{ backgroundColor: '#1C2023' }}
            >
              <Toolbar>
                {/* For Mobile Only */}
                <Hidden smUp>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={props.handleOpen}
                  >
                    <MenuIcon />
                  </IconButton>
                </Hidden>

                {/* For Mobile Only */}
                <Hidden smUp>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={props.handleOpen}
                  >
                    <MenuIcon />
                  </IconButton>
                </Hidden>

                <Button
                  style={{ textTransform: 'none' }}
                  onClick={() => {
                    openInNewTab('https://www.ezbackend.io/');
                  }}
                >
                  <Typography variant="h5" align="center">
                    <Box fontFamily="monospace" padding={2} color="#F5EEEB">
                      EzBackend
                    </Box>
                  </Typography>
                </Button>

                {drawerItems}
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item>
            <Switch>
              <Route path="/api-documentation">
                <Docs />
              </Route>
              <Route path="/socket-io-documentation">
                <SocketIODocs />
              </Route>
              <Route path="/">
                <Database />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Router>
    </Box>
  );
}

export default Layout;
