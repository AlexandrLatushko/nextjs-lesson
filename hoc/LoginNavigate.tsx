import { useRouter } from "next/router"
import { FC, PropsWithChildren } from "react"

export const LoginNavigate: FC<PropsWithChildren> = ({children}) => {
    
    const  router = useRouter()
    const isAuth = false // запрос за дынными пользователя (например с помощью useSelector(stste=>state.auth.isAuth)) так можно сделать только на клиентской стороне 
    if(isAuth) router.push('/test')
        
    return <>{children}</>
}