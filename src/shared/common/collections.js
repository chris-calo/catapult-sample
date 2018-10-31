import React from 'react';
import classNames from 'classnames';
import './collections.scss';

let today = (new Date()).getTime();
let lastWeek = new Date();
lastWeek = lastWeek.setDate(lastWeek.getDate() - 9);

class ValuesDropdown extends React.Component {
  render() {
    return (
      <div className="values-dropdown">
        <div className="current">
          {this.props.data[this.props.index].title}
        </div>
      </div>
    );
  }
}

class DateTimeSelector extends React.Component {
  render() {
    return null;
  }
}

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      open: false,
    };
  }

  toggleOpenState() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    const dropdownClassNames = classNames({
      "dropdown": true,
    });

    const optionsClasses = classNames({
      "options": true,
      "open": this.state.open,
      "closed": !this.state.open,
    });

    const dropdownTriangleClassNames = classNames({
      "triangle": true,
      "flip": this.state.open,
    });

    const dropdownOptions = this.props.options.map((o, i) => {
      const dropdownOptionClassNames = classNames({
        "option": true,
        "current": i == this.state.index,
      });

      return <div className={dropdownOptionClassNames} key={o}>{o}</div>;
    });

    return (
      <div className="dropdown">
        <div className="title">{this.props.name}</div>
        <div className={dropdownClassNames}
        onClick={() => this.toggleOpenState()}
        data-name={this.props.fieldName}>
          <div className="current">
            <span className="label">
              {this.props.options[this.state.index]}
            </span>
            <span className={dropdownTriangleClassNames}>▾</span>
          </div>
          <div className={optionsClasses}>
            {dropdownOptions}
          </div>
        </div>
      </div>
    );
  }
}

class Highlights extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: lastWeek,
      endDate: today,
    };
  }

  render() {
    const highlights = this.props.data.map(h =>
      <div className="highlight" key={h[1]}>
        <div className="value">{h[0]}</div>
        <div className="label">{h[1]}</div>
      </div>
    );

    return (
      <div className="highlights">
        {highlights}
      </div>
    );
  }
}

class BarGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      startDate: lastWeek,
      endDate: today,
    };
  }

  render() {
    const inputs = this.props.data[0].data.filter(i =>
      (i[0].getTime() || i[0]) >= this.state.startDate &&
      (i[0].getTime() || i[0]) <= this.state.endDate
    );

    inputs.sort((a, b) => {
      if (a[0] < b[0]) { return -1 }
      if (a[0] > b[0]) { return 1 }
      return 0;
    });

    const val = inputs.map(i => i[2]);
    const max = Math.max(...val);
    const min = Math.min(...val);

    const breaks = [
      max,
      parseInt(Math.ceil(max * 0.75)),
      parseInt(Math.ceil(max * 0.50)),
      parseInt(Math.ceil(max * 0.25)),
      0,
    ];

    const rows = breaks.map(b =>
      <div className="row" key={b}>
        <div className="line"></div>
        <div className="divider"></div>
        <div className="label">{b}</div>
      </div>
    );

    const cols = inputs.map(i =>
      <div className="col" key={i}>
        {i[1]}
      </div>
    );

    const bars = inputs.map((d, i) => {
      const barBodyClassNames = classNames({
        "bar-body": true,
        "dark": i % 2 == 0,
        "light": i % 2 != 0,
      });

      return (
        <div className="bar" key={d[2]}>
          <div className={barBodyClassNames}
          style={{height: `calc(${parseFloat(d[2]) / max * 100}% - 14px)`}}>
          </div>
        </div>
      );
    });

    return (
      <div className="bargraph">
        <ValuesDropdown
        data={this.props.data}
        index={this.state.index}
        onClick={() => this.props.changeInputs()}/>
        <DateTimeSelector />
        <div className="graph">
          <div className="rows">
            {rows}
          </div>
          <div className="cols">
            {cols}
          </div>
          <div className="bars">
            {bars}
          </div>
        </div>
      </div>
    );
  }
}

class LineGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      startDate: lastWeek,
      endDate: today,
    };
  }

  render() {
    const data = this.props.data[this.state.index];
    const inputs = data.lines[0].filter(i =>
      (i[0].getTime() || i[0]) >= this.state.startDate &&
      (i[0].getTime() || i[0]) <= this.state.endDate
    );

    inputs.sort((a, b) => {
      if (a[0] < b[0]) { return -1 }
      if (a[0] > b[0]) { return 1 }
      return 0;
    });

    const val = inputs.map(i => i[1]);
    const max = Math.max(...val);
    const min = Math.min(...val);

    const breaks = [
      max,
      parseInt(Math.ceil(max * 0.75)),
      parseInt(Math.ceil(max * 0.50)),
      parseInt(Math.ceil(max * 0.25)),
      0,
    ];

    const rows = breaks.map(b =>
      <div className="row" key={b}>
        <div className="line"></div>
        <div className="divider"></div>
        <div className="label">{b}</div>
      </div>
    );

    const cols = inputs.map(i =>
      <div className="col" key={i}>
        {i[0].getMonth()} / {i[0].getDate()}
      </div>
    );

    const points = inputs.map(i =>
      <div className="point" key={i[1]}>
        <div className="point-body"
        style={{bottom: `${parseFloat(i[1]) / max * 100}%`}}></div>
      </div>
    );

    return (
      <div className="linegraph">
        <ValuesDropdown
        data={this.props.data}
        index={this.state.index}
        onClick={() => this.props.changeInputs()}/>
        <DateTimeSelector />
        <div className="graph">
          <div className="rows">
            {rows}
          </div>
          <div className="cols">
            {cols}
          </div>
          <div className="points">
            {points}
          </div>
        </div>
      </div>
    );
  }
}

class Table extends React.Component {
  render() {
    const normalizeValue = (v) => {
      if (v === true) {
        return "Yes";
      } else if (v === false) {
        return "No";
      }

      return v;
    };

    const headers = this.props.data[0].map(h =>
      <div className="column heading" key={h}>{h}</div>
    );

    const rows = this.props.data.map((r, i) => {
      if (i === 0) { return null; }

      const cols = r.map(c =>
        <div className="column" key={c}>
          {normalizeValue(c)}
        </div>
      );

      const rowClassNames = classNames({
        'row': true,
        'dark': i % 2 != 0,
        'light': i % 2 == 0,
      });

      return (
        <div className={rowClassNames} key={r.join(',')}>
          {cols}
        </div>
      );
    });

    return (
      <div className="table">
        <div className="headers">{headers}</div>
        {rows}
      </div>
    );
  }
}

export {
  Dropdown,
  Highlights,
  BarGraph,
  LineGraph,
  Table,
};
