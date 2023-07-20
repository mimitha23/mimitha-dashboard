import CategoryTitle from "./CategoryTitle";

export default function NavListItem({ children, title }) {
  return (
    <li className="edit-nav__list-item">
      <CategoryTitle title={title} />

      {children}
    </li>
  );
}
