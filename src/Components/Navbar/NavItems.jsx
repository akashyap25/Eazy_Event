import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import getUser from '../../Utils/GetUser';

const NavItems = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { userId } = useAuth();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) return;
        const fetchedUser = await getUser(userId);
        setUser(fetchedUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const headerLinks = [
    { label: 'Home', route: '/' },
    { label: 'Create Event', route: '/events/create' },
    { label: 'Profile', route: `/profile/${user._id}` },
    {label: 'Tasks', route: `/tasks/${user._id}`},
  ];

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive ? 'text-primary-500' : ''
            } flex-center p-medium-16 whitespace-nowrap`}
          >
            <Link to={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
