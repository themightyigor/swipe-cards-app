import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonCardComponent {
  @Input() person!: Person;
  @Input() isMatch!: boolean;

  @Output() like = new EventEmitter();
  @Output() swipe = new EventEmitter();
}
