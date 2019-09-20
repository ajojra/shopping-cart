import { Product } from '../entities/product.entity';

export class MockService {
    static PRODUCTS: Product[] = [
        {id: 1, name: 'Bread', price: 2 },
        {id: 2, name: 'Cereals', price: 4 },
        {id: 3, name: 'Cheese', price: 3.5 },
        {id: 4, name: 'Cooking Oils', price: 7 },
        {id: 5, name: 'Eggs', price: 4 },
        {id: 6, name: 'Meat', price: 7 },
        {id: 7, name: 'Pasta', price: 4.5 },
        {id: 8, name: 'Rice', price: 11 },
        {id: 9, name: 'Salad Dressings', price: 3 },
        {id: 10, name: 'Sauces', price: 2 }
    ];
    static QUANTITIES: number[] = [
        1, 2, 3, 4, 5, 6, 7, 8, 9
    ]
}