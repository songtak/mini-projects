import { Route, Routes, useLocation } from "react-router-dom";
import _ from "lodash";
import { MainRoutes } from "./libs/routes";
import { RoutePropInterface } from "./interfaces/commonInterface";
import { MainPage } from "./pages";
const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {MainRoutes.map((item: RoutePropInterface) => {
          const Element = item.element;
          return (
            <Route key={item.title} path={item.path} element={<Element />} />
          );
        })}
      </Routes>
      <div className="">
        <div style={{ marginTop: 30 }}></div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.location.href = "https://instagram.com/sn9tk";
          }}
        >
          songtak
        </div>
      </div>
    </>
  );
};

export default MainRouter;
