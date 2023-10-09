interface TextFieldProps {
  type: "text" | "password";
  placeholder: string;
}

const TextField: React.FC<TextFieldProps> = ({ type, placeholder }) => {
  return <input type={type} placeholder={placeholder} className="text-field" />;
};

export default TextField;
