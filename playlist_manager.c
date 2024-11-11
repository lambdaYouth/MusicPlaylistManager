#include <emscripten.h>
#include <stdio.h>
#include <string.h>

#define MAX_PLAYLISTS 10
#define MAX_SONGS 10
#define MAX_NAME_LENGTH 50

typedef struct
{
    char name[MAX_NAME_LENGTH];
    char songs[MAX_SONGS][MAX_NAME_LENGTH];
    int songCount;
} Playlist;

Playlist playlists[MAX_PLAYLISTS];
int playlistCount = 0;

EMSCRIPTEN_KEEPALIVE
void createPlaylist(const char *name)
{
    if (playlistCount < MAX_PLAYLISTS)
    {
        strncpy(playlists[playlistCount].name, name, MAX_NAME_LENGTH);
        playlists[playlistCount].songCount = 0;
        playlistCount++;
    }
}

EMSCRIPTEN_KEEPALIVE
void addSongToPlaylist(const char *playlistName, const char *songName)
{
    for (int i = 0; i < playlistCount; i++)
    {
        if (strcmp(playlists[i].name, playlistName) == 0)
        {
            if (playlists[i].songCount < MAX_SONGS)
            {
                strncpy(playlists[i].songs[playlists[i].songCount], songName, MAX_NAME_LENGTH);
                playlists[i].songCount++;
            }
            break;
        }
    }
}

EMSCRIPTEN_KEEPALIVE
char *displayPlaylist(const char *playlistName)
{
    static char output[256];
    strcpy(output, "Playlist not found.");

    for (int i = 0; i < playlistCount; i++)
    {
        if (strcmp(playlists[i].name, playlistName) == 0)
        {
            strcpy(output, "Songs:\n");
            for (int j = 0; j < playlists[i].songCount; j++)
            {
                strcat(output, playlists[i].songs[j]);
                strcat(output, "\n");
            }
            break;
        }
    }

    return output;
}

EMSCRIPTEN_KEEPALIVE
char *playNextSong(const char *playlistName)
{
    static char output[256];
    strcpy(output, "No songs available.");

    for (int i = 0; i < playlistCount; i++)
    {
        if (strcmp(playlists[i].name, playlistName) == 0)
        {
            if (playlists[i].songCount > 0)
            {
                strncpy(output, playlists[i].songs[0], MAX_NAME_LENGTH);
                break;
            }
        }
    }

    return output;
}

EMSCRIPTEN_KEEPALIVE
void deleteSongFromPlaylist(const char *playlistName, const char *songName)
{
    for (int i = 0; i < playlistCount; i++)
    {
        if (strcmp(playlists[i].name, playlistName) == 0)
        {
            for (int j = 0; j < playlists[i].songCount; j++)
            {
                if (strcmp(playlists[i].songs[j], songName) == 0)
                {
                    // Shift all songs after the deleted one
                    for (int k = j; k < playlists[i].songCount - 1; k++)
                    {
                        strcpy(playlists[i].songs[k], playlists[i].songs[k + 1]);
                    }
                    playlists[i].songCount--;
                    return;
                }
            }
            break;
        }
    }
}
