    function AlbumCard ({id, title, artists, albumCardImg, status, songs, onOpen}) {
        console.log("render AlbumCard", title)
        return (
            <section className="album-card">
                <img onClick={onOpen} src={albumCardImg} alt="img" className="album-card-img" /> 
                <h3 onClick={onOpen}>{title}</h3>
                <p>{artists}</p>
            </section>
        )
    }
    export default AlbumCard;