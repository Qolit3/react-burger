import { ConstructorItem } from "../constructor-item/constructor-item";
import { v4 as uuidv4} from 'uuid';

export const RenderIngerdients = ({list}) => {
  const renderIngerdients = () => {
    
    let renderList = [];
    const bun = list.find(item => item.type === 'bun');    
  
    for(let i = 1; i< list.length; i++) {
      renderList.push(
        <ConstructorItem key={uuidv4()} ingredient={list.find(item => item.order === i)}/>
      )
    }
  
    renderList.push(
      <ConstructorItem key={uuidv4()} ingredient={bun} position={'bottom'}/>
    )
    renderList.unshift(
      <ConstructorItem key={uuidv4()} ingredient={bun} position={'top'}/>
    )
    
    return renderList;
  }

  if(list.length) {
    return (
      <>
        {
          renderIngerdients()
        }
      </>
    )
  } else {
    return <p className={`text text_type_main-default`}>Заказ пуст</p>
  }
}