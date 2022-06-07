export const errMessage = async (err, dispatch, callback) => {
  let res = await err.err;
  dispatch(callback(res.message));
};
