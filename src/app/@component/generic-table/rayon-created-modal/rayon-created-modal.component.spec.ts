import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RayonCreatedModalComponent } from './rayon-created-modal.component';

describe('RayonCreatedModalComponent', () => {
  let component: RayonCreatedModalComponent;
  let fixture: ComponentFixture<RayonCreatedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RayonCreatedModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RayonCreatedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
