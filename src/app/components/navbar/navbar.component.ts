import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  types: any[] = [];

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

  selectType(type: string): void {
    console.log(type);
  }

}
