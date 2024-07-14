import React from 'react'

type PrefecturesProps = {
  key: string
}

const Pre = ({ key }: PrefecturesProps) => {
  return (
    <header>
      <h1>{key}都道府県</h1>
    </header>
  )
}

export default Pre
