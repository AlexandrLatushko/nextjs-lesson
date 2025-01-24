import { LoginNavigate } from "hoc/LoginNavigate"
import { getLayout } from "../../components/Layout/BaseLayout/BaseLayout"
import { PageWrapper } from "../../components/PageWrapper/PageWrapper"
import fs from 'fs/promises'

const Private = () =>{
    return (
        <LoginNavigate>
            <PageWrapper>
               PRIVATE ROUTE-PAGE
            </PageWrapper>
        </LoginNavigate>
    )
}

Private.getLayout = getLayout
export default Private