import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

class PokemonPage extends React.Component {

  state = {
    pokemon: [],
    search: '',
  }

  componentDidMount() {
    fetch('http://localhost:3000/pokemon')
    .then(resp => resp.json())
    .then(pokemon => {
      this.setState({pokemon: pokemon})
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.pokemon.filter(pokemon => pokemon.name.slice(0, this.state.search.length) === this.state.search))
  }

  addPokemon = (pokemon) => {
    this.setState({
      pokemon: this.state.pokemon.concat(pokemon)
    })
  }

  render() {
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
        <br />
        <Search search={this.state.search} onChange={(e) => this.setState({search: e.target.value})} />
        <br />
        <PokemonCollection pokemon={this.state.pokemon.filter(pokemon => pokemon.name.includes(this.state.search))}/>
      </Container>
    )
  }
}

export default PokemonPage
