import { Component, OnInit } from '@angular/core';
import { Product } from '../../entities/product.entity';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    products: Product[] = [];
    editProduct: Product;

    get total() {
        return this.products.map(item => item.price * item.quantity).reduce((a, b) => a + b);
    }

    constructor(private cartService: CartService) { }

    ngOnInit() {
        this.products = this.cartService.get();
    }

    remove(id: number) {
        this.cartService.remove(id);
    }

    add(product: Product) {
        this.cartService.add(product);
    }

    edit(product: Product) {
        this.cartService.setEditMode(product);
    }

}
