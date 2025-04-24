import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function MovieSearchBar() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchMovies = async (searchTerm) => {
    if (!searchTerm) return;
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: "ee5f701910b4a35dabf3c72875909f62",
            query: searchTerm,
            language: "pt-BR"
          }
        }
      );
      setMovies(response.data.results);
      setShowPopup(true);
    } catch (error) {
      // Atualizado para mostrar mensagens de erro mais informativas no console
      console.error("Erro ao buscar filmes:", error.message || error);
      setMovies([]);
      setShowPopup(true);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim()) {
      fetchMovies(value);
    } else {
      setMovies([]);
      setShowPopup(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-10">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-xl shadow focus:outline-none"
        placeholder="Buscar filmes..."
      />

      {showPopup && (
        <div
          ref={popupRef}
          className="absolute top-full left-0 right-0 bg-white border rounded-xl mt-1 shadow-lg z-10 max-h-80 overflow-y-auto"
        >
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="flex items-center gap-4 p-2 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  // Verifica se há poster_path, caso contrário usa uma imagem genérica como fallback
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                      : "https://via.placeholder.com/92x138?text=Sem+Imagem"
                  }
                  // Adicionado fallback para o título do filme, caso não exista
                  alt={movie.title || "Filme sem título"}
                  className="w-12 h-18 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">
                    {/* Adicionado fallback para o título */}
                    {movie.title || "Título desconhecido"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {/* Adicionado fallback para avaliação */}
                    Avaliação: {movie.vote_average !== undefined ? movie.vote_average : "N/A"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">Nenhum filme encontrado</div>
          )}
        </div>
      )}
    </div>
  );
}
