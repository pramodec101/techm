import "./InfoBox.scss";

const InfoBox = ({ bgColor, title, icon }) => {
  return (
    <div className={`info-box ${bgColor}`}>
      <span className="info-icon --color-white">{icon}</span>
      <span className="info-text">
        <p>{title}</p>
      </span>
    </div>
  );
};

export default InfoBox;
