import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiSlash } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { formatDateTime } from '../../utils/helpers/articleHelpers';
import SEO from '../../utils/SEO';
import { getAllUsers } from '../../utils/requests/usersRequest';
import { Author } from '../../utils/types/User';

const AdminViewUsers = ({ profile }: { profile: any }) => {
  const [users, setUsers] = useState<Author[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('date');
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const usersPerPage = 15;

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await getAllUsers();
      if (response.status !== 200) {
        throw new Error(response.message || 'Failed to fetch users');
      }
      setUsers(response.data.workers || []);
      setError('');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      toast.error(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (profile) {
      fetchUsers();
    }
  }, []);

  const filteredUsers = users.filter((user: any) =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a: any, b: any) => {
    if (sortOption === 'Date Joined')
      return b?.createdAt.localeCompare(a.createdAt);
    if (sortOption === 'firstName')
      return a?.firstName.localeCompare(b.firstName);
    if (sortOption === 'lastName') return a?.lastName.localeCompare(b.lastName);
    if (sortOption === 'role') return a.role.localeCompare(b.role);
    return 0;
  });

  const pageCount = Math.ceil(sortedUsers.length / usersPerPage);
  const offset = currentPage * usersPerPage;
  const displayedUsers = sortedUsers.slice(offset, offset + usersPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer />
      <SEO mainData={{ title: 'View Users - Kickside News' }} />
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Users List</h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
            </div>
          ) : (
            <div>
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 py-2.5 border border-blue-300 outline-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    />
                  </div>
                </div>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="py-2.5 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 border-primary outline-0"
                >
                  <option value="Date Joined">Sort by Date Joined</option>
                  <option value="firstName">Sort by First Name</option>
                  <option value="lastName">Sort by Last Name</option>
                  <option value="role">Sort by Role</option>
                </select>
              </div>

              {displayedUsers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          #
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Names
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date Joined
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {displayedUsers.map((user, index) => (
                        <tr
                          key={user._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {offset + index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {user.firstName} {user.lastName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Link to={`mailto: ${user.email}`}>
                              {user.email}
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {user.role}{' '}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDateTime(user?.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.isDisabled ? (
                              <span className="flex text-red-600">
                                <FiSlash className="mt-1 mr-1" />
                                <span>
                                  Disabled{' '}
                                  <strong>"{user.disableReason}"</strong>
                                </span>
                              </span>
                            ) : (
                              <span className="text-green-600">Active</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Link
                              to={`/admin/user/${user._id}`}
                              className="text-indigo-600"
                            >
                              <FiEye />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-6">
                    <ReactPaginate
                      previousLabel="← Previous"
                      nextLabel="Next →"
                      pageCount={pageCount}
                      onPageChange={(event) => setCurrentPage(event.selected)}
                      containerClassName="flex justify-center items-center gap-2"
                      pageClassName="px-3 py-1 border rounded-lg cursor-pointer hover:bg-gray-200"
                      activeClassName="bg-indigo-500 text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-gray-500">
                  No users found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminViewUsers;
