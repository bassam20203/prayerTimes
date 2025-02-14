// eslint-disable-next-line react/prop-types
export default function Player({ name, time }) {
  return (
    <div className="bg-amber-700 flex justify-between items-center px-4 py-2 text-white mb-3 w-155 rounded-2xl font-semibold text-lg">
      <p className="time_prayer">{time}</p>
      <p className="name_prayer">{name}</p>
    </div>
  );
}
