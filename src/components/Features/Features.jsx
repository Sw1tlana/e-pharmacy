import style from './Features.module.css';
import Marquee from "react-fast-marquee";
import { icons as sprite } from '../../shared/icons';

function Features() {

  const features = [
    "Take user orders form online",
    "Create your shop profile",
    "Manage your store",
    "Get more orders",
    "Storage shed",
  ];

  return (
    <div className={style.featuresWrapper}>
    <Marquee gradient={false} speed={50} style={{ background: '#F7F8FA' }}>
  {features.concat(features).map((feature, index) => (
    <div
      key={index}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 0",
        background: "#F7F8FA",
        borderRadius: "5px",
        marginRight: "50px",
        fontSize: "16px",
        fontWeight: "600",
        textAlign: "center",
        color: "#1D1E21",
        lineHeight: "1.2",
        whiteSpace: "nowrap",
        letterSpacing: "-0.02%",
      }}
    >
      <div className={style.containerIcon}>
      <svg width={14} height={16} className={style.icon}>
        <use xlinkHref={`${sprite}#icon-lightning`} className={style.iconLightning} />
      </svg>
      </div>
      {feature}
    </div>
  ))}
    </Marquee>
    </div>
  )
};

export default Features;

