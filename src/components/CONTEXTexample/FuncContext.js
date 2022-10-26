import React, {useContext} from "react";

const myContext = React.createContext('light');

const FuncContext = () => {
  return(
    <myContext.Provider value='dark'>
      <Second />
    </myContext.Provider>
  )
}

const Second = () => {
  const theme = useContext(myContext)
  return(
    <div theme={theme}></div>
  )
}