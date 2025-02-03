'use client'
import CategoryAnime from "@/components/page/categoryAnime/index";
import { getSeries } from "@/api/movies/series/getSeries";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const MovieNewPage = () => {
    const [page, setPage] = useState(1);
    const { data: moviesCategoryAnime, isLoading: loading } = useQuery({
        queryKey: ["movieSeries", page],
        queryFn: () => getSeries(page),

    });
    console.log("moviesCategoryAnime", moviesCategoryAnime)
    return (
        <div>
            <CategoryAnime data={moviesCategoryAnime} title="Phim bộ" loading={loading} />
            <div className="flex justify-center mt-4">
                <button
                    className="px-4 py-2 bg-orange-500 rounded mr-2"
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <button
                    className="px-4 py-2 bg-orange-500 rounded"
                    onClick={() => setPage(prev => prev + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default MovieNewPage