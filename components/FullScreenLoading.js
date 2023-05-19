// ./components/FullScreenLoading.js
export default function FullScreenLoading() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
      }}>
        <p style={{ color: 'white', fontSize: '2rem' }}>Loading...</p>
      </div>
    );
  }
  