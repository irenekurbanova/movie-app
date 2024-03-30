import { TMBD_GET_REQUEST } from "./config";

export async function getAccountID() {
  try {
    const response = await TMBD_GET_REQUEST.get("/account/account_id");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}
