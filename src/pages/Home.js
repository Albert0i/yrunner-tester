import { useState, useEffect } from 'react'
import { apiGateway } from '../config/apiGateway'
import { useStopwatch } from 'react-use-precision-timer'
import { useLocalStorage } from '../hook/useLocalStorage'

export const Home = () => {
  const [newTabname, setNewTabname] = useLocalStorage('newTabname', null)
  const [cache, setCache] = useState([])
  const [data, setData] = useState()
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const stopwatch = useStopwatch()

  useEffect(() => {
    getCachedTables()
  }, [])

  const getCachedTables = async () => {
    apiGateway
      .post('/cache/status')
      .then((data) => setCache(data.data))
      .catch((err) => console.log(err))
  }

  const load = (tabname) => {
    if (newTabname !== '') {
      stopwatch.start()
      setIsLoading(true)
      apiGateway
        .post(`/cache/load/${tabname}`)
        .then((data) => {
          setData(data.data)
        })
        .catch((err) => {
          setData(err.response.data)
        })
        .finally(() => {
          setCount(stopwatch.getElapsedRunningTime())
          stopwatch.stop()
          setIsLoading(false)
          getCachedTables()
        })
    } else alert('Please input filename')
  }

  const unload = (tabname) => {
    stopwatch.start()
    setIsLoading(true)
    apiGateway
      .post(`/cache/unload/${tabname}`)
      .then((data) => {
        setData(data.data)
      })
      .catch((err) => {
        setData(err.response.data)
      })
      .finally(() => {
        setCount(stopwatch.getElapsedRunningTime())
        stopwatch.stop()
        setIsLoading(false)
        getCachedTables()
      })
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
            defaultValue={newTabname}
            onChange={(e) => setNewTabname(e.target.value)}
          ></input>
        </div>
        <div>
          <button
            className="mx-2 my-1 rounded bg-green-700 px-4  py-1 text-xs font-bold uppercase text-white hover:bg-green-500"
            onClick={() => {
              load(newTabname)
            }}
          >
            Load
          </button>
        </div>
      </div>

      <div className="mt-4 flex w-full justify-start">
        <label
          htmlFor="output"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Cached items
        </label>
      </div>

      <div>
        {cache.length === 0 && <div className="text-sm">None</div>}
        {cache.length > 0 &&
          cache.map((item) => {
            return (
              <div key={item.tabname} className="flex justify-start">
                <div className="w-1/2">
                  {item.tabname} {item.crtdate} {item.crttime}
                </div>
                <div>
                  <button
                    className="mx-2 my-1 rounded bg-red-700 px-2  py-1 text-xs font-bold uppercase text-white hover:bg-red-500"
                    onClick={() => {
                      unload(item.tabname)
                    }}
                  >
                    Unload
                  </button>
                </div>
              </div>
            )
          })}
      </div>

      <div className="mt-4 flex w-full justify-start">
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
