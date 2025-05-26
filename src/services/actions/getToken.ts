export async function getToken() {
  try {
    const token = await fetch("/api/set-token", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => data.token);

    return token;
  } catch (err) {
    console.log(err);
  }
}
