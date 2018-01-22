'use strict';

const brightnessRange = document.getElementById('brightness_range'),
  backgroundImg = document.getElementById('backgroundImg'),
  root = document.getElementById('root'),
  albumWrapper = document.getElementsByClassName('album_wrapper'),
  playList = document.querySelector('.play_list'),
  playListCoating = document.querySelector('.play_list-coating'),
  playerWrapper = document.querySelector('.player_wrapper'),
  playerNav = document.querySelector('.player'),
  playTime = document.querySelector('.play_time'),
  playName = document.querySelector('.play_name'),
  playerAlbumTitle = document.querySelector('.player_album-title'),
  musicNav = document.querySelector('.music_nav'),
  navMenu = document.querySelector('.nav_menu'),
  playerCoating = document.querySelector('.player_container_coating'),
  musicContainer = document.querySelector('.music_container'),
  playerContent = document.querySelector('.player_content');

let stopEclipse = false,
 playListSmoothChange = false,
 albumOpacityCount = 0,
 currentAlbum;

function addPause() {
  document.querySelector('.fa-play').classList.remove('play-pause_action');
  document.querySelector('.fa-pause').classList.add('play-pause_action')
}

function addPlay() {
  document.querySelector('.fa-pause').classList.remove('play-pause_action');
  document.querySelector('.fa-play').classList.add('play-pause_action');
}

function playListVisible(evt) {
  playList.classList.add('play_list_visible');
  if (playListSmoothChange) {
    if (navigator.userAgent.search(/Firefox/) > 0) {
      playListCoating.style.backgroundImage = playList.style.backgroundImage;
      playList.style.backgroundImage = getComputedStyle(evt.target).backgroundImage;
      playListCoating.classList.add('play_list-coating_invisible');
      setTimeout(() => {
        playListCoating.classList.remove('play_list-coating_invisible');
        playListCoating.style.backgroundImage ='none';
      }, 1000);
    } else {
      playList.style.backgroundImage = getComputedStyle(evt.target).backgroundImage;
    }
  } else {
    playList.style.backgroundImage = getComputedStyle(evt.target).backgroundImage;
    playListSmoothChange = true;
  }
}

function changeTracks(album, isForward = true) {
  if (isForward) {
    album.index++;
    album.index = album.index > album.tracks.length - 1  ? 0 : album.index;
  } else {
    album.index--;
    album.index = album.index < 0 ? album.tracks.length - 1 : album.index;
  }
  playerContent.src = album.tracks[album.index].src;
  playName.textContent = album.tracks[album.index].title;
  playerContent.play();
  addPause();
}

function addPlayList(evt) {
	playerWrapper.classList.add('player_wrapper-visible');
  playerCoating.classList.add('player_container_coating_none');
	Array.from(albumWrapper).forEach(album => {
    album.classList.remove('album_wrapper_selected');
    if(album.classList.contains('move_left')) {
      album.classList.add('move_left_go')
    } else if(album.classList.contains('move_right')) {
      album.classList.add('move_right_go')
    }
  });
  addPlay();
  playTime.textContent = '00:00';
  evt.target.classList.add('album_wrapper_selected');
  playListVisible(evt);
  musicNav.classList.add('nav_link_select');
  albumArr.forEach(album => {
    playerContent.pause();
    playerContent.currentTime = 0;
    if (evt.target.id === album.id) {
      playerAlbumTitle.textContent = album.title;
      playName.textContent = album.tracks[0].title;
      playerContent.src = album.tracks[0].src;
      album.index = 0;
      currentAlbum = album;
    }
  });
}

function playerNavHandler(evt,album) {
  if (evt.target.classList.contains('fa-play') && evt.target.classList.contains('play-pause_action')) {
    playerContent.play();
    addPause();
  } else if (evt.target.classList.contains('fa-pause') && evt.target.classList.contains('play-pause_action')) {
    playerContent.pause();
    addPlay();
  } else if (evt.target.classList.contains('fa-fast-forward')) {
    changeTracks(album);
  } else if (evt.target.classList.contains('fa-fast-backward')) {
    changeTracks(album, false);
  }
}

function timeupdateHandler(evt, album) {
  playTime.textContent = new Date(playerContent.currentTime * 1000)
    .toUTCString().split(/ /)[4].substr(3);
  if (playerContent.duration === playerContent.currentTime) {
    changeTracks(album);
  }
}

brightnessRange.value = 400;

function brightnessRangeHandler(evt) {
  stopEclipse = true;
  backgroundImg.style.opacity = evt.target.value / 1000;
}

function musicNavHandler(evt) {
  playerWrapper.classList.toggle('player_wrapper-visible');
  playerCoating.classList.toggle('player_container_coating_none');
  if (!playListSmoothChange) {
    playList.classList.add('play_list_visible');  
    playName.textContent = 'Выберите альбом'; 
    playerAlbumTitle.textContent = 'Select the album';
    playListSmoothChange = true;
  }
  Array.from(albumWrapper).forEach(album => {
    if(album.classList.contains('move_left')) {
      album.classList.toggle('move_left_go')
    } else if(album.classList.contains('move_right')) {
      album.classList.toggle('move_right_go')
    }
  });
}

function navMenuHandler(evt) {
  if (evt.target.classList.contains('nav_menu_link')) {
    Array.from(navMenu.children).forEach(link => link.classList.remove('nav_link_select'));
    evt.target.classList.add('nav_link_select');
    if (evt.target.classList.contains('concerts_nav')) {
       if (!(root.querySelector('.dynamic_container'))) {
        createConcertsNode();
      } 
    }   
    if (!(evt.target.classList.contains('music_nav'))) {
      Array.from(albumWrapper).forEach(album => {
        album.classList.remove('move_left_go', 'move_right_go');
      });
      playerWrapper.classList.remove('player_wrapper-visible');
      playerCoating.classList.remove('player_container_coating_none');
    }  
    Array.from(root.children).forEach(container => {
      if (evt.target.classList.contains(container.dataset.id)) {
        container.style.display = 'flex';
        setTimeout(() => container.classList.add('dynamic_visible'), 100);
      } else {
        container.classList.remove('dynamic_visible');
        container.style.display = 'none';
      }
    }); 
    if (evt.target.classList.contains('chat_nav')) {
      chats(document.querySelector('.chat'));
    }
    if (evt.target.classList.contains('music_nav')) {
      musicNavHandler(evt);
    }
  }
}

function startAnimate() {
  getFire();
}

Array.from(albumWrapper).forEach(album => album.addEventListener('click', addPlayList));
playerNav.addEventListener('click',(evt) => {playerNavHandler(evt,currentAlbum)});
playerContent.addEventListener('timeupdate', (evt) => {timeupdateHandler(evt, currentAlbum)});
brightnessRange.addEventListener('input', brightnessRangeHandler);
navMenu.addEventListener('click', navMenuHandler);
window.addEventListener('load', startAnimate);

/* --------------------- audio objects--------------------*/

const blackButterflyObj = {
  id: 'black_butterfly',
  title: 'Черная бабочка',
  tracks: [
    {title: 'Intro', src: 'audio/black_butterfly/Intro.mp3'},
    {title: 'Черная бабочка', src: 'audio/black_butterfly/Black_butterfly.mp3'},
    {title: 'Золото и свинец', src: 'audio/black_butterfly/G&L.mp3'},
    {title: 'Научи', src: 'audio/black_butterfly/Teach.mp3'}
  ]
},
onTheVergeObj = {
  id: 'on_the_verge',
  title: 'На грани', 
  tracks: [
    {title:'На грани', src:'audio/on_the_verge/on_the_verge.mp3'},
    {title:'Дождь', src:'audio/on_the_verge/rain.mp3'},
    {title:'Сколько упавших птиц', src:'audio/on_the_verge/fallen_birds.mp3'},
    {title:'Despair', src:'audio/on_the_verge/despair.mp3'},
    {title:'Видеть', src:'audio/on_the_verge/see.mp3'}
  ]
},
autumnAstronomyObj = {
  id: 'astronomy_autumn',
  title: 'Астрономия осени',
  tracks: [
    {title: 'Мир', src:'audio/autumn_astronomy/world.mp3'},
    {title: 'А_минор', src:'audio/autumn_astronomy/a_minor.mp3'},
    {title: 'Письмо', src:'audio/autumn_astronomy/letter.mp3'}
  ]
},
snowfallObj = {
  id: 'snowfall',
  title: 'Снегопад',
  tracks: [
    {title: 'Снегопад', src: 'audio/snowfall/snowfall.mp3'}
  ]
},
fidelityObj = {
  id: 'fidelity',
  title: 'Coming soon 2018',
  tracks: [
    {title: 'Верность  promo', src: 'audio/fidelity/Fidelity_promo.wav'}
  ]
},
instrumentalObj = {
  id: 'planet',
  title: 'Instrumentals',
  tracks: [
    {title: 'Teach', src: 'audio/instrumentals/Teach_instrumental.wav'},
    {title: 'Black butterfly', src: 'audio/instrumentals/Black_Butterfly_instrumental.wav'},
    {title: 'My', src: 'audio/instrumentals/My_instrumental.mp3'},
    {title: 'Memory', src: 'audio/instrumentals/Pamyat_instrumental.mp3'}
  ]
},
myObj = {
  id: 'my',
  title: 'Моё',
  tracks: [
    {title: 'Моё', src: 'audio/my/my.mp3'},
    {title: 'Память', src: 'audio/my/memory.mp3'}
  ]
},
fallenBirdsObj = {
  id: 'fallen_birds',
  title: 'Сколько упавших птиц',
  tracks: [
    {title: 'Сколько упавших птиц', src: 'audio/fallen_birds/fallen_birds.mp3'}
  ]
}

const albumArr = [
 blackButterflyObj,
 onTheVergeObj,
 autumnAstronomyObj,
 snowfallObj,
 fidelityObj,
 instrumentalObj,
 myObj,
 fallenBirdsObj
];


