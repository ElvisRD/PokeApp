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
  @Input() favoritePokemon: any = [];

  actionFavoritePokemon(pkm: any) {
    if (!this.favoritePokemon.includes(pkm.order)) {
      this.favoritePokemon.push(pkm.order);
    }else{
      this.favoritePokemon = this.favoritePokemon.filter((id: number) => id !== pkm.order);
    }

    console.log(this.favoritePokemon);
    
  }


}
