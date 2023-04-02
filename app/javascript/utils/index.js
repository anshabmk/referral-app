export const getCookie = (name) => {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");
  const cookieVal = cookies
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(nameEQ))
    ?.replace(nameEQ, "");

  return cookieVal ?? null;
};
