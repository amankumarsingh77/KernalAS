export default function BotWrapper({ children }) {
  return (
    <>
      <div className="rounded-lg">
        <div className="flex flex-row items-center">
          <div className="flex items-center justify-center h-10 w-10 rounded-full rounded-bl-none bg-black text-white flex-shrink-0">
            B
          </div>
          <div className="ml-3 text-sm bg-[#3d4653] py-2 px-4 shadow-lg rounded-xl rounded-bl-none text-white">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
