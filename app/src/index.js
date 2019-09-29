import React from 'react'
import ReactDOM from 'react-dom'
import drawMainCanvas from './main'
import './index.css'
import './main.css'
import './main.js'

class StartGameButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  render() {
    return (
      <button className="start-game" onClick={this.props.handler}>
        Start a new game!
      </button>
    );
  }
}

class StaminaBar extends React.Component {
  constructor(props) {
    super(props);
    //this.state = props.player.stamina
    /*$(`#fieldPlayer_${player} > div.value`).css({
        width: this.state/2,
        backgroundColor: this.state < 55 ? (this.state < 20 ? 
            settings().game.gauges.veryLowStaminaColor : 
            settings().game.gauges.lowStaminaColor) : 
            settings().game.gauges.highStaminaColor
    })*/
}

  render() {
    //alert(JSON.stringify(this.props.player))
    return (
      <li id={ this.props.player.obj } style={{left: this.props.player.x-30, top: this.props.player.y+30}}>
        <div className="value" style={{width: this.props.player.stamina/2 }}></div>
      </li>
    );
  }
}

class StaminaBars extends React.Component {
  /*constructor(props) {
    super(props);
    this.state = props.players
    console.log(props)
    if (props && Array.isArray(props)) {
      alert(JSON.stringify(props))
      this.players = props.players;
      //Object.keys(props.players).forEach(name => {
        //alert(name)
      //})  
    }

    this.state = props.players //Should the state be this?
  }*/

  renderStaminaBar(obj) {
    //alert(JSON.stringify(obj))
    return <StaminaBar player={obj} />;
  }

  render() {
    let items = null
    if(this.props.players) {
      //alert(JSON.stringify(this.props.players))
      items = this.props.players.map((p) => this.renderStaminaBar(p))
    }
    return (
      <ul className="stamina-bars">
        {items}
      </ul>
    )
  }
}

class MatchClock extends React.Component {
  render() {
    return (
      <div className="clock-container"><div className="clock">{this.props.time}</div><div className="half">1st half</div></div>
    )
  }
}

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMainScene: false,
      time: ""
    };
    this.tickHandler = (ctx) => {
      if(!ctx.matchIsPaused()) {
        //alert(JSON.stringify(ctx.getScene().getActors()[1].attr.x()))
        this.setState({
          displayMainScene: this.state.displayMainScene,
          time: ctx.updateClock(),
          players: ctx.getScene().getActors({ attr: "obj", method: "startsWith", arg: "fieldPlayer_"}).map((p) => {
            return {
              obj: p.obj,
              stamina: ctx.match.playerStats["Hyuga"].stamina, //Replace by proper
              x: p.pos.x(),
              y: p.pos.y()
            }
          })
        })
      }
    }
    this.displayHandler = this.displayHandler.bind(this)
  }

  displayHandler() {
    this.setState({
      displayMainScene: !this.state.displayMainScene
    })
  }

  showMainScene() {
    this.setState({
    })
  }

  initializeCanvas() {
    let that = this
    setTimeout(() => {
      drawMainCanvas(that.tickHandler)
    }, 10)
  }

  render() {
    if ( this.state.displayMainScene ) {
      if(this.state.time == "") {
        //Will only initialize once!
        this.initializeCanvas()
      }
      return (
      <div>
        <div className="score-left">0</div>
        <div className="score-right">0</div>
        <div className="rightbox"></div>
        <div className="leftbox"></div>
        <div className="footer-comments"></div>
        <MatchClock time = {this.state.time} />
        <StaminaBars players = {this.state.players} />
        <ul className="stamina-bars">
        </ul>
      </div>
      )
    } else {
      return (
        <StartGameButton handler = {this.displayHandler} />
      )
    }
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <Scene />
        <canvas id="main"></canvas>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


