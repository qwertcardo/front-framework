import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleryDialogComponent } from './galery-dialog.component';

describe('GaleryDialogComponent', () => {
  let component: GaleryDialogComponent;
  let fixture: ComponentFixture<GaleryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
