import React from "react";

import CabinTable from './../features/cabins/CabinTable';
import CreateCabinForm from './../features/cabins/CreateCabinForm';
import CabinTableOperations from './../features/cabins/CabinTableOperations';
import AddCabin from './../features/cabins/AddCabin';

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";


function Cabins(){

    return <>
        <Row type="horizontal">
            <Heading as="h1">All cabins</Heading>
            <CabinTableOperations />
        </Row>
        <Row>
            <CabinTable />
            <AddCabin />
        </Row>
    </>
}

export default Cabins;
