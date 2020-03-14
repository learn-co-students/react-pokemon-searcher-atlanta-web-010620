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
  defaultState = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
  }

  textInput = (e) => {
    e.preventDefault()
    return this.setState({
      [e.target.name]:e.target.value
    })
  }

  handleSubmit = (e) => {
    const name = e.target.name.value; 
    const hp = e.target.hp.value;
    const frontUrl = e.target.frontUrl.value; 
    const backUrl = e.target.backUrl.value; 

    if (name !== "" && hp !== ""){
      this.postPokemon(name,hp,frontUrl,backUrl)
      this.setState(this.defaultState)
    }

  }

  postPokemon(name,hp,front,back){
    const objectData = {
      key:this.props.key,
      name:name,
      stats:{
        5:{
          value:hp,
          name:'hp'
        },
      },
      sprites:{
        front:front, 
        back:back
      }
    }
    fetch('http://localhost:3000/pokemon', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
      body: JSON.stringify(objectData),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      this.props.fetchPokemon();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" onChange={this.textInput}/>
            <Form.Input fluid label="hp" placeholder="hp" name="hp" onChange={this.textInput}/>
            <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" onChange={this.textInput}/>
            <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" onChange={this.textInput}/>
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
