import path from "path"
import { getLayout } from "../../components/Layout/BaseLayout/BaseLayout"
import { PageWrapper } from "../../components/PageWrapper/PageWrapper"
import fs from 'fs/promises'

export const getStaticProps = async () => {

    const getParsedDate = async (): Promise<{title:string}> => {
        const filePach = path.join(process.cwd(), 'public', 'staticData.json')
        try {
            const jsonData = await fs.readFile(filePach)
            return JSON.parse(jsonData.toString())
        }catch(err){
            return {
                title: 'NO title'
            }
        }
    }
    const {title} = await getParsedDate()
    return {
        props: {
            title
        }
    }
}

type PropsType = {
    title: string
}

const Characters = (props: PropsType) =>{
    const {title} = props
    return (
        <PageWrapper>
            {title}
        </PageWrapper>
    )
}

Characters.getLayout = getLayout
export default Characters