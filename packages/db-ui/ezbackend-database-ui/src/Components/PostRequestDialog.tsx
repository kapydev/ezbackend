import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import promiseToast from "../Utils/promiseToast";
import Form from "@rjsf/material-ui";
import { getBaseURL } from "../Helpers";

//URGENT TODO: Make lerna publish script prepare run react build command

const URL = getBaseURL()

interface IPostRequestDialog {
    open: boolean
    getCreateSchema?: any
    selectedItem: string
    handleGetRowData(): void
    handleCloseDialog(): void
}

export default function PostRequestDialog(props: IPostRequestDialog) {

    const handlePost = (allData: any) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(allData.formData)
        };
        let fetchPromise = fetch(`${URL}/${props.selectedItem}/`, requestOptions)
            .then((response) => { if (!response.ok) { throw Error(response.statusText) } return response })
            .finally(() => {
                props.handleCloseDialog()
                props.handleGetRowData()
            })

        promiseToast(fetchPromise)
    }

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleCloseDialog} maxWidth="xs" >
                <Box padding={4} marginBottom={0}>
                    <Form
                        schema={props.getCreateSchema()}
                        onSubmit={handlePost}
                    />
                </Box>
            </Dialog>
        </div>
    )
}