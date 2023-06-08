function DeskShop(props) {
  const { desks: deskItems } = props;

  if (!deskItems) {
    return <p>No Items</p>;
  }

  return (
    <ul>
      {deskItems.map((desk) => (
        <li key={desk.name}>{desk.name}</li>
      ))}
    </ul>
  );
}

export default DeskShop;
