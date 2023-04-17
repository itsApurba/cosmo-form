import { Center, Heading } from "@chakra-ui/react";
import "./App.css";
import Form from "./components/Form";

function App() {
  return (
    <div className='App'>
      <Center flexDirection={"column"} w={"90vw"} margin={"auto"}>
        <Heading>Cosmo Form</Heading>
        <Form />
      </Center>
    </div>
  );
}

export default App;
