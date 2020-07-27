import { Component, OnInit , Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() propagar  : any =  new EventEmitter();
  public candidato    : string ;

  constructor() { }

  ngOnInit(): void {
  }

  search(){
    this.propagar.emit(this.candidato? this.candidato: "");
  }

}
