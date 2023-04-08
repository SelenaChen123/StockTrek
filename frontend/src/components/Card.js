import "../styles/Card.css";

function Card({height, width, children}) {

    return (
      <div className="Card" style={{height : height, width : width}}>
        {children}
      </div>
    );
  }

export default Card;