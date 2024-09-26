import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponEditorComponent } from './weapon-editor.component';

describe('WeaponEditorComponent', () => {
  let component: WeaponEditorComponent;
  let fixture: ComponentFixture<WeaponEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeaponEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeaponEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
