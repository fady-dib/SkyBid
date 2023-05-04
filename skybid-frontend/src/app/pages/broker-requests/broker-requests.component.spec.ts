import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerRequestsComponent } from './broker-requests.component';

describe('BrokerRequestsComponent', () => {
  let component: BrokerRequestsComponent;
  let fixture: ComponentFixture<BrokerRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrokerRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
