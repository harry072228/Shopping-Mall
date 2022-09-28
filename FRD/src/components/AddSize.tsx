
interface props {
	id: number
	name: string
}

export function AddSize(props: props) {
	return (
<option value={props.id}>{props.name}</option>
	)
}
