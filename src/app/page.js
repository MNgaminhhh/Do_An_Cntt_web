import Image from 'next/image'
import classes from './page.module.css'
import Featured from '@/components/Featured/featured'
import CardList from '@/components/CardList/cardList'
import Menu from '@/components/Menu/menu'
import CategoryList from '@/components/CategoryList/categoryList'

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
