import Layout from "./Components/Layout";
import 'rapidoc';
import { useState } from "react";

const items: string[] = ['Database ', 'API Documentation']

function App() {

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Layout
      drawerItems={items}
      open={open}
      handleClose={() => { setOpen(false) }}
      handleOpen={() => { setOpen(true) }}
    />
  );
}

export default App;
