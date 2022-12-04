import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, startWith, map } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @Output() sendTextResults = new EventEmitter<any>();
  @Output() sendTagsResults = new EventEmitter<any[]>();
  @Output() ltr = new EventEmitter<boolean>();
  isChecked = false;
  tagy: string[] = [];
  searchForm: FormGroup;
  allTags: any[] = [];
  filteredTags: Observable<any[]>;

  constructor(private api: ApiService) {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      tags: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.api.getAllTags().subscribe((res) => (this.allTags = res));
    this.filteredTags = this.tags.valueChanges.pipe(
      startWith(null),
      map((phrase: string | null) =>
        phrase ? this._filter(phrase) : this.allTags.slice()
      )
    );
  }

  public get search(): FormControl {
    return this.searchForm.get('search') as FormControl;
  }

  public get tags(): FormControl {
    return this.searchForm.get('tags') as FormControl;
  }

  removeChip(data: string): void {
    this.tagy = this.tagy.filter((value: string) => value !== data);
  }

  addChip(event: MatAutocompleteSelectedEvent): void {
    const input = event.option.viewValue.toLowerCase().trim();
    if (input.length > 0) {
      const newTags: string[] = [...this.tagy, input].filter(
        (element: string, index: number) => {
          return [...this.tagy, input].indexOf(element) === index;
        }
      );
      if (this.tagy.length !== newTags.length) {
        this.tagy = newTags;
        this.tagInput.nativeElement.innerHTML = '';
        this.tags.setValue(null);
      }
    }
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter((tag) =>
      tag.name.toLowerCase().includes(filterValue)
    );
  }

  searching(): void {
    if (this.isChecked) {
      this.ltr.emit(true);
      this.api
        .filterTags({ tags: this.tagy })
        .subscribe((res) => this.sendTagsResults.emit(res));
    } else {
      this.tagy = [];
      this.api
        .filterArticlesByText({ search_string: this.search.value })
        .subscribe((res) => this.sendTextResults.emit(res));
    }
  }
}
