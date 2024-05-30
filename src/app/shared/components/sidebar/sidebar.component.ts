import {Component, Injectable } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';



@Component({
  selector: 'shared-sidebar',
  template: `<p>shared sidebar works!</p>`,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent { 
//injectar el servicio, private gifService
constructor(private gifService: GifsService){}  //Injeccion del servicio

get tag_History():string[]{
  return this.gifService.tagsHistory;
}   //trayendo lo insertado

searchTag(tag:string):void{    //La injeccion del servicio linea 14 y traer un tag especifico
  this.gifService.searchTag(tag);
}

}
