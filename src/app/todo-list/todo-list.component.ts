import { Component, Input } from '@angular/core';
import { Todo } from '../interfaces/todo';

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
	@Input() todoList: Todo[] = [];
	@Input() createError: boolean | undefined; 
	isBeingEditted: boolean = false;
	edittedTodo: Todo = {};
	completedTodo: any = {};

	onCompletetion(parent: HTMLLIElement) {
		if(parent.classList.contains('completed') === false) {
			this.completedTodo = this.todoList.find(todo => todo.id === Number(parent.id));
			this.completedTodo.isCompleted = true;
			this.todoList = this.todoList.filter(todo => todo.id !== this.completedTodo.id);
			this.todoList.unshift(this.completedTodo);
		} else {
			this.completedTodo = this.todoList.find(todo => todo.id === Number(parent.id));
			this.completedTodo.isCompleted = false;
			this.todoList = this.todoList.filter(todo => todo.id !== this.completedTodo.id);
			this.todoList.unshift(this.completedTodo);
		}
	}

	onDelete(parent: HTMLLIElement) {
		this.todoList = this.todoList.filter(todo => todo.id !== Number(parent.id));
	}

	onEdit(parent: HTMLLIElement) {
		this.isBeingEditted = true;	
		this.edittedTodo = {
			id: Number(parent.id),
			text: this.todoList.find(todo => todo.id === Number(parent.id))?.text,
			isCompleted: this.todoList.find(todo => todo.id === Number(parent.id))?.isCompleted
		}
	}

	onCancel(popup: HTMLInputElement) {
		this.isBeingEditted = false;
		this.edittedTodo = {};
		popup.value = '';
	}

	onUpdate(popup: HTMLInputElement) {
		this.edittedTodo.text = popup.value;
		this.todoList = this.todoList.filter(todo => todo.id !== this.edittedTodo.id);	
		this.todoList.push(this.edittedTodo);
		this.isBeingEditted = false;
		this.edittedTodo = {};
		popup.value = '';
	}
}
