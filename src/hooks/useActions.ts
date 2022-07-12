import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import actions from "../services/actions/index";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
