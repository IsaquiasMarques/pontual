import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditoralStatusComponent } from './editoral-status.component';

describe('EditoralStatusComponent', () => {
  let component: EditoralStatusComponent;
  let fixture: ComponentFixture<EditoralStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditoralStatusComponent]
    });
    fixture = TestBed.createComponent(EditoralStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
