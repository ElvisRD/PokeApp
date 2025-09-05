import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonService } from './services/pokemon.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PokemonsComponent } from './components/pokemons/pokemons.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, PokemonsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pokeApp';
  pokemons = [];
  typesSelected: any = [];

  constructor(
    private pokemonService: PokemonService
  ) {}


  ngOnInit(): void {
  }


  getPokemonsByType(types: any){
    this.pokemonService.getPokemonByType(types[0].name).subscribe(
      (resp: any) => {
        this.getDataPokemon(resp.pokemon.map((p: any) => p.pokemon.url));
      },
      (error) => {
        console.error(error);
      }
  )};

  getDataPokemon(urls: string[]){
     const requests = urls.map(url => this.pokemonService.getPokemonDetails(url));

    forkJoin(requests).subscribe({
      next: (results) => {
        console.log('Datos de todos los Pokémon:', results);
      },
      error: (err) => {
        console.error('Error al traer datos:', err);
      }
    });
  }

  receptTypesSelected(event: any){
    this.typesSelected = event;
  }
}
