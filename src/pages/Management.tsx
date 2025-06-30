import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  Users, 
  FileText, 
  Settings, 
  Bell, 
  LogOut, 
  ShoppingCart, 
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Eye,
  EyeOff,
  Plus,
  Edit,
  Trash2,
  Printer,
  Download,
  Calendar,
  Filter
} from 'lucide-react';
import { useManagement } from '../context/ManagementContext';

const Management = () => {
  const { 
    currentUser, 
    dashboardStats, 
    users, 
    products, 
    sales, 
    expenses,
    canAccess,
    canViewExpense,
    addUser,
    updateUser,
    deleteUser,
    addExpense,
    updateExpense,
    deleteExpense
  } = useManagement();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const menuItems = [
    { id: 'dashboard', name: 'Tableau de bord', icon: BarChart3, access: 'dashboard' },
    { id: 'sales', name: 'Ventes', icon: ShoppingCart, access: 'sales_view' },
    { id: 'products', name: 'Produits', icon: Package, access: 'stock_view' },
    { id: 'expenses', name: 'Dépenses', icon: DollarSign, access: 'expenses_view' },
    { id: 'users', name: 'Utilisateurs', icon: Users, access: 'users_view' },
    { id: 'reports', name: 'Rapports', icon: FileText, access: 'reports' },
    { id: 'settings', name: 'Paramètres', icon: Settings, access: 'settings' }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    canAccess(item.access) || canAccess('all')
  );

  const getStatsForPeriod = () => {
    switch (selectedPeriod) {
      case 'day':
        return {
          sales: dashboardStats.dailySales,
          orders: dashboardStats.dailyOrders,
          label: 'Aujourd\'hui'
        };
      case 'month':
        return {
          sales: dashboardStats.monthlySales,
          orders: dashboardStats.monthlyOrders,
          label: 'Ce mois'
        };
      case 'year':
        return {
          sales: dashboardStats.yearlySales,
          orders: dashboardStats.yearlyOrders,
          label: 'Cette année'
        };
      default:
        return {
          sales: dashboardStats.monthlySales,
          orders: dashboardStats.monthlyOrders,
          label: 'Ce mois'
        };
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    // Logic for exporting data
    console.log('Exporting data...');
  };

  const renderDashboard = () => {
    const periodStats = getStatsForPeriod();
    
    return (
      <div className="space-y-6">
        {/* Period Selector */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Période d'analyse</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePrint}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                <Printer className="w-4 h-4 mr-2" />
                Imprimer
              </button>
              <button
                onClick={handleExport}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </button>
            </div>
          </div>
          <div className="flex space-x-4">
            {[
              { id: 'day', label: 'Jour' },
              { id: 'month', label: 'Mois' },
              { id: 'year', label: 'Année' }
            ].map(period => (
              <label key={period.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedPeriod === period.id}
                  onChange={() => setSelectedPeriod(period.id)}
                  className="mr-2"
                />
                {period.label}
              </label>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ventes {periodStats.label}</p>
                <p className="text-2xl font-bold text-gray-900">{periodStats.sales.toLocaleString()} FCFA</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Commandes {periodStats.label}</p>
                <p className="text-2xl font-bold text-gray-900">{periodStats.orders}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Produits en stock</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalProducts}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Stock faible</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.lowStockProducts}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution des ventes</h3>
            <div className="h-64 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <TrendingUp className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg font-semibold">Graphique des ventes</p>
                <p className="text-blue-100">Période: {periodStats.label}</p>
              </div>
            </div>
          </div>

          {/* Recent Sales */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ventes récentes</h3>
            <div className="space-y-3">
              {sales.slice(0, 5).map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{sale.productName}</p>
                    <p className="text-sm text-gray-600">{sale.customerName}</p>
                    <p className="text-xs text-gray-500">{new Date(sale.date).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{sale.totalPrice.toLocaleString()} FCFA</p>
                    <p className="text-sm text-green-600">+{sale.margin.toLocaleString()} FCFA</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderExpenses = () => {
    const visibleExpenses = expenses.filter(expense => canViewExpense(expense));
    
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Gestion des dépenses</h2>
            {canAccess('all') && (
              <button
                onClick={() => setShowAddExpenseModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une dépense
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Catégorie</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Montant</th>
                  {canAccess('all') && (
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {visibleExpenses.map((expense) => (
                  <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{new Date(expense.date).toLocaleDateString('fr-FR')}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        expense.isConfidential ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {expense.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">{expense.description}</td>
                    <td className="py-3 px-4 font-semibold">{expense.amount.toLocaleString()} FCFA</td>
                    {canAccess('all') && (
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedExpense(expense)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteExpense(expense.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderUsers = () => {
    if (!canAccess('all') && !canAccess('users_view')) {
      return (
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <p className="text-gray-500">Accès non autorisé</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Gestion des utilisateurs</h2>
            {canAccess('all') && (
              <button
                onClick={() => setShowAddUserModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un utilisateur
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{user.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.role}</p>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                {user.salary && canAccess('all') && (
                  <p className="text-sm font-medium text-green-600">{user.salary.toLocaleString()} FCFA/mois</p>
                )}
                {canAccess('all') && (
                  <div className="flex items-center space-x-2 mt-4">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'expenses':
        return renderExpenses();
      case 'users':
        return renderUsers();
      default:
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {filteredMenuItems.find(item => item.id === activeTab)?.name}
            </h2>
            <p className="text-gray-600">Cette section est en cours de développement.</p>
          </div>
        );
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Accès non autorisé</h1>
          <p className="text-gray-600">Veuillez vous connecter pour accéder au système de gestion.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">SL</span>
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Sciences Labs</h2>
                <p className="text-sm text-gray-600">Gestion</p>
              </div>
            </div>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {filteredMenuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{item.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-white shadow-sm border-b border-gray-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Bonjour, {currentUser.name}
                </h1>
                <p className="text-gray-600">Rôle: {currentUser.role}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-600 hover:text-gray-900">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {currentUser.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                    <p className="text-xs text-gray-600">{currentUser.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Management;