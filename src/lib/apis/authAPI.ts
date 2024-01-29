import client from "./client";
export const login = (loginData: { email: string; password: string }) => {
  return client.post("/auth/login", loginData);
};
export const join = (joinData: {
  email: string;
  name: string;
  password: string;
}) => {
  return client.post("/auth/join", joinData);
};
export const check = () => {
  return client.get("/auth/check");
};
export const logout = () => {
  return client.post("/auth/logout");
};
