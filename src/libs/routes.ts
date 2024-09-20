import { RoutePropInterface } from "../interfaces/commonInterface";
import * as Pages from "../pages";

export const MainRoutes: RoutePropInterface[] = [
  // {
  //   title: "m a i n",
  //   path: "/",
  //   element: Pages.MainPage,
  // },
  // {
  //   title: "s a j u",
  //   path: "/saju",
  //   element: Pages.SajuPage,
  // },
  // {
  //   title: "s t a m p",
  //   path: "/stamp",
  //   element: Pages.StampPage,
  // },
  // {
  //   title: "r e m a i n - d a y s",
  //   path: "/remain-days",
  //   element: Pages.RemainDaysPage,
  // },
  // {
  //   title: "h o m e - g a r d e n",
  //   path: "/home-garden",
  //   element: Pages.HomeGardenPage,
  // },
  // {
  //   title: "t u r t l e",
  //   path: "/turtle",
  //   element: Pages.GreenTurtlePage,
  // },
  // {
  //   title: "b e a c h",
  //   path: "/beach-list",
  //   isHide: true,
  //   element: Pages.BeachListPage,
  // },
  // {
  //   title: "b e a c h",
  //   path: "/beach",
  //   element: Pages.BeachMainPage,
  // },
  {
    title: "m a i n",
    path: "/",
    element: Pages.MainPage,
  },
  {
    title: "b l a c k",
    path: "/black",
    element: Pages.ThreeTestPage,
  },
  {
    title: "s u n s e t",
    path: "/sunset",
    element: Pages.ThreeSunsetPage,
  },
  {
    title: "t e x t",
    path: "/text",
    element: Pages.ThreeTextPage,
  },
  {
    title: "m i n j i",
    path: "/minji",
    element: Pages.ThreeGalleryPage,
  },
  // {
  //   title: "w o r k",
  //   path: "/work",
  //   element: Pages.ThreeWorkPage,
  // },
];
