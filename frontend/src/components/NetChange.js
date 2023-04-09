import "../styles/NetChange.css";
import { IoTriangleSharp } from "react-icons/io5";

function NetChange({ change, fontSize }) {
    const iconSize = fontSize.substring(0, fontSize.length - 2);
    const netMargin = iconSize / 2 + "px";
    const rangeTextMargin = iconSize / 4 + "px";

    return (
        <div id="net-change">
            <IoTriangleSharp size={iconSize} />
            <p id="net" style={{ fontSize: fontSize, marginLeft: netMargin }}>${change} Past</p > <p id="range-text" style={{ fontSize: fontSize, marginLeft: rangeTextMargin }}>Week</p>
        </div >
    );
}

export default NetChange;