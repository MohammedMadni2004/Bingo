
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
            backgroundColor: 'rgba(0,0,0,0.5)',  
            zIndex: 9999,                       
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '24px',
            pointerEvents: 'none'            
          }}
        >
          Opponent is playing...
        </div>

    </div>
  );
};

export default GameComponent;
