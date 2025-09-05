import { Component } from '@angular/core';
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
  typeSelected: any = [];

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

  selectType(type: any): void {
    if(this.typeSelected.includes(type.id)){
      this.typeSelected = this.typeSelected.filter((t: any) => t !== type.id);
    }else{
      this.typeSelected.push(type.id);
    }
    
  }

}
