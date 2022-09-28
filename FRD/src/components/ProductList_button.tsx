
import { styled } from '@mui/material/styles';
import { ButtonProps } from '@mui/material/Button';
import { purple } from '@mui/material/colors';


export default function Button(){
    return (
        <ColorButton href='/products' className='btn'>
                Details
        </ColorButton>
    )
}

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));