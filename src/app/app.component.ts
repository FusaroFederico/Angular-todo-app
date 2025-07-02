import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TODO List';
  tasks: string[] = ['Comprare il pane', 'Studiare Angular', 'Fare sport'];
  newTask: string = '';
  
  // carica le tasks quando il componente viene avviato
  ngOnInit(){
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks){
      this.tasks = JSON.parse(savedTasks);
    }
  }

  // salva le tasks in localStorage
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }


  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push(this.newTask.trim());
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
}
