import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

// Definizione dell'oggetto Task
interface Task {
  text: string;
  completed: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TODO List';
  tasks: Task[] = [];
  newTask: string = '';
  filter: 'all' | 'completed' | 'pending' = 'all';
  
  // carica le tasks quando il componente viene avviato
  ngOnInit(){
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks){
      // converte il JSON in un oggetto Task con un vero Date (altrimenti sarebbe una stringa)
      this.tasks = JSON.parse(savedTasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt)
      }))
    }
  }

  // salva le tasks in localStorage
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // aggiunge una Task alla lista, evitando quelle vuote
  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push({
        text: this.newTask.trim(),
        completed: false,
        createdAt: new Date()
      });
      this.newTask = '';
      this.saveTasks();
    }
  }

  removeTask(index: number) {
    // chiede conferma prima di rimuovere la task
    if(confirm('Sei sicuor di voler rimuovere questa attività?')){
      this.tasks.splice(index, 1);
      this.saveTasks();
    }
  }

  // permette di aggiornare lo stato della Task
  toggleCompleted(task: Task) {
    task.completed = !task.completed;
    this.saveTasks();
  }

  // filtra le task in base allo stato
  get filteredTasks(): Task[] {
    if (this.filter === 'completed') {
      return this.tasks.filter(t => t.completed);
    } else if (this.filter === 'pending') {
      return this.tasks.filter(t => !t.completed);
    }
    return this.tasks;
  }
}
