import { Link, useLocation, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'ti-home' },
    { label: 'Executions', path: '/executions', icon: 'ti-player-play' },
    { label: 'Workflows', path: '/workflows', icon: 'ti-settings' },
    { label: 'Customers', path: '/customers', icon: 'ti-users' },
    { label: 'Inventory', path: '/inventory', icon: 'ti-box' },
    { label: 'Invoices', path: '/invoices', icon: 'ti-file-invoice' },
];

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await API.post('/auth/logout');
        } catch (err) {
            console.error(err);
        } finally {
            navigate('/login');
        }
    };

    return (
        <div className="w-52 min-h-screen bg-[#0f1117] border-r border-[#1e2130] flex flex-col">
            <div className="px-4 py-5 border-b border-[#1e2130]">
                <p className="text-base font-semibold text-white">SewaFlow</p>
                <p className="text-xs text-gray-500 mt-0.5">Business Automation</p>
            </div>

            <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                            ${location.pathname === item.path
                                ? 'bg-blue-600 text-white font-medium'
                                : 'text-gray-400 hover:bg-[#1e2130] hover:text-white'
                            }`}
                    >
                        <i className={`ti ${item.icon} text-base`} />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="px-3 py-4 border-t border-[#1e2130]">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-[#1e2130] transition"
                >
                    <i className="ti ti-logout text-base" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;