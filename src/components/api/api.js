export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

  // Универсальная функция для проверки ответа от сервера
  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getIngredients() {
    return fetch(`${this._url}/ingredients`).then((res) => this._getResponseData(res));
  }
}
