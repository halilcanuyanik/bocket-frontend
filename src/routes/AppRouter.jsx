import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
    </Routes>
  );
}

export default AppRouter;
