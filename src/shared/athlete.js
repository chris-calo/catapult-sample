import React from 'react';
import store from 'store';
import Header from './common/header';
import Footer from './common/footer';
import { withRouter, Link } from 'react-router-dom';
import { get, post } from './common/api';
import './athlete.scss';

class Athlete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      calorieData: [],
    };
  }

  componentDidMount() {
    const session = store.get('session');
    const redirect = () => this.props.history.replace('/login');

    if (!session || typeof session === 'undefined') {
      redirect(); return;
    }
    if (!session.email || `${session.email}`.length < 1) {
      redirect(); return;
    }
    if (!session.token || `${session.email}`.token < 1) {
      redirect(); return;
    }

    const request = { email: session.email, token: session.token };
    post('/api/v1/user/validate', request).then(result => {
      if (!result.ok) {
        store.remove('session');
        redirect();
      }
    });

    const drawGraph = () => this.drawCaloriesGraph();
    get('/api/v1/caloriesburned').then(result => {
      if (!result.ok) {
        alert(result.msg)
      } else {
        const data = result.data;
        this.setState({ calorieData: data });

        drawGraph();

        if (__isBrowser__) {
          window.addEventListener('resize', drawGraph);
        }
      }
    })
  }

  drawCaloriesGraph() {
    if (this.state.calorieData.length < 1) return;

    // setup graph
    const canvas = this.calories;
    if (!canvas || typeof canvas === 'undefined') return;

		const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
		const width = canvas.width - 200;
		const height = canvas.height;

    // get points and normalize
    const rawPoints = this.state.calorieData.map(d => d[1]);
    const minPoint = Math.min(...rawPoints);
    const maxPoint = Math.max(...rawPoints);
    const points = rawPoints.map(p =>
      (p-minPoint)/(maxPoint-minPoint) * (height * 0.25)
    );

    ctx.translate(0, height);
    ctx.scale(1, -1);

    // build gradients
    const lightLineGradient = ctx.createLinearGradient(
      200, height / 2, width + 200, height / 2
    );
    lightLineGradient.addColorStop(0, '#F8F8F8');
    lightLineGradient.addColorStop(1, '#EEE0DA');

    const darkLineGradient = ctx.createLinearGradient(
      200, height / 2, width + 200, height / 2
    );
    darkLineGradient.addColorStop(0, '#71ABEA');
    darkLineGradient.addColorStop(1, '#FD4C01');

    // start drawing
    ctx.fillStyle = lightLineGradient;
    ctx.fillRect(200, 0, width, height);

    let position;
    let previous;
    const step = width / points.length;

    // draw fill shape
    position = 200;
    previous = -1;

    ctx.strokeStyle = darkLineGradient;
    ctx.beginPath();

    ctx.moveTo(position, previous);

    previous = points[0];
    ctx.lineTo(position, previous);
    for (let i = 0; i != points.length; i++) {
      const current = points[i];

      ctx.lineTo(position + step, current);
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';

      previous = current;
      position += step;
    }
    
    ctx.lineTo(position, -1);
    ctx.closePath();
    ctx.fillStyle = '#F8F8F8';
    ctx.fill();

    // draw initial line
    position = 200;
    previous = points[0]

    ctx.strokeStyle = darkLineGradient;
    ctx.beginPath();

    ctx.moveTo(position, previous);
    for (let i = 0; i != points.length; i++) {
      const current = points[i];

      ctx.lineTo(position + step, current);
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';

      previous = current;
      position += step;
    }

    ctx.stroke();

    // draw blank space
    ctx.fillStyle = '#F8F8F8';
    ctx.fillRect(0, 0, 200, height);

    // draw horizontals
    for (let i = 0; i != 4; i++) {
      const vertical = i * (height * 0.25);

      ctx.strokeStyle = '#E0E0E0';
      ctx.beginPath();

      ctx.moveTo(140, vertical);
      ctx.lineTo(width + 200, vertical);
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';

      ctx.stroke();
    }
  }

  render() {
    const rawPoints = this.state.calorieData.map(d => d[1]);
    const maxPoint = Math.max(...rawPoints);

    const allDates = this.state.calorieData.map(d =>
      new Date(Date.parse(d[0]))
    );

    const dateTable = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    const graphDates = allDates.filter((d, i) => i % 4 === 0);
    const vertLabels = [];
    for (let i = 0; i != graphDates.length; i++) {
      const date = graphDates[i];
      vertLabels.push(
        <span>{dateTable[date.getMonth()]}, {date.getDate()}</span>
      );
    }
    
    const calorieData = JSON.parse(JSON.stringify(this.state.calorieData));
    calorieData.sort((a, b) => a[0] < b[0] ? 1 : -1);

    const infoBlocks = calorieData.map((c, i) => {
      const now = new Date();
      const day = 24 * 60 * 60 * 1000;
      const date = new Date(Date.parse(c[0]));
      const difference = Math.round((now.getTime() - date.getTime()) / day);
      const calories = c[1];

      return (
        <div className="info-block" key={JSON.stringify(c)}>
          <div className="highlight" />
          <div className="days-ago">
            {difference} {difference == 1 ? 'day' : 'days'} ago
          </div>
          <div className="date">
            {dateTable[date.getMonth()]}, {date.getDate()}
          </div>
          <div className="burned">
            <span className="thick">{calories}</span>&nbsp;
            <span className="thin">calories burned</span>
          </div>
        </div>
      );
    });

    return (
      <div className="athlete-view">
        <Header />
        <div className="view-container">
          <div className="graph-title">
            <span className="thick">Calories</span>&nbsp;&nbsp;
            <span className="thin">Burned</span>
          </div>
          <div className="canvas-container">
            <canvas className="calories" ref={el => this.calories = el} />
            <div className="horizontal-labels">
              <span>{isNaN(maxPoint) ? 0 : maxPoint * 3}</span>
              <span>{isNaN(maxPoint) ? 0 : maxPoint * 2}</span>
              <span>{isNaN(maxPoint) ? 0 : maxPoint}</span>
              <span>0</span>
            </div>
            <div className="vertical-labels">
              {vertLabels}
            </div>
          </div>
          <div className="info-blocks">
            {infoBlocks}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(props => <Athlete {...props} />);
