import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div>
      <Link to="/">home</Link>
      <Link to="/auth/login">login</Link>
    </div>
  );
}
