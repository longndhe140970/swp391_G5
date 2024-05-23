const MenuSection = ({ title, children, style }) => {
  return (<>
    <div
      className="py2 w-full sm:w-[250px]"
      style={{
        border: "0.5px #c4c4cf solid",
        borderLeft: "none",
        borderRight: "none",
        ...style,
      }}
    >
      <h3 className="mb-[2px]">{title}</h3>
      <div>{children}</div>
    </div>
  </>);
}

export default MenuSection;