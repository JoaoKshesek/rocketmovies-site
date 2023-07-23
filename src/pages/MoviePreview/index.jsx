import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-star-with-type";
import { Header } from "../../components/Header";
import { ButtonBack } from "../../components/ButtonBack";
import { Tag } from "../../components/Tag";
import {
  Container,
  Content,
  MovieHeader,
  MovieHeaderInfo,
  Buttons,
  Rating,
  Info,
  InfoContent,
  Avatar,
  Tags,
  Description,
} from "./styles";
import star from "../../assets/star.svg";
import starFilled from "../../assets/star-filled.svg";
import clock from "../../assets/clock.svg";
import { Button } from "../../components/Button";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import moment from "moment";
import "moment/dist/locale/pt-br";

export function MoviePreview() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const fomatedDate = moment(data?.updated_at)
    .subtract(3, "hours")
    .locale("pt-br")
    .format("LLL");

  function handleBack() {
    navigate(-1);
  }

  function handleUpdateMovie() {
    navigate(`/update-movie/${params.id}`);
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/movies/${params.id}`);
      setData(response.data);
    }
    fetchNote();
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <main>
          <Link onClick={handleBack} style={{ display: "flex", width: 80 }}>
            <ButtonBack />
          </Link>

          {data ? ( // Add conditional rendering here
          <MovieHeader>
            <MovieHeaderInfo>
              <h1>{data?.title}</h1>
              <Rating>
                <ReactStars
                  value={data?.rating}
                  filledIcon={<img src={starFilled} width={20} height={20} />}
                  emptyIcon={<img src={star} width={20} height={20} />}
                />
              </Rating>
            </MovieHeaderInfo>
            <Buttons>
              <Button title="Editar filme" onClick={handleUpdateMovie} />
            </Buttons>
          </MovieHeader>
        ) : (
          // Add a placeholder or loading state here if desired
          <div>Loading...</div>
        )}

        {data && (
          // Add the rest of the content, but only when data is available
          <>
            <Info>
              <InfoContent>
                <Avatar>
                  <img
                    src="https://github.com/JoaoKshesek.png"
                    alt="Foto do usuário"
                  />
                </Avatar>
                Por {user.name}
              </InfoContent>
              <InfoContent>
                <img src={clock} alt="" />
                {fomatedDate}
              </InfoContent>
            </Info>
            <Tags>
              {data?.tags.map((tag) => (
                <Tag key={tag.id} title={tag.name} color="#282124" />
              ))}
            </Tags>
            <Description>{data?.description}</Description>
          </>
        )}
        </main>
      </Content>
    </Container>
  );
}
