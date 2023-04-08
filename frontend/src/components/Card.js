import "../styles/Card.css";

function Card({ width, children }) {
  return (
    <div className="Card" style={{ width: width }}>
      <div className="children">
        {children}
      </div>
    </div>
  );
}

export default Card;