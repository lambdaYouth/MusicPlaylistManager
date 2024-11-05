const MAX_PLAYLISTS = 10;
const MAX_SONGS = 10;

// Linked list node class for Playlist
class PlaylistNode {
  constructor(playlist) {
    this.playlist = playlist;
    this.next = null;
  }
}

// Playlist class (each playlist holds songs in an array)
class Playlist {
  constructor(name) {
    this.name = name;
    this.songs = [];
  }

  // Add a song to the playlist (queue behavior for song addition)
  addSong(songName) {
    if (this.songs.length < MAX_SONGS) {
      this.songs.push(songName);
    } else {
      return "Playlist is full.";
    }
  }

  // Display all songs in the playlist
  displaySongs() {
    if (this.songs.length === 0) {
      return "No songs in this playlist.";
    }
    return `Songs:\n${this.songs.join("\n")}`;
  }

  // Play the next song using queue behavior (FIFO)
  playNextSong() {
    if (this.songs.length === 0) {
      return "No songs available.";
    }
    return this.songs.shift(); // Remove and return the first song
  }
}

// Linked list for managing playlists
class PlaylistManager {
  constructor() {
    this.head = null;
    this.playlistCount = 0;
  }

  // Add a new playlist to the linked list
  addPlaylist(playlist) {
    if (this.playlistCount < MAX_PLAYLISTS) {
      const newNode = new PlaylistNode(playlist);
      if (!this.head) {
        this.head = newNode;
      } else {
        let current = this.head;
        while (current.next) {
          current = current.next;
        }
        current.next = newNode;
      }
      this.playlistCount++;
      return `Playlist "${playlist.name}" created successfully!`;
    } else {
      return "Maximum number of playlists reached.";
    }
  }

  // Find a playlist by name
  findPlaylist(playlistName) {
    let current = this.head;
    while (current) {
      if (current.playlist.name === playlistName) {
        return current.playlist;
      }
      current = current.next;
    }
    return null;
  }
}

const playlistManager = new PlaylistManager(); // Instantiate the PlaylistManager (linked list)

function createPlaylist() {
  const playlistName = document.getElementById("playlistName").value;
  const playlistOutput = document.getElementById("playlistOutput");

  if (playlistName) {
    const newPlaylist = new Playlist(playlistName);
    const result = playlistManager.addPlaylist(newPlaylist);
    playlistOutput.innerText = result;
    document.getElementById("playlistName").value = "";
  } else {
    playlistOutput.innerText = "Playlist name cannot be empty.";
  }
}

function addSong() {
  const playlistName = document.getElementById("playlistForSong").value;
  const songName = document.getElementById("songName").value;
  const playlistOutput = document.getElementById("playlistOutput");

  if (playlistName && songName) {
    const playlist = playlistManager.findPlaylist(playlistName);
    if (playlist) {
      const result = playlist.addSong(songName);
      playlistOutput.innerText = result
        ? result
        : `Song "${songName}" added to playlist "${playlistName}".`;
    } else {
      playlistOutput.innerText = `Playlist "${playlistName}" not found.`;
    }
    document.getElementById("playlistForSong").value = "";
    document.getElementById("songName").value = "";
  } else {
    playlistOutput.innerText = "Both playlist name and song name are required.";
  }
}

function displayPlaylist() {
  const playlistName = document.getElementById("displayPlaylistName").value;
  const playlistOutput = document.getElementById("playlistOutput");

  if (playlistName) {
    const playlist = playlistManager.findPlaylist(playlistName);
    if (playlist) {
      playlistOutput.innerText = playlist.displaySongs();
    } else {
      playlistOutput.innerText = `Playlist "${playlistName}" not found.`;
    }
    document.getElementById("displayPlaylistName").value = "";
  } else {
    playlistOutput.innerText = "Playlist name cannot be empty.";
  }
}

function playSong() {
  const playlistName = document.getElementById("playSongPlaylistName").value;
  const nowPlaying = document.getElementById("nowPlaying");

  if (playlistName) {
    const playlist = playlistManager.findPlaylist(playlistName);
    if (playlist) {
      const song = playlist.playNextSong();
      nowPlaying.innerText = `Now Playing: ${song}`;
    } else {
      nowPlaying.innerText = `Playlist "${playlistName}" not found.`;
    }
    document.getElementById("playSongPlaylistName").value = "";
  } else {
    nowPlaying.innerText = "Playlist name cannot be empty.";
  }
}

document.getElementById("createPlaylistButton").onclick = createPlaylist;
document.getElementById("addSongButton").onclick = addSong;
document.getElementById("displayPlaylistButton").onclick = displayPlaylist;
document.getElementById("playSongButton").onclick = playSong;
