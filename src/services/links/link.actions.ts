import { getToken } from "../actions/getToken";
import { AxiosError } from "axios";
import { app } from "../axios/axios.config";

interface LinkProps {
  id: string;
  userId?: string;
  title?: string;
  href?: string;
}

export async function addLink({ userId, title, href }: LinkProps) {
  try {
    const response = await app.post("/links/create", { userId, title, href });

    console.log(response.data);
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err.response?.data);
    }
  }
}

export async function updateLink({ id, title, href }: LinkProps) {
  try {
    const token = await getToken();

    const response = await app.put(
      "/links/update",
      { id, title, href },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    console.log(response);
  } catch (err) {
    if (err instanceof AxiosError) {
      return;
    }
  }
}

export async function deleteLink({ id }: LinkProps) {
  try {
    const token = await getToken();

    await app.delete("/links/delete", {
      params: { id },
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err.response?.data);
    }
  }
}
