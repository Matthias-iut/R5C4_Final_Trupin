import { Component, Input } from '@angular/core';
import { NumberCardModule } from '@swimlane/ngx-charts';
import { DataFromJson, SingleData } from './../../../types';
import { GraphService } from '../../../graph.service';
import { Search } from '../../../models/Search';
import { HttpClient } from '@angular/common/http';

/**
 * 1. Indicateurs clés (cartes)
 * Commencez par afficher des indicateurs clés pour avoir une vue d’ensemble des données :
 * - Nombre total de voyages : Combien de voyages ont été effectués ?
 * - Prix moyen : Quel est le prix moyen d’un voyage ?
 * - Note moyenne : Quelle est la satisfaction globale des passagers ?
 */

@Component({
  selector: 'app-g1',
  standalone: true,
  imports: [NumberCardModule], // N'oubliez pas d'importer le module correspondant pour afficher votre graphique
  templateUrl: './g1.component.html',
})
export class G1Component {
  
  bfs : string = "BFS";
  dfs : string = "DFS";
  djkistra : string = "djikstra";
  aetoile : string = "A\*";
  search : Search[] = [];
  /**
   * Pour injecter un service, vous l'appelez simplement dans le constructor
   *
   * Il n'est pas nécessaire de le mettre dans la liste d'imports du composant Angular
   * car le service est connu de l'application entière
   */
  constructor(private readonly http : HttpClient, private readonly graphService : GraphService) {
    this.result=this.format();
  }

  result: SingleData = []; // C'est là que vous mettez votre résultat formaté
  view: [number, number] = [400, 400]; // Taille du graphique, respectez bien le format [largeur, hauteur]
  cardBG = 'black';

  // Notez que contrairement à la correction du TP Angular 1, on utilise ici ngOnInit car la donnée est directement disponible
  // dans Angular puisque provenant d'un fichier JSON interne et non d'une API externe
  ngOnInit() {
    this.http.get<Search[]>('http://127.0.0.1:5000/searches').subscribe((data) => (this.search = data));
    this.result = this.format();
  }
  
  // On met format en privé, pour indiquer clairement que cette méthode ne doit pas être utilisée dans le template
  private format() {
    return this.graphService.toSingleData({
      'BFS': this.search.filter((s) => s.algorithm===this.bfs).length,
      'DFS': this.search.filter((s) => s.algorithm===this.dfs).length,
      'djikstra': this.search.filter((s) => s.algorithm===this.djkistra).length,
      'A\*': this.search.filter((s) => s.algorithm===this.aetoile).length
    });
  }
}
