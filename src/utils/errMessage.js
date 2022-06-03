export const errMessage = async (err, dispatch, type) => {
  let res = await err.err;
  dispatch({ type: type, payload: res.message });
};
