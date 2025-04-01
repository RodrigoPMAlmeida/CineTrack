import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

export default function Avaliacao(props) {
    // Calcula o número de estrelas preenchidas com base na classificação
    const numEstrela = Math.floor(props.rating / 2); // Número inteiro de estrelas
    const meiaEstrela = (props.rating % 2) >= 1; // Verifica se há uma estrela pela metade

    // Cria um array de estrelas
    const estrelas = [];

    for (let i = 0; i < 5; i++) {

        if (i < numEstrela) {

            estrelas.push(<FaStar key={i} color="gold" />);// Adiciona em estrelas o icon da estrela pintada

        } else if (i === numEstrela && meiaEstrela) {

            estrelas.push(<FaStarHalfAlt key={i} color="gold" />);// Adiciona em estrelas o icon da estrela pintada pela metade

        } else {

            estrelas.push(<FaRegStar key={i} color="gray" />);// Adiciona em estrelas o icon do contorno da estrela

        }
    }

    const notaEmCinco = (props.rating / 2).toFixed(1); 

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {estrelas}
            <span style={{ marginLeft: '8px' }}>
                {notaEmCinco}/5
            </span>
        </div>
    );
}