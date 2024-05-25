import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {

    private cars = [
        {
            id: 1,
            brand: 'Toyota',
            model: 'Corola',
        },
        {
            id: 2,
            brand: 'Honda',
            model: 'Civic',
        },
        {
            id: 3,
            brand: 'Jeep',
            model: 'Cherokee',
        },
    ];

    public findAll() {
        return this.cars;
    }

    public findOneById(id: number) {
        const car = this.cars.filter( car => car.id === id);

        if ( car.length === 0 ) {
            throw new NotFoundException(`Car with id '${ id }' not found`);
        }

        return car;
    }

    

}
