import { Container, Content, Profile } from "./styles";
import { Input } from "../../components/Input";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import avatarPlaceHolder from "../../assets/avatar_placeholder.svg";

export function Header() {
  const { signOut, user } = useAuth();
  const navigation = useNavigate();

  function handleSignOut() {
    navigation("/");
    signOut();
  }

  function handleProfile() {
    navigation("/profile");
  }
  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceHolder;

  return (
    <Container>
      <Content>
        <Link to="/" style={{ color: "#FF859B" }}>
          <h1>RocketMovies</h1>
        </Link>

        <Input placeholder="Pesquise pelo título" />
        <Profile>
          <div>
            <strong>{user.name}</strong>
            <span onClick={handleSignOut}>sair</span>
          </div>

          <img src={avatarUrl} alt={user.name} onClick={handleProfile} />
        </Profile>
      </Content>
    </Container>
  );
}
