import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gif-home-page',
  template: `<p>home works!</p>`,
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  constructor(private gifsSevice: GifsService) { }

  get gifs(): Gif[] {
    return this.gifsSevice.gifList;
  }
}
