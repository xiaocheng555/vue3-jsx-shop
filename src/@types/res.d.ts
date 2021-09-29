// import { AxiosError } from "axios";

// 请求响应数据
declare namespace Res {
  export interface Data <T> { // 响应数据
    resultCode: number;
    data?: T;
    message: string | undefined;
  }
  export interface Page <T> { // 响应数据分页
    currPage: number,
    list: T[],
    pageSize: number,
    totalCount: number,
    totalPage: number,
  }
  export type ResError = Error | unknown;
}

