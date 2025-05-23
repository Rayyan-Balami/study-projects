import { Context, RouterContext } from 'https://deno.land/x/oak@v12.6.1/mod.ts';
import todoService from './todo.service.ts';
import { todo } from '@api/todo/todo.dto.ts';

/*
rule of thumd:
if no route params (/) then ctx: Context
else if route params (/:id) then ctx: RouterContext<string>
 */

export const getTodos = async (ctx: Context) => {
  try {
    const todos = await todoService.getAll();
    ctx.response.body = { data: todos };
    ctx.response.status = 200;
  } catch (error: any) {
    ctx.response.status = 500;
    ctx.response.body = { error: error.message };
  }
};

export const getTodoById = async (ctx: RouterContext<string>) => {
  try {
    const { id } = ctx.params;
    const todo = await todoService.getById(id);
    ctx.response.body = { data: todo };
    ctx.response.status = 200;
  } catch (error: any) {
    ctx.response.status = 404;
    ctx.response.body = { error: error.message };
  }
};

export const createTodo = async (ctx: Context) => {
  try {
    const body = await ctx.request.body().value;
    const newTodo = await todoService.create(body as todo);
    ctx.response.status = 201;
    ctx.response.body = { data: newTodo, message: 'Todo created successfully' };
  } catch (error: any) {
    ctx.response.status = 400;
    ctx.response.body = { error: error.message };
  }
};

export const updateTodo = async (ctx: RouterContext<string>) => {
  try {
    const { id } = ctx.params;
    const body = await ctx.request.body().value;
    const updatedTodo = await todoService.update(id, body);
    ctx.response.body = {
      data: updatedTodo,
      message: 'Todo updated successfully',
    };
    ctx.response.status = 200;
  } catch (error: any) {
    ctx.response.status = 404;
    ctx.response.body = { error: error.message };
  }
};

export const deleteTodo = async (ctx: RouterContext<string>) => {
  try {
    const { id } = ctx.params;
    await todoService.delete(id);
    ctx.response.body = {
      message: 'Todo deleted successfully',
    };
    ctx.response.status = 200;
  } catch (error: any) {
    ctx.response.status = 404;
    ctx.response.body = { error: error.message };
  }
};

export const deleteAllTodos = async (ctx: Context) => {
  try {
    await todoService.deleteAll();
    ctx.response.body = {
      message: 'All todos deleted successfully',
    };
    ctx.response.status = 200;
  } catch (error: any) {
    ctx.response.status = 500;
    ctx.response.body = { error: error.message };
  }
};