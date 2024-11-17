const MAX_PLAYLISTS = 10;

// Binary Search Tree Node class for storing songs
class SongNode {
  constructor(name) {
    this.name = name;
    this.left = null;
    this.right = null;
  }
}

// Binary Search Tree class for managing song insertion and sorting
class SongBST {
  constructor() {
    this.root = null;
  }

  // Insert a new song into the BST
  insert(name) {
    const newNode = new SongNode(name);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this._insertNode(this.root, newNode);
    }
  }

  _insertNode(node, newNode) {
    if (newNode.name < node.name) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
  }

  // In-order traversal to display songs in sorted order
  inOrderTraversal(node, songs = []) {
    if (node !== null) {
      this.inOrderTraversal(node.left, songs);
      songs.push(node.name);
      this.inOrderTraversal(node.right, songs);
    }
    return songs;
  }

  // Return the songs in sorted order
  getSongsInOrder() {
    return this.inOrderTraversal(this.root);
  }
}

// Playlist class (each playlist holds songs in a BST and an insertion list)
class Playlist {
  constructor(name) {
    this.name = name;
    this.songs = new SongBST();  // Songs are stored in a BST
    this.songInsertionOrder = [];  // Keep track of the insertion order
  }

  // Add a song to the playlist
  addSong(songName) {
    this.songs.insert(songName);  // Insert in BST for sorted display
    this.songInsertionOrder.push(songName);  // Also add to insertion order
  }

  // Display songs in insertion order
  displaySongsInOriginalOrder() {
    if (this.songInsertionOrder.length === 0) {
      return "No songs in this playlist.";
    }
    return `Songs in original order:\n${this.songInsertionOrder.join("\n")}`;
  }

  // Display songs in sorted order
  displaySongsInSortedOrder() {
    const songList = this.songs.getSongsInOrder();
    if (songList.length === 0) {
      return "No songs in this playlist.";
    }
    return `Songs in sorted order:\n${songList.join("\n")}`;
  }
}

// Hash map (object) for managing playlists
const playlists = {};
let playlistCount = 0;

// Create a new playlist and add it to the hash map
function createPlaylist(playlistName) {
  if (playlistCount < MAX_PLAYLISTS) {
    if (!playlists[playlistName]) {
      playlists[playlistName] = new Playlist(playlistName);
      playlistCount++;
      return `Playlist "${playlistName}" created successfully!`;
    } else {
      return `Playlist "${playlistName}" already exists.`;
    }
  } else {
    return "Maximum number of playlists reached.";
  }
}

// Find a playlist by name
function findPlaylist(playlistName) {
  return playlists[playlistName] || null;
}

// Display playlist's songs in their original insertion order
function displayPlaylist(playlistName) {
  const playlist = findPlaylist(playlistName);
  if (playlist) {
    return playlist.displaySongsInOriginalOrder();
  } else {
    return `Playlist "${playlistName}" not found.`;
  }
}

// Display playlist's songs in sorted order
function sortPlaylist(playlistName) {
  const playlist = findPlaylist(playlistName);
  if (playlist) {
    return playlist.displaySongsInSortedOrder();
  } else {
    return `Playlist "${playlistName}" not found.`;
  }
}

// Add a song to a specific playlist
function addSongToPlaylist(playlistName, songName) {
  const playlist = findPlaylist(playlistName);
  if (playlist) {
    playlist.addSong(songName);
    return `Song "${songName}" added to playlist "${playlistName}".`;
  } else {
    return `Playlist "${playlistName}" not found.`;
  }
}

// Sort the songs in the playlist (triggered by "Sort Playlist" button)
function sortPlaylistUI() {
  const playlistName = document.getElementById("sortPlaylistName").value;
  const playlistOutput = document.getElementById("playlistOutput");

  if (playlistName) {
    const result = sortPlaylist(playlistName);
    playlistOutput.innerText = result;
    document.getElementById("sortPlaylistName").value = "";
  } else {
    playlistOutput.innerText = "Playlist name cannot be empty.";
  }
}

// Example usage
function createPlaylistUI() {
  const playlistName = document.getElementById("playlistName").value;
  const playlistOutput = document.getElementById("playlistOutput");

  if (playlistName) {
    const result = createPlaylist(playlistName);
    playlistOutput.innerText = result;
    document.getElementById("playlistName").value = "";
  } else {
    playlistOutput.innerText = "Playlist name cannot be empty.";
  }
}

function addSongUI() {
  const playlistName = document.getElementById("playlistForSong").value;
  const songName = document.getElementById("songName").value;
  const playlistOutput = document.getElementById("playlistOutput");

  if (playlistName && songName) {
    const result = addSongToPlaylist(playlistName, songName);
    playlistOutput.innerText = result;
    document.getElementById("playlistForSong").value = "";
    document.getElementById("songName").value = "";
  } else {
    playlistOutput.innerText = "Both playlist name and song name are required.";
  }
}

function displayPlaylistUI() {
  const playlistName = document.getElementById("displayPlaylistName").value;
  const playlistOutput = document.getElementById("playlistOutput");

  if (playlistName) {
    const result = displayPlaylist(playlistName);
    playlistOutput.innerText = result;
    document.getElementById("displayPlaylistName").value = "";
  } else {
    playlistOutput.innerText = "Playlist name cannot be empty.";
  }
}

// Search for a song in the playlist
function searchSongInPlaylist(playlistName, songName) {
  const playlist = findPlaylist(playlistName);
  if (playlist) {
    const sortedSongs = playlist.songs.getSongsInOrder(); // Get sorted songs from the BST
    if (sortedSongs.includes(songName)) {
      return `Song "${songName}" found in playlist "${playlistName}".`;
    } else {
      return `Song "${songName}" not found in playlist "${playlistName}".`;
    }
  } else {
    return `Playlist "${playlistName}" not found.`;
  }
}

// Handle Search Song in Playlist button click
function searchSongUI() {
  const playlistName = document.getElementById("searchPlaylistName").value;
  const songName = document.getElementById("searchSongName").value;
  const playlistOutput = document.getElementById("searchSongResult");

  if (playlistName && songName) {
    const result = searchSongInPlaylist(playlistName, songName);
    playlistOutput.innerText = result;
    document.getElementById("searchPlaylistName").value = "";
    document.getElementById("searchSongName").value = "";
  } else {
    playlistOutput.innerText = "Both playlist name and song name are required.";
  }
}

// Attach UI functions to buttons
document.getElementById("createPlaylistButton").onclick = createPlaylistUI;
document.getElementById("addSongButton").onclick = addSongUI;
document.getElementById("displayPlaylistButton").onclick = displayPlaylistUI;
document.getElementById("sortPlaylistButton").onclick = sortPlaylistUI;
document.getElementById("searchSongButton").onclick = searchSongUI;
