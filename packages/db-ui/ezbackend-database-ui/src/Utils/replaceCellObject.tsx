import { GridCellParams } from "@mui/x-data-grid"

export default function replaceCellObject(params: GridCellParams) {
    if (params.value instanceof Object) {
        return "toBeReplaced"
    }
    else {
        return ""
    }
}