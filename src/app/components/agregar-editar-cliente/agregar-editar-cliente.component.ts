import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-agregar-editar-cliente',
  templateUrl: './agregar-editar-cliente.component.html',
  styleUrls: ['./agregar-editar-cliente.component.css']
})
export class AgregarEditarClienteComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup;
  id: number;

  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder,
    private _clienteService : ClienteService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      nombreCompleto: ['', Validators.required],
      identificacion: [null, Validators.required],
      edad: [null, Validators.required],
      genero: ['', Validators.required],
      estado: [true, Validators.required],
      maneja: [false, Validators.required],
      lentes: [false, Validators.required],
      diabetico: [false, Validators.required],
      otraEnfermedad: [''],
    })

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    console.log(this.id);
   }

  ngOnInit(): void {
    if(this.id != 0){
      this.operacion = 'Editar'
      this.obtenerCliete(this.id)
    }
  }

  obtenerCliete(id: number){
    this.loading = true;
    this._clienteService.getCliente(id).subscribe(data =>{
      this.form.patchValue({
        nombreCompleto: data.nombreCompleto,
        identificacion: data.identificacion,
        edad: data.edad,
        genero: data.genero,
        estado: data.estado,
        maneja: data.maneja,
        lentes: data.lentes,
        diabetico: data.diabetico,
        otraEnfermedad: data.otraEnfermedad
      })
      this.loading = true;
    })
  }

  agregarEditarCliente(){

    //Estos son dos metodos diferentes para hacer la llamada de los datos.
    //const nombre = this.form.value.nombreCompleto;
    // const nombre = this.form.get('nombreCompleto')?.value;

    //Armamos el objeto
    const cliente: Cliente = {
      nombreCompleto: this.form.value.nombreCompleto,
      identificacion: this.form.value.identificacion,
      edad: this.form.value.edad,
      genero: this.form.value.genero,
      estado: this.form.value.estado,
      maneja: this.form.value.maneja,
      lentes: this.form.value.lentes,
      diabetico: this.form.value.diabetico,
      otraEnfermedad: this.form.value.otraEnfermedad
     }

     if(this.id != 0){

      cliente.id = this.id;
       this.editarCliente(this.id, cliente);
     }
     else{
      this.agregarCliente(cliente);
     }
  }

  editarCliente(id: number, cliente: Cliente){
    this.loading = true;
    this._clienteService.updateCliente(id, cliente).subscribe(() => {
      this.loading = false;
      this.mensajeExito('actualizado');
      this.router.navigate(['/listClientes'])

    })
  }

  
  agregarCliente(cliente: Cliente){
       //envio el objeto al back
       this._clienteService.addCliente(cliente).subscribe(data =>{
        this.mensajeExito('registrado');
        this.router.navigate(['/listClientes']);
       })
  }

  mensajeExito(text: string){
    this._snackBar.open(`El cliente fue ${text} con exito`, '',{
      duration: 4000,
      horizontalPosition: 'right',
    });
  }

  test(ev: any) {
    console.log(this.form);
    
  }
}
