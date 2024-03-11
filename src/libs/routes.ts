import { RoutePropInterface } from "../interfaces/commonInterface";
import * as Pages from "../pages";

export const MainRoutes: RoutePropInterface[] = [
  // {
  //   title: "m a i n",
  //   path: "/",
  //   element: Pages.MainPage,
  // },
  {
    title: "s a j u",
    path: "/saju",
    element: Pages.SajuPage,
  },
  {
    title: "s t a m p",
    path: "/stamp",
    element: Pages.StampPage,
  },
  {
    title: "r e m a i n - d a y s",
    path: "/remain-days",
    element: Pages.RemainDaysPage,
  },
  {
    title: "h o m e - g a r d e n",
    path: "/home-garden",
    element: Pages.HomeGardenPage,
  },
  {
    title: "t u r t l e",
    path: "/turtle",
    element: Pages.GreenTurtlePage,
  },
  {
    title: "b e a c h",
    path: "/beach-list",
    element: Pages.BeachListPage,
  },
];
