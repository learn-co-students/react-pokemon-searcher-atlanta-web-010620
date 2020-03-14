import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

class PokemonCollection extends React.Component {
state = {
}

renderPokemon = () => {
  return this.props.pokemon.map(pokemon => {
    return <PokemonCard
      key={pokemon.id}
      name={pokemon.name}
      imgFront={pokemon.sprites.front}
      imgBack={pokemon.sprites.back}
      hp={pokemon.stats['5'].value}
    />
  })
}

searchPokemon  = (e) => {
  console.log(e.target.value); 
}

render() {  
    return (
      <Card.Group itemsPerRow={6}>
        {this.renderPokemon()}
      </Card.Group>
    )
  }
}

export default PokemonCollection
