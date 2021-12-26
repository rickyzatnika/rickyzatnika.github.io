// Nav Mobile

(function ($) {
  $(function () {
    $('#nav-toggle').click(function () {
      $('nav ul').slideToggle();
    });
    $('#nav-toggle').on('click', function () {
      this.classList.toggle('active');
    });
  });
})(jQuery);

// Sticky Navbar
let navbar = document.getElementById("navbar");
let menu = document.getElementById("menu");

window.onscroll = function(){
  if(window.pageYOffset >= menu.offsetTop){
    navbar.classList.add("sticky");
  }
  else{
    navbar.classList.remove("sticky");
  }
}


// images slide
let slideIndex = 1;
showSlides(slideIndex);

// Thumbnail controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("image_slide");
  let dots = document.getElementsByClassName("demo");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  
}

// 3D tiltJS

VanillaTilt.init(document.querySelectorAll(".service_content"), {
  max: 25,
  speed: 800,
  perspective: 1000,
  scale: 1.03,
  transition: true,
  gyroscope: true,
  gyroscopeMinAngleX: 45,
  gyroscopeMinAngleY: 45,
  "max-glare": 5,                                                

});


// canvas setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
const numberOfParticles = 280;

// get mouse position
const mouse = {
  x: null,
  y: null
}
window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
  // console.log('mouse.x, mouse.y');
});
setInterval(function(){
  mouse.x = undefined;
  mouse.y = undefined;
}, 200);

// create particles
class Particle {
  constructor(x, y, size, color, weight){
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.weight = weight;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update(){
    this.size -= 0.05;
    if (this.size < 0){
      this.x = (mouse.x + ((Math.random() *20) -10));
      this.y = (mouse.y + ((Math.random() *20) -10));
      this.size = (Math.random() * 5) + 3;
      this.weight = (Math.random() * 20) - 0.5;
    }
    this.y += this.weight;
    this.weight += 0.2;

    if(this.y > canvas.height - this.size){
      this.weight *= -1;
    };
  }
}

function init(){
  particleArray = [];
  for (let i = 0; i < numberOfParticles; i++){
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let size = (Math.random() * 5) + 2;
    let color = 'rgba(240, 173, 50, 0.2';
    let weight = 1;
    particleArray.push(new Particle(x, y, size, color, weight));

  }
}
function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length; i++){
      particleArray[i].update();
      particleArray[i].draw();
  }
  requestAnimationFrame(animate);
}
init();
animate();


// resize event
window.addEventListener('resize',
    function(){
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      mouse.radius = ((canvas.width/10) * (canvas.height/10));
      init();
    }
);

const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});
