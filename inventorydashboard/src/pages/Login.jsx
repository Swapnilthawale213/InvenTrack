import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { userData } from '../data/userdata';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const navigate = useNavigate();
  const { setSessionData } = useSession();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5231/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: id, password }),
      });

      if (!response.ok) {
        alert('Invalid credentials');
        return;
      }

      const data = await response.json();
      const key = Object.keys(data)[0];
      const user = data[key];

      userData[key] = { password, ...user };

      const session = {
        role: user.role,
        zoneId: user.zoneId,
        user: user
      };

      sessionStorage.setItem('sessionData', JSON.stringify(session));
      setSessionData(session);

      navigate(user.role === 'admin' ? '/admin' : '/user');
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('src/assets/image213.png')" }}>
      <div className="flex flex-col md:flex-row w-full h-full">
        <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-8 md:p-16 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">Welcome to InvenTrack</h2>
        </div>

        <div className="md:w-1/2 w-full flex items-center justify-center p-8 md:p-16">
          <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 md:p-10 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-4xl font-bold mb-2 text-center text-white">InvenTrack</h1>
            <h2 className="text-xl font-semibold mb-6 text-center text-white">Sign In</h2>

            <input
              type="text"
              placeholder="User ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="mb-6 p-3 w-full rounded bg-white bg-opacity-30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-6 p-3 w-full rounded bg-white bg-opacity-30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              onClick={handleLogin}
              className="w-full py-3 rounded bg-white text-[#3a7bd5] font-semibold hover:bg-opacity-90 transition"
            >
              Login
            </button>

            <p className="mt-6 text-sm text-center">
              By logging in, you agree to our{' '}
              <button
                onClick={() => setShowTerms(true)}
                className="underline text-white hover:text-gray-300"
              >
                Terms & Conditions
              </button>
            </p>
          </div>
        </div>
      </div>

      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg w-11/12 max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Terms & Conditions</h2>
            <div className="text-sm max-h-60 overflow-y-auto">
              <p>1. You must be authorized to access this system.</p>
              <p>2. Do not share your credentials with others.</p>
              <p>3. All activity is monitored and logged.</p>
              <p>4. Unauthorized access will result in disciplinary action.</p>
              <p>5. Data privacy and security must be maintained at all times.</p>
              <p>6. Use the system responsibly and ethically.</p>
              <p>7. The company reserves the right to modify these terms at any time.</p>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowTerms(false)}
                className="px-4 py-2 bg-[#3a7bd5] text-white rounded hover:bg-[#2a6bb5]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
