import { ArrowRight } from "lucide-react";

export default function Page() {
  return (
    <div className="bg-black text-white">
      {/* Main Content */}
      {/* <main className="mx-auto max-w-7xl px-4 py-16 text-center">
                <h1 className="mb-8 text-2xl font-medium sm:text-3xl">
                    Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách thành viên của bạn.
                </h1>

                <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:gap-2">
                    <input
                        type="email"
                        placeholder="Địa chỉ email"
                        className="h-12 flex-1 bg-[#1a1a1a] px-4 text-white placeholder:text-gray-400"
                    />
                    <button className="h-12 bg-red-600 px-8 text-lg font-medium hover:bg-red-700">
                        Bắt đầu
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </main> */}

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-800 bg-black/50 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-8">
            <a href="#" className="text-gray-400 hover:underline">
              Bạn có câu hỏi? Liên hệ với chúng tôi.
            </a>
          </p>

          <div className="grid grid-cols-2 gap-8 text-sm text-gray-400 sm:grid-cols-3 lg:grid-cols-4">
            <div className="space-y-4">
              <a href="#" className="block hover:underline">
                Câu hỏi thường gặp
              </a>
              <a href="#" className="block hover:underline">
                Quan hệ với nhà đầu tư
              </a>
              <a href="#" className="block hover:underline">
                Quyền riêng tư
              </a>
              <a href="#" className="block hover:underline">
                Kiểm tra tốc độ
              </a>
            </div>

            <div className="space-y-4">
              <a href="#" className="block hover:underline">
                Trung tâm trợ giúp
              </a>
              <a href="#" className="block hover:underline">
                Việc làm
              </a>
              <a href="#" className="block hover:underline">
                Tùy chọn cookie
              </a>
              <a href="#" className="block hover:underline">
                Thông báo pháp lý
              </a>
            </div>

            <div className="space-y-4">
              <a href="#" className="block hover:underline">
                Tài khoản
              </a>
              <a href="#" className="block hover:underline">
                Các cách xem
              </a>
              <a href="#" className="block hover:underline">
                Thông tin doanh nghiệp
              </a>
              <a href="#" className="block hover:underline">
                Chỉ có trên Netflix
              </a>
            </div>

            <div className="space-y-4">
              <a href="#" className="block hover:underline">
                Trung tâm đa phương tiện
              </a>
              <a href="#" className="block hover:underline">
                Điều khoản sử dụng
              </a>
              <a href="#" className="block hover:underline">
                Liên hệ với chúng tôi
              </a>
            </div>
          </div>

          <div className="mt-8">
            <select className="bg-black px-4 py-2 text-sm text-white border border-gray-700 rounded">
              <option>Tiếng Việt</option>
              <option>English</option>
            </select>
          </div>

          <p className="mt-8 text-sm text-gray-400">The Movies</p>
        </div>
      </footer>
    </div>
  );
}
