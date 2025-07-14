import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

// Definizione dell'oggetto Task
export interface Task {
  text: string;
  completed: boolean;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private tasks: Task[] = [];

  constructor(private localStorageService: LocalStorageService) { 
    // se ci sono tasks salvate in localStorage, le carica
    const savedTasks = this.localStorageService.getItem('tasks');
    if (savedTasks){
      // converte il JSON in un oggetto Task con un vero Date (altrimenti sarebbe una stringa)
      this.tasks = JSON.parse(savedTasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt)
      }))
    }
  }

  // restituisce tutte le tasks
  getTasks(): Task[] {
    return [...this.tasks];
  }

  // aggiunge una nuova task alla lista
  addTask(text: string): void {
    this.tasks.push({
      text,
      completed: false,
      createdAt: new Date()
    });
    this.saveTasks();
  }

  // rimuove una task dalla lista
  removeTask(index: number): void {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  // toggla lo stato di completamento di una task
  toggleTask(index: number): void {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks();
  }

  // aggiorna una task esistente
  updateTask(index: number, task: Task): void {
    this.tasks[index] = task;
    this.saveTasks();
  }

  // salva le tasks in localStorage
  private saveTasks(): void {
    this.localStorageService.setItem('tasks', JSON.stringify(this.tasks));
  }
}
