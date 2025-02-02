'use client'
import CategoryAnime from "@/components/page/categoryAnime/index";
import { getAnimes } from "@/api/movies/anime/getAnime";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const MovieAnimePage = () => {
    const [page, setPage] = useState(1);
    const { data: moviesCategoryAnime, isLoading: loading } = useQuery({
        queryKey: ["movieAnime", page],
        queryFn: () => getAnimes(page),

    });
    console.log("moviesCategoryAnime", moviesCategoryAnime)
    return (
        <div>
            <CategoryAnime data={moviesCategoryAnime} title="Phim hoạt hình" loading={loading} />
        </div>
    )
}

export default MovieAnimePage