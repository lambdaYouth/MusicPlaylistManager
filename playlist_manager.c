#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_PLAYLISTS 10
#define MAX_NAME_LENGTH 50

// Binary Search Tree Node for storing songs
typedef struct SongNode
{
    char name[MAX_NAME_LENGTH];
    struct SongNode *left;
    struct SongNode *right;
} SongNode;

// Hash Map entry for Playlists
typedef struct
{
    char name[MAX_NAME_LENGTH];
    SongNode *songs;
} Playlist;

// Hash Map for storing playlists
Playlist *playlists[MAX_PLAYLISTS];
int playlistCount = 0;

// Utility function to create a new SongNode for the BST
SongNode *createSongNode(const char *songName)
{
    SongNode *newNode = (SongNode *)malloc(sizeof(SongNode));
    strncpy(newNode->name, songName, MAX_NAME_LENGTH);
    newNode->left = newNode->right = NULL;
    return newNode;
}

// Insert a song into the BST (Binary Search Tree)
SongNode *insertSong(SongNode *root, const char *songName)
{
    if (root == NULL)
    {
        return createSongNode(songName);
    }
    if (strcmp(songName, root->name) < 0)
    {
        root->left = insertSong(root->left, songName);
    }
    else
    {
        root->right = insertSong(root->right, songName);
    }
    return root;
}

// Inorder traversal to display songs in sorted order
void displaySongsInOrder(SongNode *root)
{
    if (root != NULL)
    {
        displaySongsInOrder(root->left);
        printf("%s\n", root->name);
        displaySongsInOrder(root->right);
    }
}

// Hash function to find index for playlist
int hashFunction(const char *name)
{
    int sum = 0;
    for (int i = 0; name[i] != '\0'; i++)
    {
        sum += name[i];
    }
    return sum % MAX_PLAYLISTS;
}

// Create a new playlist and add to Hash Map
void createPlaylist(const char *name)
{
    if (playlistCount < MAX_PLAYLISTS)
    {
        int index = hashFunction(name);
        playlists[index] = (Playlist *)malloc(sizeof(Playlist));
        strncpy(playlists[index]->name, name, MAX_NAME_LENGTH);
        playlists[index]->songs = NULL;
        playlistCount++;
    }
    else
    {
        printf("Maximum playlist limit reached.\n");
    }
}

// Add a song to the specified playlist using Hash Map and BST
void addSongToPlaylist(const char *playlistName, const char *songName)
{
    int index = hashFunction(playlistName);
    if (playlists[index] != NULL && strcmp(playlists[index]->name, playlistName) == 0)
    {
        playlists[index]->songs = insertSong(playlists[index]->songs, songName);
    }
    else
    {
        printf("Playlist not found.\n");
    }
}

// Display playlist's songs in sorted order
void displayPlaylist(const char *playlistName)
{
    int index = hashFunction(playlistName);
    if (playlists[index] != NULL && strcmp(playlists[index]->name, playlistName) == 0)
    {
        printf("Songs in playlist '%s':\n", playlistName);
        displaySongsInOrder(playlists[index]->songs);
    }
    else
    {
        printf("Playlist not found.\n");
    }
}

// Example usage
int main()
{
    createPlaylist("Rock");
    addSongToPlaylist("Rock", "Bohemian Rhapsody");
    addSongToPlaylist("Rock", "Hotel California");
    addSongToPlaylist("Rock", "Stairway to Heaven");

    displayPlaylist("Rock");

    return 0;
}
