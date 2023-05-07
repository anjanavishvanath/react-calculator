import React from "react"
import Button from "./components/Button"
import Display from "./components/Display"
import "./components/styles.css"

export default function App() {

  const buttonValues = [7,8,9,"/",4,5,6,"*",1,2,3,"+",".",0,"=","-", "AC"]

  const [currentValue, setCurrentValue] = React.useState("")
  const [operand, setOperand] = React.useState("")
  const [prevValue, setPrevValue] = React.useState("")
  const [reset, setReset] = React.useState(false)

  function assembleValue(digit){
    if(reset) {
      console.log("here")
      setCurrentValue("")
      setReset(false)
    }

    if(!isNaN(digit) || digit === "."){
      if(digit==="." && currentValue.includes(".")){
        return
      }else if(digit === 0 && currentValue === ""){
        return
      }else{
        setCurrentValue(val => val+digit)
      }
    }else if(digit === "="){
      setCurrentValue(evaluate(prevValue,currentValue,operand))
      setPrevValue("")
      setOperand("")
      setReset(true)
    }else{
      if(operand && prevValue){
        setPrevValue(val => evaluate(val,currentValue,operand))
      }else{
        setPrevValue(currentValue)
      }
      setOperand(digit)
      setCurrentValue("")
    }
  }

  function evaluate(prev,curr,oper){
    switch(oper){
      case "+":
        return Number(prev)+Number(curr)
      case "-":
        return Number(prev)-Number(curr)
      case "*":
        return Number(prev)*Number(curr)
      case "/":
        return Number(prev)/Number(curr)  
      default:
        console.log("default")
    }
  }

  function allClear(){
    setCurrentValue("")
  }

  function isNumberOrEq(value){
    return !isNaN(value) || value === "." || value === "="
  }


  const buttonElements = buttonValues.map((val,id) => <Button 
                                                        key={id} 
                                                        id={id} 
                                                        value={val}
                                                        isOp = {isNumberOrEq(val)}
                                                        clear = {allClear}
                                                        handleNumClick = {() => assembleValue(val)}
                                                      />)

  const displayVal = `${prevValue} ${operand}`

  return (
    <main className="calculator-wrapper">
      <Display value={displayVal} />
      <Display value={currentValue} />
      <div className="calculator-buttons">
        {buttonElements}
      </div>
    </main>
    )
}
