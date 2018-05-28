import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColourChartComponent } from './colour-chart.component';

describe('ColourChartComponent', () => {
  let component: ColourChartComponent;
  let fixture: ComponentFixture<ColourChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColourChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColourChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
