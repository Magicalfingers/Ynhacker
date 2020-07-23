import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsContentComponent } from './news-content.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('NewsContentComponent', () => {
  let component: NewsContentComponent;
  let fixture: ComponentFixture<NewsContentComponent>;
  let router;
  let mockRouter: Router;
  mockRouter = jasmine.createSpyObj(['navigate']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule],
      declarations: [ NewsContentComponent ],
      providers: [{
        provide: Router,
        useValue: mockRouter
      },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ pageNo: '' })
          },
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsContentComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create  ', () => {
    expect(component).toBeTruthy();
  });
});
