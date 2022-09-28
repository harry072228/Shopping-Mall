import { useForm } from 'react-hook-form'



interface Props {
    username: string
    email: string
    icon: string
    nickname: string
}



export default function EditUserProfileForm() {

    const { register } = useForm()

    


    return  (
        <>
    <input type="file" placeholder="icon"  {...register('icon')} />
    <input type="text" placeholder="nickname"  {...register('nickname')} />

     </>

    )
}