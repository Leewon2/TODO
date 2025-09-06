package com.todo.todo.controller.dto;

import com.todo.todo.entity.Todo;

import java.util.List;

public record AllTodoList(String username, List<Todo> todos) {
}
