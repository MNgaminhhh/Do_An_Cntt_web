import Image from 'next/image'
import classes from './page.module.css'
import Featured from '@/components/Featured/Featured'
import CardList from '@/components/CardList/CardList'
import Menu from '@/components/Menu/Menu'
import CategoryList from '@/components/CategoryList/CategoryList'

export default function Home() {
  return (
    <div className={classes.container}>
      <Featured></Featured>
      <CategoryList></CategoryList>
      <div className={classes.content}>
        <CardList></CardList>
        <Menu></Menu>
      </div>
    </div>
  )
}
