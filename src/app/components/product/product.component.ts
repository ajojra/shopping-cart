import { CartService } from '../../services/cart.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Item } from '../../entities/item.entity';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    editMode: boolean;
    productForm: FormGroup;
    constructor(private formBuilder: FormBuilder, private cartService: CartService) {
        this.productForm = this.formBuilder.group({
            name: '',
            quantity: '',
            price: '',
            id: ''
        });
    }

    ngOnInit() {

        this.cartService.editMode$.subscribe((item: Item) => {
            this.editMode = true;
            this.productForm.setValue({
                name: item.product.name,
                quantity: item.quantity,
                id: item.product.id,
                price: item.product.price
            });
        })
    }

    onSubmit(item: Item) {
        if (this.editMode) {
            this.cartService.update(item);
        } else {
            this.cartService.add(item);
        }
        this.productForm.reset();
    }
}
