import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateCarDto, UpdateCarDto } from './dto';
import { Car } from './interfaces/car.interface';
import { ok } from 'assert';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corola',
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic',
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee',
        },
    ];

    public findAll() {
        return this.cars;
    }

    findOneById(id: string) {

        const car = this.cars.find(car => car.id === id);
        if (!car) throw new NotFoundException(`Car with id '${id}' not found`);

        return car;
    }

    public create(createCarDto: CreateCarDto) {

        const newCar: Car = {
            id: uuid(),
            ...createCarDto,
        }

        this.cars.push(newCar);

        return newCar;

    }

    public updateCar(id: string, updateCarDto: UpdateCarDto) {

        let carDB = this.findOneById(id);

        if (updateCarDto.id && updateCarDto.id !== id) throw new BadRequestException(`Car id is not valid inside body`);

        this.cars = this.cars.map(car => {

            if (car.id === id) {
                carDB = { ...carDB, ...updateCarDto, id }
                return carDB;
            }

            return car;
        })

        return carDB;

    }

    public deleteCar(id: string) {

        const car = this.findOneById(id);

        this.cars = this.cars.filter(car => car.id !== id);

        return;

    }

}
