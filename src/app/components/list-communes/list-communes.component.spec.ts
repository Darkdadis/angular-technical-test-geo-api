import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommunesComponent } from './list-communes.component';

describe('ListCommunesComponent', () => {
  let component: ListCommunesComponent;
  let fixture: ComponentFixture<ListCommunesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCommunesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCommunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
