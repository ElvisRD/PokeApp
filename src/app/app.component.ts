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
  pokemonsbackup: any = [];
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
    this.loadingPokemons = true;
    
    const requests = urls.map(url => this.pokemonService.getPokemonDetails(url));

    forkJoin(requests).subscribe({
      next: (res) => {
        this.pokemonsbackup = res.map
        (pokemon => ({
          order: pokemon.id,
          name: pokemon.name,
          weight: pokemon.weight,
          height: pokemon.height,
          stats: pokemon.stats,
          image: pokemon.sprites.front_default,
          types: pokemon.types.map((typeInfo: any) => typesPokemon.find((type) => type.name === typeInfo.type.name))
        }));

        console.log(this.pokemonsbackup)
        this.pokemons = this.pokemonsbackup;
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
    if(types.length === 0 || this.firstType === types[0]?.name){
      if(types.length !== 0){
        const pokemonsFiltered = this.pokemonsbackup.filter((pokemon: any) => 
        types.every((type: any) => pokemon.types.some((pType: any) => pType.name === type.name))
      );
      this.pokemons = pokemonsFiltered;
      console.log('no changes');
      }else{
        // When no types are selected, show all pokemons
      }
     
    }else{
      this.firstType = types[0]?.name;
      this.typesSelected = types;
      this.getPokemonsByType();
    }
    
    
  }
}
