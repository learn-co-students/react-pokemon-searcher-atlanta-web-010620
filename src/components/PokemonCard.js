import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  toggleImg = (e) => {
    e.preventDefault()
    e.target.src === this.props.imgFront ? e.target.src = this.props.imgBack : e.target.src = this.props.imgFront
  }
  render() {
    return (
      <Card>
        <div>
          <div className="image">
            <img alt="oh no!" 
              src={this.props.imgFront}
              onClick={this.toggleImg}
            />
          </div>
          <div className="content">
            <div className="header">{this.props.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.hp}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
