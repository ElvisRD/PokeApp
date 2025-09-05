import { Component, Output, EventEmitter } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  types: any[] = [];
  typesSelected: any = [];
  @Output() sendTypes = new EventEmitter<any>();

  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.getTypes();
  }


  getTypes(): void {
    this.pokemonService.getTypesPokemon().subscribe(types => {
      this.types = types;
    })
  } 

  isSelectedType(type: any): boolean {
    return this.typesSelected.some((t: any)=> t.id === type.id);
  }

  selectType(type: any): void {
    if(this.typesSelected.some((t: any)=> t.id === type.id)){
      this.typesSelected = this.typesSelected.filter((t: any) => t.id !== type.id);
    }else{
      if(this.typesSelected.length < 3){ 
          this.typesSelected.push({id: type.id, name: type.name});
      }
    }
    
    this.sendTypes.emit(this.typesSelected);
  }

}
