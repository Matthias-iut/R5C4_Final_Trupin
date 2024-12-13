export type Search = {
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
