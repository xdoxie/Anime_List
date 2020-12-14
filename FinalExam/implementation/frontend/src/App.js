import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      anime: [],
      tempName: "",
      tempGenre: "",
      tempStudio: "",
      tempYear:  "",
      delName: "",
      delGenre: "",
      delStudio: "",
      delYear:  "",
      success: true
    }
  }
  componentDidMount() {
   fetch('/anime')
      .then(res => res.json())
      .then((show) => {this.setState({ anime: show.info }) });

  }
  getData() {
    fetch('/anime')
      .then(res => res.json())
      .then((show) => { this.setState({ anime: show.info}) });

  }
  putData(){
    let data =  {name: this.state.tempName, genre: this.state.tempGenre, studio: this.state.tempStudio, year: this.state.tempYear};
    let options ={
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('/anime', options);
  }
  delData(){
    let data =  {name: this.state.delName, genre: this.state.delGenre, studio: this.state.delStudio, year: this.state.delYear};
    let options ={
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('/anime', options); 
    
  }
  
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  //<button onClick={() => { this.getData()}}>Get</button>
  render() {
    return (
      <div className="App">
        <button onClick={() => { this.putData() }}>Put Test</button>
        <button onClick={() => { this.getData() }}>Get Data</button>
        <form onSubmit={()=>{this.putData()}}>

          Enter Name:
          <input type="text" name="tempName" value={this.state.tempName} onChange={this.handleChange}></input>
          Enter Genre:
          <input type="text" name="tempGenre" value={this.state.tempGenre} onChange={this.handleChange}></input>
          Enter Studio:
          <input type="text" name="tempStudio" value={this.state.tempStudio} onChange={this.handleChange}></input>
          Enter Year:
          <input type="text" name="tempYear" value={this.state.tempYear} onChange={this.handleChange}></input>
          <input type="submit" value="Submit"></input>

        </form>
        <h1>Delete a Record</h1>
        <form onSubmit={()=>{this.delData()}}>
        Enter Name:
          <input type="text" name="delName" value={this.state.delName} onChange={this.handleChange}></input>
          Enter Genre:
          <input type="text" name="delGenre" value={this.state.delGenre} onChange={this.handleChange}></input>
          Enter Studio:
          <input type="text" name="delStudio" value={this.state.delStudio} onChange={this.handleChange}></input>
          Enter Year:
          <input type="text" name="delYear" value={this.state.delYear} onChange={this.handleChange}></input>
          <input type="submit" value="Submit"></input>

        </form>
        <ol>
          {this.state.anime.map(shows =>
            <li key={shows.name}> Name: {shows.name}, Genre: {shows.genre}, Studio: {shows.studio}, Year: {shows.year} </li>)}
        </ol>
      </div>
    );
  }
}

export default App;
