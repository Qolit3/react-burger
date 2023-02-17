import { ConstructorItem } from "../constructor-item/constructor-item";
import { FunctionComponent } from 'react'
import { IRenderIngredientsProps } from "../../types-and-interfacese/interfaces";

export const RenderIngerdients: FunctionComponent<IRenderIngredientsProps> = ({list}) => {
  const renderIngerdients = () => {
    
    let renderList = [];
    const bun = list.find(item => item.type === 'bun');    
  
    for(let i = 1; i < list.length; i++) {
      const item = list.find(item => item.order === i); 
      if(item) {
        renderList.push(
          <ConstructorItem key={item.key} ingredient={item}/>
        )
      }  
    }

    if(bun) {
      renderList.push(
        <ConstructorItem key={bun.key} ingredient={bun} position={'bottom'}/>
      );
      renderList.unshift(
        <ConstructorItem key={bun.key+1} ingredient={bun} position={'top'}/>
      )
    }

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