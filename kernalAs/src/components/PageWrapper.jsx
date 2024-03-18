export default function PageWrapper({ children }) {
  return (
    <>
      <div className="flex pt-4 px-4 sm:ml-64 min-h-screen bg-[#1E293B] ">
        <div className="flex-grow pt-4 px-4 rounded-lg">{children}</div>
      </div>
    </>
  );
}
