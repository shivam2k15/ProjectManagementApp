// client.ts
export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Client Lambda" }),
  };
}
