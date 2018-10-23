import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetPoolDetailComponent } from './bet-pool-detail.component';

describe('BetPoolDetailComponent', () => {
  let component: BetPoolDetailComponent;
  let fixture: ComponentFixture<BetPoolDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetPoolDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetPoolDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
