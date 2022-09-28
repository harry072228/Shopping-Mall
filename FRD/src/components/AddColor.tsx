interface props {
	id: number
	name: string
}

export function AddColor(props: props) {
	return <option value={props.id}>{props.name}</option>
}
