import { useState, useEffect, useRef } from 'react'
import { apiGateway } from '../config/apiGateway'
import { useStopwatch } from "react-use-precision-timer"

export const Test = () => {
    const [tabname, setTabname] = useState('')
    const inputRef = useRef()
    const stopwatch = useStopwatch();

    useEffect (()=> {
        //inputRef.current.focus();
    }, [])
    const getFile = () => {
        if (tabname !== '') {
            stopwatch.start()
            apiGateway.get(`/yr/${tabname}`)
                .then(data => { 
                                console.log(data)                             
                                console.log(stopwatch.getElapsedRunningTime())
                                stopwatch.stop()
                              }) 
                .catch(err => console.log(err))
        } else {
            alert('Please input filename')
        }
    }
    return (
        <div>
            <input type='text' autoFocus placeholder='filename'
                    className='px-2 py-1'
                    ref={inputRef} 
                    onChange={ e => setTabname(e.target.value)}></input>
            <button className='bg-green-700  hover:bg-green-500 text-white text-xs font-bold  uppercase rounded px-2 py-1 mx-2 my-1'
                    onClick={getFile}>Get</button>
        </div>
    )
}

/*
   react-use-precision-timer
   https://www.npmjs.com/package/react-use-precision-timer?activeTab=readme

   useTimer
   https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-usetimer--page#timer
*/