import * as authActions from "./auth";
import * as burgerActions from "./burger";
import * as orderActions from "./order";
import * as webSocketActions from "./webSocket";
import * as webSocketAuthActions from "./webSocketAuth";

export default {
  ...authActions,
  ...burgerActions,
  ...orderActions,
  ...webSocketActions,
  ...webSocketAuthActions,
};
