import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

// TODO: Make this code less disgusting
export const AllEndpointFormats = ({ method, options, contents, returns, url }) => (
  <Tabs
    defaultValue="async"
    values={[
      { label: "Async", value: "async" },
      { label: "Sync", value: "sync" },
      { label: "Full", value: "full" },
    ]}
  >
    <TabItem value="async">
      <CodeBlock className="language-ts">
        {`app.${method.toLowerCase()}("${url ?? "/"}",${
          options
            ? `{
${options.replace(/^/gm, "    ")}
  },`
            : ""
        } async (req,res) => {\n`}
        {contents.replace(/^/gm, "  ")}
        {contents != "" ? "\n  " : ""}
        {`return ${returns}`}
        {`\n});`}
      </CodeBlock>
    </TabItem>
    <TabItem value="sync">
      <CodeBlock className="language-ts">
        {`app.${method.toLowerCase()}("${url ?? "/"}",${
          options
            ? `{
${options.replace(/^/gm, "    ")}
  },`
            : ""
        } function (req,res) {\n`}
        {contents.replace(/^/gm, "  ")}
        {contents !== "" ? "\n  " : ""}
        {`res.send(${returns})`}
        {`\n});`}
      </CodeBlock>
    </TabItem>
    <TabItem value="full">
      <CodeBlock className="language-ts">
        {`app.route({
  method: ${method.toUpperCase()}, //Can be array of methods
  url: '${url ?? "/"}',
  handler: async => (req, res) { //sync version works too
    ${
      contents.replace(/^/gm, "") + (contents !== "" ? "\n    " : "")
    }return ${returns}
  }${options ? `,\n${options.replace(/^/gm, "  ")}` : ""}
})`}
      </CodeBlock>
    </TabItem>
  </Tabs>
);

export default AllEndpointFormats