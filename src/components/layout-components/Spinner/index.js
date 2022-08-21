import React from 'react'
import { Spin } from 'antd'

export default function Spinner({size}) {
  return (
    <div style={{ display:'flex', alignItems: 'center', justifyContent: 'center', width:'100%'}}>
      <Spin size={size} />
    </div>
  )
}
