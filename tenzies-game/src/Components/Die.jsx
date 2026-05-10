export default function (props) {
  const items = props.dice.map((item) => {
    return (
      <button
        key={item.id}
        className={item.isHeld ? "active" : null}
        aria-pressed={item.isHeld}
        aria-label={`Die with value ${item.value}, 
            ${item.isHeld ? "held" : "not held"}`}
        onClick={() => {
          props.hold(item.id);
        }}
      >
        {item.value}
      </button>
    );
  });

  return items;
}
