import { memo } from 'react';

import CatItem from './CatItem';
import styles from './styles/catList.module.css';

const CatList = (props) => {
  console.log('list render')

  const { cats, toBuy } = props;
  const allCats = cats.map(cat => (
    <CatItem key={cat.id} {...cat} toBuy={toBuy}/>
  ));
  return (
    <div className={styles.listBlock}>
      {/* <h1>Список кошек</h1> */}
      <div className={styles.allCats}>
        {allCats}
      </div>
    </div>
  )
}
export default memo(CatList);

// мемоизация означает что эта компонента будет перерендериваться
// только когда будут изменяться пропсы для нее

// но тут в пропсах есть функция
// js так устроен что под капотом эта функция создается каждый раз заново
// одна и таже функция но создается каждый раз заново
// по этому react будет думать что пришли новые пропсы
// по этому просто memo тут не поможет
// нужно еще дать понять реакту, что тут будет действительно новая функция далеко не всегда