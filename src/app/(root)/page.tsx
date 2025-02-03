'use client'
import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getAnimes } from "@/api/movies/anime/getAnime";
import { getOdd } from "@/api/movies/odd/getOdd";
import { getSeries } from "@/api/movies/series/getSeries";
import { getMovies } from "@/api/movies/routes";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import MovieHome from "@/components/page/movieHome";

export default function Home() {
  const [page, setPage] = useState(1);

  const { data: moviesAnime, isLoading: loading } = useQuery({
    queryKey: ["movieAnime", page],
    queryFn: () => getAnimes(page),
  });
  const { data: moviesOdd, isLoading: loadingOdd } = useQuery({
    queryKey: ["movieOdd", page],
    queryFn: () => getOdd(page),
  });
  const { data: moviesNew, isLoading: loadingNew } = useQuery({
    queryKey: ["movieNew", page],
    queryFn: () => getMovies(page),
  });
  const { data: series, isLoading: loadingSeries } = useQuery({
    queryKey: ["series", page],
    queryFn: () => getSeries(page),
  });
  console.log("moviesAnime", moviesAnime)
  return (
    <main className="min-h-screen bg-[#121212]">
      <MovieHome data={moviesNew} title="Phim mới cập nhật" loading={loadingNew} linkPath="/movie-new" />
      <MovieHome data={moviesAnime} title="Phim hoạt hình" loading={loading} linkPath="/movie-anime" />
      <MovieHome data={moviesOdd} title="Phim lẻ" loading={loadingOdd} linkPath="/movie-odd" />
      <MovieHome data={series} title="Phim bộ" loading={loadingSeries} linkPath="/movie-series" />
    </main>
  )
}

