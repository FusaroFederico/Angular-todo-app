import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatBadgeModule } from '@angular/material/badge';
import { TodoItemComponent } from './components/todo-item.component';
import { TodoService, Task } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatBadgeModule,
    TodoItemComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TODO List';
  tasks: Task[] = [];
  newTask: string = '';
  filter: 'all' | 'completed' | 'pending' = 'all';

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private todoService: TodoService
  ) {}
  
  // carica le tasks quando il componente viene avviato
  ngOnInit(){
    this.tasks = this.todoService.getTasks();
  }

  // aggiunge una Task alla lista, evitando quelle vuote
  addTask() {
    if (this.newTask.trim() !== '') {
      this.todoService.addTask(this.newTask.trim());
      this.tasks = this.todoService.getTasks();
      this.newTask = '';
      this.snackBar.open('Attività aggiunta!', 'Chiudi', { duration: 2000 });
    }
  }

  // rimuove una Task dalla lista, chiedendo conferma all'utente
  removeTask(index: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { taskName: this.tasks[index].text }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.todoService.removeTask(index);
        this.tasks = this.todoService.getTasks();
        this.snackBar.open('Attività rimossa', 'Chiudi', { duration: 2000 });
      }
    });
  }

  // permette di aggiornare lo stato della Task
  toggleCompleted(task: Task, index: number) {
    this.todoService.toggleTask(index);
    this.tasks = this.todoService.getTasks();
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

  // conta le task attive
  get activeTaskCount(): number {
    return this.tasks.filter(task => !task.completed).length;
  }
  
  updateTask(index: number) {
    // solo per triggering del badge o salvataggio su localStorage
    this.tasks[index].completed = this.tasks[index].completed;
  }
  
}
