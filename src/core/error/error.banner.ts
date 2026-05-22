import { Component, inject } from '@angular/core';
import { ErrorService } from './error.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-error-banner',
  standalone: true,
  imports: [NgIf],
  template: `
    <div *ngIf="error()" class="error-banner">
      {{ error() }}
      <button (click)="close()">✕</button>
    </div>
  `,
  styles: [`
    .error-banner {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: #d32f2f;
      color: white;
      padding: 12px 40px 12px 16px;
      font-weight: bold;
      z-index: 9999;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    button {
      background: transparent;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
    }
  `]
})
export class ErrorBannerComponent {

  private errorService = inject(ErrorService);
  error = this.errorService.errorMessage;

  close() {
    this.errorService.clear();
  }
}