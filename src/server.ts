import fastify from "fastify";

const app = fastify();

app.get("/", () => {
  return "Servidor no ar!";
});

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP Server running on port 3333");
});
