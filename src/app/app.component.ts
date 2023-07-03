import { Component } from '@angular/core';
import { Todo } from './interfaces/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDo-App';
  createError: boolean = false;
  todoList: Todo[] = [
    {id: 1, text: 'Shopping', isCompleted: false},
    {id: 2, text: 'Rent Pay', isCompleted: false},
    {id: 3, text: 'Cleaning', isCompleted: false}
  ];

  makeError(errorText: string) {
    if(errorText === 'out of error') {
      this.createError = false;
    } else {
      this.createError = true;
    }
  }
}