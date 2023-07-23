import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { Button } from "../../components/Button";
import { ButtonBack } from "../../components/ButtonBack";
import { MovieItem } from "../../components/MovieItem";
import { Container, Content, Form, Markers, Buttons } from "./styles";
import { api } from "../../services/api";

export function CreateMovie() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  function handleBack() {
    navigate(-1);
  }
  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted));
  }

  async function handleNewNote() {
    if (!title) {
      return alert("Digite o título do filme.");
    }
    if (!rating) {
      return alert("Digite a nota do filme.");
    }
    if (!description) {
      return alert("Digite a descrição do filme.");
    }
    if (newTag) {
      return alert(
        "Você deixou uma tag preenchida. Clique para adicionar ou deixe o campo vazio."
      );
    }

    await api.post("/movies", {
      title,
      rating,
      description,
      tags,
    });
    alert("Filme criado com sucesso");
    handleBack();
  }

  return (
    <Container>
      <Header />
      <Content>
        <main>
          <button onClick={handleBack}>
            <ButtonBack />
          </button>
          <Form>
            <header>
              <h1>Novo filme</h1>
            </header>
            <div>
              <Input
                placeholder="Titulo"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                isNumber
                placeholder="Sua nota (de 0 a 5)"
                onChange={(e) => setRating(e.target.value)}
              />
            </div>

            <Textarea
              placeholder="Observações"
              onChange={(e) => setDescription(e.target.value)}
            />

            <Markers>
              <h2>Marcadores</h2>
              <div className="tags">
                {tags.map((tag, index) => (
                  <MovieItem
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)}
                  />
                ))}
                <MovieItem
                  isNew
                  placeholder="Novo marcador"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onClick={handleAddTag}
                />
              </div>
            </Markers>

            <Buttons>
              <Button title="Salvar alterações" onClick={handleNewNote} style={{maxWidth: 536}} />
            </Buttons>
          </Form>
        </main>
      </Content>
    </Container>
  );
}
