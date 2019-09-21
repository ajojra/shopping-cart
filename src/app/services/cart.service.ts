import { Product } from '../entities/product.entity';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private editModeSource = new Subject<Product>();
    private cartUpdatedSource = new Subject<Product[]>();

    editMode$ = this.editModeSource.asObservable();
    cartUpdated$ = this.cartUpdatedSource.asObservable();

    products: Product[] = [];

    get(): Product[] {
        return this.products;
    }

    add(item: Product) {
        this.products.push(item);
        this.cartUpdatedSource.next(this.products);
    }

    remove(id: number) {
        this.products = this.products.filter(item => item.id !== id);
        this.cartUpdatedSource.next(this.products);
    }

    update(product: Product) {
        let relatedProduct = this.products.find(i => i.id === product.id);
        Object.assign(relatedProduct, product);
        this.cartUpdatedSource.next(this.products);
    }

    setEditMode(product: Product) {
        this.editModeSource.next(product);
    }
}
