import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorizedPostsSectionComponent } from './categorized-posts-section.component';

describe('CategorizedPostsSectionComponent', () => {
  let component: CategorizedPostsSectionComponent;
  let fixture: ComponentFixture<CategorizedPostsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorizedPostsSectionComponent]
    });
    fixture = TestBed.createComponent(CategorizedPostsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
