export const calcCost = (bunSelect, fillingSelect) => {
  let bunCost;

  if (typeof bunSelect !== "object") {
    bunSelect = {};
  }

  if (!Array.isArray(fillingSelect)) {
    fillingSelect = [];
  }

  Object.keys(bunSelect).length === 0 ? (bunCost = 0) : (bunCost = bunSelect.price * 2);
  const fillingCost = fillingSelect.length === 0 ? 0 : fillingSelect.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0);

  return bunCost + fillingCost;
};
