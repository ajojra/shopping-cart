import { CartService } from '../../services/cart.service';
import { CartComponent } from './cart.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


const mockCart = [
    {
        "name": "Bread",
        "quantity": "2",
        "price": 2,
        "id": 10
    },
    {
        "name": "Cheese",
        "quantity": "4",
        "price": 3.5,
        "id": 10
    },
    {
        "name": "Pasta",
        "quantity": "6",
        "price": 4.5,
        "id": 10
    }
];

const mockCartService = {
    get: () => mockCart,
    remove: jasmine.createSpy('emit'),
    setEditMode: jasmine.createSpy('emit'),
    cartUpdated$: { subscribe: () => mockCart }
}

describe('CartComponent', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CartComponent],
            providers: [
                {
                    provide: CartService, useValue: mockCartService
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should remove', () => {
        component.remove(10)
        expect(mockCartService.remove).toHaveBeenCalledWith(10);
    });

    it('should edit', () => {
        const product = {
            "name": "Bread",
            "quantity": 3,
            "price": 2,
            "id": 11
        };
        component.edit(product)
        expect(mockCartService.setEditMode).toHaveBeenCalledWith(product);
    });
});
