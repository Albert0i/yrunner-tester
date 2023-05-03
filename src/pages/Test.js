import { useState } from 'react'
import { apiGateway } from '../config/apiGateway'
import { useStopwatch } from "react-use-precision-timer"

export const Test = () => {
    const [tabname, setTabname] = useState('')
    const stopwatch = useStopwatch();

    const getFile = () => {
        stopwatch.start()
        apiGateway.get(`/yr/${tabname}`)
            .then(data => { 
                            console.log(data)                             
                            console.log(stopwatch.getElapsedRunningTime())
                            stopwatch.stop()
                          }) 
            .catch(err => console.log(err))
    }
    return (
        <div>
            <input type='text' onChange={ e => setTabname(e.target.value)}></input>
            <button onClick={getFile}>Get</button>
        </div>
    )
}

/*
   react-use-precision-timer
   https://www.npmjs.com/package/react-use-precision-timer?activeTab=readme

   useTimer
   https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-usetimer--page#timer
*/