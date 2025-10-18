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


}
