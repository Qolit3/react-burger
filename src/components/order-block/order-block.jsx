import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import { useSelector } from "react-redux"
import styles from './order-block.module.scss'


export const OrderBlock = ({ item }) => {
  const allIngredients = useSelector(store => store.allIngredients.ingredients)

  let totalPrice = 0;
  totalPrice = item.ingredients.reduce((sum, current) => {
    const ingredient = allIngredients.find((item) => item._id === current)
    if (ingredient) { return sum + ingredient.price }
    return sum
  }, 0)

  let bunIsAdded = false;
  let isALot = false;
  let howLot = 0

  const renderImages = item.ingredients.map((current, index) => {
    if (current === null || current === undefined) { return undefined }
    if (index >= 5) {
      if (isALot) {
        howLot += 1;
        return undefined
      }
      isALot = true;
    }

    const ingredient = allIngredients.find((item) => item._id === current)
    const order = item.ingredients.length - index;


    if (ingredient.type === 'bun') {
      if (bunIsAdded) { return undefined }
      bunIsAdded = true;
    }

    if (ingredient) {
      return (
        <div key={index} style={{ zIndex: order }} className={styles.image_block}>
          <img alt="ингредиент бургера" className={styles.image} src={ingredient.image} />
        </div>
      )
    }
    return undefined
  })


  return (
    <div className={`${styles.block} mb-4`}>
      <div className={styles.block_line}>
        <p className="text text_type_digits-default">{`#${item.number}`}</p>
        <FormattedDate className="text text_type_main-small text_color_inactive" date={new Date(item.updatedAt)} />
      </div>
      <h3 className="text text_type_main-default">{item.name}</h3>
      <div className={styles.block_line}>
        <div className={styles.images_row}>
          {renderImages}
          {isALot ? <p className={`${styles.count} text text_type_main-small`}>+{howLot}</p> : undefined}
        </div>
        <div className={styles.price_block}>
          <p className='text text_type_digits-default mr-2'>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}