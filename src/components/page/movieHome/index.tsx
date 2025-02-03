import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import Link from "next/link";


const MovieAnime = ({ data, title, loading, linkPath }: { data: any, title: string, loading: boolean, linkPath: string }) => {
    const CONFIG: SwiperOptions = {
        loop: false,
        speed: 1000,
        autoplay: {
            delay: 3000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },
        modules: [Autoplay, Navigation],
        navigation: {
            nextEl: '.sale-slide-control .swiper-control-btn.swiper-next',
            prevEl: '.sale-slide-control .swiper-control-btn.swiper-prev',
        },
        grabCursor: true,
        spaceBetween: 10,
        slidesPerView: 2,
        breakpoints: {
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
            },
        },
    }
    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-[15px] uppercase bg-[#ff7a10] leading-[34px] py-[9px] relative bg-gradient-to-r from-[#ff8a00] to-[#ff2070] bg-clip-text text-transparent box-decoration-clone font-[700] m-4">{title}</h2>
                <Link href={linkPath} className="text-[15px] uppercase bg-[#ff7a10] leading-[34px] py-[9px] relative bg-gradient-to-r from-[#ff8a00] to-[#ff2070] bg-clip-text text-transparent box-decoration-clone font-[700] m-4">Xem tất cả</Link>
            </div>
            {loading ? (
                <div className="flex space-x-4">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="w-full h-[200px] bg-gray-300 animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <Swiper
                    {...CONFIG}
                >
                    {data?.data?.items === undefined ? data?.items.map((anime: any) => (
                        <SwiperSlide key={anime.title}>
                            <Link href={`/movieDetail/${anime?.slug}`}>
                                <div className="relative hover:scale-105 transition-all duration-300">
                                    <Image src={`${anime?.thumb_url}`} alt={anime?.name} width={500} height={200} className="w-full h-full object-cover" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                                        <h2 className="text-white text-lg font-semibold ">{anime?.name} - {anime?.episode_current}</h2>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    )) : data?.data?.items.map((anime: any) => (
                        <SwiperSlide key={anime.title}>
                            <Link href={`/movieDetail/${anime?.slug}`}>
                                <div className="relative hover:scale-105 transition-all duration-300">
                                    <Image src={`https://phimimg.com/${anime?.thumb_url}`} alt={anime?.name} width={500} height={200} className="w-full h-full object-cover" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                                        <h2 className="text-white text-lg font-semibold ">{anime?.name} - {anime?.episode_current}</h2>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    )
}

export default MovieAnime