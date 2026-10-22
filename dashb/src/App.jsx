import card from './assets/card.png'
import './App.css'
import { useState, useEffect } from 'react'
import AlbumCard from './components/AlbumCard'
import card2 from './assets/card2.png'
import card3 from './assets/card3.png'
import card4 from './assets/card4.png'
import card5 from './assets/card5.png'
import card6 from './assets/card6.png'
import card7 from './assets/card7.png'
import card8 from './assets/card8.png'
import card9 from './assets/card9.png'
import AlbumDetails from './components/AlbumDetails'
const albumCards = [
  {id: 4, title: "Eagles", artists: "Ninety One", albumCardImg: card,
    songs: [
      {id: 1, title: "Mooz", duration: "03:46"},
      {id: 2, title: "Қайтадан", duration: "03:56"},
      {id: 3, title: "Айыптама", duration: "03:55"},
      {id: 4, title: "Қалай қарайсың", duration: "03:43"},
    ]
  },
  {id: 1, title: "Marvel vibe", artists: "Alan Silvestri, Brian Tyler, Ramin Djawadi", albumCardImg: card2},
  {id: 2, title: "The Swift side", artists: "Taylor Swift", albumCardImg: card3},
  {id: 3, title: "Back to childhood", artists: "Your lovely princess", albumCardImg: card4},
  {id: 5, title: "Love in strings", artists: "Covers", albumCardImg: card5},
  {id: 6, title: "Sounds from the Upside Down", artists: "Kate Bush, The Clash, Cyndi Lauper, Metallica", albumCardImg: card6},
  {id: 7, title: "Spanish mix", artists: "Enrique Iglesias, Rosalia, Miguel Bose, Luis Fonsi", albumCardImg: card7},
  {id: 8, title: "Feels like 2010", artists: "JLO, Rihanna, Justin Bieber, Flo Rida, Jay Z, Lady Gaga", albumCardImg: card8},
  {id: 9, title: "Silent hours", artists: "Lord Huron, Lana Del Ray, Billie Eilish, Coldplay", albumCardImg: card9},
];
function App() {
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [likedSongs, setLikedSongs] = useState([])
  const [trackList, setTrackList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)  
  const termName = "Kanye"
  const mediaType = "music"
  const entityType = "song"
  const limitNumber = 5; 
  const BASE_URL = 'https://itunes.apple.com/search'
  // const url = `${BASE_URL}?term=${encodeURIComponent(termName)}&media=${mediaType}&entity=${entityType}&limit=${limitNumber}`
  useEffect(() => {
    async function loadTracks() {
      setLoading(true)
      setError(null)

      try {
        const url = `${BASE_URL}?term=${encodeURIComponent(termName)}&media=${mediaType}&entity=${entityType}&limit=${limitNumber}`
        const   response = await fetch(url)

        if (!response.ok) {
          throw new Error('Server error: ${response.status}')
        }
        const data = await response.json()
        console.log(data)
        setTrackList(data.results)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadTracks()
  }, [])

  if (loading) return <p>Loading</p>
  if (error) return <p>Error: {error}</p>
  if (trackList.length == 0) return <p>Nothings is find</p>
  // console.log(url)

  console.log("Liked songs: ", likedSongs)
  const addToLikedSongs = (song) => {
    const isFavorite = likedSongs.some(item => item.id === song.id) 
    if (isFavorite === false) {
        setLikedSongs(prev => [...prev, song])
    } // функциональный вариант 
    // setLikedSongs([...likedSongs,song])
  } // получается это функция(?), и вызываем этот компонент ниже
  const removeFromLikedSongs = (song) => {
    const removeSong = likedSongs.filter(item => item.id !== song.id)
    setLikedSongs(removeSong)
    console.log("Deleted song: ", song)
  }
  if(selectedAlbum) {
    return (
      <AlbumDetails
      title={selectedAlbum.title}
      artists={selectedAlbum.artists}
      albumCardImg={selectedAlbum.albumCardImg}
      onClose={() => setSelectedAlbum(null)}
      songs={selectedAlbum.songs}
      addToLikedSongs={addToLikedSongs} 
      likedSongs = {likedSongs}
      removeFromLikedSongs={removeFromLikedSongs}
      />
    )
  }
  return (
    <div className='album-cards'>
      {albumCards.map((cards)=> (
        <AlbumCard
        key={cards.id}
        title={cards.title}
        artists={cards.artists}
        albumCardImg={cards.albumCardImg}
        onOpen={() => setSelectedAlbum(cards)}
        />
      ))}
    </div>
  );
}
export default App