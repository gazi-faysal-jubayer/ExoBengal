import { LiquidButton } from "../ui/liquid-glass-button";
import ButtonSvg from "../assets/svg/ButtonSvg";

const Button = ({ className, href, onClick, children, px, white }) => {
  const spanClasses = "relative z-10";

  const renderButton = () => (
    <LiquidButton className={className} onClick={onClick}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
    </LiquidButton>
  );

  const renderLink = () => (
    <LiquidButton asChild className={className}>
      <a href={href}>
        <span className={spanClasses}>{children}</span>
        {ButtonSvg(white)}
      </a>
    </LiquidButton>
  );

  return href ? renderLink() : renderButton();
};

export default Button;
