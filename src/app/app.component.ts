import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Car } from './models/car';
import { CarService } from './services/car.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  car = {} as Car;
  cars!: Car[];

  constructor(private carService: CarService){}

  ngOnInit() {
    this.getCars();
  }

    saveCar(form:NgForm) { // define se um carro será criado ou atualizado
      if (this.car.id !== undefined){
        this.carService.updateCar(this.car).subscribe(() => {
          this.cleanForm(form);
        });
      } else {
        this.carService.saveCar(this.car).subscribe(() => {
          this.cleanForm((form))
        })
      }
    }

    getCars() { // Chama o serviço para obter todos os carros
      this.carService.getCars().subscribe((cars: Car[]) => {
        this.cars = cars;
      });
    }

    deletaCar(car: Car){ // deleta um carro
      this.carService.deleteCar(car).subscribe(() => {
        this.getCars();
      });
    }

    editCar(car: Car){ // copia o carro para ser editado.
      this.car = {...car};
    }

    cleanForm(form: NgForm) { // limpa o formulario
      this.getCars();
      form.resetForm();
      this.car = {} as Car;
    }

}
