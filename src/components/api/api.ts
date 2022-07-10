class Api {
  private _url: string;
  constructor(options: { baseUrl: string }) {
    this._url = options.baseUrl;
  }

  // Универсальная функция для проверки ответа от сервера
  _getResponseData(res: Response) {
    return res.ok ? res.json() : Promise.reject({ status: `Ошибка: ${res.status}`, err: res.json() });
  }

  _getCookie(name: string) {
    const matches = document.cookie.match(
      new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  getIngredients() {
    return fetch(`${this._url}/ingredients`).then((res) => this._getResponseData(res));
  }

  sendOrder(data: { ingredients: any[] }) {
    return fetch(`${this._url}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this._getCookie("accessToken"),
      },
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  forgotPassword(data: { email: any }) {
    return fetch(`${this._url}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  resetPassword(data: { password: any; token: any }) {
    return fetch(`${this._url}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  register(data: { email: any; password: any; name: any }) {
    return fetch(`${this._url}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  login(data: { email: any; password: any }) {
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

  setUserData(data: { name: any; email: any; password: any }) {
    return fetch(`${this._url}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this._getCookie("accessToken"),
      },
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  setRefreshToken() {
    return fetch(`${this._url}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: this._getCookie("refreshToken") }),
    }).then((res) => this._getResponseData(res));
  }
}

export const api = new Api({ baseUrl: "https://norma.nomoreparties.space/api" });
