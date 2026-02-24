import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ANPR = () => {
  const [detecting, setDetecting] = useState(false);
  const [detection, setDetection] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [customerWebsiteUrl, setCustomerWebsiteUrl] = useState('');
  const [formData, setFormData] = useState({
    plate_number: '',
    province: '',
    vehicle_type: 'Saloon',
    name: '',
    phone: ''
  });
  const navigate = useNavigate();

  const handleDetect = async () => {
    setDetecting(true);
    try {
      const response = await axios.post('/api/anpr/detect', {
        image_url: 'mock_image_url',
        camera_id: 'CAM-001'
      });
      setDetection(response.data);
      setFormData({
        ...formData,
        plate_number: response.data.plate_number,
        province: response.data.province
      });
      
      if (response.data.existing_customer) {
        // Generate customer website URL with plate number
        const customerUrl = `${window.location.protocol}//${window.location.hostname}:5174/?plate=${response.data.plate_number}`;
        setCustomerWebsiteUrl(customerUrl);
        
        toast.success(`Welcome back, ${response.data.existing_customer.name}!`, {
          duration: 4000
        });
      } else {
        setShowRegister(true);
      }
    } catch (error) {
      toast.error('ANPR detection failed');
    } finally {
      setDetecting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(customerWebsiteUrl);
    toast.success('Link copied to clipboard!');
  };

  const sendWelcomeMessage = async () => {
    if (!detection?.existing_customer) return;
    
    try {
      await axios.post('/api/anpr/send-welcome', {
        customer_id: detection.existing_customer.id,
        plate_number: detection.plate_number,
        vehicle_type: detection.existing_customer.vehicle_type,
      });

      toast.success('Welcome SMS sent successfully!', {
        duration: 4000,
        icon: '📱'
      });
      toast.success('Customer can now select services from their phone!', {
        duration: 4000,
        icon: '✨'
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send welcome message');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/anpr/register', formData);
      toast.success('Vehicle registered successfully');
      navigate(`/customers/${response.data.customer.id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">ANPR Detection</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Camera Feed</h2>
          <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <div className="text-4xl mb-2">📷</div>
              <p className="text-gray-600">Mock Camera Feed</p>
              <p className="text-sm text-gray-500">In production, this would show live camera feed</p>
            </div>
          </div>
          <button
            onClick={handleDetect}
            disabled={detecting}
            className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
          >
            {detecting ? 'Detecting...' : 'Detect Vehicle'}
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Detection Results</h2>
          {detection ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Plate Number</p>
                <p className="text-2xl font-bold font-mono">{detection.plate_number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Province</p>
                <p className="text-lg">{detection.province}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Confidence</p>
                <p className="text-lg">{(parseFloat(detection.confidence) * 100).toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Camera ID</p>
                <p className="text-lg">{detection.camera_id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Timestamp</p>
                <p className="text-lg">{new Date(detection.timestamp).toLocaleString()}</p>
              </div>
              {detection.existing_customer && (
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                  <p className="text-green-800 font-semibold mb-2">✅ Existing Customer Found!</p>
                  <p className="text-sm text-green-600 mb-1"><strong>Name:</strong> {detection.existing_customer.name}</p>
                  <p className="text-sm text-green-600"><strong>Phone:</strong> {detection.existing_customer.phone}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>No detection yet. Click "Detect Vehicle" to scan.</p>
            </div>
          )}
        </div>
      </div>

      {/* Customer Website Link Section */}
      {detection?.existing_customer && customerWebsiteUrl && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">🔗</div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Customer Service Portal</h2>
              <p className="text-sm text-gray-600">Send this link to customer to select services</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200 mb-4">
            <p className="text-xs text-gray-500 mb-1">Customer Website URL:</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customerWebsiteUrl}
                readOnly
                className="flex-1 px-3 py-2 border rounded bg-gray-50 font-mono text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
                title="Copy to clipboard"
              >
                📋 Copy
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={sendWelcomeMessage}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition font-semibold shadow-lg flex items-center justify-center gap-2"
            >
              📱 Send Welcome SMS
            </button>
            <button
              onClick={() => navigate(`/customers/${detection.existing_customer.id}`)}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition font-semibold flex items-center justify-center gap-2"
            >
              👤 View Customer Details
            </button>
          </div>

          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>💡 How it works:</strong> Customer receives SMS with link → Opens link on phone → Sees personalized service menu → Selects service with one tap → Order appears on your dashboard instantly!
            </p>
          </div>
        </div>
      )}

      {showRegister && !detection?.existing_customer && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Register New Vehicle</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plate Number
                </label>
                <input
                  type="text"
                  required
                  value={formData.plate_number}
                  onChange={(e) => setFormData({ ...formData, plate_number: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Province
                </label>
                <input
                  type="text"
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Type
                </label>
                <select
                  value={formData.vehicle_type}
                  onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="Saloon">Saloon</option>
                  <option value="4x4">4x4</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition"
              >
                Register Vehicle
              </button>
              <button
                type="button"
                onClick={() => setShowRegister(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ANPR;

