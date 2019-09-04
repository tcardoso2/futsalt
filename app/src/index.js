import React from 'react'
import ReactDOM from 'react-dom'
import drawMainCanvas from './main'
import './index.css'
import './main.css'
import './main.js'

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={ () => { this.setState({value: 'X'})} }>
        { this.state.value }
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
/************ Ignore the Components above during migration to React for now */

class StartGameButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
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

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCanvasScene: false,
    };
    this.handler = this.handler.bind(this)
  }

  handler() {
    this.setState({
      displayMainScene: !this.state.displayMainScene
    })
  }

  showMainScene() {
    this.setState({
    })
  }

  render() {
    if ( this.state.displayMainScene ) {
      setTimeout( drawMainCanvas, 1000)
      return (
        <div>
        <canvas id="main"></canvas>
        <div className="score-left">0</div>
        <div className="score-right">0</div>
        <div className="rightbox"></div>
        <div className="leftbox"></div>
        <div className="footer-comments"></div>
        <div className="clock-container"><div className="clock">00:00</div><div className="half">1st half</div></div>
        <ul className="stamina-bars">
        </ul>
      </div>
      )
    } else {
      return (
        <StartGameButton handler = {this.handler} />
      )
    }
  }
}


class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <Scene />
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


