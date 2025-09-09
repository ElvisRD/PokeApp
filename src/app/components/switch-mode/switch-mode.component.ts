import { Component,  } from '@angular/core';
import { ThemeService } from '../../services/theme.service';


@Component({
  selector: 'app-switch-mode',
  imports: [],
  templateUrl: './switch-mode.component.html',
  styleUrls: ['./switch-mode.component.scss']
})
export class SwitchModeComponent {
  isDarkMode = true;

  constructor(
    private themeService: ThemeService
  ){}

  setTheme(){
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';

    this.themeService.setTheme(theme);
  }

  
}
