import Card from "./components/Card";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Filmlar" value="328" desc="Jami yuklangan kinolar" />
        <Card title="Seriallar" value="94" desc="Jami serial loyihalari" />
        <Card title="Epizodlar" value="1840" desc="Yuklangan epizodlar" />
      </div>

      <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
        <h2 className="text-xl font-semibold mb-4">Yaqinda qo‘shilganlar</h2>

        <div className="space-y-3">
          <div className="flex justify-between border-b border-gray-800 pb-3">
            <p>Avatar 3 – Movie</p>
            <span className="text-gray-500 text-sm">1 soat oldin</span>
          </div>

          <div className="flex justify-between border-b border-gray-800 pb-3">
            <p>My Demon – Serial (S1E12)</p>
            <span className="text-gray-500 text-sm">3 soat oldin</span>
          </div>

          <div className="flex justify-between">
            <p>Kung Fu Panda 4 – Movie</p>
            <span className="text-gray-500 text-sm">5 soat oldin</span>
          </div>
        </div>
      </div>

    </div>
  );
}
