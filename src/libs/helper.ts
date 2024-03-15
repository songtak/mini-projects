const beachInfoTimes = [
  { id: 1, base_time: "0200" },
  { id: 2, base_time: "0500" },
  { id: 3, base_time: "0800" },
  { id: 4, base_time: "1100" },
  { id: 5, base_time: "1400" },
  { id: 6, base_time: "1700" },
  { id: 7, base_time: "2000" },
  { id: 8, base_time: "2300" },
];

export const getNearBaseTimeInBeachInfoTimes = (baseTime: number) => {
  let near;
  let abs = 0;
  let min = 2300; // 해당 범위에서의 가장 큰 값으로
  let nearLength = 0;

  for (var i = 0; i < beachInfoTimes.length; i++) {
    abs =
      Number(beachInfoTimes[i].base_time) - baseTime < 0
        ? -(Number(beachInfoTimes[i].base_time) - baseTime)
        : Number(beachInfoTimes[i].base_time) - baseTime;
    if (abs < min) {
      min = abs; // MIN
      near = beachInfoTimes[i]; // Near : 가까운 값
      nearLength = i;
    }
  }

  if (baseTime < Number(near?.base_time)) {
    near = beachInfoTimes[nearLength - 1];
  }

  return near?.base_time;
};

const beachInfoType = [
  { id: 1, category: "POP", title: "강수확률", unit: "%" },
  { id: 2, category: "PTY", title: "강수형태", unit: "code_pty" }, // 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)
  { id: 3, category: "PCP", title: "1시간 강수량", unit: "mm" },
  { id: 4, category: "REH", title: "습도", unit: "%" },
  { id: 5, category: "SNO", title: "1시간 신적설", unit: "cm" },
  { id: 6, category: "SKY", title: "하늘상태", unit: "code_sky" }, // 맑음(1), 구름많음(3), 흐림(4)
  { id: 7, category: "TMP", title: "1시간 기온", unit: "℃" },
  { id: 8, category: "TMN", title: "아침 최저기온", unit: "℃" },
  { id: 9, category: "TMX", title: "낮 최고기온", unit: "℃" },
  { id: 10, category: "UUU", title: "풍속(동서성분)", unit: "m/s" },
  { id: 11, category: "VVV", title: "풍속(남북성분)", unit: "m/s" },
  { id: 12, category: "WAV", title: "파고", unit: "M" },
  { id: 13, category: "VEC", title: "풍향", unit: "deg" },
  { id: 14, category: "WSD", title: "풍속", unit: "m/s" },
];

const code_pty = [
  { id: 0, title: "없음" },
  { id: 1, title: "비" },
  { id: 2, title: "비/눈" },
  { id: 3, title: "눈" },
  { id: 4, title: "소나기" },
];
const code_sky = [
  { id: 1, title: "맑음" },
  //   { id: 2, title: "비/눈" },
  { id: 3, title: "구름많음" },
  { id: 4, title: "흐림" },
];

// const codeList = [
//   { key: "code_pty", list: code_pty },
//   { key: "code_sky", list: code_sky },
// ];

/**
 * @description
 * @param infoList
 */
export const setVilageFcstBeach = (infoList: any[]) => {
  let testList: any[] = [];

  infoList.map((item: any) => {
    const matchItem = beachInfoType.find(
      (findItem: any) => findItem.category === item.category
    );
    if (matchItem?.unit.startsWith("code")) {
      let codeList: any[] = [];
      matchItem?.unit === "code_pty" && (codeList = code_pty);
      matchItem?.unit === "code_sky" && (codeList = code_sky);

      const dddddd = codeList.find(
        (unitItem: any) => unitItem.id === Number(item.fcstValue)
      );

      testList.push({
        ...item,
        title: matchItem?.title,
        fcstValue: dddddd.title,
        unit: "",
      });

      //   const matchedUnitCode = codeList.find(
      //     (codeItem: any) => codeItem.key === matchItem?.unit
      //   );
      //   console.log("matchedUnitCode", matchedUnitCode);
    } else {
      testList.push({
        ...item,
        title: matchItem?.title,
        unit: matchItem?.unit,
      });
    }
  });

  return testList;
};
