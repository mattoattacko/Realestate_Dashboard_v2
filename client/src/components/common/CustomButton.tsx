import React from 'react'
import { Button } from '@pankod/refine-mui'

import { CustomButtonProps } from 'interfaces/common' //gives us all the button props we need

const CustomButton = ({ type, title, backgroundColor, color, fullWidth, icon, handleClick, disabled } : CustomButtonProps) => {
  return (
    <Button
      disabled={disabled} //keeps the button disabled on the first page since we can't go backwards
      type={type === 'submit' ? 'submit' : 'button'}
      sx={{
        flex: fullWidth ? 1 : 'unset',
        padding: '10px 15px',
        width: fullWidth ? '100%' : 'fit-content',
        minWidth: 130,
        backgroundColor,
        color,
        fontSize: 16,
        fontWeight: 600,
        gap: '10px',
        textTransform: 'capitalize',
        '&:hover': {
          backgroundColor,
          opacity: 0.9,
        }
      }}
      onClick={handleClick}
    >
      {icon}
      {title}
    </Button>
  )
}

export default CustomButton