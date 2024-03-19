export function Spinner() {
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-95">
      <div className="border-4 border-solid border-gray-200 border-t-4 h-12 w-12 rounded-full animate-spin mr-2"></div>
      <p className="text-white">Buscando o video</p>
    </div>
  );
}
