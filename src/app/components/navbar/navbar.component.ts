import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { TranslateModule} from '@ngx-translate/core';
import { FlagSelectorComponent } from '../flag-selector/flag-selector.component';
import { SwitchModeComponent } from '../switch-mode/switch-mode.component';


@Component({
  selector: 'app-navbar',
  imports: 
  [
    CommonModule, 
    TranslateModule, 
    FlagSelectorComponent,
    SwitchModeComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  types: any[] = [];
  typesSelected: any[] = [];
  visibleTypes: boolean = true;
  isPhone: boolean = false;
  favoritePokemon: any[] = [];
  @Output() sendTypes = new EventEmitter<any>();

  constructor(
    private pokemonService: PokemonService,
  ) {

   }

  ngOnInit(): void {
    this.checkDevice();
    this.getTypes();
    this.selectType({id: 1, name: 'normal'});
  }

  getTypes(): void {
    this.pokemonService.getTypesPokemon().subscribe(types => {
      this.types = types.map((type: any) => ({id: type.id, name: type.name, color: type.color, state: type.name === 'normal' ? true : false}));
    })
  } 

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkDevice();
  }


  checkDevice(): void {
      const width = window.innerWidth;

      if(width <= 1024){
        this.isPhone = true;
      }else{
        this.isPhone = false;
        this.visibleTypes = true;
      }
  }

  selectType(type: any): void {

    if(!type.state){
      if(this.typesSelected.length < 3){
        type.state = true;
        this.typesSelected.push({id: type.id, name: type.name});
      }
    }else{
      type.state = false;
      this.typesSelected = this.typesSelected.filter((t: any) => t.id !== type.id);
    }

    if(this.typesSelected.length === 0){
      this.types.find((t: any) => t.name === 'normal').state = true;
      this.typesSelected.push({id: 1, name: 'normal'});
    }

    this.sendTypes.emit(this.typesSelected);

  }

}
