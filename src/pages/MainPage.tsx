import React from "react";
import { MainRoutes } from "../libs/routes";
import { RoutePropInterface } from "../interfaces/commonInterface";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>송탁의 이것저것 프로젝트</div>
      <div className="mt30">
        {/* <div>목록</div> */}
        <div className="button-list">
          {MainRoutes.map((item: RoutePropInterface) => (
            <div>
              <button
                className="original-button mt10"
                onClick={() => {
                  navigate(item.path);
                }}
              >
                {item.title}
              </button>
            </div>
          ))}
          <div>
            <button
              className="original-button mt10"
              onClick={() => {
                // window.open("www.lunch-hunch.com");
                let win = window.open(
                  "https://www.lunch-hunch.com",
                  "_blank",
                  "noreferrer"
                );
                win?.focus();
              }}
            >
              l u n c h - h u n c h
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
