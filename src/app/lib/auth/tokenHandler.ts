const jwt_decode = require("jwt-decode");

interface DecodedToken {
  isAdmin: boolean;
  exp: number;
  [key: string]: any;
}

export const handleAuthToken = (token: string) => {
  localStorage.setItem("token", token);

  const decoded: DecodedToken = jwt_decode(token);
  localStorage.setItem("isAdmin", decoded.isAdmin.toString());

  return { token, isAdmin: decoded.isAdmin };
};
