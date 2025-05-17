
import { signOut } from "next-auth/react";

const Navbar = () => {
    return (<div className="flex justify-between"> <h1 className="text-gray-900 p-3">Project Management App</h1>
        <button className="bg-gray-500 py-3 px-3 rounded-b-md hover:bg-gray-900 text-white cursor-pointer" onClick={() => void signOut()}>Logout</button>
    </div>)
}
export default Navbar;