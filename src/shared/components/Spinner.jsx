export const Spinner = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-main-blue border-t-transparent"></div>
        <p className="text-sm text-gray-400 font-medium">Cargando...</p>
      </div>
    </div>
  );
};
