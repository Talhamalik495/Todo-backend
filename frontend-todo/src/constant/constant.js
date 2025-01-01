const dev = "http://localhost:5173";
const prod = "https://todo-backend-xi-one.vercel.app";

let BASE_URL = prod;

export const AppRoutes = {
  singup: BASE_URL + "/auth/singup",
  login: BASE_URL + "/auth/login",
  todo: BASE_URL + "/todo",
  getTodo: BASE_URL + "/todo",
};
