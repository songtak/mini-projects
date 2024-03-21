import React, { useState, useEffect } from "react";
import MarkerMapOne from "../libs/MarkerMapOne";
import { beachList } from "../assets/beachList";
import { useNavigate, useLocation } from "react-router-dom";
import { getBeachInfoList } from "../api";
import _ from "lodash";

const BeachMainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchList, setSearchList] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedBeach, setSelectedBeach] = useState<any>();

  // const ddd = getBeachInfoList("인천");

  /**  */
  // const handleChangeSearch = async (inputValue: string) => {
  //   let searchBeachList: any[] = [];
  //   if (inputValue.length === 0) {
  //     setSelectedBeach(undefined);
  //   }
  //   await beachList.map((item: any) => {
  //     if (searchValue.length === 0) {
  //       searchBeachList = [];
  //       setSearchList([]);
  //     } else if (
  //       item.name
  //         .replace(/ /g, "")
  //         .replace("해변", "")
  //         .replace("해수욕장", "")
  //         .includes(
  //           inputValue
  //             .replace(/ /g, "")
  //             .replace("ㅎ", "")
  //             .replace("해", "")
  //             .replace("햅", "")
  //             .replace("해벼", "")
  //             .replace("해변", "")
  //             .replace("햇", "")
  //             .replace("해수", "")
  //             .replace("해숭", "")
  //             .replace("해수요", "")
  //             .replace("해수욕", "")
  //             .replace("해수욕ㅈ", "")
  //             .replace("해수욕자", "")
  //             .replace("해수욕장", "")
  //         )
  //     ) {
  //       searchBeachList.push(item);
  //     }
  //   });
  //   setSearchList(searchBeachList);
  // };

  const handleClickSearch = () => {
    let searchBeachList: any[] = [];
    if (searchValue.length === 0) {
      setSelectedBeach(undefined);
    }
    beachList.map((item: any) => {
      if (searchValue.length === 0) {
        searchBeachList = [];
        setSearchList([]);
      } else if (
        item.name
          .replace(/ /g, "")
          .replace("해변", "")
          .replace("해수욕장", "")
          .includes(
            searchValue
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
  };

  /** 해수욕장 선택 */
  const handleClickBeach = (item: any) => {
    setSelectedBeach(item);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    handleClickSearch();
  }, [searchValue]);
  return (
    <div>
      <div>
        {/* <div>내가 보려고 만든</div> */}
        <div style={{ fontSize: 40 }}>🌞🏝️🐬</div>
        <div style={{ marginBottom: "8px", fontWeight: 700, fontSize: 28 }}>
          전국~ 해수욕장 실시간 정보
        </div>
        <div style={{ fontSize: 14, color: "gray", marginBottom: "24px" }}>
          v 0.0.2
        </div>
        {/* <span>검색</span> */}
        <input
          type="text"
          placeholder="해수욕장 이름을 검색해주세요"
          maxLength={20}
          onChange={(e) => {
            setSearchValue(e.target?.value);
            // handleChangeSearch(e.target?.value);
          }}
          // onInput={(e) => {
          //   handleClickSearch();
          //   // console.log("e", e.nativeEvent);
          //   // handleChangeSearch(e.target?.value);
          // }}
        />
        {/* <div style={{ color: "gray", fontSize: 14, marginTop: 8 }}>
          <div>* 모바일 환경에서는 검색어 입력 후</div>
          <div>스페이스바 클릭해야 검색됩니다.</div>
        </div> */}
      </div>
      <div style={{ marginBottom: 24, marginTop: 24 }}>
        {!_.isEmpty(selectedBeach) && (
          <MarkerMapOne selectedBeach={selectedBeach} />
        )}
      </div>

      <div
        style={{ marginTop: 24, marginBottom: 32 }}
        className={`${!_.isEmpty(selectedBeach) && "top-border"}`}
      >
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
        <div>
          {searchValue.length > 0 &&
            searchList.length === 0 &&
            "검색 결과가 없습니다."}
        </div>
      </div>

      <div>
        <button
          type="button"
          className="pheasant-demure-button solid dark hover blink round-corner"
          onClick={() => {
            navigate("/beach-list");
          }}
        >
          <span className="label">지도보기</span>
        </button>
      </div>

      <div style={{ marginTop: 44, color: "gray", fontSize: 14 }}>
        정보 제공 : 기상청
      </div>
    </div>
  );
};

export default BeachMainPage;
