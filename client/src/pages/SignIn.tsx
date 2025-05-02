import { useState } from "react";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="flex justify-center items-center min-h-150">
      <div className=" border-2 md:border-4 flex  flex-col md:px-80 md:py-20 px-8 py-15 md:max-w-md md:w-full justify-center items-center text-black rounded-2xl">
        {" "}
        <h1 className="mb-5 md:mb-10 md:text-3xl text-2xl">SignIn</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
          <input
            className=" border md:border-2  mb-2 px-4  md:px-5 md:py-2"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className=" border md:border-2   px-4 md:px-5 md:py-2"
            type="text"
            placeholder="password"
            value={password}
          />
          
         
        </form>
        <button
            type="submit"
            className="mt-5 px-3 border md:px-3 md:py-2 rounded-sm "
          >
            signin
          </button>
      </div>
    </div>
  );
};
