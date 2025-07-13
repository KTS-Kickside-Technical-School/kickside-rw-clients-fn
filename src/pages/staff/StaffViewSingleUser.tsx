import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
  disableUser,
  enableUser,
  getSingleUser,
  updateUser,
} from '../../utils/requests/usersRequest';
import { Author } from '../../utils/types/User';
import { BiCalendar, BiCategory } from 'react-icons/bi';
import { BsBan } from 'react-icons/bs';
import { MdTurnedInNot } from 'react-icons/md';
import { formatDateToCustomString } from '../../utils/helpers/articleHelpers';

const AdminViewSingleUser = () => {
  const [user, setUser] = useState<Author | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [disableReason, setDisableReason] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<Author>>({});
  const { id } = useParams<{ id: string }>();
  const [isFormLoading, setIsFormLoading] = useState(false);

  const fetchSingleUser = async () => {
    try {
      const response = await getSingleUser(id);
      if (response?.data?.worker) {
        setUser(response.data.worker);
      } else {
        toast.error('User not found!');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      toast.error('Failed to load user.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof Author, value: string) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      if (!id) return;
      const response = await updateUser(id, editedUser);
      if (response?.status === 200) {
        toast.success('User updated successfully!');
        setUser((prev) => ({ ...prev!, ...editedUser }));
        setEditedUser({});
        setIsEditing(false);
      } else {
        toast.error('Failed to update user!');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('An error occurred while updating the user.');
    }
  };

  const saveDisableReason = async () => {
    setIsFormLoading(true);
    handleInputChange('isDisabled', 'true');
    handleInputChange('disableReason', disableReason);

    if (disableReason.trim() === '') {
      toast.error('Disable reason is required');
      setIsFormLoading(false);
      return;
    }
    try {
      const response = await disableUser(id, disableReason);
      if (response.status === 200) {
        await fetchSingleUser();
        setShowModal(false);
        toast.success('User disabled successfully with reason!');
      } else {
        toast.error(
          response.message || 'An error occurred while disabling the user.'
        );
      }
    } catch (error) {
      console.error('Error saving disable reason:', error);
      toast.error('Failed to save disable reason.');
    } finally {
      setIsFormLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleUser();
  }, [id]);

  const handleEnableUser = async (id: any) => {
    setIsFormLoading(true);
    try {
      const response = await enableUser(id);
      if (response.status === 200) {
        toast.success('User enabled successfully!');
        await fetchSingleUser();
      } else {
        toast.error('Failed to enable user!');
      }
    } catch (error) {
      console.error('Error enabling user:', error);
      toast.error('Failed to enable user.');
    } finally {
      setIsFormLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>User not found</p>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-white shadow-md rounded-lg max-w-5xl mx-auto p-6">
          <div className="flex gap-6 mb-8 items-center">
            <img
              src={user.profile || '/avatar.svg'}
              alt="Profile"
              className="w-28 h-28 rounded-full border border-gray-300"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {isEditing ? (
                  <div className="flex gap-4 mb-3">
                    <input
                      type="text"
                      className="border p-1 rounded-md w-auto outline-0 border-primary"
                      value={editedUser.firstName || user.firstName}
                      onChange={(e) =>
                        handleInputChange('firstName', e.target.value)
                      }
                    />
                    <input
                      type="text"
                      className="border p-1 rounded-md w-auto  outline-0 border-primary"
                      value={editedUser.lastName || user.lastName}
                      onChange={(e) =>
                        handleInputChange('lastName', e.target.value)
                      }
                    />
                  </div>
                ) : (
                  `${user.firstName} ${user.lastName}`
                )}
              </h1>
              <p className="text-gray-600">
                <BiCategory className="inline-block mr-2 text-lg" />
                <span className="font-medium">Role:</span>{' '}
                {isEditing ? (
                  <select
                    value={editedUser.role || user.role}
                    className="border p-1 rounded-md outline-0 border-primary"
                    onChange={(e) => handleInputChange('role', e.target.value)}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Journalist">Journalist</option>
                  </select>
                ) : (
                  user.role
                )}
              </p>
            </div>
          </div>

          <div className="mb-6 p-4 bg-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Account Status
            </h2>
            <p
              className={`font-medium ${
                user.isDisabled ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {user.isDisabled ? 'Disabled' : 'Active'}
            </p>
            <button
              className={`mt-4 px-4 py-2 rounded-md ${
                user.isDisabled
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              } text-white`}
              onClick={
                !user.isDisabled
                  ? () => setShowModal(true)
                  : () => handleEnableUser(user._id)
              }
            >
              {isFormLoading ? (
                'Loading...'
              ) : user.isDisabled ? (
                <span className="flex">
                  <MdTurnedInNot className="mt-1 mr-2" />
                  <span>Enable User</span>
                </span>
              ) : (
                <span className="flex">
                  <BsBan className="mt-1 mr-2" />
                  <span>Disable User</span>
                </span>
              )}
            </button>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <label className="block">
                <span className="font-semibold">Email:</span>
                <input
                  type="text"
                  className="block w-full border p-2 rounded-md mt-1 outline-0 border-primary"
                  value={editedUser.email || user.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </label>
              <label className="block">
                <span className="font-semibold">Role:</span>
                <select
                  value={editedUser.role || user.role}
                  className="block w-full border p-2 rounded-md mt-1 outline-0 border-primary"
                  onChange={(e) => handleInputChange('role', e.target.value)}
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Journalist">Journalist</option>
                </select>
              </label>

              <label className="block">
                <span className="font-semibold">Rank:</span>
                <input
                  type="text"
                  className="block w-full border p-2 rounded-md mt-1 outline-0 border-primary"
                  value={editedUser.rank || user.rank || ''}
                  onChange={(e) => handleInputChange('rank', e.target.value)}
                />
              </label>
              <label className="block">
                <span className="font-semibold">Bio:</span>
                <textarea
                  className="block w-full border p-2 rounded-md mt-1 outline-0 border-primary"
                  value={editedUser.bio || user.bio || ''}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                />
              </label>
              <div className="flex justify-end gap-4">
                <button
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
                  onClick={saveChanges}
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center">
                <BiCalendar className="mr-2 text-lg text-gray-500" />
                <span className="font-medium">Joined:</span>
                &nbsp; {formatDateToCustomString(user.createdAt)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Email:</h3>
                <p className="text-gray-700">{user.email || 'No email'}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Rank:</h3>
                <p className="text-gray-700">
                  {user.rank || 'No rank assigned'}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Bio:</h3>
                <p className="text-gray-700">
                  {user.bio || 'No bio available.'}
                </p>
              </div>
            </div>
          )}
          {!isEditing && (
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setIsEditing(true)}
            >
              Edit Details
            </button>
          )}

          {showModal && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-md w-96">
                <h3 className="text-xl font-semibold">
                  Reason for Disabling User
                </h3>
                <textarea
                  className="w-full p-2 mt-4 border rounded-md outline-0 border-primary"
                  placeholder="Provide a reason for disabling this user..."
                  value={disableReason}
                  onChange={(e) => setDisableReason(e.target.value)}
                />
                <div className="mt-4 flex justify-end gap-4">
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    onClick={saveDisableReason}
                  >
                    {isFormLoading ? 'Please wait...' : 'Save Reason'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminViewSingleUser;
