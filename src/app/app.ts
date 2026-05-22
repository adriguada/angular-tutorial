import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../core/header/header';
import { ErrorBannerComponent } from '../core/error/error.banner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ErrorBannerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('Tutorial de Angular');
}
