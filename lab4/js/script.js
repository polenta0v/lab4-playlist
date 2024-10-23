const songs = [
    {
        id: 1,
        bandName: "Linkin Park",
        songTitle: "Numb",
        imagePath: "https://upload.wikimedia.org/wikipedia/en/b/b9/Linkin_Park_-_Numb_CD_cover.jpg",
        audioPath: "songs/linkin-park_numb.mp3",
        description: "A powerful song from Linkin Park's album 'Meteora'."
    },
    {
        id: 2,
        bandName: "Coldplay",
        songTitle: "Fix You",
        imagePath: "https://upload.wikimedia.org/wikipedia/en/b/b1/Coldplay_-_Fix_You.jpg",
        audioPath: "songs/Coldplay_Fix_You.mp3",
        description: "An emotional and uplifting song by Coldplay."
    },
    {
        id: 3,
        bandName: "Imagine Dragons",
        songTitle: "Believer",
        imagePath: "https://i1.sndcdn.com/artworks-s3zOCWcV8XQVtQcv-0emq8A-t500x500.jpg",
        audioPath: "songs/Imagine_Dragons_Believer.mp3",
        description: "A hit song with powerful lyrics and music by Imagine Dragons."
    },
    {
        id: 4,
        bandName: "The Beatles",
        songTitle: "Hey Jude",
        imagePath: "https://m.media-amazon.com/images/M/MV5BNjBlYjgzYTMtY2I2OS00YjE4LTk4ZTgtOTg2N2UwMWRmMjFlXkEyXkFqcGc@._V1_.jpg",
        audioPath: "songs/beatles-bundles_hey-jude-let-it-be.mp3",
        description: "A classic song by The Beatles, known for its soothing melody."
    },
    {
        id: 5,
        bandName: "Queen",
        songTitle: "Bohemian Rhapsody",
        imagePath: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Bohemian_Rhapsody.png/220px-Bohemian_Rhapsody.png",
        audioPath: "songs/queen_bohemian-rhapsody.mp3",
        description: "A groundbreaking rock opera by Queen, combining multiple genres in one."
    },
];


let audio = new Audio();
let currentSongIndex = -1;


let createHTML = function (song) {

    let card = document.createElement('div');
    card.classList.add('card');


    let img = document.createElement('img');
    img.src = song.imagePath;
    img.alt = song.songTitle;
    card.appendChild(img);


    let description = document.createElement('div');
    description.classList.add('description');


    let h3 = document.createElement('h3');
    h3.textContent = song.songTitle;
    description.appendChild(h3);


    let h5 = document.createElement('h5');
    h5.textContent = song.bandName;
    description.appendChild(h5);


    let p = document.createElement('p');
    p.textContent = song.description;
    description.appendChild(p);


    card.appendChild(description);


    card.addEventListener('click', function () {
        selectSong(songs.indexOf(song));
    });


    document.querySelector('.container').appendChild(card);
}


function selectSong(index) {
    currentSongIndex = index;
    loadSong(songs[currentSongIndex]);
}


function loadSong(song) {

    document.getElementById('player').style.opacity = 1;

    document.getElementById('player-image').src = song.imagePath;
    document.getElementById('player-song-title').textContent = song.songTitle;
    document.getElementById('player-band-name').textContent = song.bandName;


    audio.src = song.audioPath;
    audio.load();


    audio.addEventListener('loadedmetadata', function () {
        document.getElementById('total-time').textContent = formatTime(audio.duration);
        document.getElementById('seek-bar').max = audio.duration;
    });


    audio.play();
    document.getElementById('play-pause-btn').textContent = 'Pause';
}


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
}


document.getElementById('play-pause-btn').addEventListener('click', function () {
    if (audio.paused) {
        audio.play();
        this.textContent = 'Pause';
    } else {
        audio.pause();
        this.textContent = 'Play';
    }
});


audio.addEventListener('timeupdate', function () {
    document.getElementById('current-time').textContent = formatTime(audio.currentTime);
    document.getElementById('seek-bar').value = audio.currentTime;
});


document.getElementById('seek-bar').addEventListener('input', function () {
    audio.currentTime = this.value;
});


document.getElementById('volume-slider').addEventListener('input', function () {
    audio.volume = this.value;
});


songs.forEach(song => {
    createHTML(song);
});
