package com.todo.todo.service;

import com.todo.todo.controller.dto.AllTodoList;
import com.todo.todo.controller.dto.CreateTodoDto;
import com.todo.todo.entity.Todo;
import com.todo.todo.entity.User;
import com.todo.todo.repository.TodoRepository;
import com.todo.todo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;
    private final UserRepository userRepository;


    public void createTodo(CreateTodoDto createTodoDto) {
        User user = userRepository.findById(createTodoDto.id()).orElseThrow(() -> new IllegalArgumentException("No User"));
        Todo todo = Todo.builder()
                .title(createTodoDto.title())
                .description(createTodoDto.description())
                .user(user)
                .build();
        todoRepository.save(todo);
    }

    public List<Todo> getTodos(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("No User"));
        return todoRepository.findAllByUser(user);
    }

    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }

    public void completeTodo(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("No todo"));
        todo.complete();

    }

    public void completeUndoTodo(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("No todo"));
        todo.undoComplete();
    }


    public List<AllTodoList> getAllTodos() {
        List<User> users = userRepository.findAll();

        return users.stream()
                .map(user -> new AllTodoList(
                        user.getUsername(),
                        todoRepository.findAllByUser(user)
                ))
                .toList();
    }
}
