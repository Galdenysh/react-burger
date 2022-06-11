export const calcCost = (bunSelect, fillingSelect) => {
  let bunCost;

  Object.keys(bunSelect).length === 0 ? (bunCost = 0) : (bunCost = bunSelect.price * 2);
  const fillingCost = fillingSelect.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0);

  return bunCost + fillingCost;
};
