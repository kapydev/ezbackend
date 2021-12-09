import "rapidoc"; // <-- import rapidoc
import Fade from "@material-ui/core/Fade";
import { getBaseURL } from "../Helpers";
import dotenv from "dotenv";

dotenv.config();

const URL = getBaseURL();

export default function Docs() {
  return (
    <Fade in={true} timeout={600}>
      {/* @ts-ignore */}
      <rapi-doc
        rapi-doc
        spec-url={`${URL}/docs/json`}
        render-style="read"
        style={{ height: "92vh", width: "100%" }}
        nav-bg-color="#3B3228"
        show-header="false"
      />
    </Fade>
  );
}
