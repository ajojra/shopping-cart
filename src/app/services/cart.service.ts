import { Injectable } from '@angular/core';
import { Item } from '../entities/item.entity';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Item[] = [
    {
      quantity: 10,
      product: {
        id: 1,
        name: 'Milk',
        price: 4.5
      }
    },
    {
      quantity: 15,
      product: {
        id: 2,
        name: 'Eggs',
        price: 8
      }
    },
    {
      quantity: 20,
      product: {
        id: 3,
        name: 'Bread',
        price: 10
      }
    }
  ];
  private editModeSource = new Subject<Item>();
  editMode$ = this.editModeSource.asObservable();
  constructor() { }

  get(): Item[] {
    return this.items;
  }

  add(item: Item) {
    this.items.push(item);
  }

  remove(id: number) {
    this.items = this.items.filter(item => item.product.id !== id);
  }

  update(item: Item) {
    let relatedItem = this.items.find(i => i.product.id === item.product.id);
    relatedItem = item;
  }

  setEditMode(item: Item) {
    this.editModeSource.next(item);
  }


}
