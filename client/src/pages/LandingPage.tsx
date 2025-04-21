import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <div className="pl-5 flex justify-center items-center min-h-150 md:text-5xl text-2xl text-slate-300">
        "welcome to bullish, a minimal blog-app.<br></br>
        we only care about <br></br>
        knowledge not styling"
      </div>
      <div className="flex justify-center items-center margin-0">
      <button className="px-6 py-2 bg-green-100 text-black rounded-full hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150">
        <Link to="/explore"> Explore </Link>
      </button>
      </div>
    </div>
  );
};
export default LandingPage;
