import "../styles/NetChange.css";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";

function NetChange({ change, fontSize }) {
    const iconSize = fontSize.substring(0, fontSize.length - 2);
    const netMargin = iconSize / 2 + "px";
    const rangeTextMargin = iconSize / 4 + "px";

    return (
        <div id="net-change">
            {parseFloat(change) > 0 ? <span style={{color: "green"}}><TbTriangleFilled size={iconSize} /></span> : <span style={{color: "red"}}><TbTriangleInvertedFilled size={iconSize} /></span>}
            <p id="net" style={{ fontSize: fontSize, marginLeft: netMargin }}>{change}% Past</p > <p id="range-text" style={{ fontSize: fontSize, marginLeft: rangeTextMargin }}>Day</p>
        </div >
    );
}

export default NetChange;