import css from "./loading.module.css";
import { Metronome } from 'ldrs/react'
import 'ldrs/react/Metronome.css'

export default function Loading(){
    return(
        <div className={css.loading}>
       <Metronome
  size="40"
  speed="1.6"
  color="black" 
/>
        </div>
    )
}