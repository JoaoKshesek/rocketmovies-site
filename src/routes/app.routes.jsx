import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { CreateMovie } from "../pages/CreateMovie";
import { UpdateMovie } from "../pages/UpdateMovie";

import { MoviePreview } from "../pages/MoviePreview";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-movie" element={<CreateMovie />} />
      <Route path="/movie-preview/:id" element={<MoviePreview />} />
      <Route path="/update-movie/:id" element={<UpdateMovie />} />
    </Routes>
  );
}
