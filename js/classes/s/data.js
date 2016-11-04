const FPS = 50;

var col = [0, 1, 16];

var things = [];

var v = [];
var c = [];

var canvas = document.getElementById('canv');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var gl = canvas.getContext('webgl', {preserveDrawingBuffer: true});
const ratio =  canvas.width/canvas.height;

var time = 0;

var verticeBuffer = gl.createBuffer();
var colorBuffer = gl.createBuffer();