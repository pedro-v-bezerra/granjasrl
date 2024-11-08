import MainEdit from "./components/MainEdit";
import { GranjaProvider } from "../context/GranjaContext";

export default function Lista() {

  return (
    <>
      <GranjaProvider>
        <MainEdit />
      </GranjaProvider>
    </>
  );
}
