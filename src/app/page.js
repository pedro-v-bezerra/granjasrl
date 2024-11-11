"use client";
import Main from './components/Main';
import { GranjaProvider } from './context/GranjaContext';
import Login from './components/Login';
export default function App() {

  return (
    <>
      <GranjaProvider>
        <Main />
      </GranjaProvider>
    </>
  );
}
