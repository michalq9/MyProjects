let map = [];
let inputFile;
let w;
let h;
let N;
let ratio;
let slider;
let xinc;
let yinc;
let start = 0;
let extra = 20;
let colors = []

function fileSelected(file){
  createCanvas(windowWidth, windowHeight - 30);  
  generateMapFromData(file.data);
  slider = createSlider(0, 60, 1);
  slider.position(30, 240);
  start = 1;
}

function generateMapFromData(data){
  param = data.split('\n')
  w = parseInt(param[0]);
  h = parseInt(param[1]);
  ratio = floor(min(windowWidth/w, (windowHeight - 30)/h));
  console.log(ratio);
  xinc = ratio;
  yinc = ratio;
  for(let y = 0; y < h + 2 * extra; y++){
    map[y] = []
    for(let x = 0; x < w + 2 * extra; x++){
      map[y][x] = 0; 
    }
  }
  let N = param[2];
  for(let i = 0; i < N; i++){
    let coords = param[3 + i].split(',');
    let x = parseInt(coords[0]);
    let y = parseInt(coords[1]);
    map[y + extra][x + extra] = 1;
  }
}

function getNeighbours(x, y){
  let res = 0;
  for (let i = max(x - 1, 0); i < min(x + 2, w + 2 * extra); i++) {
    for (let j = max(y - 1, 0); j < min(y + 2,  h + 2 * extra); j++) {
      res += map[j][i];
    }
  }
  return max(res - map[y][x], 0);
}

function updateCell(x, y){
  if(x > w + extra * 1.5 || y > h + extra * 1.5  || x < extra  || y < extra  ){
    return 0;
  }
  let n = getNeighbours(x, y);
  if((map[y][x] == 1 && (n == 2 || n == 3)) || (map[y][x] == 0 && n == 3)){
    return 1;
  }
  return 0;
}

function updateMap(){
  let newMap = [];
  for(let y = 0; y < h + 2 * extra; y++){
    newMap[y] = []
    for(let x = 0; x < w + 2 * extra; x++){
      newMap[y][x] = updateCell(x, y);
    }
  }
  map = newMap;
}

function setup() {
  colors[0] = color('#353161');
  colors[1] = color('#ffecfa');
  frameRate(1);
  inputFile = createFileInput(fileSelected);
  inputFile.position(30)


}

function draw() {
  
  if(start == 1){
  frameRate(slider.value());
  background(colors[0]);
  updateMap();
  for(let y = extra; y < h + extra; y++){
    for(let x = extra ; x < w + extra; x++){
      stroke(colors[map[y][x]]);
      fill(colors[map[y][x]]);
      square((x - extra) * xinc, (y  - extra) * yinc, xinc);
      }
    }
  }
}