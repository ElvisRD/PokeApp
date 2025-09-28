import { Component, Input } from '@angular/core';
import { TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-pokemon',
  imports: [TranslateModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent {
  @Input() pkm: any;
  @Input() pokemonFavorites: any = [];

  favoritePokemon(pkm: any) {

    const favorites = localStorage.getItem('favoritesPokemon');
    let pkmArray = favorites ? JSON.parse(favorites) : [];

    if (!pkmArray.some((p: any) => p.order === pkm.order)) {
      pkmArray.push(pkm.order);
    }

    localStorage.setItem('favoritesPokemon', JSON.stringify(pkmArray));
  }


}
