import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import ReactGA from "react-ga4";
import dayjs from "dayjs";
import _ from "lodash";
import { beachList } from "../assets/beachList";
import {
  getVilageFcstBeach,
  getWhBuoyBeach,
  getTideInfoBeach,
  getSunInfoBeach,
  getTwBuoyBeach,
} from "../api";

type Props = {
  beachId?: number;
};

const MarkerMap = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mapElement = useRef(null);
  /** @ts-ignore */
  const { naver } = window;

  const [infoWindow, setInfoWindow] = useState<any>(null);
  const [hoverName, setHoverName] = useState<string>("");
  const [clickName, setClickName] = useState<string>("");

  const [beachWeatherInfo, setBeachWeatherInfo] = useState<any>();
  const [waveHeight, setWaveHeight] = useState<any>();
  const [waterTemp, setWaterTemp] = useState<any>();

  /** 메뉴 목록 */
  const locations = beachList;

  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  /**
   * @description 바다 정보 취득
   */
  const getBeachInfos = async (beachId: number) => {
    /** 단기 정보 */
    const beachInfoData = await getVilageFcstBeach(beachId);
    setBeachWeatherInfo(beachInfoData);

    /** 파고 정보 */
    const waveHeightData = await getWhBuoyBeach(beachId);
    !_.isEmpty(waveHeightData[0]) && setWaveHeight(waveHeightData[0]);

    /** 조석조회 */
    dayjs().format("MM") === "06" && getTideInfoBeach(beachId);
    dayjs().format("MM") === "07" && getTideInfoBeach(beachId);
    dayjs().format("MM") === "08" && getTideInfoBeach(beachId);

    /** 일출일몰조회 */
    dayjs().format("MM") === "06" && getSunInfoBeach(beachId);
    dayjs().format("MM") === "07" && getSunInfoBeach(beachId);
    dayjs().format("MM") === "08" && getSunInfoBeach(beachId);

    /** 수온 정보 */
    const waterTempData = await getTwBuoyBeach(beachId);
    !_.isEmpty(waterTempData[0]) && setWaterTemp(waterTempData[0]);
  };

  const handleClickMarker = (
    marker: any,
    map: any,
    location: any,
    close?: any
  ) => {
    // 여기에 원하는 로직을 추가하세요.

    if (infoWindow) {
      infoWindow.close();
    }

    var content = `<div style="margin:16px;min-width:150px;" ><div style="margin-bottom:8px">${
      !_.isUndefined(location.menu) ? location.category : ""
    }</div><div style="font-size:14px;font-weight:700;margin-bottom:12px">${
      location.name
    }</div>
        </div>`;

    const clickedInfoWindow = new naver.maps.InfoWindow({
      content: content,
      // maxWidth: 140,
      // backgroundColor: "#eee",
      borderColor: "black",
      borderWidth: 5,
      borderRadius: 300,
      anchorSkew: true,
      // anchorSize: new naver.maps.Size(30, 30),
      // pixelOffset: new naver.maps.Point(20, -20),
    });

    /** @ts-ignore */
    if (map) {
      clickedInfoWindow.open(map, marker);
      setInfoWindow(clickedInfoWindow);
    }
    if (close) {
      clickedInfoWindow.close();
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
    if (!mapElement.current || !naver) return;

    if (locations.length > 0) {
      const mapOptions = {
        /** ts-ignore */
        center: new naver.maps.LatLng(locations[0]?.lat, locations[0].lng),
        zoom: 7,
        zoomControl: true,
      };

      const map = new naver.maps.Map(mapElement.current, mapOptions);

      // 각 위치에 대한 마커를 추가합니다.
      locations.forEach((location: any) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(location.lat, location.lng),
          map,
        });

        // 마커 클릭 리스너
        naver.maps.Event.addListener(marker, "click", () => {
          setHoverName(location.name);

          if (isMobile()) {
            handleClickMarker(marker, map, location);
            setClickName(location.name);
            getBeachInfos(location.id);
          } else {
            setClickName(location.name);
            getBeachInfos(location.id);
          }
        });
        // 마커 호버 리스너
        naver.maps.Event.addListener(marker, "mouseover", () => {
          handleClickMarker(marker, map, location);
          setHoverName(location.name);
        });

        // 마커 호버 중지 리스너를 추가합니다. (선택적)
        naver.maps.Event.addListener(marker, "mouseout", () => {
          handleClickMarker(marker, map, location, true);
        });
      });
    }
  }, [mapElement, locations]);

  useEffect(() => {
    window.location.href =
      "https://songtak.github.io/mini-projects/#/beach-list";
  }, []);

  return (
    <>
      <div
        ref={mapElement}
        className="mapContainer"
        style={{ minHeight: "60vh" }}
      />
      <div>
        <div
          style={{
            marginTop: 24,
            marginBottom: 8,
            fontWeight: 700,
            fontSize: 24,
          }}
        >
          {!_.isEmpty(beachWeatherInfo) && (
            <a href={`https://map.naver.com/p/search/${clickName}`}>
              {clickName}
            </a>
          )}
        </div>
        <div
          style={{
            marginBottom: 24,
            // fontSize: 24,
          }}
        >
          {!_.isEmpty(beachWeatherInfo) && (
            <div>
              기준 :{" "}
              {dayjs(beachWeatherInfo.baseDate).format("YYYY-MM-DD HH:mm")}
            </div>
          )}
        </div>
        {beachWeatherInfo?.map((item: any, i: number) => (
          <div
            key={i}
            style={{
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontWeight: 700,
              }}
            >
              {item.title}
            </span>
            <span> : </span>
            <span>{item.fcstValue}</span>
            <span> {item.unit}</span>
          </div>
        ))}
        {!_.isEmpty(waveHeight) && (
          <div>
            <div
              style={{
                marginBottom: 16,
                marginTop: 32,
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 20,
                }}
              >
                파고 상세
              </span>
            </div>
            <div
              style={{
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                }}
              >
                관측 시간
              </span>
              <span> : {dayjs(waveHeight?.tm).format("YYYY-MM-DD HH:mm")}</span>
            </div>
            <div
              style={{
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                }}
              >
                파고
              </span>
              <span> : {waveHeight?.wh} M</span>
            </div>
          </div>
        )}
        {!_.isEmpty(waterTemp) && (
          <div>
            <div
              style={{
                marginBottom: 16,
                marginTop: 32,
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 20,
                }}
              >
                수온 상세
              </span>
            </div>
            <div
              style={{
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                }}
              >
                관측 시간
              </span>
              <span> : {dayjs(waterTemp?.tm).format("YYYY-MM-DD HH:mm")}</span>
            </div>
            <div
              style={{
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                }}
              >
                수온
              </span>
              <span> : {waterTemp?.tw} ℃</span>
            </div>
          </div>
        )}
        <div style={{ marginTop: 44, color: "gray" }}>정보 : 기상청 제공</div>
      </div>
    </>
  );

  /** @ts-ignore */
  function success(position) {
    // locations.unshift({
    //   name: "현재 위치",
    //   location: `${position.coords.latitude}, ${position.coords.longitude}`,
    // });
  }

  function error() {
    // locations.unshift({
    //   name: "현재 위치",
    //   location: "37.5345698, 127.0004869",
    // });
    // console.log("위치 확인 불가");
  }
};

export default MarkerMap;
