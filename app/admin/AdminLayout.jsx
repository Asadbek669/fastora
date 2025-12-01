import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex bg-black text-white h-screen">

      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 bg-[#0d0d0d] overflow-y-auto">
        <Sidebar />
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar sticky */}
        <div className="sticky top-0 z-20 bg-[#0d0d0d] border-b border-white/10">
          <Topbar />
        </div>

        {/* SCROLLABLE Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

      </div>
    </div>
  );
}
