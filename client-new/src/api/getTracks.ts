const baseUrl = "http://localhost:3001";

export async function getTracks() {
  const response = await fetch(`${baseUrl}/tracks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}
