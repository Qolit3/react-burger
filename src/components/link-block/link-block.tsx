import { FunctionComponent } from "react"
import { Link, useLocation } from "react-router-dom"
import { ILinkBlockProps } from "../../types_and_interfacese/interfaces"
import { OrderBlock } from "../order-block/order-block"
import styles from './link-block.module.css'

export const LinkBlock: FunctionComponent<ILinkBlockProps> = ({ item, to }) => {
  const location = useLocation();

  return (
    <Link className={styles.link} to={`/${to}/${item._id}`} state={{
      background: location
    }}>
      <OrderBlock item={item} />
    </Link>
  )
}