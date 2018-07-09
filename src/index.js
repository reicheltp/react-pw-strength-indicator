import React from 'react'
import ReactDOM from 'react-dom'

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  }
}

function describeArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle)
  var end = polarToCartesian(x, y, radius, startAngle)

  var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  var d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y
  ].join(' ')

  return d
}

function CircleProgress({ size = 24, degree = 180, color = 'pink' }) {
  return (
    <svg width={size} height={size}>
      <path
        fill="none"
        stroke={color}
        stroke-width="3"
        d={describeArc(size / 2, size / 2, size / 2 - 3, 0, degree)}
      />
    </svg>
  )
}

function App() {
  return (
    <div className="App">
      <CircleProgress color="#d0021b" degree={72} />
      <CircleProgress color="#d0021b" degree={144} />
      <CircleProgress color="#f5a623" degree={216} />
      <CircleProgress color="#f5a623" degree={288} />
      <CircleProgress color="#417505" degree={359} />
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
