import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListCommunesComponent } from './list-communes.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('ListCommunesComponent', () => {
  let component: ListCommunesComponent;
  let fixture: ComponentFixture<ListCommunesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCommunesComponent],
      providers: [
        provideHttpClientTesting(),
        HttpClient,
        HttpHandler,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: {
              paramMap: { get: () => null }
            }
          }
        }
      ]
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
