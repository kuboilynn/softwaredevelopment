import React from "react";
import '../pages/styles/StatsCard.css';

const StatsCard = ({title,count})=>{
    return(
        <div className="stats-card">
            <h3>{title}</h3>
            <p>{count}</p>
        </div>
    )
}
export default StatsCard;