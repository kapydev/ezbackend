import React, { Fragment } from 'react';
import Editor from 'react-simple-code-editor';
import Highlight, { Prism } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/dracula';
import { useWindupString } from 'windups';

const originalCode = `const app = new EzBackend()

const pets = new EzModel('Pets', {
    name: Type.VARCHAR,
    species: Type.VARCHAR,
    age: Type.INT
  })

app.addApp("pets", pets, { prefix: "pets" })    

app.start()
`;

const highlightCode = (code) => (
  <Highlight Prism={Prism} code={code} theme={theme} language="typescript">
    {({ tokens, getLineProps, getTokenProps }) => (
      <Fragment>
        {tokens.map((line, i) => (
          /// eslint-disable-next-line react/jsx-key
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              /// eslint-disable-next-line react/jsx-key
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </Fragment>
    )}
  </Highlight>
);

export function MovingCode(props) {
  // const [code, setCode] = useState(originalCode)

  const [code] = useWindupString(props.text, { pace: () => 50 });

  return (
    <div>
      <Editor
        value={code}
        // onValueChange={(code) => {}}
        highlight={highlightCode}
        padding={10}
      />
    </div>
  );
}
