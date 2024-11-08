"use client";
import Main from './components/Main';
import { GranjaProvider } from './context/GranjaContext';
export default function App() {

  return (
    <>
      <GranjaProvider>
        <Main />
      </GranjaProvider>
    </>
  );
}
