/** 라우터 목록 */
export interface RoutePropInterface {
  path: string;
  title: string;
  isHide?: boolean;
  element: (match: any) => JSX.Element;
}

export interface SelectInterface {
  title: string;
  value: any;
}
