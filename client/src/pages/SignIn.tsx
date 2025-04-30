export const SignIn = () => {
  return (
    <div className="flex justify-center items-center min-h-150">
      <div className="flex flex-col px-80 py-20 max-w-md w-full border justify-center items-center text-black rounded-2xl">
        
        {" "}
        <h1 className="mb-10  text-2xl">SignIn</h1>
        <div>
        <input className=" border border-black mb-2 px-5 py-2" type="text" placeholder="email" />
        <input className=" border border-black px-5 py-2"type="text" placeholder="password" />
        </div>
        <button className="mt-10 px-3 py-2 border">
            signin 
        </button>
      </div>
     
    </div>
  );
};
