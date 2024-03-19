import React from "react";
import { Route, Routes } from "react-router-dom";

import { publicRoutes } from "../../routes/routes";
import NotFound from "../../pages/NotFound/NotFound";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }, index) => (
        <Route path={path} key={index} element={<Component />} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;