import React, { useState } from "react";
import MarkerMapOne from "../libs/MarkerMapOne";
import { beachList } from "../assets/beachList";
import { useNavigate, useLocation } from "react-router-dom";
import { getBeachInfoList } from "../api";
import _ from "lodash";

const BeachMainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchList, setSearchList] = useState<any[]>([]);
  const [searchVale, setSearchVale] = useState<string>("");
  const [selectedBeach, setSelectedBeach] = useState<any>();

  // const ddd = getBeachInfoList("인천");

  /**  */
  const handleChangeSearch = (inputVale: string) => {
    setSearchVale(inputVale);
    let searchBeachList: any[] = [];
    beachList.map((item: any) => {
      if (searchVale.length === 0) {
        searchBeachList = [];
        setSearchList([]);
      } else if (
        item.name
          .replace(/ /g, "")
          .replace("해변", "")
          .replace("해수욕장", "")
          .includes(
            inputVale
              .replace(/ /g, "")
              .replace("ㅎ", "")
              .replace("해", "")
              .replace("햅", "")
              .replace("해벼", "")
              .replace("해변", "")
              .replace("햇", "")
              .replace("해수", "")
              .replace("해숭", "")
              .replace("해수요", "")
              .replace("해수욕", "")
              .replace("해수욕ㅈ", "")
              .replace("해수욕자", "")
              .replace("해수욕장", "")
          )
      ) {
        searchBeachList.push(item);
      }
    });
    setSearchList(searchBeachList);
    console.log("searchBeachList", searchBeachList);
  };

  /** 해수욕장 선택 */
  const handleClickBeach = (item: any) => {
    setSelectedBeach(item);
  };

  return (
    <div>
      <div>
        <div>내가 보려고 만든</div>
        <div style={{ marginBottom: "24px", fontWeight: 700, fontSize: 28 }}>
          전국~ 해수욕장 정보
        </div>
        {/* <span>검색</span> */}
        <input
          type="text"
          placeholder="해수욕장 이름을 검색해주세요"
          maxLength={20}
          onChange={(e) => {
            handleChangeSearch(e.target?.value);
          }}
        />
      </div>

      <div style={{ marginTop: 24, marginBottom: 32 }}>
        {searchList.length !== 420 &&
          !_.isEmpty(searchList) &&
          searchList.map((item: any, i: number) => (
            <div
              key={i}
              onClick={() => {
                handleClickBeach(item);
              }}
            >
              <button
                type="button"
                className="pheasant-demure-button solid light hover icon round-corner"
              >
                <span className="label">{item.name}</span>
                <span className="material-icons icon">chevron_right</span>
              </button>
              {/* <button
                type="button"
                className="pheasant-demure-button solid light"
              >
                <span className="label">{item.name}</span>
              </button> */}
              {/* {item.name} */}
            </div>
          ))}
      </div>
      <div>
        {!_.isEmpty(selectedBeach) && (
          <MarkerMapOne selectedBeach={selectedBeach} />
        )}
      </div>

      <div>
        <button
          type="button"
          className="pheasant-demure-button solid dark hover blink round-corner"
          onClick={() => {
            navigate("/beach-list");
          }}
        >
          <span className="label">전체보기</span>
        </button>
      </div>

      <div style={{ marginTop: 44, color: "gray", fontSize: 14 }}>
        정보 : 기상청 제공
      </div>
    </div>
  );
};

export default BeachMainPage;
