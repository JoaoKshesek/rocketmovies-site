import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { Button } from "../../components/Button";
import { ButtonBack } from "../../components/ButtonBack";
import { MovieItem } from "../../components/MovieItem";
import { Container, Content, Form, Markers, Buttons } from "./styles";
import { api } from "../../services/api";

export function UpdateMovie() {
  const [data, setData] = useState(null);
  const params = useParams();
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
    await api.post(`/movies/update/${params.id}`, {
      title,
      rating,
      description,
      tags,
    });
    alert("Filme editado com sucesso");
    handleBack();
  }

  async function handleRemove() {
    const confirm = window.confirm("Deseja realmente remover o filme?");
    if (confirm) {
      await api.delete(`/movies/${params.id}`)
      navigate(-2);
    }
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/movies/${params.id}`);
      setData(response.data);
      setTitle(response.data.title);
      setRating(response.data.rating);
      setDescription(response.data.description);
      setTags(response.data.tags.map((tag) => tag.name));
    }
    fetchNote();
  }, [params.id]);
  

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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                isNumber
                value={rating}
                placeholder="Sua nota (de 0 a 5)"
                onChange={(e) => setRating(e.target.value)}
              />
            </div>

            <Textarea
              placeholder="Observações"
              defaultValue={description}
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
              <Button title="Excluir filme" onClick={handleRemove}/>
              <Button title="Salvar alterações" onClick={handleNewNote} />
            </Buttons>
          </Form>
        </main>
      </Content>
    </Container>
  );
}
