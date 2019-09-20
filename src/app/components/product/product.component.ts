// import { Item } from '../../entities/item.entity';
import { Product } from '../../entities/product.entity';
import { CartService } from '../../services/cart.service';
import { MockService } from '../../services/mock.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    editMode: boolean;
    productForm: FormGroup;
    quantities: number[];
    products: Product[];

    constructor(private formBuilder: FormBuilder, private cartService: CartService) {
        this.productForm = this.formBuilder.group({
            name: ['', Validators.required],
            quantity: ['', Validators.required],
            price: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.quantities = MockService.QUANTITIES;
        this.products = MockService.PRODUCTS;
        this.cartService.editMode$.subscribe((product: Product) => {
            this.editMode = true;
            this.productForm.setValue({
                name: product.name,
                quantity: product.quantity,
                id: product.id,
                price: product.price
            });
        })
    }

    changeQuantity(e: any) {
        const value = this.productForm.value;
        value.quantity = e.target.value;
        this.productForm.setValue(value);
    }

    changeProduct(e: any) {
        const value = this.productForm.value ;
        const product = this.products.find(product => product.name === e.target.value);
        Object.assign(value, product);
        this.productForm.setValue(value);
    }

    onSubmit(product: Product) {
        if (this.editMode) {
            this.cartService.update(product);
        } else {
            this.cartService.add(product);
        }
        this.productForm.reset();
    }
}
