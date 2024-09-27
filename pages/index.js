import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
    >
      <div style={{
        padding: '5px',
        maxWidth: '400px',
        margin: '0 auto',
        marginTop: '200px',
      }}
      >
        <div style={{
          paddingBottom: '180px',
        }}
        >
          <div className="user" style={{ backgroundColor: 'white', color: 'black' }}>
            <h1 style={{ fontWeight: '100' }}>Welcome</h1>
            <h3 style={{ fontWeight: '800' }}> {user.displayName}! </h3>
          </div>
          <br />
          <div className="d-grid gap-3">
            <Link href="/visits/new" passHref>
              <Button variant="light" size="lg">
                Add Visits
              </Button>
            </Link>
            <Link href="/visit" passHref>
              <Button variant="light" size="lg">
                View Visits
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
