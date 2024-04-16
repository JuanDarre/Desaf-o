import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';



@Component({
  selector: 'app-listado-cliente',
  templateUrl: './listado-cliente.component.html',
  styleUrls: ['./listado-cliente.component.css']
})
export class ListadoClienteComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = ['nombre', 'identificacion', 'edad', 'genero', 'estado', 'maneja', 'lentes', 'diabetico','otra','acciones'];
  dataSource = new MatTableDataSource<Cliente>();
  loading: boolean = false;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private _clienteService:ClienteService) { 

  }

  ngOnInit(): void {
    this.obtenerCliente();
  }

  ngAfterViewInit (){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length> 0){
      
      this.paginator._intl.itemsPerPageLabel = 'Items por pagina'
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  obtenerCliente(){
    this._clienteService.getClientes().subscribe(data=>{
      this.dataSource.data = data;
    })
  }

  eliminarCliente(id:number){
    this.loading = true;
    this._clienteService.deleteCliente(id).subscribe(() => {
      this.mensajeExito();
      this.loading = false;
      this.obtenerCliente();
    });
  }

  mensajeExito(){
    this._snackBar.open('El cliente fue eliminado con exito', '',{
      duration: 4000,
      horizontalPosition: 'right',
    });
  }
}
