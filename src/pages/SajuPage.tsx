import React, { useState } from "react";

import DatePicker from "@mui/lab/DatePicker";
import { TextField, Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import koLocale from "date-fns/locale/ko";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { getResponseFromGPT } from "../api";

import _ from "lodash";

const SajuPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<any>();
  const [userName, setUserName] = useState("");

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    const gptResponse = await getResponseFromGPT(input);
    setResponse(gptResponse);
  };

  const getDeviceType: any = () => {
    const ua = navigator.userAgent;
    if (/(android)/i.test(ua)) {
      return "android";
    } else if (/(ipod|iphone|ipad)/i.test(ua)) {
      return "ios";
    } else {
      return "unknown";
    }
  };

  type Gan =
    | "갑"
    | "을"
    | "병"
    | "정"
    | "무"
    | "기"
    | "경"
    | "신"
    | "임"
    | "계";
  type Zhi =
    | "자"
    | "축"
    | "인"
    | "묘"
    | "진"
    | "사"
    | "오"
    | "미"
    | "신"
    | "유"
    | "술"
    | "해";

  const Gans: Gan[] = [
    "갑",
    "을",
    "병",
    "정",
    "무",
    "기",
    "경",
    "신",
    "임",
    "계",
  ];
  const Zhis: Zhi[] = [
    "자",
    "축",
    "인",
    "묘",
    "진",
    "사",
    "오",
    "미",
    "신",
    "유",
    "술",
    "해",
  ];

  function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  function daysFrom1900(year: number, month: number, day: number): number {
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (isLeapYear(year)) {
      monthDays[1] = 29;
    }

    let totalDays = 0;
    for (let i = 1900; i < year; i++) {
      totalDays += isLeapYear(i) ? 366 : 365;
    }
    for (let i = 0; i < month - 1; i++) {
      totalDays += monthDays[i];
    }
    totalDays += day;

    return totalDays;
  }

  // function getGanZhiFromDateStr(dateStr: string): {
  //   yearGanZhi: string;
  //   monthGanZhi: string;
  //   dayGanZhi: string;
  // } {

  function getGanZhiFromDateStr(dateStr: string): string {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Date object returns month 0-based
    const day = date.getDate();

    let yearIndex = (year - 4) % 60;
    const yearGan: Gan = Gans[yearIndex % 10];
    const yearZhi: Zhi = Zhis[yearIndex % 12];

    const monthGan: Gan = Gans[(yearIndex * 2 + month - 1) % 10];
    const monthZhi: Zhi = Zhis[(month + 1) % 12];

    const dayIndex = daysFrom1900(year, month, day) % 60;
    const dayGan: Gan = Gans[dayIndex % 10];
    const dayZhi: Zhi = Zhis[dayIndex % 12];

    return `${yearGan}${yearZhi} ${monthGan}${monthZhi} ${dayGan}${dayZhi}`;
    // return {
    //   yearGanZhi: `${yearGan}${yearZhi}`,
    //   monthGanZhi: `${monthGan}${monthZhi}`,
    //   dayGanZhi: `${dayGan}${dayZhi}`,
    // };
  }

  const handleClickSaveBirthDate = async () => {
    setResponse("loading");
    const ganzhi = getGanZhiFromDateStr(String(selectedDate));
    const q = `[${ganzhi}]의 사주에 따른 운세나 특징은 어떻게 되나요? 이걸 자세하게 풀어서 ${userName}에게 설명하듯 알려주세요`;
    const gptResponse = await getResponseFromGPT(q);
    setResponse(gptResponse);
  };

  return (
    <div className="App">
      <div className="title">해피사주</div>
      {/* <div>
  <form onSubmit={handleOnSubmit}>
  <input
  value={input}
  onChange={(e) => setInput(e.target.value)}
  placeholder="Enter your question..."
  />
  <button type="submit">Send</button>
  </form>
  <p>{response}</p>
</div> */}

      {typeof response === "undefined" && (
        <>
          <div style={{ paddingTop: "30px" }}>
            <TextField
              label="이름"
              size="small"
              onChange={(e: any) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div style={{ paddingTop: "30px" }}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={koLocale}
            >
              <div style={{ backgroundColor: "white" }}>
                <DatePicker
                  label="생년월일"
                  openTo="year"
                  views={["year", "month", "day"]}
                  value={selectedDate}
                  onChange={(newValue: any) => {
                    setSelectedDate(newValue);
                  }}
                  // disabled={props.disabled}
                  renderInput={(params: any) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </div>
            </LocalizationProvider>
          </div>
          <div
            className={`start_button ${
              !_.isDate(selectedDate) || _.isEmpty(userName) ? "disable" : ""
            }`}
            onClick={handleClickSaveBirthDate}
          >
            <ArrowForwardIcon style={{ color: "white", paddingTop: "8px" }} />
          </div>
        </>
      )}
      {response === "loading" && (
        <>
          <div>시간이 최대 2분 소요됩니다.</div>
        </>
      )}
      {typeof response !== "undefined" && (
        <div>
          {response !== "loading" && (
            <div
              style={{ paddingTop: "30px", fontSize: "30", fontWeight: 700 }}
            >
              ChatGpt가 알려주는 {userName}님의 사주입니다.
            </div>
          )}
          <div style={{ paddingTop: "30px" }}>
            <p>{response}</p>
          </div>
        </div>
      )}

      <div className="footer">songtak</div>
    </div>
  );
};

export default SajuPage;
