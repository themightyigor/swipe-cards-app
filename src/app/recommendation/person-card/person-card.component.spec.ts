import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { PersonCardComponent } from './person-card.component';
import { Person } from '../../models/person.model';

describe('PersonCardComponent', () => {
  let component: PersonCardComponent;
  let fixture: ComponentFixture<PersonCardComponent>;

  const mockPerson: Person = {
    name: 'Carrie',
    id: 1,
    age: 21,
    isVisible: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatButtonModule, MatCardModule, MatDialogModule],
      declarations: [PersonCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonCardComponent);
    component = fixture.componentInstance;
    component.person = mockPerson;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
