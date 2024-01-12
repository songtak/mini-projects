import React, { useState } from "react";

import CryptoJS from "crypto-js";

import DatePicker from "@mui/lab/DatePicker";
import { TextField, Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import koLocale from "date-fns/locale/ko";
import moment from "moment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import CalendarPicker from "@mui/lab/CalendarPicker";
import { getResponseFromGPT } from "../api";

import _ from "lodash";

const StampPage = () => {
  const [response, setResponse] = useState<any>();
  const [keyword, setKeyword] = useState<string>("");

  const keywordList = [
    { key: "Health", value: "건강" },
    { key: "Happiness", value: "행복" },
    { key: "Financial Stability", value: "재정적 안정" },
    { key: "Family Well-being", value: "가족의 안녕" },
    { key: "Love", value: "사랑" },
    { key: "Success", value: "성공" },
    { key: "Peace", value: "평화" },
    { key: "Travel", value: "여행" },
    { key: "Job Satisfaction", value: "직업 만족도" },
    { key: "Weight Loss", value: "체중 감량" },
    { key: "Personal Development", value: "개인 발전" },
    { key: "Hobbies", value: "취미 활동" },
    { key: "Friendship", value: "우정" },
    { key: "Education & Learning", value: "교육 및 학습" },
    { key: "Stress Reduction", value: "스트레스 감소" },
    { key: "Exercise & Fitness", value: "운동 및 체력 향상" },
    { key: "Creativity", value: "창의력" },
    { key: "Social Relationships", value: "사회적 관계 개선" },
    { key: "Environmental Conservation", value: "환경 보호" },
    { key: "Healthy Eating", value: "건강한 식습관" },
    { key: "Self-Care", value: "자기 관리" },
    { key: "Positive Thinking", value: "긍정적 사고" },
    { key: "Time Management", value: "시간 관리" },
    { key: "Artistic Expression", value: "예술적 표현" },
    { key: "Charity", value: "자선 활동" },
    { key: "Inner Peace", value: "내적 평화" },
    { key: "Cultural Experiences", value: "문화적 경험" },
    { key: "Skill Acquisition", value: "기술 습득" },
    { key: "Connecting with Nature", value: "자연과의 교감" },
    { key: "Spiritual Growth", value: "영적 성장" },
  ];

  function getRandomKeyword() {
    // keywordList 배열에서 랜덤 인덱스를 생성합니다.
    const randomIndex = Math.floor(Math.random() * keywordList.length);
    handleClickResponse(keywordList[randomIndex]);
    // 해당 인덱스의 키워드를 반환합니다.
    setKeyword(keywordList[randomIndex].value);
  }

  const handleClickResponse = async (keywordProps: any) => {
    setResponse("loading");
    const q = `simple, ${keywordProps.key}, like a cute image`;
    const gptResponse = await getResponseFromGPT(q);
    setResponse(gptResponse);
  };

  return (
    <div>
      <div style={{ fontSize: "24px", marginBottom: "16px" }}>
        AI가 이미지로 만들어 주는
      </div>
      <div style={{ fontSize: "40px", marginBottom: "16px" }}>2024년에</div>

      <div style={{ fontSize: "40px", marginBottom: "60px" }}>
        당신에게 일어날 좋은 일
      </div>
      <div>
        {!_.isUndefined(response) && response !== "loading" && (
          <div>
            <div style={{ fontSize: "24px" }}>{keyword}</div>
            <img
              style={{ height: "200px", width: "200px", marginTop: "60px" }}
              src={response}
              alt=""
            />
          </div>
        )}
      </div>
      {_.isUndefined(response) && (
        <div onClick={getRandomKeyword}>결과 확인</div>
      )}
      {response === "loading" && (
        <>
          <div>시간이 최대 2분 소요됩니다.</div>
        </>
      )}
      <div className="footer">songtak</div>
    </div>
  );
};

export default StampPage;
