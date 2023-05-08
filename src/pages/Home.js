import { useState, useEffect } from 'react'
import { apiGateway } from '../config/apiGateway'
import { useStopwatch } from "react-use-precision-timer"

export const Home = () => {
    const [newTabname, setNewTabname] = useState('')
    const [cache, setCache] = useState([])
    const [data, setData] = useState()
    const [count, setCount] = useState(0)
    const stopwatch = useStopwatch();
    
    useEffect(()=> {
        getCachedTables()
    }, [])

    const getCachedTables = async () => {
        apiGateway.post('/cache/status')
            .then(data => setCache(data.data)) 
            .catch(err => console.log(err))
    }

    const load = (tabname) => {
        if (newTabname !=='') {
            stopwatch.start()
            apiGateway.post(`/cache/load/${tabname}`)
            .then(data => { 
                    setData(data.data) 
                    setCount(stopwatch.getElapsedRunningTime())
                    stopwatch.stop()
                })
            .catch(err => setData(err))
        }
        else 
            alert('Please input filename')
    }

    const unload = (tabname) => {
        apiGateway.post(`/cache/unload/${tabname}`)
            .then(data => setData(data.data))
            .catch(err => setData(err))
    }
   
    return (
        <div>
            <input type='text' autoFocus placeholder='filename'
                    className='px-2 py-1' 
                    onChange={ e=> setNewTabname(e.target.value)}></input>
            <button className='bg-green-700 hover:bg-green-500 text-white text-xs font-bold  uppercase rounded px-2 py-1 mx-2 my-1'
                    onClick={() => { load(newTabname)} }>Load</button>
            <hr/>
            <ol>   

            { cache.map(item => {
                return (<li key={item.tabname}>
                    { item.tabname } { item.crtdate } { item.crttime }
                    <button className='bg-red-700 hover:bg-red-500 text-white text-xs font-bold  uppercase rounded px-2 py-1 mx-2 my-1'
                            onClick={() => { unload(item.tabname)} }>Unload</button> 
                </li>)
            })}
            </ol>
            <div className='w-max text-justify' >
                <p>{ data && JSON.stringify(data) }</p>
                <p>{ count }</p>
            </div>
        </div>
    )
} 