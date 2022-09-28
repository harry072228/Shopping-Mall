import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import css from '../styles/SlideFilter.module.css'

export default function Price_filter() {
	return (
		<div >
			<u className={css.filter}>Price_Filter</u>
			<FormGroup className={css.checkbox}>
				<FormControlLabel
                    className={css.checkbox}
					control={<Checkbox defaultChecked />}
					label='$0.00 - $150.00'
				/>
				<FormControlLabel
                    className={css.checkbox}
					control={<Checkbox defaultChecked/>}
					label='$150.00 - $350.00'
                />
				<FormControlLabel
                    className={css.checkbox}
					control={<Checkbox defaultChecked/>}
					label='$150.00 - $450.00'
                />
				<FormControlLabel
                    className={css.checkbox}
					control={<Checkbox defaultChecked/>}
					label='$450.00 +'
                />
			</FormGroup>
		</div>
	)
}

