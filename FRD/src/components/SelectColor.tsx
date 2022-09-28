import { FormControlLabel, Radio } from '@mui/material'

import detail from '../styles/detailBox.module.css'

interface props {
	name: string
}

export function SelectColor(props: props) {
	return (
		<div>
			<FormControlLabel
				value={props.name}
				control={<Radio />}
				label={props.name}
			/>
		</div>
	)
}
