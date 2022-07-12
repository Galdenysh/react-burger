import { IIngredient } from "./types";

export const calcCost = (bunSelect: IIngredient | null, fillingSelect: IIngredient[]) => {
  let bunCost;

  if (!Array.isArray(fillingSelect)) {
    fillingSelect = [];
  }

  bunSelect === null ? (bunCost = 0) : (bunCost = bunSelect.price * 2);
  const fillingCost =
    fillingSelect.length === 0
      ? 0
      : fillingSelect.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0);

  return bunCost + fillingCost;
};

export const dateParse = (createdAt: string) => {
  const dateObj = new Date(createdAt);
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString().slice(0, -3);
  const zone = (dateObj.getTimezoneOffset() / 60) * -1;

  return `${date}, ${time} i-GMT+${zone}`;
};
