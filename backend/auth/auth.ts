import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = Deno.env.get("JWT_SECRET") || "supersecretkey";
const JWT_EXPIRATION = "1h";

export type User = {
  id: string;
  email: string;
  password: string; // hashed
};

export class AuthService {
  private store: KVNamespace;

  constructor(store: KVNamespace) {
    this.store = store;
  }

  async register(email: string, password: string) {
    const existing = await this.store.get(email);
    if (existing) return { error: "User already exists", status: 409 };

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: User = { id: crypto.randomUUID(), email, password: hashedPassword };

    await this.store.put(email, JSON.stringify(user));
    return { message: "User registered successfully", status: 201 };
  }

  async login(email: string, password: string) {
    const raw = await this.store.get(email);
    if (!raw) return { error: "User not found", status: 404 };

    const user: User = JSON.parse(raw);
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return { error: "Invalid credentials", status: 401 };

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    return { token, status: 200 };
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch {
      return null;
    }
  }

  /** Seed initial admin user */
  async seedAdmin(email: string, password: string) {
    const existing = await this.store.get(email);
    if (existing) return;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: User = { id: crypto.randomUUID(), email, password: hashedPassword };
    await this.store.put(email, JSON.stringify(user));
    console.log(`Admin user seeded: ${email}`);
  }
}
