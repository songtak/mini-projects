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
];
