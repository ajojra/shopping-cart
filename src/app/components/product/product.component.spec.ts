import { CartService } from '../../services/cart.service';
import { ProductComponent } from './product.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const mockCartService = {
    get: () => [],
    add: jasmine.createSpy('emit'),
    update: jasmine.createSpy('emit'),
    editMode$: { subscribe: () => null }
}

describe('ProductComponent', () => {
    let component: ProductComponent;
    let fixture: ComponentFixture<ProductComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule],
            providers: [
                {
                    provide: CartService, useValue: mockCartService
                }
            ],
            declarations: [ProductComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add on submit', () => {
        const product = {
            "name": "Bread",
            "quantity": 3,
            "price": 2,
            "id": 0
        };
        component.onSubmit(product);
        expect(mockCartService.add).toHaveBeenCalledWith(product);
    });

    it('should edit on submit', () => {
        const product = {
            "name": "Bread",
            "quantity": 3,
            "price": 2,
            "id": 0
        };
        component.editMode = true;
        component.onSubmit(product);
        expect(mockCartService.update).toHaveBeenCalledWith(product);
    });

    // TODO: Not able to write reminaing test cases because of time limitation.
});
