import express from 'express'
import path from 'path'
import axios from 'axios'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const { readFile, writeFile } = require('fs').promises

const data = require('./data.js')

const Root = () => ''

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

const write = async (logsList) => {
  await writeFile(`${__dirname}/logs.json`, JSON.stringify(logsList, 1, 2), {
    encoding: 'utf8'
  })
}

const read = () => {
  return readFile(`${__dirname}/logs.json`, { encoding: 'utf8' })
    .then((result) => {
      return JSON.parse(result)
    })
    .catch(() => [])
}
server.post('/api/v1/logs', async (req, res) => {
  const logs = await read()
  let updatedLogs = []
  if (req.body.type === 'ADD_TO_SELECTION') {
    updatedLogs = [
      ...logs,
      {
        time: +new Date(),
        event: `Add ${data.find((el) => el.id === req.body.id).title} to the basket`
      }
    ]
  }
  if (req.body.type === 'REMOVE_FROM_SELECTION') {
    updatedLogs = [
      ...logs,
      {
        time: +new Date(),
        event: `Remove ${data.find((el) => el.id === req.body.id).title} to the basket`
      }
    ]
  }
  if (req.body.type === 'UPDATE_SORT_TYPE') {
    updatedLogs = [...logs, { time: +new Date(), event: `Sorts changed to ${req.body.newType} ` }]
  }
  if (req.body.type === 'CURRENT_PAGE') {
    updatedLogs = [...logs, { time: +new Date(), event: `Page changed to ${req.body.page}` }]
  }
  if (req.body.type === 'SET_BASE') {
    updatedLogs = [...logs, { time: +new Date(), event: `Currency changed to ${req.body.base}` }]
  }
  await write(updatedLogs)
  res.json({ status: 'successfully' })
})

server.get('/api/v1/products', (req, res) => {
  res.json(data)
})

server.get('/api/v1/logs', async (req, res) => {
  const logs = await read('logs')
  res.json(logs)
})

server.get('/api/v1/rates', async (req, res) => {
  const { data: rates } = await axios('https://api.exchangeratesapi.io/latest?symbols=USD,CAD')
  res.json(rates)
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'yourproject - Become an IT HERO'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})
    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
