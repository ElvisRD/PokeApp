import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

export type Theme = 'dark' | 'light'

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT)

  constructor() { }

  setTheme(theme: Theme){
    this.document.documentElement.setAttribute("data-theme", theme);
  }
}
