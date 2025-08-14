import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import {useState} from "react";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
function Cabins() { 
  const [showForm, setShowForm] = useState(false);
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>Filter / Sort</p>  
    </Row>
    <Row type="vertical">
      <CabinTable />
        <Button onClick={() => setShowForm(!showForm)}>{showForm? "Close Form" : "Add New Cabin"}</Button>
    </Row>
    {showForm && <CreateCabinForm />}
    </>
  );
}

export default Cabins;
