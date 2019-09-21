import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: CartService = TestBed.get(CartService);
        expect(service).toBeTruthy();
    });

    it('should get', () => {
        const service: CartService = TestBed.get(CartService);
        expect(service.get().length).toBeFalsy();
    });

    it('should add', () => {
        const service: CartService = TestBed.get(CartService);
        const product = {
            "name": "Bread",
            "quantity": 3,
            "price": 2,
            "id": 11
        };
        expect(service.products.length).toEqual(0);
        service.cartUpdated$.subscribe(products => {
            expect(products.length).toEqual(1);
        });
        service.add(product);
        expect(service.products.length).toEqual(1);
    });

    it('should remove', () => {
        const service: CartService = TestBed.get(CartService);
        const product = {
            "name": "Bread",
            "quantity": 3,
            "price": 2,
            "id": 11
        };
        expect(service.products.length).toEqual(0);
        service.add(product);
        service.cartUpdated$.subscribe(products => {
            expect(products.length).toEqual(0);
        });
        service.remove(11);
        expect(service.products.length).toEqual(0);
    });

    it('should update', () => {
        const service: CartService = TestBed.get(CartService);
        const product = {
            "name": "Bread",
            "quantity": 3,
            "price": 2,
            "id": 11
        };
        expect(service.products.length).toEqual(0);
        service.add(product);
        const newProduct = Object.assign({}, product, { quantity: 4 });

        service.cartUpdated$.subscribe(products => {
            expect(products.length).toEqual(1);
            expect(products[0].quantity).toEqual(newProduct.quantity);
        });
        service.update(newProduct);
        expect(service.products.length).toEqual(1);
        expect(service.products[0].quantity).toEqual(newProduct.quantity);
    });

    it('should set edit mode', () => {
        const service: CartService = TestBed.get(CartService);
        const product = {
            "name": "Bread",
            "quantity": 3,
            "price": 2,
            "id": 11
        };
        service.add(product);

        service.editMode$.subscribe(sproduct => {
            expect(sproduct).toEqual(product);
        });
        service.setEditMode(product);
    });
});
