console.log("Welcome to spotify");

//Initialize variables
let songIndex = 0;
let audioElement = new Audio("./songs/1.mp3");
let masterPlay = document.getElementById('masterplay');
let progressBar = document.getElementById('progressbar');
let forward = document.getElementById('forward');
let backward = document.getElementById('backward');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let currentSong = document.getElementById("currentSong");

//Songs initialize
let songs = [
    {songName: "Ab tumhare hwale", songPath: "./songs/2.mp3", coverPath: "./covers/2.jpg"},
    {songName: "Ro rha hu me- Aashiqui2", songPath: "./songs/3.mp3", coverPath: "./covers/3.jpg"},
    {songName: "Raabta- Rabta", songPath: "./songs/4.mp3", coverPath: "./covers/4.jpg"},
    {songName: "Kamli - Dhoom3", songPath: "./songs/5.mp3", coverPath: "./covers/5.jpg"},
    {songName: "Salam-e-ishq", songPath: "./songs/6.mp3", coverPath: "./covers/6.jpg"},
    {songName: "Besharam rang- Pathan", songPath: "./songs/7.mp3", coverPath: "./covers/7.jpg"},
    {songName: "Duniyaa- Luka chuppi", songPath: "./songs/8.mp3", coverPath: "./covers/8.jpg"},
    {songName: "Maar Daala", songPath: "./songs/9.mp3", coverPath: "./covers/9.jpg"},
    {songName: "Taal- Taal", songPath: "./songs/10.mp3", coverPath: "./covers/10.jpg"},
    {songName: "Kesariya- Brahmastra", songPath: "./songs/1.mp3", coverPath: "./covers/1.jpg"}

];

// Iterate over songs

songItem.forEach((element, i)=>{

    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songname')[0].innerHTML = songs[i].songName;   
})

const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.replace('fa-circle-pause', 'fa-circle-play'); 
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element, i)=>{
    element.addEventListener('click', (e)=>{
        songIndex = i;
        if(audioElement.paused){
            makeAllPlay();
            e.target.classList.replace('fa-circle-play', 'fa-circle-pause');
            audioElement = new Audio(songs[i].songPath);
            audioElement.play();
            progressBar.value = 0;
            masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
            currentSong.innerHTML = songs[i].songName;
            gif.style.opacity = 5;
        }
        else{
            e.target.classList.replace('fa-circle-pause', 'fa-circle-play');
            audioElement.pause();
            masterPlay.classList.replace('fa-circle-pause', 'fa-circle-play');
            gif.style.opacity = 0;
        }
    })
});



// Handle play/pause

masterPlay.addEventListener('click', ()=>{

    if(audioElement.paused || audioElement.currentTime == 0){
        audioElement.play();
        masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
        gif.style.opacity = 5;
    }
    else{
        audioElement.pause();
        makeAllPlay();
        masterPlay.classList.replace('fa-circle-pause', 'fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Handle progress Bar
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime / audioElement.duration)*100);
    progressBar.value = progress;
});

progressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (progressBar.value / 100) * audioElement.duration;
})


forward.addEventListener('click', ()=>{
    let idx = songIndex;
    if(idx >= 9) idx = 0;
    console.log(idx);
    makeAllPlay();
    // e.target.classList.replace('fa-circle-play', 'fa-circle-pause');
    audioElement.pause();
    audioElement = new Audio(songs[idx].songPath);
    audioElement.play();
    masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
    currentSong.innerHTML = songs[idx].songName;
    gif.style.opacity = 5;
    songIndex = idx+1;
});

backward.addEventListener('click', ()=>{
    let idx = songIndex;
    if(idx <= 0) idx = 9;
    
    makeAllPlay();
    // e.target.classList.replace('fa-circle-play', 'fa-circle-pause');
    audioElement.pause();
    audioElement = new Audio(songs[idx].songPath);
    audioElement.play();
    masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
    currentSong.innerHTML = songs[idx].songName;
    gif.style.opacity = 5;
    songIndex = idx-1;
});
