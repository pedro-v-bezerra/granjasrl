import MainDetalhes from "./components/MainDetalhes";
import { GranjaProvider } from "../context/GranjaContext";

export default function Detalhes() {

  return (
    <>
      <GranjaProvider>
        <MainDetalhes />
      </GranjaProvider>
    </>
  );
}
