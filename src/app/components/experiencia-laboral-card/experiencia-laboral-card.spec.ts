import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciaLaboralCard } from './experiencia-laboral-card';

describe('ExperienciaLaboralCard', () => {
  let component: ExperienciaLaboralCard;
  let fixture: ComponentFixture<ExperienciaLaboralCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienciaLaboralCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienciaLaboralCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
