import { Component } from '@angular/core';
import { festivosService } from './festivos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  festivos: any[] = [];

  constructor(private festivosService: festivosService) { }

  title = 'front_festivos';
  fechaSeleccionada: Date = new Date();
  anoSeleccionado: number =  new Date().getFullYear();;

  validarFecha() {
    let fecha = new Date(this.fechaSeleccionada);
    let fechaISO = fecha.toISOString().split('T')[0]; 
    let fechaFormateada = fechaISO.split('-').join('/'); 
    this.festivosService.getfestivo(fechaFormateada)
    .subscribe(
      festivo => alert(festivo), 
      error => alert(error.error.message)
    );
  }

  obtenerFestivos() {
    this.festivosService.getfestivos(this.anoSeleccionado)
      .subscribe(festivos => {
        this.festivos = festivos.map(festivo => {
          return {
            ...festivo,
            fecha: festivo.fecha.split('T')[0] // Esto convierte la fecha a formato 'año-mes-día'
          };
        });
      });
  }
}

