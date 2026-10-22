import SongRow from './SongRow'
function AlbumDetails({title, artists, albumCardImg, songs, onClose, addToLikedSongs, likedSongs, removeFromLikedSongs}) {
    return (
        <section className="album-details">
            <div className="general-album-details">
            <div>
                <img src={albumCardImg} alt="image" className="album-card-details"/>
                </div>
            <div className='album-details-inf'>
                <h3>{title}</h3>
                <p>{artists}</p>
            </div> 
            </div>
            <div className="song-list">
                {songs.map((song, index) => (
                    <SongRow
                    key={song.id}
                    index={index}
                    title={song.title}
                    duration={song.duration}
                    addToLikedSongs={addToLikedSongs}
                    song={song}
                    likedSongs={likedSongs}
                    removeFromLikedSongs={removeFromLikedSongs}
                    />
                ))}
            </div>
            <button className="close-button"onClick={onClose}>Back</button>
        </section>
    )
}
export default AlbumDetails;