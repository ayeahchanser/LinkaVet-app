import { IBaseState } from "models/base-state.model";
import { IResponseBase } from "models/response-base.model";

export interface ICourse {
  id: string;
  title: string;
  description: string;
  courseImage: string;
  authorId: string
}

export const emptyCourse: ICourse = {
  id: "",
  title: "",
  description: "",
  courseImage: "",
  authorId: ""
};

export interface ICourseState extends IBaseState {
  readonly courses: ICourse[];
  readonly course: ICourse;
}

export interface ICourseResponse extends IResponseBase {
  data: ICourse;
}

export interface ICourseResponses extends IResponseBase {
  data: ICourse[];
}