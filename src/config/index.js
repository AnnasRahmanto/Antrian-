import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../page/home";
import EditContent from "../page/edit";

const publicRouter = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/editContent" element={<EditContent />} />
      </Routes>
    </>
  );
};

export default publicRouter;
