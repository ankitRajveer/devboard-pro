// server.js - Custom json-server with auth middleware
const jsonServer = require('json-server');
const server     = jsonServer.create();
const router     = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// ── POST /api/v1/auth/login ──────────────────────────────
server.post('/api/v1/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db    = router.db.getState();
  const user  = db.users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  // Return a fake JWT token (real JWT on the Node.js backend later)
  const { password: _, ...safeUser } = user;
  return res.status(200).json({
    token:        `fake-jwt-token-${user.id}`,
    refreshToken: `fake-refresh-token-${user.id}`,
    user:          safeUser,
  });
});

// ── POST /api/v1/auth/register ───────────────────────────
server.post('/api/v1/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  const db   = router.db.getState();
  const exists = db.users.find((u) => u.email === email);

  if (exists) {
    return res.status(409).json({ message: 'Email already registered.' });
  }

  const newUser = {
    id:        String(db.users.length + 1),
    name,
    email,
    password,
    role:      'Developer',
    avatar:    null,
    createdAt: new Date().toISOString(),
  };

  router.db.get('users').push(newUser).write();
  const { password: _, ...safeUser } = newUser;

  return res.status(201).json({
    token:        `fake-jwt-token-${newUser.id}`,
    refreshToken: `fake-refresh-token-${newUser.id}`,
    user:          safeUser,
  });
});

// ── All other routes go through json-server ──────────────
server.use('/api/v1', router);

server.listen(3000, () => {
  console.log('');
  console.log('  🚀 DevBoard Pro API running!');
  console.log('  ────────────────────────────────');
  console.log('  Base URL : http://localhost:3000/api/v1');
  console.log('  Login    : POST /api/v1/auth/login');
  console.log('  Register : POST /api/v1/auth/register');
  console.log('  Projects : GET  /api/v1/projects');
  console.log('  Tasks    : GET  /api/v1/tasks');
  console.log('  Users    : GET  /api/v1/users');
  console.log('');
});