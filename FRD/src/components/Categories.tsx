import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import css from '../styles/SlideFilter.module.css'


export default function Categories() {
	return (
		<div >
			<u className={css.filter}>Categories</u>
			<FormGroup className={css.checkbox}>
				<FormControlLabel
                    className={css.checkbox}
					control={<Checkbox defaultChecked />}
					label='Pretashop'
				/>
				<FormControlLabel
                    className={css.checkbox}
					control={<Checkbox defaultChecked/>}
					label='Watch'
                />
                <FormControlLabel
                    className={css.checkbox}
					control={<Checkbox defaultChecked/>}
					label='Charlers'
                />
                <FormControlLabel
                    className={css.checkbox}
					control={<Checkbox defaultChecked/>}
					label='Fung'
                />
			</FormGroup>
		</div>
	)
}
