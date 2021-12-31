import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const { isLoading, isGameEnd } = useGlobalContext();
  if (isLoading) {
    return <Loading />;
  }
  if (!isGameEnd) {
    return <Modal />;
  }
  return <SetupForm />;
}

export default App;
