import { getCabins } from "../services/apiCabins";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import React, { useEffect } from "react";

function Cabins() {
  useEffect(function(){
    getCabins().then(cabins => console.log(cabins));
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img src="https://kacnbldprojrqsdujlyl.supabase.co/storage/v1/object/public/cabin-images//cabin-005.jpg" alt="Cabin" />
    </Row>
  );
}

export default Cabins;
