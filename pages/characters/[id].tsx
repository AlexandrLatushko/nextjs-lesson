import { GetStaticPaths, GetStaticProps } from "next";
import { API } from "../../assets/api/api";
import { CharacterType, ResponseType } from "../../assets/api/rick-and-morty-api";
import { CharacterCard } from "../../components/Card/CharacterCard/CharacterCard";
import { getLayout } from "../../components/Layout/BaseLayout/BaseLayout";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { useRouter } from "next/router";
import styled from "styled-components";

// Добавляем getStaticPaths
export const getStaticPaths: GetStaticPaths = async () => {
    const characters = await API.rickAndMorty.getCharacters(); // Получаем первые персонажи
    const paths = characters.results.map((character) => ({
        params: { id: String(character.id) },
    }));

    return {
        paths,
        fallback: 'blocking' // Генерировать остальные страницы по запросу
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params || {};
    try {
        const character = await API.rickAndMorty.getCharacter(id as string);
        return { props: { character } };
    } catch (e) {
        return { notFound: true };
    }
};

type PropsType = {
    character: CharacterType;
};

const Character = (props: PropsType) => {

    const { character } = props;

    const router = useRouter()

    if(router.isFallback) return <h1>...Loadind</h1>

    const idCharacter = router.query.id
    const goToCharacters = () => {
        router.push('/characters')
    }
    return (
        <PageWrapper>
            <Container>
                <IdText>ID: {idCharacter}</IdText>
                <CharacterCard key={character.id} character={character} />
                <Button onClick={goToCharacters}>GO TO characters </Button>
            </Container>
        </PageWrapper>
    );
};

Character.getLayout = getLayout;
export default Character;

const IdText = styled.div `
    font-size: 40px;
`
          
const Button = styled.button`
    width: 330px;
    height: 60px;
    border-radius: 4px;
     border: none;
     background: #eaaa34;

     &:hover {
        background: #6f5930;
        color: wheat;
     }
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
`