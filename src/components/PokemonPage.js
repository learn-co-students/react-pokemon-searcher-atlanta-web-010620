import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'
import SortButton from './SortButton'

class PokemonPage extends React.Component {
  state = {
    pokemon:[],
    pokemonSearch:[],
    searchTerm:"",
    isSorted: ''
  }

  componentDidMount = () =>{
    this.fetchPokemon()
  }
  
  fetchPokemon = () => {
    fetch('http://localhost:3000/pokemon')
    .then(resp => resp.json())
    .then(
      json => {
        this.setState({
          pokemon:json,
          pokemonSearch:json
        })
        console.log(this.state.pokemon)
      })
  }

  onSearchType = (e) => {
    console.log(e.target.value)
    this.setState(
      {searchTerm:e.target.value}, () => this.searchForPokemon()
      )
  }

  searchForPokemon = () =>{
      if (this.state.seachTerm === ""){
        return this.state.pokemon; 
      }else {
        this.setState({
          pokemonSearch:[... this.state.pokemon].filter(pokemon => pokemon.name.includes(this.state.searchTerm))
        })
      }
    }

  sortByHp = (e) => {
    // debugger
    this.state.isSorted ? 
    this.setState({pokemonSearch:[... this.state.pokemon], isSorted: false})
    : 
    this.setState({pokemonSearch:[... this.state.pokemon].sort((a,b) => (a.stats[5].value > b.stats[5].value) ? 1 : -1 ), isSorted: true}),
    console.log(this.state.isSorted)
  }
  // this.setState({pokemonSearch:this.state.pokemonSearch.sort((a,b) => (a.stats[5].value > b.stats[5].value) ? 1 : -1 ), isSorted: true}), console.log(this.state.isSorted)
  render() {
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm fetchPokemon={this.fetchPokemon}/>
        <br />
        <Search onSearchType={this.onSearchType} />
        <br />
        <SortButton sortByHp={this.sortByHp} onOff={'off'} title={"Sort By HP"} />
        <br />
        <PokemonCollection pokemon={this.state.pokemonSearch}/>
      </Container>
    )
  }
}

export default PokemonPage
