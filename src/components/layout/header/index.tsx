import Link from "next/link";
import { Search } from "lucide-react";

const Header = () => {
    return <div>  <nav className="bg-black p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-red-500 text-2xl font-bold">
                THE MOVIES
            </Link>
            <div className="flex items-center space-x-6">
                <div className="relative">
                    <input
                        type="search"
                        placeholder="Nhập tên phim cần tìm..."
                        className="w-[300px] px-4 py-2 bg-gray-800 rounded-md text-sm"
                    />
                    <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
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
    </nav></div>
}

export default Header