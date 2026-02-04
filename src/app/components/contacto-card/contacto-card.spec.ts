import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoCard } from './contacto-card';

describe('ContactoCard', () => {
  let component: ContactoCard;
  let fixture: ComponentFixture<ContactoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
