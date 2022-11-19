import { Link } from 'react-router-dom';

type ButtonProps = {
	text: string;
	url: string;
};

const Button = ({ text, url }: ButtonProps) => (
  <Link to={url}>
    <div className="hover:bg-red-800 pr-2 pl-2 text-center rounded-2xl flex items-center justify-center text-2xl">
      <div>
        {text}
      </div>
    </div>
  </Link>
);

export default Button;
