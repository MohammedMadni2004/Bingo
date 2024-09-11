
const GameComponent = () => {


  return (
    <div>
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',  // Slightly dark overlay
            zIndex: 9999,                       // Above all other elements
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '24px',
            pointerEvents: 'none'               // Prevents any clicks
          }}
        >
          Opponent is playing...
        </div>

      {/* Your game content */}
    </div>
  );
};

export default GameComponent;
