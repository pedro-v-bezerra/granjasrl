import MainAdd from "./components/MainAdd";
import { GranjaProvider } from "../context/GranjaContext";

export default function Lista() {

  return (
    <>
      <GranjaProvider>
        <MainAdd />
      </GranjaProvider>
    </>
  );
}
