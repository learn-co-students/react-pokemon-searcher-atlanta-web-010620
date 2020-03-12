import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault

    let data = {
      name: this.state.name,
      stats: [
        {}, {}, {}, {}, {},
        {
          value: this.state.hp,
          name: 'hp'
        }
      ],
      sprites: {
        front: this.state.frontUrl,
        bacl: this.state.backUrl
      },
    }

    let dataObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }

    fetch('http://localhost:3000/pokemon', dataObj)
    .then(resp => resp.json())
    .then(pokemon => {
      this.props.addPokemon(pokemon)
      this.setState({
        name: '',
        hp: '',
        frontUrl: '',
        backUrl: ''
      })
    })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value, 
    })
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" value={this.state.name} onChange={this.onChange} name="name" />
            <Form.Input fluid label="hp" placeholder="hp" value={this.state.hp} onChange={this.onChange} name="hp" />
            <Form.Input fluid label="Front Image URL" value={this.state.frontUrl} placeholder="url" onChange={this.onChange} name="frontUrl" />
            <Form.Input fluid label="Back Image URL" value={this.state.backUrl} placeholder="url" onChange={this.onChange} name="backUrl" />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
