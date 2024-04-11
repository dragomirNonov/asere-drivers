const MenuButton = ({ name, link }) => {
  return (
    <div className="mx-4 text-yellow-500 font-bold text-lg hover:text-yellow-200 hover:">
      <button className="hover:underline">{name}</button>
    </div>
  );
};

export default MenuButton;
