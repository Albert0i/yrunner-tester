import { useState } from 'react'
import { apiGateway } from '../config/apiGateway'
import { useStopwatch } from "react-use-precision-timer"
import { useLocalStorage } from '../hook/useLocalStorage'

export const Test = () => {
    const [tabname, setTabname] = useLocalStorage('tabname', null)
    const [data, setData] = useState()
    const [count, setCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const stopwatch = useStopwatch();

    const getFile = () => {
        if (tabname !== '') {            
            stopwatch.start()
            setIsLoading(true)
            apiGateway.get(`/yr/${tabname}`)
                .then(data => { 
                    setData(data.data) 
                }) 
                .catch (err => {                    
                    setData(err.response.data) 
                })
                .finally(() => {
                    setCount(stopwatch.getElapsedRunningTime())
                    stopwatch.stop()
                    setIsLoading(false)
                })
        } else {
            alert('Please input filename')
        }
    }

    if (isLoading) 
        return (
            <div className='flex justify-center items-center'>
                <div className='text-4xl py-16'>Please wait while loading...</div>
            </div>            
        )

    return (
        <div className='flex-col'>
            <div className='flex justify-start'>
                <div className='w-1/2'>
                    <input type='text' autoFocus placeholder='filename'
                        className='px-2 py-1' defaultValue={tabname}
                        onChange={ e => setTabname(e.target.value)}></input>
                </div>
                <div>
                    <button className='bg-green-700  hover:bg-green-500 text-white text-xs font-bold  uppercase rounded px-6 py-1 mx-2 my-1'
                        onClick={getFile}>Get</button>
                </div>
            </div>
            
            <div className='flex justify-start w-full mt-8'>
                <label htmlFor="output" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Output</label>
            </div>
            <div className='flex justify-start w-full'>
                    <textarea id="output" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    defaultValue={ data?.success? `Finish reading ${data.rows.length} records`
                                    .concat(`\nTime elasped is ${count<1000?count:count/1000} ${count<1000?'ms':'s'} `)
                                    : JSON.stringify(data) } 
                    readOnly={true} >
                </textarea>
            </div>
        </div>
    )
}

/*
   react-use-precision-timer
   https://www.npmjs.com/package/react-use-precision-timer?activeTab=readme

   useTimer
   https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-usetimer--page#timer

   Tailwind CSS Textarea - Flowbite
   https://flowbite.com/docs/forms/textarea/

   HTML <textarea> 表單多行文字輸入欄位
   https://www.fooish.com/html/textarea-tag.html

   Axios | Handling Errors
   https://axios-http.com/docs/handling_errors
*/