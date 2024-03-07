import React from "react";
import { MainRoutes } from "../libs/routes";
import { RoutePropInterface } from "../interfaces/commonInterface";

const MainPage = () => {
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
                  window.location.href = `/#${item.path}`;
                }}
              >
                {item.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
