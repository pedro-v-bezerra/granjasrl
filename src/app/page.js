"use client";
import Lista from "./lista/page";
import { GranjaProvider } from './context/GranjaContext';
export default function App() {

  return (
    <>
      <GranjaProvider>
        <Lista />
      </GranjaProvider>
    </>
  );
}
