import "../styles/NetChange.css";
import { IoTriangleSharp } from "react-icons/io5";

function NetChange({ change }) {
    return (
        <div className="row">
            <IoTriangleSharp size={20} />
            <h3 id="net">${change} Past</h3> <h3 id="range-text">Week</h3>
        </div>
    );
}

export default NetChange;