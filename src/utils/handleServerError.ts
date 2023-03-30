import { isAxiosError } from "axios";

const handleServerError = (e: unknown) => {
  console.log("not axios", e);
  if (isAxiosError(e)) {
    console.log(e);
    if (e?.response?.data) {
      if (Array.isArray(e.response.data)) {
        return e.response.data[0].msg;
      } else if (typeof e.response.data === "object" && "m" in e.response.data) {
        return e.response.data.m;
      } else {
        return e.message;
      }
    } else {
      return e.message;
    }
  }
};

export default handleServerError;
