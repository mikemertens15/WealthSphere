interface ButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label }) => {
  return <button className="submit-button">{label}</button>;
};

export default Button;
