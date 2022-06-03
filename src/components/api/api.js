class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

  // Универсальная функция для проверки ответа от сервера
  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject({ status: `Ошибка: ${res.status}`, err: res.json() });
  }

  _getCookie(name) {
    const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  getIngredients() {
    return fetch(`${this._url}/ingredients`).then((res) => this._getResponseData(res));
  }

  sendOrder(data) {
    return fetch(`${this._url}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  forgotPassword(data) {
    return fetch(`${this._url}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  resetPassword(data) {
    return fetch(`${this._url}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  register(data) {
    return fetch(`${this._url}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  login(data) {
    return fetch(`${this._url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  logout() {
    return fetch(`${this._url}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: this._getCookie("refreshToken"),
      }),
    }).then((res) => this._getResponseData(res));
  }

  getUserData() {
    return fetch(`${this._url}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this._getCookie("accessToken"),
      },
    }).then((res) => this._getResponseData(res));
  }

  setUserData(data) {
    return fetch(`${this._url}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this._getCookie("accessToken"),
      },
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }
}

export const api = new Api({ baseUrl: "https://norma.nomoreparties.space/api" });
