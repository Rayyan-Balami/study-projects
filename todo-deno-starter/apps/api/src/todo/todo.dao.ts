import { todo } from "@api/todo/todo.dto.ts";

let todos: todo[] = [];

const getAll = async () => {
  return todos;
};

const getById = async (id: string) => {
  const foundTodo = todos.find((t) => t.id === id);
  if (!foundTodo) {
    throw new Error(`Todo with ID ${id} not found`);
  }
  return foundTodo;
};

const create = async (todo: todo) => {
  todos.unshift(todo);
  return todo;
};

const update = async (id: string, updatedTodo: Partial<todo>) => {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error(`Todo with ID ${id} not found`);
  }
  
  todos[index] = { ...todos[index], ...updatedTodo };
  return todos[index];
};

const detele = async (id: string) => {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error(`Todo with ID ${id} not found`);
  }
  
  const [deletedTodo] = todos.splice(index, 1);
  return deletedTodo;
};

export default {
  getAll,
  getById,
  create,
  update,
  detele,
};