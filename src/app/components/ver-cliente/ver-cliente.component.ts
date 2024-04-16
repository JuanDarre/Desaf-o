import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-ver-cliente',
  templateUrl: './ver-cliente.component.html',
  styleUrls: ['./ver-cliente.component.css']
})
export class VerClienteComponent implements OnInit, OnDestroy {
  id!: number;
  cliente!: Cliente;
  routeSub!: Subscription;

        constructor(private _clienteService: ClienteService, 
              private aRoute: ActivatedRoute) {
                this.id = Number(this.aRoute.snapshot.paramMap.get('id')); 
              }
  

  ngOnInit(): void {
      this.routeSub = this.aRoute.params.subscribe(data => {
       this.id = data['id'];
    console.log(data);
    })
    this.obtenerCliente();

  }

  ngOnDestroy(): void {
    // this.routeSub.unsubscribe()
  }

  obtenerCliente(){
    this._clienteService.getCliente(this.id).subscribe(data => {
     this.cliente = data;
    })
  }

}
