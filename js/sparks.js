'use strict';



function getFire() {

  const canvas = document.getElementById('spark-canvas'),
    ctx = canvas.getContext('2d'),
    wrapperStyle = getComputedStyle(document.getElementsByClassName('main_wrapper')[0]),
    width = wrapperStyle.width,
    height = wrapperStyle.height,
    sparks = [],
    canvasWrapper = document.getElementById('canvas-wrapper'),
    sparksBtn = document.getElementById('sparks_btn');

  let animateSpark = true;

  window.addEventListener('resize', resize);
  sparksBtn.addEventListener('click' , sparksBtnHandler);
  
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);

  class Spark {
    
    constructor() {
      this.pos = {};
      this.initSpark();
    }

    initSpark() {
      this.pos.x = Math.random() * canvas.width;
      this.pos.y = canvas.height + Math.random() * 100;
      this.alpha = 0.1 + Math.random() * 0.3;
      this.scale = 0.1 + Math.random() * 0.3;
      this.velocity = Math.random();
      this.color = [
        `rgba(62,39,0,${this.alpha + 0.3})`,
        `rgba(36,23,0,${this.alpha + 0.3})`,
        `rgba(61,54,23,${this.alpha + 0.5})`,
        `rgba(69,61,26,${this.alpha + 0.3})`,
        `rgba(81,72,30,${this.alpha + 0.5})`,
        `rgba(61,54,23,${this.alpha + 0.4})`,
        `rgba(61,54,23,${this.alpha + 0.3})`,
        `rgba(61,54,23,${this.alpha + 0.3})`,
        `rgba(81,72,30,${this.alpha + 0.3})`,
        `rgba(61,54,23,${this.alpha + 0.3})`,
        `rgba(61,54,23,${this.alpha + 0.3})`,
      ]
    }

    randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    draw() {
      if (this.alpha <= 0) {
        this.initSpark();
      }
      this.pos.y -= this.velocity;
      this.alpha -= 0.0005;
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.scale * 3, 0, 2 * Math.PI, false);
      ctx.fillStyle = this.color[this.randomInt(0,10)];
      ctx.fill();
    };

  }
 
  addSparks();

  function addSparks() {
    canvasWrapper.style.height = height;
    for (let i = 0; i < canvas.width * 0.5; i++) {
     sparks.push(new Spark());
    }
    animate();
  }

  
  function resize() {
    canvasWrapper.style.height = height;
    canvas.setAttribute('width', getComputedStyle(document.getElementsByClassName('main_wrapper')[0]).width);
    canvas.setAttribute('height', getComputedStyle(document.getElementsByClassName('main_wrapper')[0]).height);
  }

  
  function sparksBtnHandler() {
    if (animateSpark) {
      canvas.classList.add('spark-invisible');
      sparksBtn.classList.add('stopSparks');
      setTimeout(() => {animateSpark = false}, 2000);
    } else {
      canvas.classList.remove('spark-invisible');
      sparksBtn.classList.remove('stopSparks');
      animateSpark = true;
    }
  }


  function animate() {
    if(animateSpark) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparks.forEach(spark => spark.draw());
    }
    requestAnimationFrame(animate);
  }
};