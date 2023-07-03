import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../interfaces/todo';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() todoList: Todo[] = [];
  @Input() createError: boolean | undefined;  
  @Output() causedError = new EventEmitter<string>();
  errorText: string = 'out of error';  

  onAdd(inputField: HTMLInputElement) {
    if(inputField.value !== '') {
    const todo = {
       id: this.todoList.length + 1,
       text: inputField.value,
       isCompleted: false
    }
      this.todoList.push(todo);   
      this.errorText = 'out of error';
      this.callParentError();
    } else {
      this.errorText = 'in error';
      this.callParentError();
    } 
      inputField.value = '';
  }

    callParentError() {
      this.causedError.emit(this.errorText);
    }
}