import { Component } from '@angular/core';
import { NumberCardModule } from '@swimlane/ngx-charts';
import { PageComponent } from './page/page.component';

@Component({
  selector: 'app-search-data',
  standalone: true,
  imports: [NumberCardModule, PageComponent ],
  templateUrl: './search-data.component.html',
  styleUrl: './search-data.component.css'
})
export class SearchDataComponent {


}
