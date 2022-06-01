class Api {
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

  sendOrder(id) {
    return fetch(`${this._url}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: id,
      }),
    }).then((res) => this._getResponseData(res));
  }

  forgotPassword(value) {
    return fetch(`${this._url}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: value,
      }),
    }).then((res) => this._getResponseData(res));
  }

  resetPassword(password, token) {
    return fetch(`${this._url}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        token: token,
      }),
    }).then((res) => this._getResponseData(res));
  }

  register(email, password, userName) {
    return fetch(`${this._url}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: userName,
      }),
    }).then((res) => this._getResponseData(res));
  }
}

export const api = new Api({ baseUrl: "https://norma.nomoreparties.space/api" });
