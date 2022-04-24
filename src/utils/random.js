export const random = (select, amount) => {
  const newArr = [];

  for (let i = 0; i < amount; i++) {
    let a = Math.floor(Math.random() * select.length);
    newArr.push(select[a]);
  }

  return newArr;
};
