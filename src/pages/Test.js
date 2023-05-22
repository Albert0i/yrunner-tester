import { useState } from 'react'
import { apiGateway } from '../config/apiGateway'
import { useStopwatch } from 'react-use-precision-timer'
import { useLocalStorage } from '../hook/useLocalStorage'

export const Test = () => {
  const [tabname, setTabname] = useLocalStorage('tabname', null)
  const [data, setData] = useState()
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const stopwatch = useStopwatch()

  const getFile = () => {
    if (tabname !== '') {
      stopwatch.start()
      setIsLoading(true)
      apiGateway
        .get(`/yr/${tabname}`)
        .then((data) => {
          //setData(data.data)
          const minData = { ...data.data, rows: data.data.rows.length }
          setData(minData)
        })
        .catch((err) => {
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
      <div className="flex items-center justify-center">
        <div className="py-16 text-4xl">Please wait while loading...</div>
      </div>
    )

  return (
    <div className="flex-col">
      <div className="flex justify-start">
        <div className="w-1/2">
          <input
            type="text"
            autoFocus
            placeholder="filename"
            className="w-2/3 px-2 py-1"
            defaultValue={tabname}
            onChange={(e) => setTabname(e.target.value)}
          ></input>
        </div>
        <div>
          <button
            className="mx-2  my-1 rounded bg-green-700 px-6  py-1 text-xs font-bold uppercase text-white hover:bg-green-500"
            onClick={getFile}
          >
            Get
          </button>
        </div>
      </div>

      <div className="mt-8 flex w-full justify-start">
        <label
          htmlFor="output"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Output
        </label>
      </div>
      <div className="flex w-full justify-start">
        <textarea
          id="output"
          rows="6"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          defaultValue={
            data &&
            JSON.stringify(data).concat(
              `\nTime elasped is ${count < 1000 ? count : count / 1000} ${
                count < 1000 ? 'ms' : 's'
              } `
            )
          }
          readOnly={true}
        ></textarea>
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
