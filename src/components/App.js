import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
    this.setState({
      ...this.state,
      filters: {
        type: e.target.value
      }
    })
  }

  fetchingPets = () => {
    let URL = this.state.filters.type === 'all' ? `/api/pets` : `/api/pets?type=${this.state.filters.type}`
    fetch(URL)
      .then((res)=>{return res.json()})
      .then(data=>{
          this.setState({
            ...this.state,
            pets: data
          })
        })
  }

  adoptPet = (id) => {
    let pets = this.state.pets.map((pet) => {return pet.id === id ? {...pet, isAdopted: true} : pet})
    this.setState({
      ...this.state,
      pets: pets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.fetchingPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
