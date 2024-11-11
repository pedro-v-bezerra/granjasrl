"use client";
import Lista from "./Lista";
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import Detalhes from "./Detalhes";
import Login from "./Login";
import { useContext } from "react";
import { GranjaContext } from "../context/GranjaContext";
export default function Main() {

  const { selectedEdit, selectedAdd, selectedDetalhes, selectedLogin, setSelectedLogin } = useContext(GranjaContext)

  return (
    <>
      {selectedAdd ?
        <AddForm />
        : selectedEdit ? <EditForm />
          : selectedDetalhes ? <Detalhes />
            : selectedLogin ? <Login />
              : <Lista />
      }
    </>
  );
}
