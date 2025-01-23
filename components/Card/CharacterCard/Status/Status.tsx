import { CharacterStatusType } from "assets/api/rick-and-morty-api"
import Image, { StaticImageData } from "next/image"

type propsType = {
    status:CharacterStatusType
    src: StaticImageData
}

export const Status = (props: propsType) => {
const {status, src} = props
    return (
        <>
              <Image src={src} alt="img" width={20}/>
        </>
    )
}