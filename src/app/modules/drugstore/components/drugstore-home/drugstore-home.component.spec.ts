import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugstoreHomeComponent } from './drugstore-home.component';

describe('DrugstoreHomeComponent', () => {
  let component: DrugstoreHomeComponent;
  let fixture: ComponentFixture<DrugstoreHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrugstoreHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrugstoreHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
