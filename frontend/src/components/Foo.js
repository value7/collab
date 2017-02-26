import React from 'react'

export default function Foo({ authData }) {
  console.log(authData);
  return (
    <div>{`I am Foo! Welcome ${authData.user}`}</div>
  )
}
