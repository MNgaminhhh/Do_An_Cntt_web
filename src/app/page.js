import Image from 'next/image'
import classes from './page.module.css'
import featured from '@/components/Featured/featured'

export default function Home() {
  return (
    <div className={classes.container}>
      <featured></featured>
    </div>
  )
}
