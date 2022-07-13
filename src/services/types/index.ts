import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { AuthAction } from "../actions/auth";
import { BurgerAction } from "../actions/burger";
import { OrderAction } from "../actions/order";
import { WebSocketAction } from "../actions/webSocket";
import { WebSocketAuthAction } from "../actions/webSocketAuth";
import { rootReducer } from "../reducers";
import { store } from "../store";

export type RootState = ReturnType<typeof rootReducer>;

export type AppActions = AuthAction | BurgerAction | OrderAction | WebSocketAction | WebSocketAuthAction;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, AppActions>>;
