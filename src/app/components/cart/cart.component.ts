import { Component, OnInit } from '@angular/core';
import { Item } from '../../entities/item.entity';
import { CartService } from '../../services/cart.service';
@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    items: Item[] = [];
    editItem: Item;

    get total() {
        return this.items.map(item => item.product.price * item.quantity).reduce((a, b) => a + b);
    }

    constructor(private cartService: CartService) { }

    ngOnInit() {
        this.items = this.cartService.get();
    }

    remove(id: number) {
        this.cartService.remove(id);
    }

    add(item: Item) {
        this.cartService.add(item);
    }

    edit(item: Item) {
        this.cartService.setEditMode(item);
    }

}
