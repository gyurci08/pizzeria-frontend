import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatFormField, MatInput} from '@angular/material/input';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-search-field',
  imports: [
    MatInput,
    MatFormField,
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss'
})
export class SearchFieldComponent implements OnInit {
  searchControl = new FormControl('');

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.search.emit(value ?? '');  // Values is empty string if null
    });
  }

  @Output() search = new EventEmitter<string>();
}
