import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorService {

  errorMessage = signal<string | null>(null);

  showError(message: string) {
    this.errorMessage.set(message);

    // opcional: auto ocultar
    setTimeout(() => this.clear(), 5000);
  }

  clear() {
    this.errorMessage.set(null);
  }
}