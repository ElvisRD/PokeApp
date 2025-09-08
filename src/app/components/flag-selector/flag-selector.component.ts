import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-flag-selector',
  imports: [],
  templateUrl: './flag-selector.component.html',
  styleUrl: './flag-selector.component.scss'
})
export class FlagSelectorComponent {
  isOpen = false;
  selectedLang = { code: 'ES', name: 'Es', flag: 'assets/flags/es.png'}

  languages = [
    { code: 'es', name: 'Es', flag: 'assets/flags/es.png' },
    { code: 'en', name: 'En', flag: 'assets/flags/en.png' },
  ];

  constructor(
    private translate: TranslateService
  ){

  }

  toggleDropdown(){
    this.isOpen = !this.isOpen
  }

  selectLanguage(lang: any) {
    this.selectedLang = lang
    this.translate.use(lang.code)
    
    this.isOpen = false;
  }

}
