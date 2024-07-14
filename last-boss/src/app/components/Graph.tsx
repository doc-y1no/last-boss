import React from 'react'

type GraphProps = {
  value: string
}

const Graph = ({ value }: GraphProps) => {
  return (
    <header>
      <h1>{value}グラフ</h1>
    </header>
  )
}

export default Graph
