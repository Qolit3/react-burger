import modal from '../modal/modal.module.css';

export const DiscribeBlock = ({text, digits}) => {
  return (
    <div>
      <p className={`${modal.text} text_type_main-default text text_color_inactive`}>{text}</p>
      <p className={`${modal.text} text_type_digits-default text text_color_inactive`}>{digits}</p>
    </div>
  )
}