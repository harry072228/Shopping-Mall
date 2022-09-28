import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import css from '../styles/SlideFilter.module.css'

export default function Discount_offer() {
	return (
		<div >
			<u className={css.filter}>Discount Offer</u>
			<FormGroup className={css.checkbox}>
				<FormControlLabel
                    className={css.checkbox}
					control={<Checkbox defaultChecked />}
					label='5% Off'
				/>
				<FormControlLabel
                    className={css.checkbox}
					control={<Checkbox defaultChecked/>}
					label='10% Off'
                />
			</FormGroup>
		</div>
	)
}
