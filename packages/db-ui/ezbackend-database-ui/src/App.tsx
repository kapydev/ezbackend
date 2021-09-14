import './App.css';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { DataGrid, GridColDef, GridCellEditCommitParams, GridCellValue, GridCellParams } from '@mui/x-data-grid';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SchemaListItem from './Components/SchemaListItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'; //TODO change to png import
import AddIcon from '@material-ui/icons/Add'; //TODO change to png import
import RefreshIcon from '@material-ui/icons/Refresh'; //TODO change to png import
import PostRequestDialog from './Components/PostRequestDialog';
import ISchema from './Interfaces/ISchema';
import IJsonSchema from './Interfaces/IJsonSchema';
import Typography from '@material-ui/core/Typography';
import promiseToast from './Utils/promiseToast';
import ReactJson from 'react-json-view'
import modelNameCustomRemover from './Utils/modelNameCustomRemover';
import dotenv from "dotenv";
import { makeStyles, createTheme, Theme } from "@material-ui/core/styles";
import { Scrollbars } from 'react-custom-scrollbars';
import { getBaseURL } from './Helpers';

dotenv.config()

const URL = getBaseURL()

function App() {

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
          return {
            field: property,
            width: (property.length > 5) ? 150 : 45 * property.length,
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
    setOpenPostRequestDialog(true)
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
    return c
  }

  return (
    <div style={{ backgroundColor: "#eee", minHeight: "100vh" }}>
      <Box padding={4}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          spacing={5}
        >
          <Grid item sm={12} md={3}>
            <Grid container direction="column" spacing={5}>
              <Grid item xs>
                <Box style={{ borderRadius: 10, backgroundColor: "white", padding: 24, overflow: "hidden" }}>
                  <Scrollbars autoHide autoHideTimeout={100} style={{ width: "100%", minHeight: "200px" }}>
                    {modelNameCustomRemover(modelNames).map((s) => <SchemaListItem text={s} key={s} selectedItem={selectedItem} handleListItemClick={handleListItemClick} />)}
                  </Scrollbars>
                </Box>
              </Grid>
              <Grid item xs>
                <Scrollbars style={{ width: "100%", minHeight: "200px", borderRadius: 10 }}>
                  <ReactJson //@ts-ignore
                    src={cellDataValue}
                    style={{ padding: 18, borderRadius: 10 }}
                    theme="mocha"
                  />
                </Scrollbars>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={12} md={8}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Grid container direction="row" alignItems="flex-end">
                  <Grid item xs>
                    <Box marginLeft={1}>
                      <Typography color="textSecondary" variant="subtitle2">
                        Click row to view json | Double-click cell to edit | Select row to delete
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <IconButton color="primary" onMouseDown={handleOpenPostRequestDialog}>
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
                  getCellClassName={(params: GridCellParams) => {
                    if (params.value instanceof Object) {
                      return "toBeReplaced"
                    }
                    else {
                      return ""
                    }
                  }}
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
          createSchema={getCreateSchema()}
          handleGetRowData={() => handleGetRowData(selectedItem)}
          selectedItem={selectedItem}
          handleCloseDialog={handleClosePostRequestDialog}

        />
      </Box >
      <Toaster
        position="bottom-left"
        toastOptions={{ duration: 800 }}
      />
    </div>
  );
}

export default App;
