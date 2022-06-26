import React from 'react'
import ResultSearchItem from './ResultSearchItem'

export default function ResultSearchItems(props) {
  const components = props.data.map((item, indx) => 
      <ResultSearchItem
          title={item.title}
          url={item.url}
          body={item.body}
          indx={indx}
      />
  )
  
  return (
    <div>
      {components}
    </div>
  )
}
