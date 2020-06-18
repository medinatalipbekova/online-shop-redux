import React from 'react'
import { useSelector } from 'react-redux'

const Logs = () => {
  const logs = useSelector((store) => store.logsItem.logs)

  return (
    <div className="container w-full mx-auto mt-20 border-t border-2  border-black ">
      {logs.map((el) => (
        <div className="ml-16 mb-2  text-left  text-xl p-4 ">{el.event}</div>
      ))}
    </div>
  )
}

Logs.propTypes = {}

export default React.memo(Logs)
