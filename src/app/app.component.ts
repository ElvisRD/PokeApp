import { Component } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PokemonsComponent } from './components/pokemons/pokemons.component';
import { forkJoin } from 'rxjs';
import typesPokemon from '../assets/data/types.json';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, PokemonsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pokeApp';
  loadingPokemons: boolean = false;
  pokemons: any = [];
  firstType: any
  typesSelected: any = [];

  constructor(
    private pokemonService: PokemonService,
  ) {}


  getPokemonsByType(){
    this.loadingPokemons = true;
    this.pokemonService.getPokemonByType(this.firstType).subscribe(
      (resp: any) => {
        this.getDataPokemon(resp.pokemon.map((p: any) => p.pokemon.url));
      },
      (error) => {
        console.error('Error get names Pokemons by type:', error);
      }
  )};

  getDataPokemon(urls: string[]){
    const requests = urls.map(url => this.pokemonService.getPokemonDetails(url));

    forkJoin(requests).subscribe({
      next: (results) => {
        this.pokemons = results.map
        (pokemon => ({
          order: pokemon.id,
          name: pokemon.name,
          weight: pokemon.weight,
          height: pokemon.height,
          stats: pokemon.stats,
          image: pokemon.sprites.front_default,
          types: pokemon.types.map((typeInfo: any) => typesPokemon.find((type) => type.name === typeInfo.type.name))
        }));
        console.log(this.pokemons);
      },
      error: (err) => {
        console.error('Error get Pokemons details:', err);
      },
      complete: () => {
        this.loadingPokemons = false;
      }
    });

  }

  receptTypesSelected(types: any){
    
    if(types.length === 0 || this.firstType === types[0]?.name) return;
    this.firstType = types[0]?.name;
    this.typesSelected = types;
    this.getPokemonsByType();
    
  }
}
