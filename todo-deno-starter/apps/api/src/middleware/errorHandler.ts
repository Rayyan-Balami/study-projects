export async function errorHandler(ctx: any, next: () => Promise<unknown>) {
  try {
    await next();
  } catch (err) {
    console.error("Error:", err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal Server Error" };
  }
}
