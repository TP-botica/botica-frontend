import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugstoreNavbarComponent } from './drugstore-navbar.component';

describe('DrugstoreNavbarComponent', () => {
  let component: DrugstoreNavbarComponent;
  let fixture: ComponentFixture<DrugstoreNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrugstoreNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrugstoreNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
