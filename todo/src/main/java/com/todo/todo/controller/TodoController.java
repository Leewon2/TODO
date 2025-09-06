package com.todo.todo.controller;

import com.todo.todo.controller.dto.CreateTodoDto;
import com.todo.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/todo")
public class TodoController {
    private final TodoService todoService;

    @PostMapping("/create")
    public ResponseEntity<?> createTodo(@RequestBody CreateTodoDto createTodoDto){
        todoService.createTodo(createTodoDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<?> getTodos(@RequestParam Long id){
        return ResponseEntity.ok(todoService.getTodos(id));
    }

    @GetMapping
    public ResponseEntity<?> getAllTodos(){
        return ResponseEntity.ok(todoService.getAllTodos());
    }

    @DeleteMapping
    public ResponseEntity<?> deleteTodo(@RequestParam Long id){
        todoService.deleteTodo(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/complete")
    public ResponseEntity<?> completeTodo(@RequestParam Long id){
        todoService.completeTodo(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/completeUndo")
    public ResponseEntity<?> completeUndoTodo(@RequestParam Long id){
        todoService.completeUndoTodo(id);
        return ResponseEntity.ok().build();
    }
}
