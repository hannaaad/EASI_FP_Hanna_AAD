import bcrypt from 'bcrypt';

// Hash password before storing in the database
const passwordHash = await bcrypt.hash(password, 10);

// Compare hashed password during login
const isPasswordValid = await bcrypt.compare(password, user.password_hash);