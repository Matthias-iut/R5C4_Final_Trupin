/**
 * Notre représentation du fichier JSON
 *
 * Angular ne peut pas savoir exactement le type de données du fichier
 * On pourra se servir de ce type pour faire un cast
 */
export type DataFromJson = SearchData[];

/**
 * Notre représentation d'un voyage
 */
export type SearchData = {
  id : number;
  algorithm : "DFS" | "BFS" | "Djikstra" | "A\*";
  grid_width : number;
  grid_height : number;
  move_type : "orthogonal" | "diagonal" ;
  start : any[] ;
  end : any[] ;
  path_length : number;
  visited_nodes : number;
  time_ns : number;
};

export type SingleData = {
  value: number;
  name: string;
}[];

export type MultipleData = {
  name: string;
  series: SingleData;
}[];
