import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludePublicationsComponent } from './include-publications.component';

describe('IncludePublicationsComponent', () => {
  let component: IncludePublicationsComponent;
  let fixture: ComponentFixture<IncludePublicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncludePublicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncludePublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
