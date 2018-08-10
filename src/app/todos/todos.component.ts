import { Component, OnInit } from '@angular/core';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: any;
  todo: any;

  create() {
    this.todosService.createTodo(this.todo).subscribe(() => {
      window.location.reload();
    });
  }

  edit(td) {
    let newTodo = window.prompt(`Update Todo: ${td.description}`);
    this.todosService.editTodo(newTodo, td._id).subscribe(() => {
      window.location.reload();
    });
  }

  delete(id) {
    this.todosService.deleteTodo(id).subscribe(() => {
      window.location.reload();
    });
  }

  constructor(private todosService: TodosService) {
    this.todosService.getTodos().subscribe((data: any) => {
      this.todos = data;
    });
  }

  ngOnInit() {
    this.todo = {}
  }

}
