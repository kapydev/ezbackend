import React from 'react'
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

const CodeSnippet = ({ sample, fullCode }) =>
    <Tabs
        defaultValue="Sample"
        values={[
            { label: "Sample", value: "Sample" },
            { label: "Full Sample", value: "Full Sample" },
        ]}
    >
        <TabItem value="Sample">
            <CodeBlock className="language-ts">{sample}</CodeBlock>
        </TabItem>
        <TabItem value="Full Sample">
            <CodeBlock className="language-ts">
                {fullCode}
            </CodeBlock>
        </TabItem>
    </Tabs>



export default CodeSnippet