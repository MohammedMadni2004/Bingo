import { useState, useEffect, useMemo } from 'react'


import './App.css'



function App() {
  const [count, setCount] = useState(0)
  const [matrix,setMatrix]=useState([])
  const [reset,setReset]=useState(1)
  
  useEffect(()=>{ 
    let numbers=[]
    for (let i=1;i<26;i++){
      numbers.push(i)
    }
    for (let i=0;i<25;i++){
      let j=Math.floor(Math.random()*25)
      let temp=numbers[i]
      numbers[i]=numbers[j]
      numbers[j]=temp
    }
    setMatrix(numbers)
  },[reset])
  function handleClick(event){
    setCount(event.target.innerText);
    
  } 
  function handleReset(event){
    setReset(prevReset=>prevReset+1)
  }
 
  
  return (
    <>
    <div className="flex">
      <div className="grid">
        {matrix.map((item,index)=>{
          return(
          <div key={index} clasName="grid-item" onClick={handleClick}>
              {item}
              
          </div>)
    })}
        
             
    </div>
  
    </div>
    <p > clicked {count} </p>
    <button onClick={handleReset}>Resset matrix</button>
    </>
     
  )
}

export default App
