const MenuButton = ({ name, link }) => {
  const handleClick = () => {
    // Find the target element using its ID
    const targetElement = document.querySelector(link);

    // Check if the element exists
    if (targetElement) {
      // Scroll to the target element
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mx-4 text-yellow-500 font-bold text-lg hover:text-yellow-200 hover:">
      <button className="hover:underline" onClick={handleClick}>
        {name}
      </button>
    </div>
  );
};

export default MenuButton;
