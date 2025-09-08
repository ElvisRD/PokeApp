import { Component } from '@angular/core';

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
    { code: 'ES', name: 'Es', flag: 'assets/flags/es.png' },
    { code: 'EN', name: 'En', flag: 'assets/flags/en.png' },
  ];

  toggleDropdown(){
    this.isOpen = !this.isOpen
  }

  selectLanguage(lang: any) {
    this.selectedLang = lang
    
    this.isOpen = false;
  }

}
