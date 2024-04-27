import { Link } from 'react-router-dom';
import './pokemon.css';

function Pokemon({ name , image, id }) {
    return (
        <div className='pokemon'>
            <Link to={`/pokemon/${id}`} className='pokemon-links'>
            <div className='pokemon-name'>{name}</div>
            <div><img className='pokemon-image' src={image} alt="image" /></div>
            </Link>
        </div>
    )
}

export default Pokemon;