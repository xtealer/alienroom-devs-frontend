import axios from "axios";

export const postContactRequest = async (data) =>
  await axios.post(
    "https://us-central1-alienroom-cs.cloudfunctions.net/sendContactMail",
    data
  );
