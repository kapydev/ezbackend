import { ListItem, Typography, Box } from "@material-ui/core";

interface IDrawerItem {
    name: string
}

function DrawerItem(props: IDrawerItem) {
    return (
        <ListItem button={true}>
            <Typography>
                <Box color="white">
                    {props.name}
                </Box>
            </Typography>
        </ListItem>
    )
}

export default DrawerItem;
