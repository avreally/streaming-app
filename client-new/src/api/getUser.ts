const baseUrl = "http://localhost:3001";

export async function getUser() {
  const response = await fetch(`${baseUrl}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();

  return data;
}
