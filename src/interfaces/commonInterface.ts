/** 라우터 목록 */
export interface RoutePropInterface {
  path: string;
  title: string;
  element: (match: any) => JSX.Element;
}

export interface SelectInterface {
  title: string;
  value: any;
}
