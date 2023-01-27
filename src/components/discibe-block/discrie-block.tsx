import { FunctionComponent } from 'react';
import { IDescribeBlockProps } from '../../types_and_interfacese/interfaces';
import modal from '../modal/modal.module.css';

export const DiscribeBlock: FunctionComponent<IDescribeBlockProps> = ({text, digits}) => {
  return (
    <div>
      <p className={`${modal.text} text_type_main-default text text_color_inactive`}>{text}</p>
      <p className={`${modal.text} text_type_digits-default text text_color_inactive`}>{digits}</p>
    </div>
  )
}