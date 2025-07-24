const EmptyState = ({ message = 'Data tidak tersedia.' }) => {
  return (
    <div className="w-full bg-white p-6 text-center text-gray-500 text-sm rounded shadow">
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
