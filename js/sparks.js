'use strict';

function getFire() {

  const canvas = document.getElementById('spark-canvas'),
    ctx = canvas.getContext('2d'),
    wrapperStyle = getComputedStyle(document.querySelector('.main_wrapper')),
    width = wrapperStyle.width,
    height = wrapperStyle.height,
    sparks = [],
    canvasWrapper = document.getElementById('canvas-wrapper'),
    sparksBtn = document.getElementById('sparks_btn');

  let animateSpark = true;
  
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);

  
  function getRandom(min, max, integer = false) {
    if (integer) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } 
    return Math.random() * (max - min) + min;
  }

  function getRandomBool() {
    return Math.floor(Math.random() * 2) === 0;
  }

  
  class Spark {
    
    constructor() {
      this.pos = {};
      this.initSpark();
    }

    initSpark() {
      this.pos.x = Math.random() * canvas.width;
      this.pos.y = canvas.height + Math.random() * 100;
      this.alpha = 0.1 + Math.random() * 0.3;
      this.scale = (0.1 + Math.random() * 0.3) * 3;
      this.velocity = Math.random(); 
      this.hor = {
        start: this.pos.x,
        offset: 0,
        bool: getRandomBool(),
        rest: getRandom(0, 0.5)
      };
      this.accMoment = canvas.height / getRandom(1.2, 1.7);
      this.acc = -0.1;
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
      ];
    }

    getAmplitude() {
      let offset = Math.random() / 100;
      if (this.hor.bool) {
        this.hor.offset -= offset;
        this.hor.bool = this.hor.offset > -this.hor.rest;
      } else {
        this.hor.offset += offset;
        this.hor.bool = this.hor.offset >= this.hor.rest;
      }
      return this.hor.offset;
    }

    draw() {
      if (this.alpha <= 0) {
        this.initSpark();
      }
      if (this.pos.y <= this.accMoment) {
        this.acc -= Math.random() / 60;
        this.pos.y -= this.velocity - this.acc;
        this.pos.x += this.getAmplitude() * 1.5;
      } else {
        this.pos.y -= this.velocity;
        this.pos.x += this.getAmplitude();
      }
      this.alpha -= 0.0005;
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.scale, 0, 2 * Math.PI);
      ctx.fillStyle = this.color[getRandom(0, this.color.length - 1, true)];
      ctx.fill();
    };

  }

  backgroundImg.style.opacity = 0.40;

  
  function eclipse() {
    if (!(getComputedStyle(backgroundImg).opacity <= 0.15 || stopEclipse)) {
      backgroundImg.style.opacity -= 0.001;
      brightnessRange.value -= 1;
    }
      if (albumOpacityCount <= 0.9) {
      Array.from(albumWrapper).forEach(album => album.style.opacity = albumOpacityCount);
      albumOpacityCount += 0.0056;
    }
  }

    
  function animate() {
    if(animateSpark) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparks.forEach(spark => spark.draw());
    }
    eclipse();
    requestAnimationFrame(animate);
  }
 
  
  function addSparks() {
    canvasWrapper.style.height = height;
    for (let i = 0; i < canvas.width * 0.5; i++) {
     sparks.push(new Spark());
    }
    animate();
  }

  addSparks();

  
  function resize() {
    canvasWrapper.style.height = height;
    canvas.setAttribute('width', getComputedStyle(document.querySelector('.main_wrapper')).width);
    canvas.setAttribute('height', getComputedStyle(document.querySelector('.main_wrapper')).height);
  }

  window.addEventListener('resize', resize);

  
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

  sparksBtn.addEventListener('click' , sparksBtnHandler);

};