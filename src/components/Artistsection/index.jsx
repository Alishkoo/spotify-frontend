import React , { useState, useEffect }from "react";
import { Link } from "react-router-dom";
import { ArtistsCard } from "../ArtistsCard";
import "./Artistsection.css";
import { getAuthors, getMusics} from "../../api/musicService";

export const Artistsection = ({ title }) => {

  const [artists, setArtists] = useState([]);
  const [musics, setMusics] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getMusics();
        setMusics(data);
      }catch (error) {
        console.error(error);
      }
    }

    fetchPlaylists();
  }, []);

  
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getAuthors();
        setArtists(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchArtists();
    
  }, []);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="text-2xl font-bold text-white hover:underline">
          Popular artists
        </Link>
        <Link
          to="/"
          className="text-sm font-bold tracking-[2px] hover:underline"
        >
          Show all
        </Link>
      </div>
      <div className="horizontal-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {artists.map((artist) => (
          <ArtistsCard
            key={artist._id}
            title={artist.name}
            description={artist.description}
            imageUrl={artist.image_link}
          />
        ))}
      </div>
    </div>
  );
};
