import { Component, Input, SimpleChange, OnChanges } from '@angular/core';
import { PokemonComponent } from '../pokemon/pokemon.component';

@Component({
  selector: 'app-pokemons',
  imports: [PokemonComponent],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.scss'
})
export class PokemonsComponent {
  @Input() pokemons: any;

}
