import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

public propagar : string;
public candidateBase : string ;
public title = 'walmart-app';
public show : boolean= true;

Propagar(mensaje: any ) {
  this.show = false;

  this.candidateBase = mensaje.length>=3? mensaje : "" ;

  setTimeout(() => {
    console.log('hello');
    this.show = true;

  }, 200);
  
}

}
