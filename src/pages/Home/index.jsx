import { useEffect, useState } from "react";
import ReactStars from "react-rating-star-with-type";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  Container,
  Brand,
  NewMovie,
  Content,
  Section,
  Title,
  Rating,
  Description,
  Tags,
  Card,
  Header,
  HeaderContent,
  Profile
} from "./styles";
import { Tag } from "../../components/Tag";
import star from "../../assets/star.svg";
import starFilled from "../../assets/star-filled.svg";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { Input } from "../../components/Input";
import avatarPlaceHolder from "../../assets/avatar_placeholder.svg";
import unidecode from "unidecode";

export function Home() {
  const { signOut, user } = useAuth();
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();


  function handleSignOut() {
    navigate("/");
    signOut();
  }

  function handleProfile() {
    navigate("/profile");
  }
  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceHolder;

  function handleMoviePreview(id) {
    navigate(`/movie-preview/${id}`);
  }

  useEffect(() => {
    async function fetchMovies() {
      const response = await api.get(`/movies?title=`);
      const moviesData = response.data.movieNotesWithTags;
  
      let filteredMovies = moviesData.filter((movie) => {
        const movieTitleWithoutAccents = unidecode(movie.title.toLowerCase());
        const searchWithoutAccents = unidecode(search.toLowerCase());
  
        // Verificar se o título ou alguma tag do filme contém o texto pesquisado
        return (
          movieTitleWithoutAccents.includes(searchWithoutAccents) ||
          movie.tags.some((tag) => {
            const tagWithoutAccents = unidecode(tag.name.toLowerCase());
            return tagWithoutAccents.includes(searchWithoutAccents);
          })
        );
      });
      setMovies(filteredMovies);
    }
    fetchMovies();
  }, [search]);


  return (
    <Container>
      <Header>
        <HeaderContent>
          <Link to="/" style={{ color: "#FF859B" }}>
            <h1>RocketMovies</h1>
          </Link>

          <Input placeholder="Pesquise pelo título ou tag" onChange={(e) => setSearch(e.target.value)} />
          <Profile>
            <div>
              <strong>{user.name}</strong>
              <span onClick={handleSignOut}>sair</span>
            </div>

            <img src={avatarUrl} alt={user.name} onClick={handleProfile} />
          </Profile>
        </HeaderContent>
      </Header>
      <Brand>
        <h1>Meus filmes</h1>
        <NewMovie>
          <Link to="/create-movie">
            <FiPlus />
            Adicionar filme
          </Link>
        </NewMovie>
      </Brand>
      <Content>
        <main>
          {movies?.filter(movie => {
          const movieTitleWithoutAccents = unidecode(movie.title.toLowerCase());
          const searchWithoutAccents = unidecode(search.toLowerCase());
          return movieTitleWithoutAccents.includes(searchWithoutAccents);
        }).map((movie) => (
            <Card onClick={() => handleMoviePreview(movie.id)} key={movie.id}>
              <Section>
                <Title>{movie.title}</Title>
                <Rating>
                  <ReactStars
                    value={movie.rating}
                    filledIcon={<img src={starFilled} width={20} height={20} />}
                    emptyIcon={<img src={star} width={20} height={20} />}
                  />
                </Rating>

                <Description>{movie.description}</Description>

                <Tags>
                  {movie.tags.map((tag) => (
                    <Tag title={tag.name} />
                  ))}
                </Tags>
              </Section>
            </Card>
          ))}
        </main>
      </Content>
    </Container>
  );
}
