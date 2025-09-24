import React, { useState, useEffect } from 'react';
import './UsersPage.css';

function UsersPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  // Загружаем список пользователей из localStorage при монтировании компонента
  useEffect(() => {
    try {
      const raw = localStorage.getItem('users');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setUsers(parsed);
        }
      }
    } catch (_) {
      // Игнорируем ошибки парсинга/доступа к хранилищу
    }
  }, []);

  // Сохраняем список пользователей в localStorage при каждом изменении
  useEffect(() => {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (_) {
      // Игнорируем ошибки сохранения в хранилище
    }
  }, [users]);

  // Возвращает следующий последовательный идентификатор (1, 2, 3, ...)
  const getNextId = () => {
    if (users.length === 0) return 1;
    const maxId = users.reduce((max, u) => (typeof u.id === 'number' && u.id > max ? u.id : max), 0);
    return maxId + 1;
  };

  // Обработчик добавления пользователя
  const handleAddUser = (e) => {
    e.preventDefault();
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedEmail = email.trim();
    if (!trimmedFirst || !trimmedLast || !trimmedEmail) return;

    const newUser = {
      id: getNextId(),
      firstName: trimmedFirst,
      lastName: trimmedLast,
      email: trimmedEmail,
    };
    setUsers((prev) => [newUser, ...prev]);
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  // Обработчик удаления пользователя по id
  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="users-page">
      <h1>Users</h1>

      <form className="user-form" onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="FirstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="LastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>

      <table className="users-table">
        <thead>
          <tr>
            <th>id</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>Нет данных</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn-delete" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;
