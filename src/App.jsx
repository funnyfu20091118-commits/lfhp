import React, { useState } from 'react'
import HlsPlayer from './HlsPlayer'

export default function App(){
  const defaultUrl = 'http://' + window.location.hostname + ':8888/mystream/index.m3u8'
  const [url, setUrl] = useState(defaultUrl)
  return (
    <div className="app">
      <h1>Hello World - HLS Player</h1>
      <p>If you see this, React is working!</p>
      <header>
        <h2>Simple HLS Player</h2>
      </header>
      <main>
        <div className="controls">
          <label>HLS URL</label>
          <input value={url} onChange={e=>setUrl(e.target.value)} />
        </div>
        <HlsPlayer src={url} />
      </main>
      <footer>
        <small>Debug toast shown for HLS events</small>
      </footer>
    </div>
  )
}
