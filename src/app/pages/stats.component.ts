// src/app/pages/stats.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { MatCardModule } from '@angular/material/card';

// Componente per visualizzare le statistiche delle attività
// Mostra il totale delle attività, quelle completate e quelle da completare
@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card>
      <h2>Statistiche</h2>
      <p>Totali: {{ total }}</p>
      <p>Completate: {{ completed }}</p>
      <p>Da completare: {{ pending }}</p>
    </mat-card>
  `,
    styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  total = 0;
  completed = 0;
  pending = 0;

  constructor(private todoService: TodoService) {
    const tasks = this.todoService.getTasks();
    this.total = tasks.length;
    this.completed = tasks.filter(t => t.completed).length;
    this.pending = tasks.filter(t => !t.completed).length;
  }
}
