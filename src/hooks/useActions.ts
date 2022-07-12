import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from "../services/actions/index";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};
