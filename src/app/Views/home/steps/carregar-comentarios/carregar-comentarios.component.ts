import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carregar-comentarios',
  templateUrl: './carregar-comentarios.component.html',
  styleUrls: ['./carregar-comentarios.component.css']
})
export class CarregarComentariosComponent implements OnInit {
  ImgEscolhida = "../../../../../assets/img/perfilDefault.jpg";
  constructor() { }

  ngOnInit(): void {
  }

}
