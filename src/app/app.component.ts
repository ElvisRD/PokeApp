import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonService } from './services/pokemon.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PokemonsComponent } from './components/pokemons/pokemons.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, PokemonsComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pokeApp';

  constructor(
    private pokemonService: PokemonService
  ) {}


  ngOnInit(): void {
    this.getPokemons();
  }


  getPokemons(){
    this.pokemonService.getTypesPokemon().subscribe((res) => {
      console.log(res);
    });
  }
}
