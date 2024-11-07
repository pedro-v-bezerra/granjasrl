import MainLista from "./components/MainLista";
import { GranjaProvider } from "../context/GranjaContext";

export default function Lista() {

  return (
    <>
      <GranjaProvider>
        <MainLista />
      </GranjaProvider>
    </>
  );
}
