import { Grid, Hidden, AppBar, IconButton, Toolbar, Typography, Box, List } from "@material-ui/core";
import DrawerItem from "./DrawerItem";
import MenuIcon from '@material-ui/icons/Menu';
import Database from "../Pages/Database";
import Docs from "../Pages/Docs";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const drawerItems =
    <>
        <Link to='/' style={{ textDecoration: 'none' }}>
            <DrawerItem name="Database" />
        </Link>
        <Link to='/api-documentation' style={{ textDecoration: 'none' }}>
            <DrawerItem name="API Docs" />
        </Link>
    </>

interface ILayout {
    drawerItems: string[]
    open: boolean
    handleOpen(): void
    handleClose(): void
}

function Layout(props: ILayout) {

    return (
        <Box bgcolor="eee" minHeight="100vh">
            <Router>
                <Grid container direction="column" style={{ backgroundColor: "#eee", minHeight: "100vh" }}>
                    <Grid item>
                        <AppBar position="relative" elevation={0} style={{ backgroundColor: '#3B3228' }}>
                            <Toolbar>

                                {/* For Mobile Only*/}
                                <Hidden smUp>
                                    <IconButton edge="start" color="inherit" onClick={props.handleOpen}>
                                        <MenuIcon />
                                    </IconButton>
                                </Hidden>

                                <Box padding={2}>
                                    <Typography variant="h5" align="center">
                                        <Box fontFamily="monospace">
                                            EzBackend
                                        </Box>
                                    </Typography>
                                </Box>

                                {drawerItems}

                            </Toolbar>
                        </AppBar>
                    </Grid>
                    <Grid item>
                        <Switch>
                            <Route path="/api-documentation">
                                <Docs />
                            </Route>
                            <Route path="/">
                                <Database />
                            </Route>
                        </Switch>
                    </Grid>
                </Grid >
            </Router>
        </Box>
    );
}

export default Layout;
