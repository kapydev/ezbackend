import { DataGrid, GridColDef, GridCellEditCommitParams, GridCellValue } from '@mui/x-data-grid';
import { Fade, IconButton, Typography, Box, Grid } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { getBaseURL } from '../Helpers';
import modelNameCustomRemover from '../Utils/modelNameCustomRemover';
import replaceCellObject from '../Utils/replaceCellObject'
import SchemaListItem from '../Components/SchemaListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import PostRequestDialog from '../Components/PostRequestDialog';
import ISchema from '../Interfaces/ISchema';
import IJsonSchema from '../Interfaces/IJsonSchema';
import promiseToast from '../Utils/promiseToast';
import ReactJson from 'react-json-view'
import dotenv from "dotenv";
import '../App.css';

dotenv.config()

const URL = getBaseURL()

function Database() {

    const [fullSchemas, setFullSchemas] = useState<ISchema[]>([]);

    const [createSchemas, setCreateSchemas] = useState<IJsonSchema[]>([]);

    const [modelNames, setModelNames] = useState<string[]>([]);

    const [columnNames, setColumnNames] = useState<GridColDef[]>([]);

    const [rowData, setRowData] = useState<Object[]>([]);

    const [selectedItem, setSelectedItem] = useState<string>("");

    const [openPostRequestDialog, setOpenPostRequestDialog] = useState(false);

    const [deleteRowsIndex, setDeleteRowsIndex] = useState<number[]>([]);

    const [cellDataValue, setCellDataValue] = useState<GridCellValue>({})


    useEffect(() => {

        fetch(`${URL}/docs/json`)

            .then(function (response) { if (!response.ok) { throw Error(response.statusText) } return response.json() })

            .then((data) => {

                data = Object.values(data.components.schemas)

                let newData: ISchema[] = data.map((item: IJsonSchema) => { return { schemaName: item.title, properties: item.properties } })

                let fullschemas: ISchema[] = newData.filter(schema => schema.schemaName.includes('fullSchema-')).map(schema => { return { schemaName: schema.schemaName.replace('fullSchema-', ''), properties: schema.properties } })

                let modelnames: string[] = fullschemas.map(schema => { return schema.schemaName })

                let createschemas = data.filter((schema: any) => schema.title.includes('createSchema-'))

                createschemas.forEach((schema: IJsonSchema) => { schema.title = schema.title.replace('createSchema-', '') })

                setFullSchemas(fullschemas)
                setCreateSchemas(createschemas)
                setModelNames(modelnames)

                let initialSelectedItem = modelnames[0]

                setSelectedItem(initialSelectedItem)
                handleGetRowData(initialSelectedItem)
                handleGetColumnData(initialSelectedItem, fullschemas)

            })

            .catch((error) => toast("ERROR", error.message));

    }, [])

    function handleListItemClick(clickedItem: string) {

        setSelectedItem(clickedItem)
        promiseToast(handleGetRowData(clickedItem))
        handleGetColumnData(clickedItem, fullSchemas)
        setCellDataValue({})

    }

    function handleGetColumnData(routeName: string, fullschemas: ISchema[]) {
        fullschemas?.forEach(schema => {
            if (routeName === schema.schemaName) {
                setColumnNames(Object.keys(schema.properties).map(property => {
                    let [charLenThreshHold, maxCellWidth, widthMultiplier] = [5, 150, 45]
                    return {
                        field: property,
                        width: (property.length > charLenThreshHold) ? maxCellWidth : widthMultiplier * property.length,
                        editable: (property === 'id') ? false : true
                    }
                }))
            }
        })
    }

    function handleGetRowData(routeName: string) {

        let fetchPromise = fetch(`${URL}/${routeName}/`)
            .then(function (response) { if (!response.ok) { throw Error(response.statusText) } return response.json() })
            .then((data) => { setRowData(data) })

        return fetchPromise
    }

    function handleOpenPostRequestDialog() {
        if (getCreateSchema()) {
            //Only if the schema exists
            setOpenPostRequestDialog(true)
        }
    }

    function handleClosePostRequestDialog() {
        setOpenPostRequestDialog(false)
    }

    function handleDeleteSelectedRows() {
        let ids = [...deleteRowsIndex]
        if (ids.length === 0) {
            toast('Please select some rows')
        }
        ids.forEach(id => {

            let fetchPromise = fetch(`${URL}/${selectedItem}/${id}`, { method: 'DELETE' })
                .then(function (response) { if (!response.ok) { throw Error(response.statusText) } return response })
                .finally(() => handleGetRowData(selectedItem))

            promiseToast(fetchPromise)
        })
    }

    function handlePatchSelectedCell(patchdata: GridCellEditCommitParams) { //@ts-ignore
        let id: number = patchdata.id
        let body: any = {};
        body[patchdata.field] = patchdata.value
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        let fetchPromise = fetch(`${URL}/${selectedItem}/${id}`, requestOptions)
            .then(function (response) { if (!response.ok) { throw Error(response.statusText) } return response })
            .finally(() => { handleGetRowData(selectedItem) })

        promiseToast(fetchPromise)

    }

    function getCreateSchema() {
        let createschemas: IJsonSchema[] = [...createSchemas]
        let c = createschemas?.filter(createschema => { return createschema.title === selectedItem })[0]
        if (createSchemas.length === 0) {
            //TODO: @Stephen Any Idea why its rendering twice?
            // toast.error("No schemas have been created yet, add an EzModel to your database")
            return null
        }
        if (c === undefined) {
            // toast.error("The selected schema is invalid")
            return null
        }
        return c
    }

    return (
        <Fade in={true} timeout={600}>
            <Box bgcolor="#EEEEEE" minHeight="100vh" padding={4}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    spacing={5}
                >
                    <Grid item xs={12} md={3}>
                        <Grid container direction="column" spacing={5}>
                            <Grid item>
                                <Box style={{ borderRadius: 10, backgroundColor: "white", padding: 24, overflow: "hidden" }}>
                                    <Scrollbars autoHide autoHideTimeout={100} style={{ width: "100%", minHeight: "200px" }}>
                                        {modelNameCustomRemover(modelNames).map((s) => <SchemaListItem text={s} key={s} selectedItem={selectedItem} handleListItemClick={handleListItemClick} />)}
                                    </Scrollbars>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Scrollbars style={{ width: "100%", minHeight: "60px", borderRadius: 10 }}>
                                    <ReactJson //@ts-ignore
                                        src={cellDataValue}
                                        style={{ padding: 18, borderRadius: 10 }}
                                        theme="mocha"
                                    />
                                </Scrollbars>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={9}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <Grid container direction="row" alignItems="flex-end">
                                    <Grid item>
                                        <Box marginLeft={1}>
                                            <Typography color="textSecondary" variant="subtitle2">
                                                Click row to view json | Double-click cell to edit | Select row to delete
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs>
                                        <Grid container justifyContent="flex-end">
                                            <Grid item>
                                                <IconButton color="primary" onClick={handleOpenPostRequestDialog}>
                                                    <AddIcon />
                                                </IconButton>
                                            </Grid>
                                            <Grid item>
                                                <IconButton>
                                                    <RefreshIcon onClick={() => {
                                                        let fetchPromise = handleGetRowData(selectedItem)
                                                        promiseToast(fetchPromise)
                                                    }} />
                                                </IconButton>
                                            </Grid>
                                            <Grid item>
                                                <IconButton onClick={handleDeleteSelectedRows}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <DataGrid
                                    style={{
                                        height: "79vh",
                                        backgroundColor: "#fff",
                                        borderRadius: 10,
                                        borderStyle: "hidden",
                                        padding: 12,
                                        fontFamily: "Inter"
                                    }}
                                    rows={rowData}
                                    columns={columnNames}
                                    checkboxSelection
                                    disableSelectionOnClick //@ts-ignore
                                    onSelectionModelChange={(newSelections) => { setDeleteRowsIndex(newSelections) }}
                                    onCellEditCommit={(cellData) => { handlePatchSelectedCell(cellData) }}
                                    onRowClick={(cellData) => { setCellDataValue(cellData.row) }}
                                    getCellClassName={replaceCellObject}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Typography variant="body1" align="center">
                        <Box fontFamily="monospace">
                            Powered by EzBackend
                        </Box>
                    </Typography>
                </Grid>
                <PostRequestDialog
                    open={openPostRequestDialog}
                    getCreateSchema={getCreateSchema}
                    handleGetRowData={() => handleGetRowData(selectedItem)}
                    selectedItem={selectedItem}
                    handleCloseDialog={handleClosePostRequestDialog}

                />
                <Toaster
                    position="bottom-left"
                    toastOptions={{ duration: 800 }}
                />
            </Box >
        </Fade>
    );
}

export default Database;
