"use client";
import Link from "next/link";
import { Search } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getSearch } from "@/api/movies/search/search";

const Header = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: moviesSearch, isLoading: loading } = useQuery({
    queryKey: ["movieSearch", searchTerm],
    queryFn: () => getSearch(searchTerm, 10),
  });

  const dataSearch = moviesSearch?.data?.items;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {" "}
      <nav className="bg-black p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-red-500 text-2xl font-bold">
            THE MOVIES
          </Link>
          <div className="flex items-center space-x-6">
            <div className="relative" ref={searchRef}>
              <input
                type="search"
                placeholder="Nhập tên phim cần tìm..."
                className="w-[300px] px-4 py-2 bg-gray-800 rounded-md text-sm"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSearchResults(true);
                }}
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />

              {loading && (
                <div className="absolute bg-gray-800 w-full mt-1 rounded-md shadow-lg z-10">
                  <p className="text-center text-white py-2">Loading...</p>
                </div>
              )}

              {showSearchResults &&
                !loading &&
                dataSearch &&
                dataSearch.length > 0 && (
                  <div className="absolute bg-gray-800 w-full mt-1 rounded-md shadow-lg z-10">
                    <ul>
                      {dataSearch?.slice(0, 4).map((movie: any, index: any) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-orange-500 transition-all duration-300"
                        >
                          <Link
                            href={`/movieDetail/${movie?.slug}`}
                            className="flex"
                          >
                            <Image
                              src={
                                moviesSearch?.data?.items === undefined
                                  ? `${moviesSearch?.thumb_url}`
                                  : `https://phimimg.com/${movie?.thumb_url}`
                              }
                              alt={movie.name}
                              className="w-30 h-14 rounded-md"
                              width={100}
                              height={100}
                            />

                            <p className="text-base font-medium text-white ml-2">
                              {movie?.name}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-4">
          <div className="flex space-x-6 text-gray-400">
            <Link href="/" className="hover:text-white">
              Trang chủ
            </Link>
            <Link href="/movie-new" className="hover:text-white">
              Phim mới cập nhật
            </Link>
            <Link href="/movie-anime" className="hover:text-white">
              Phim hoạt hình
            </Link>
            <Link href="/movie-series" className="hover:text-white">
              Phim bộ
            </Link>
            <Link href="/movie-odd" className="hover:text-white">
              Phim lẻ
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
