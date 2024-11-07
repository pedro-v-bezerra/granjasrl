import MainLista from "./components/MainDetalhes";
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
