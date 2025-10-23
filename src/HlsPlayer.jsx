import React, { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'

function useToasts(){
  const [toasts, setToasts] = useState([])
  function push(text, level='info'){
    const id = Date.now() + Math.random()
    setToasts(t=>[{id,text,level}, ...t])
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)), 5000)
  }
  return { toasts, push }
}

export default function HlsPlayer({ src }){
  const videoRef = useRef(null)
  const hlsRef = useRef(null)
  const { toasts, push } = useToasts()
  const [playing, setPlaying] = useState(false)

  useEffect(()=>{
    const video = videoRef.current
    if(!video) return

    // Cleanup existing
    if(hlsRef.current){
      hlsRef.current.destroy()
      hlsRef.current = null
    }

    if(Hls.isSupported()){
      const hls = new Hls({  })
      hlsRef.current = hls
      hls.attachMedia(video)
      hls.on(Hls.Events.MEDIA_ATTACHED, ()=>{
        push('Media element attached')
        hls.loadSource(src)
      })
      hls.on(Hls.Events.MANIFEST_PARSED, ()=>{
        push('Manifest parsed')
        video.play().then(()=>setPlaying(true)).catch(e=>push('Auto-play blocked'))
      })
      hls.on(Hls.Events.ERROR, (ev, data)=>{
        const {type, details, fatal} = data
        push(`HLS error: ${type} / ${details} ${fatal? '(fatal)':''}`,'error')
        if(fatal){
          switch(data.type){
            case Hls.ErrorTypes.NETWORK_ERROR:
              push('Network error, trying to recover...','warning')
              hls.startLoad()
              break
            case Hls.ErrorTypes.MEDIA_ERROR:
              push('Media error, trying to recover...','warning')
              hls.recoverMediaError()
              break
            default:
              hls.destroy()
              break
          }
        }
      })
    }else if(video.canPlayType('application/vnd.apple.mpegurl')){
      video.src = src
      video.addEventListener('loadedmetadata', ()=>{
        push('Native HLS loaded')
        video.play().then(()=>setPlaying(true)).catch(()=>push('Auto-play blocked'))
      })
    }else{
      push('HLS not supported in this browser','error')
    }

    return ()=>{
      if(hlsRef.current){
        hlsRef.current.destroy()
        hlsRef.current = null
      }
    }
  },[src])

  return (
    <div className="player">
      <video ref={videoRef} controls style={{width:'100%',maxWidth:800,background:'#000'}} />
      <div className="toasts">
        {toasts.map(t=> (
          <div key={t.id} className={`toast ${t.level}`}>{t.text}</div>
        ))}
      </div>
    </div>
  )
}
