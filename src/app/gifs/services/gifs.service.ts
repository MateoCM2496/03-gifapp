import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'UWM79ufE15m69cxH6HH6f1kjVRRDImtb';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) { 
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLocaleLowerCase(); //Pasar todo a miniscula
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag) //Para no repetir
    }

    this._tagsHistory.unshift(tag); //insertar al inicio
    this._tagsHistory = this._tagsHistory.splice(0, 10); //solo mostrara los ultimos 10
    this.saveLocalStorage(); //salvar historial en localStorage
  }

  private saveLocalStorage():void{
    localStorage.setItem('History', JSON.stringify( this._tagsHistory));  //JSON.stringify -> convierte un objeto a string
  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse( localStorage.getItem('history')! ); //JSON.parse-> convierte un string a objeto  ,  ! significa que siempre vendran datos, nunca sera null
    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search?`,{params})  //Observable
      .subscribe(resp => {
        this.gifList = resp.data;
        console.log({gifs: this.gifList});

      });

  }

}
