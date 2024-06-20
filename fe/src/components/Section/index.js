const Section = ({ title, underline = true, children, ...props }) => {
  return (
    <>
      <div className="max-w-[960px] mx-auto relative pb-[20px]">
        <div className="px-4 py-8 mb-[30px]">
          <h2 className="pt-6 mt-20 text-3xl font-semibold text-center text-sky-950">
            {title}
          </h2>
          {underline && (
            <hr className="mx-auto mt-3 bg-yellow-400 w-[50px] h-[2.5px]" />
          )}
        </div>
        {children}
      </div>
    </>
  );
};

export default Section;