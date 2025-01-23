import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import {  LocationType, ResponseType } from "../../assets/api/rick-and-morty-api"
import { Header } from "../../components/Header/Header"
import { PageWrapper } from "../../components/PageWrapper/PageWrapper"
import { API } from "../../assets/api/api"
import { Card } from "../../components/Card/Card"
import { getLayout } from "../../components/Layout/BaseLayout/BaseLayout"

const getLocation = ()=>{
    return fetch('https://rickandmortyapi.com/api/location', {
        method:'GET'
    }).then(res=>res.json())
}

export const getStaticProps = async () => {
    const queryClient = new QueryClient()
    await queryClient.fetchQuery(['locations'], getLocation)
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}

const Locations = () =>{
    const {data: locations} = useQuery<ResponseType<LocationType>>(['locations'], getLocation)
    if(!locations) return null
    const locationsList = locations.results.map(location => (
        <Card key={location.id} name={location.name} />
    ))
    return (
        <PageWrapper>
            {locationsList}
        </PageWrapper>
    )
}
Locations.getLayout = getLayout
export default Locations