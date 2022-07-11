import { AnyAction, Dispatch } from "redux";

export const errMessage = async (err: any, dispatch: Dispatch, callback: (arg: any) => AnyAction) => {
  let res = await err.err;
  dispatch(callback(res.message));
};
