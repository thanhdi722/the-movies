import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import Link from "next/link";

const CategoryAnime = ({ data, title, loading }: { data: any, title: string, loading: boolean }) => {
    return (
        <div className="container mx-auto">
            <div className="items-center m-auto text-center">
                <h2 className="text-[24px] uppercase bg-[#ff7a10] leading-[34px] py-[9px] relative bg-gradient-to-r from-[#ff8a00] to-[#ff2070] bg-clip-text text-transparent box-decoration-clone font-[700] m-4">{title}</h2>
            </div>
            {loading ? (
                <div className="flex space-x-4">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="w-full h-[200px] bg-gray-300 animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-wrap grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                    {(data?.data?.items === undefined ? data?.items : data?.data?.items)?.map((anime: any, index: number) => (
                        <Link key={index} href={`/movieDetail/${anime?.slug}`}>
                            <div className="relative hover:scale-105 transition-all duration-300">
                                <Image src={data?.data?.items === undefined ? `${anime?.thumb_url}` : `https://phimimg.com/${anime?.thumb_url}`} alt={anime?.name} width={500} height={200} className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                                    <h2 className="text-white text-lg font-semibold">{anime?.name} - {anime?.episode_current}</h2>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CategoryAnime