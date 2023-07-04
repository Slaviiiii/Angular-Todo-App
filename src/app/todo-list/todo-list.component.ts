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
	selectedTodo: any = {};

	onCompletetion(parent: HTMLLIElement) {
		if(parent.classList.contains('completed') === false) {
			this.completedTodo = this.todoList.find(todo => todo.id === Number(parent.id));
			this.completedTodo.isCompleted = true;
		} else {
			this.completedTodo = this.todoList.find(todo => todo.id === Number(parent.id));
			this.completedTodo.isCompleted = false;
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
		this.selectedTodo = this.todoList.find(todo => todo.id === this.edittedTodo.id);
		this.selectedTodo.text = this.edittedTodo.text;	
		this.isBeingEditted = false;
		this.edittedTodo = {};
		popup.value = '';
	}
}
