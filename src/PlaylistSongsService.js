const { Pool } = require('pg');
const mapDBToModelPlaylist = require('./utils');

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistSongById(playlistId) {
    const query = {
      text: `SELECT playlist_songs.*, songs.title, songs.performer, playlists.*
      FROM playlist_songs
      LEFT JOIN songs ON songs.id = playlist_songs.song_id
      LEFT JOIN playlists ON playlists.id = playlist_songs.playlist_id
      WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    const playlist = mapDBToModelPlaylist(result.rows);
    return { playlist: playlist };
  }
}

module.exports = PlaylistSongsService;
