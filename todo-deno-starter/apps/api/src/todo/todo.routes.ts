import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import * as todoController from "./todo.controller.ts";

const todoRouter = new Router({
  prefix: "/todos"
});

todoRouter
  .get("/", todoController.getTodos)
  .get("/:id", todoController.getTodoById)
  .post("/", todoController.createTodo)
  .put("/:id", todoController.updateTodo)
  .delete("/:id", todoController.deleteTodo);

export default todoRouter;