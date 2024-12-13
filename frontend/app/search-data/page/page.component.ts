import { Component } from '@angular/core';
import { G1Component } from '../components/g1/g1.component';
import { Search } from '../../models/Search';
import { HttpClient } from '@angular/common/http';
import { G2Component } from '../components/g2/g2.component';
import { G3Component } from '../components/g3/g3.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [G1Component, G2Component, G3Component],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  constructor (private readonly http: HttpClient){}
  search : Search[] = [];
  ngOnInit(){
    this.http.get<Search[]>('http://127.0.0.1:5000/searches').subscribe((data) => {
      this.search = data;
    });
  }

}
