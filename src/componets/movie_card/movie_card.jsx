import Avaliacao from "../Avaliacao/avaliacao";

export default function MovieCard(props) {
  return (
    <li className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/original${props.poster_path}`}
          alt={props.title}
        />
      </div>
      <div className="movie-infos">
        <p className="movie-title">
            {props.title}
        </p>
        <Avaliacao 
        rating={props.vote_average}>
        </Avaliacao>
        <div className="descricao">   
          <p className="descricao">
            {props.overview}
          </p>
        </div>
      </div>

    </li>
  );
}
