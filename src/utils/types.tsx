export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;

  qty?: number;
  constructorId?: string;
  uniqueId?: string;
}

export interface IOrder {
  createdAt: string;
  ingredients: string[];
  length: number;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}
