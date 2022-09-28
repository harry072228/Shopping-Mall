import Image from 'next/image'
import user from '../styles/User.module.css'

interface props {
    name: string
    icon: string
}

export function UserBox(props: props) {
    return (
        <div className="userBox">
            
            
            <div  className={user.username}  >{props.name}</div>
            <div   className={user.iconDiv} >
                <Image  className={user.userIcon}  src={`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/userUploadedFiles/${props.icon}`} width={150} height={150} />
            </div>
            
        </div>
    )
}