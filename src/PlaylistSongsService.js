const { Pool } = require('pg');
const mapDBToModelPlaylist = require('./utils');

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistSongById(playlistId) {
    const query = {
      text: `SELECT playlist_songs.*, songs.title, songs.performer, playlists.*, users.username
      FROM playlist_songs
      LEFT JOIN songs ON songs.id = playlist_songs.song_id
      LEFT JOIN playlists ON playlists.id = playlist_songs.playlist_id
      LEFT JOIN users on users.id = playlists.owner
      WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };
    console.log(playlistId);
    const result = await this._pool.query(query);
    const playlist = mapDBToModelPlaylist(result.rows);
    return playlist;
  }
}

module.exports = PlaylistSongsService;
