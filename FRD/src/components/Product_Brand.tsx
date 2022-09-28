import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import css from '../styles/SlideFilter.module.css'

export default function Product_Brand() {
	return (
		<div >
			<u className={css.filter}>Product Brand</u>
			<FormGroup className={css.checkbox}>
				<FormControlLabel
                    className={css.checkbox}
					control={<Checkbox defaultChecked />}
					label='Apple'
				/>
				<FormControlLabel
                    className={css.checkbox}
					control={<Checkbox defaultChecked/>}
					label='Samsung'
                />
			</FormGroup>
		</div>
	)
}
