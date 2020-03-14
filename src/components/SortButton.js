import React, { Component } from 'react' 

export default class SortButton extends Component {
    render(){
        return(
            <button
                onClick={this.props.sortByHp}
            >
                {this.props.title}
            </button>
        )
    }
}