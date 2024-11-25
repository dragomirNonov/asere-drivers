const Picture = ({ pic }) => {
  return (
    <div className="p-2">
      <img src={pic} className="w-auto h-50" alt="pic" />
    </div>
  );
};

export default Picture;
