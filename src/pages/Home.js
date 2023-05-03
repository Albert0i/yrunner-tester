import { useState, useEffect } from 'react'
import { apiGateway } from '../config/apiGateway'

export const Home = () => {
    const [newTabname, setNewTabname] = useState('')
    const [cache, setCache] = useState([])

    useEffect(()=> {
        apiGateway.post('/cache/status')
            .then(data => setCache(data.data)) 
            .catch(err => console.log(err))
    }, [])

    const load = (tabname) => {
        apiGateway.post(`/cache/load/${tabname}`)
            .then(data => console.log(data)) 
            .catch(err => console.log(err))
    }
    const unload = (tabname) => {
        apiGateway.post(`/cache/unload/${tabname}`)
            .then(data => console.log(data)) 
            .catch(err => console.log(err))
    }

    return (
        <div>
            <input type='text' onChange={ e=> setNewTabname(e.target.value)} autoFocus></input>
            <button onClick={() => { load(newTabname)} }>Load</button>
            <hr/>
            <ol>                    
            { cache.map(item => {
                return (<li key={item.tabname}>
                    { item.tabname } { item.crtdate } { item.crttime }
                    <button onClick={() => { unload(item.tabname)} }>Unload</button> 
                </li>)
            })}
            </ol>
        </div>
    )
} 