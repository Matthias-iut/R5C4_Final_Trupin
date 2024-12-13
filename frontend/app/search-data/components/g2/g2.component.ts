import { Component, Input } from '@angular/core';
import { DataFromJson, SingleData } from '../../../types';
import { GraphService } from '../../../graph.service';
import { BarChartModule } from '@swimlane/ngx-charts';
import { HttpClient } from '@angular/common/http';
import { Search } from '../../../models/Search';

@Component({
  selector: 'app-g2',
  standalone: true,
  imports: [BarChartModule],
  templateUrl: './g2.component.html',
  styleUrl: './g2.component.css'
})
export class G2Component {
  search : Search[] = [];
  result: SingleData = [];
  view: [number, number] = [1200, 500];
  xAxisLabel = "catégorie d'algorithme";
  yAxisLabel = 'temps moyens';

  constructor(private readonly graphService: GraphService, private readonly http : HttpClient) {}

  ngOnInit() {
    this.http.get<Search[]>('http://127.0.0.1:5000/searches').subscribe((data) => (this.search = data));
    this.result = this.format();

  }

  // On met format en privé, pour indiquer clairement que cette méthode ne doit pas être utilisée dans le template
  private format() {
    // 1. Récupérer les passagers insatisfaits
    const tri = this.search.filter(({ grid_width }) => grid_width>200);
    // 2. Mapper uniquement les motifs d'insatisfaction
    //const triBFS = tri.map(({ algorithm }) => algorithm==="BFS");
    //const triDFS = tri.map(({ algorithm }) => algorithm==="DFS");
    //const triDjikstra = tri.map(({ algorithm }) => algorithm==="Djikstra");
    //const triAetoile = tri.map(({ algorithm }) => algorithm==="A\*");
    // 3. Regrouper les motifs d'insatisfaction par unique valeur
    return this.graphService.toSingleData({
      'BFS' : this.graphService.avg(tri.filter((s) => s.algorithm==="BFS").map(({time_ns})=>time_ns)),
      'DFS' : this.graphService.avg(tri.filter((s) => s.algorithm==="DFS").map(({time_ns})=>time_ns)),
      'Djikstra' : this.graphService.avg(tri.filter((s) => s.algorithm==="Djikstra").map(({time_ns})=>time_ns)),
      'Aetoile' : this.graphService.avg(tri.filter((s) => s.algorithm==="A\*").map(({time_ns})=>time_ns)),
  });
  }
}
