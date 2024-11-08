import Cookies from "js-cookie";

export const TOKEN_KEY = "token";

export function login(data: { userId: string; username: string }) {
  // Defina os cookies para userId e username
  Cookies.set("userId", data.userId, { expires: 7, path: "/" }); // Expires em 7 dias
  Cookies.set("username", data.username, { expires: 7, path: "/" });
  
}

export function logout() {
  // Exclui os cookies ao fazer logout
  Cookies.remove("userId");
  Cookies.remove("username");
  Cookies.remove(TOKEN_KEY);
}


export function getUserId() {
  return Cookies.get("userId");
}

export function getUsername() {
  return Cookies.get("username");
}
