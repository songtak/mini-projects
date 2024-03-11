import { useEffect, useRef, useState } from "react";
import CryptoJS from "crypto-js";
// import ReactGA from "react-ga4";
import _ from "lodash";
import { beachList } from "../assets/beachList";

// import useMenuList from "../libs/useMenuList";

const MarkerMap = () => {
  const mapElement = useRef(null);
  /** @ts-ignore */
  const { naver } = window;

  const [infoWindow, setInfoWindow] = useState<any>(null);
  const [clickName, setClickName] = useState<string>("");

  //   console.log("beachList", beachList);

  /** 메뉴 목록 */
  const locations = beachList;

  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  const handleClickUrl = (url: string) => {
    // if (process.env.REACT_APP_PROD === "true") {
    //   ReactGA.event({
    //     category: "Event",
    //     action: "상세 url 클릭",
    //     label: url,
    //   });
    // }
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

    // ${isMobile() && <a href={`${location.url}`}>비로가기</a>}
    // <div>${isMobile() && "<span>바로가기</span>"}</div>

    const dddd = () => {
      window.location.href = location.url;
    };

    // <div>${
    //   isMobile() && !_.isUndefined(location.url)
    //     ? `<a style="z-index: 999999999;" href=${location.url}>바로가기</a>`
    //     : ""
    // }</div>

    var content = `<div style="margin:16px;min-width:150px;" ><div style="margin-bottom:8px" >${
      !_.isUndefined(location.menu) ? location.category : ""
    }</div><div style="font-size:14px;font-weight:700;margin-bottom:12px">${
      location.name
    }</div>
        </div>`;

    // console.log("clickName", clickName);
    // console.log("location.name", location.name);
    // console.log("clickName === location.name", clickName === location.name);

    // if (isMobile() && clickName === location.name) {
    //   const openNewWindow = window.open("about:blank");
    //   /** @ts-ignore */
    //   openNewWindow.location.href = `https://map.naver.com/p/search/${location.name}`;
    // }

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
          if (isMobile()) {
            setClickName(location.name);
            if (clickName === location.name) {
              const openNewWindow = window.open("about:blank");
              /** @ts-ignore */
              openNewWindow.location.href = `https://map.naver.com/p/search/${location.name}`;
            } else {
              handleClickMarker(marker, map, location);
            }
          } else {
            // handleClickUrl(`https://map.naver.com/p/search/${}`);
            const openNewWindow = window.open("about:blank");
            /** @ts-ignore */
            openNewWindow.location.href = `https://map.naver.com/p/search/${location.name}`;
          }
        });
        // 마커 호버 리스너
        naver.maps.Event.addListener(marker, "mouseover", () => {
          handleClickMarker(marker, map, location);
          //   handleHoverMarker(location);
          setClickName(location.name);
        });

        // 마커 호버 중지 리스너를 추가합니다. (선택적)
        naver.maps.Event.addListener(marker, "mouseout", () => {
          //   console.log("Marker hover ended!", location);
          handleClickMarker(marker, map, location, true);
        });
      });
    }
  }, [mapElement, locations]);

  return (
    <>
      <div
        ref={mapElement}
        className="mapContainer"
        style={{ minHeight: "60vh" }}
      />
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
    console.log("위치 확인 불가");
  }
};

export default MarkerMap;
