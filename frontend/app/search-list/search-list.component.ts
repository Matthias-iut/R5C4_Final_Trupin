import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Search } from '../models/Search';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [],
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.css'
})
export class SearchListComponent {
  constructor (private readonly http: HttpClient){}

  search : Search[] = [];

  @Output() onSingleModification = new EventEmitter<{ id: number; like: number }>();

  offset = 0;
  limit = 30;
  shownData: Search[] = [];

  ngOnInit(){
    this.http.get<Search[]>('http://127.0.0.1:5000/searches').subscribe((data) => {
      this.search = data;
      this.updateList();
    });
  
  }

  /**
   * Cf composant UserDataComponent pour plus d'explications sur le ngOnChanges
   */
  ngOnChanges() {
    this.updateList();
  }

  canGoNext() {
    return this.offset + this.limit < this.search.length;
  }

  canGoPrevious() {
    return this.offset > 0;
  }

  onNext() {
    this.offset += this.limit;
    this.updateList(); // Comme on changes ne se déclenche pas sur les changements internes, on doit appeler updateList manuellement
  }

  onPrevious() {
    this.offset = Math.max(0, this.offset - this.limit);
    this.updateList(); // Comme on changes ne se déclenche pas sur les changements internes, on doit appeler updateList manuellement
  }

  updateList() {
    this.shownData = this.search.slice(this.offset, this.offset + this.limit);
  }

  // 5 - Manipulation unique
  onSingleUpdate(id: number, like: number) {
    this.onSingleModification.emit({ id, like });
  }


}
