import React, { useState } from "react";
import ECharts, { EChartsReactProps } from "echarts-for-react";

const RemainDaysPage = () => {
  const yearDetails = getYearDetails();

  const [options, setOptions] = useState({
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "2024",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: yearDetails.elapsedDays, name: "Elapsed Days" },
          { value: yearDetails.remainingDays, name: "Remaining Days" },
        ],
      },
    ],
  });

  function getYearProgress(): string {
    // 현재 날짜와 시간을 가져옵니다.
    const now = new Date();

    // 현재 연도의 시작과 끝을 나타내는 Date 객체를 생성합니다.
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);

    // 연도의 총 시간과 현재까지 지난 시간을 밀리초 단위로 계산합니다.
    const totalMillis = endOfYear.getTime() - startOfYear.getTime();
    const elapsedMillis = now.getTime() - startOfYear.getTime();

    // 지난 시간의 백분율을 계산합니다.
    const progress = (elapsedMillis / totalMillis) * 100;

    return `${progress.toFixed(2)}%`;
  }

  // 결과를 출력합니다.
  console.log(`연도 진행률: ${getYearProgress()}`);

  function getYearDetails(): {
    progressPercentage: string;
    elapsedDays: number;
    remainingDays: number;
  } {
    // 현재 날짜와 시간을 가져옵니다.
    const now = new Date();

    // 현재 연도의 시작과 끝을 나타내는 Date 객체를 생성합니다.
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);

    // 연도의 총 시간과 현재까지 지난 시간을 밀리초 단위로 계산합니다.
    const totalMillis = endOfYear.getTime() - startOfYear.getTime();
    const elapsedMillis = now.getTime() - startOfYear.getTime();

    // 지난 시간의 백분율을 계산합니다.
    const progressPercentage = ((elapsedMillis / totalMillis) * 100).toFixed(2);

    // 남은 일수와 지난 일수를 계산합니다.
    const oneDayMillis = 24 * 60 * 60 * 1000; // 하루의 밀리초
    const elapsedDays = Math.floor(elapsedMillis / oneDayMillis) + 1;
    const remainingDays =
      Math.ceil((endOfYear.getTime() - now.getTime()) / oneDayMillis) - 1;

    return {
      progressPercentage: `${progressPercentage}%`,
      elapsedDays,
      remainingDays,
    };
  }

  function getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 더합니다.
    const day = today.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      <div>{getTodayDate()}</div>
      <div>
        <ECharts
          option={options}
          opts={{ renderer: "svg", width: "auto", height: "auto" }}
        />
        <div>{yearDetails.progressPercentage}</div>
      </div>
    </div>
  );
};

export default RemainDaysPage;
