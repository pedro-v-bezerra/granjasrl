"use client";
import Lista from "./Lista";
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import Detalhes from "./Detalhes";
import { useContext } from "react";
import { GranjaContext } from "../context/GranjaContext";
export default function Main() {

  const { selectedEdit, selectedAdd, selectedDetalhes} = useContext(GranjaContext)

  return (
    <>
      {selectedAdd ? <AddForm /> : selectedEdit ? <EditForm/> : selectedDetalhes ? <Detalhes/> : <Lista/>}
    </>
  );
}
