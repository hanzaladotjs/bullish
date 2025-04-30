import { useState } from "react";
export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    console.log("hi");
  };

  return (
    <div className="flex justify-center items-center min-h-150">
      <div className="flex flex-col px-80 py-20 max-w-md w-full border-4 justify-center items-center text-black rounded-2xl">
        {" "}
        <h1 className="mb-10  text-2xl">SignUp</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="mb-2 border-2 px-5 py-2  "
            type="text"
            placeholder="username"
            value={username}
          />
          <input
            className="mb-2 border-2 px-5 py-2"
            type="text"
            placeholder="email"
            value={email}
          />
          <input
            className=" border-2 px-5 py-2"
            type="text"
            placeholder="password"
            value={password}
          />
          <button type="submit" className="mt-10 ml-18 px-3 py-2 border-2">signin</button>
        </form>
        
      </div>
    </div>
  );
};
