import { useEffect, useState } from 'react';
import styles from './Favourites.module.scss';
import { getDataPublic } from '../../shared/functions/functions';
import { Article } from '../../shared/types/Article';
import { Product } from '../../shared/Product';
import { useStorage } from '../../context/StorageContext';
import { useWindowWidth } from '../../hooks/WindowWidth';
import { NavAdress } from '../../shared/NavAdress';

export const Favourites: React.FC = () => {
  const { favouritesItems } = useStorage();
  const [products, setProducts] = useState<Article[] | null>(null);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    getDataPublic('products', 10).then((response: Article[]) => {
      const favouritesProducts = response.filter((el: Article) =>
        favouritesItems.includes(el.itemId),
      );

      setProducts(favouritesProducts);
    });
  }, [favouritesItems]);

  return (
    <div className={styles.favourites}>
      {products ? (
        <div className={styles.favourites__content}>
          <NavAdress />
          <h1 className={styles.favourites__title}>Favourites</h1>
          <p
            className={styles.favourites__count}
          >{`${favouritesItems.length} items`}</p>

          <div className={styles.favourites__list}>
            {products.map((product: Article) => {
              return (
                <div key={product.id} className={styles.favourites__wrapper}>
                  <Product isCatalog={windowWidth < 640} article={product} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>There are no favourites</p>
      )}
    </div>
  );
};
