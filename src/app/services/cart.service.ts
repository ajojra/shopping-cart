import { Injectable } from '@angular/core';
import { Product } from '../entities/product.entity';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: Product[] = [
    {
      quantity: 10,
      id: 1,
      name: 'Milk',
      price: 4.5
    },
    {
      quantity: 15,
      id: 2,
      name: 'Eggs',
      price: 8
    },
    {
      quantity: 20,
      id: 3,
      name: 'Bread',
      price: 10
    }
  ];
  private editModeSource = new Subject<Product>();
  editMode$ = this.editModeSource.asObservable();
  constructor() { }

  get(): Product[] {
    return this.products;
  }

  add(item: Product) {
    this.products.push(item);
  }

  remove(id: number) {
    this.products = this.products.filter(item => item.id !== id);
  }

  update(product: Product) {
    let relatedProduct = this.products.find(i => i.id === product.id);
    relatedProduct = product;
  }

  setEditMode(product: Product) {
    this.editModeSource.next(product);
  }


}
