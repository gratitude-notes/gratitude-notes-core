const Dashboard: React.FC = () => {  
  return (
    <div className="h-screen bg-green-300 dark:bg-slate-600">
      {/* button 1 will be inline at all screen sizes */}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        button 1</button>

      {/* button 2 will be hidden at all screen sizes below 640px but then visible at anything above */}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                          hidden sm:inline">
        button 2</button>

        {/* button 3 will be inline 0-640px, hidden 640px-768px, inline at anything above 768px */}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                          inline sm:hidden md:inline">
        button 3</button>
    </div>
  )
}

export default Dashboard;