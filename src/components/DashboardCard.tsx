type Props = {
    title: string;
    description: string;
  };
  
  export default function DashboardCard({ title, description }: Props) {
    return (
      <div className="bg-slate-800 rounded-xl p-5 shadow hover:shadow-lg transition-all duration-200">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    );
  }
  