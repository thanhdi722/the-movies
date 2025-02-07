"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMovieSlug } from "@/api/movies/[slug]/route";
import { useState } from "react";

export default function AnimePage() {
  const { slug } = useParams();
  const {
    data: moviesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["moviesDetail", slug],
    queryFn: () => getMovieSlug(slug as string),
  });

  // Use the new movie data structure
  const movie = moviesData?.movie;
  const episodes = moviesData?.episodes[0]?.server_data || [];

  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);

  const handleEpisodeClick = (episode: any) => {
    setSelectedEpisode(episode.link_embed);
  };

  const handleWatchNowClick = () => {
    if (episodes.length > 0) {
      setSelectedEpisode(episodes[0].link_embed);
    }
  };
  return (
    <main className="min-h-screen bg-[#121212] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {selectedEpisode ? (
          <div className="space-y-4">
            <iframe
              src={selectedEpisode}
              className="w-full h-[500px] rounded-lg"
              allowFullScreen
              title="Episode Player"
            ></iframe>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {movie?.name} -{" "}
              {
                episodes.find((ep: any) => ep.link_embed === selectedEpisode)
                  ?.name
              }
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Poster and Watch Button */}
            <div className="space-y-4 relative">
              <div className="relative w-full h-0 pb-[50%]">
                <Image
                  src={
                    movie?.thumb_url
                      ? movie.thumb_url
                      : "/path/to/fallback-image.jpg"
                  }
                  alt={movie?.name || "Movie Thumbnail"}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <button
                className="w-full h-10 bg-orange-500 hover:bg-orange-600 text-white absolute bottom-0 left-0 right-0 text-center text-semibold"
                onClick={handleWatchNowClick}
              >
                Xem phim
              </button>
            </div>

            {/* Anime Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {movie?.name}
                </h1>
                <p className="text-gray-400">{movie?.origin_name}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex gap-2 text-gray-300">
                  <span className="text-gray-500">Tập mới:</span>
                  <div className="space-x-2">
                    {episodes.slice(-3).map((ep: any) => (
                      <button
                        key={ep.slug}
                        className="bg-[#ff7a10] text-white px-2 py-1 rounded-md"
                      >
                        {ep.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 text-gray-300">
                  <span className="text-gray-500">Thời lượng:</span>
                  <span>{movie?.time}</span>
                </div>
                <div className="flex gap-2 text-gray-300">
                  <span className="text-gray-500 whitespace-nowrap">
                    Nội dung:
                  </span>
                  <span className="line-clamp-5">{movie?.content}</span>
                </div>
                <div className="flex gap-2 text-gray-300">
                  <span className="text-gray-500">Đang phát:</span>
                  <button className="bg-[#ff7a10] text-white px-2 py-1 rounded-md">
                    {movie?.episode_current}/{movie?.episode_total}
                  </button>
                </div>
              </div>
              {/* Tags */}
              <div className="flex gap-2">
                {movie?.category.map((cat: any) => (
                  <button
                    key={cat.id}
                    className="bg-[#ff7a10] text-white px-2 py-1 rounded-md"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Episode List */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-yellow-500 mb-4 bg-gradient-to-r from-[#ff8a00] to-[#ff2070] bg-clip-text text-transparent box-decoration-clone bg-[#ff7a10]">
            Tập phim
          </h2>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
            {episodes.map((ep: any) => (
              <button
                key={ep.slug}
                onClick={() => handleEpisodeClick(ep)}
                className={`px-2 py-1 rounded-md ${
                  selectedEpisode === ep.link_embed
                    ? "bg-[#ff7a10]"
                    : "bg-gray-500"
                } text-white`}
              >
                {ep.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
