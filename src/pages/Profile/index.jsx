import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ButtonBack } from "../../components/ButtonBack";
import { Container, Content, Avatar, Form } from "./styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import avatarPlaceHolder from "../../assets/avatar_placeholder.svg";

export function Profile() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceHolder;
  const [avatar, setAvatar] = useState(avatarUrl);
  const [avatarFile, setAvatarFile] = useState(null);

  async function handleUpdateProfile() {
    const updated = {
      name,
      email,
      newPassword: newPassword,
      old_password: oldPassword,
    };
    const userUpdated = Object.assign(user, updated);
    await updateProfile({ user: userUpdated, avatarFile });
  }

  async function handleChangeAvatar(event) {
    const file = event.target.files[0];
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }

  return (
    <Container>
      <header>
        <Content>
          <button type="button" onClick={handleBack}>
            <ButtonBack />
          </button>
        </Content>
      </header>

      <Form>
        <Avatar>
          <img src={avatar} alt="Foto do usuário" />
          <label htmlFor="avatar">
            <FiCamera />
            <input id="avatar" type="file" onChange={handleChangeAvatar} />
          </label>
        </Avatar>
        <Input
          value={name}
          placeholder="Nome"
          type="text"
          icon={FiUser}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          value={email}
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Senha atual"
          type="password"
          icon={FiLock}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Input
          placeholder="Nova senha"
          type="password"
          icon={FiLock}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Button title="Salvar" onClick={handleUpdateProfile} />
      </Form>
    </Container>
  );
}
