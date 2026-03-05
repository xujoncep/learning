# React for .NET Developers — Complete Guide (TypeScript)

> A comprehensive guide for .NET MVC developers transitioning to React with TypeScript.
> Every concept is compared with C# / .cshtml equivalents.

---

## Table of Contents

1. [React Overview](#1-react-overview)
2. [JSX vs Razor Syntax](#2-jsx-vs-razor-syntax)
3. [Components and Props](#3-components-and-props)
4. [State Management — useState](#4-state-management--usestate)
5. [Props vs State](#5-props-vs-state)
6. [Event Handling](#6-event-handling)
7. [API Calls — fetch / axios](#7-api-calls--fetch--axios)
8. [useEffect — Component Lifecycle](#8-useeffect--component-lifecycle)
9. [Project Structure](#9-project-structure)
10. [React Router — Navigation](#10-react-router--navigation)
11. [Context API — Global State](#11-context-api--global-state)
12. [Protected Routes — Authorization](#12-protected-routes--authorization)
13. [useRef — DOM Access and Mutable Values](#13-useref--dom-access-and-mutable-values)
14. [useMemo and useCallback — Performance](#14-usememo-and-usecallback--performance)
15. [Custom Hooks — Reusable Logic](#15-custom-hooks--reusable-logic)
16. [Form Handling — React Hook Form](#16-form-handling--react-hook-form)
17. [Lifting State Up and Composition](#17-lifting-state-up-and-composition)
18. [Error Handling — Error Boundary](#18-error-handling--error-boundary)
19. [Styling Approaches](#19-styling-approaches)
20. [Deployment and Build](#20-deployment-and-build)
21. [Redux Toolkit — State Management](#21-redux-toolkit--state-management)
22. [CRUD Application Guide](#22-crud-application-guide)
23. [Best Practices and Common Mistakes](#23-best-practices-and-common-mistakes)
24. [Tips and Tricks](#24-tips-and-tricks)
25. [Learning Path](#25-learning-path)

---

## 1. React Overview

### What is React?

React is a **client-side** JavaScript library for building user interfaces using a **component-based** architecture.

### Core Differences

| Aspect | .cshtml (Razor) | React |
|---|---|---|
| Rendering | **Server-side** — HTML generated on server | **Client-side** — JavaScript renders in browser |
| Language | C# + HTML | TypeScript / JavaScript + JSX |
| Update | Full page reload | Only changed parts update (Virtual DOM) |
| Architecture | MVC pattern | Component-based |

### Basic Example

**.cshtml (Razor):**

```csharp
@model UserViewModel

<div class="container">
    <h1>Hello, @Model.Name!</h1>
    <p>Your email: @Model.Email</p>
</div>
```

**React + TypeScript:**

```tsx
interface UserCardProps {
  name: string;
  email: string;
}

function UserCard({ name, email }: UserCardProps) {
  return (
    <div className="container">
      <h1>Hello, {name}!</h1>
      <p>Your email: {email}</p>
    </div>
  );
}

// Usage
<UserCard name="Rahim" email="rahim@example.com" />
```

### Key Concepts

- **Component** = similar to Partial View but more powerful
- **JSX** = looks like HTML but it is actually JavaScript
- `{ }` is used for JavaScript expressions (like `@` in Razor)
- `className` is used instead of `class` (because `class` is a reserved word in JS)
- **interface** = C#'s ViewModel / Model class equivalent

---

## 2. JSX vs Razor Syntax

### Quick Reference

| Feature | Razor (.cshtml) | JSX (React + TS) |
|---|---|---|
| Expression | `@variable` | `{variable}` |
| Condition | `@if / @else` | Ternary `? :` or `&&` |
| Loop | `@foreach` | `.map()` |
| CSS class | `class=""` | `className=""` |
| Inline style | `style="color:red"` | `style={{ color: 'red' }}` |
| Comment | `@* comment *@` | `{/* comment */}` |

### Variables

```csharp
// Razor
@{ string userName = "Rahim"; int age = 30; }
<p>Name: @userName, Age: @age</p>
```

```tsx
// React
const userName: string = "Rahim";
const age: number = 30;
return <p>Name: {userName}, Age: {age}</p>;
```

### Conditional Rendering

```csharp
// Razor
@if (Model.IsLoggedIn) {
    <p>Welcome back!</p>
} else {
    <p>Please login.</p>
}
```

```tsx
// React — Ternary
return <p>{isLoggedIn ? "Welcome back!" : "Please login."}</p>;

// Show only (no else) — && operator
return <div>{isLoggedIn && <p>Welcome back!</p>}</div>;
```

### Loop — Rendering Lists

```csharp
// Razor
@foreach (var item in Model.Products) {
    <li>@item.Name — @item.Price BDT</li>
}
```

```tsx
// React — .map() method
interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "Laptop", price: 75000 },
  { id: 2, name: "Mouse", price: 1500 },
];

return (
  <ul>
    {products.map((item) => (
      <li key={item.id}>{item.name} — {item.price} BDT</li>
    ))}
  </ul>
);
```

> **Important:** `key` is mandatory in list rendering — React uses it to track which elements have changed.

### CSS Class and Inline Style

```csharp
// Razor
<div class="card text-center" style="color:red">Hello</div>
```

```tsx
// React
<div className="card text-center" style={{ color: 'red' }}>Hello</div>
```

> Style uses double `{{ }}` — outer is JSX expression, inner is JavaScript object.

---

## 3. Components and Props

### Props = Method Parameters / Constructor Arguments

Props are **read-only** data passed from parent to child component.

```csharp
// C# — Strongly typed ViewModel
public class UserViewModel {
    public string Name { get; set; }
    public string Email { get; set; }
}
```

```tsx
// React — Interface defines Props type
interface UserCardProps {
  name: string;
  email: string;
}

function UserCard({ name, email }: UserCardProps) {
  return (
    <div className="container">
      <h1>Hello, {name}!</h1>
      <p>Your email: {email}</p>
    </div>
  );
}

export default UserCard;
```

Usage:

```tsx
import UserCard from "./UserCard";

function App() {
  return <UserCard name="Rahim" email="rahim@example.com" />;
}
```

---

## 4. State Management — useState

### What is State?

State is a component's own data that triggers a **UI re-render** when changed — no page reload needed.

| Aspect | .cshtml + C# | React + TypeScript |
|---|---|---|
| Data store | ViewModel property | `useState` |
| UI update | Form submit and page reload | State change and automatic re-render |
| Two-way binding | `asp-for` tag helper | `value` + `onChange` |

### Simple Counter

```tsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  );
}
```

### Input Field — Two-way Binding

```tsx
function ContactForm() {
  const [name, setName] = useState<string>("");

  return (
    <div>
      <input
        type="text"
        className="form-control"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>You are typing: {name}</p>
    </div>
  );
}
```

### Object State — ViewModel Equivalent

```tsx
interface LoginForm {
  email: string;
  password: string;
}

function LoginPage() {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <input name="email" type="email" value={form.email} onChange={handleChange} />
      <input name="password" type="password" value={form.password} onChange={handleChange} />
    </div>
  );
}
```

### Important Rules

```tsx
// WRONG — direct mutation does not trigger re-render
count = count + 1;

// CORRECT — always use the setter function
setCount(count + 1);

// CORRECT — functional update for latest value
setCount((prev) => prev + 1);
```

---

## 5. Props vs State

| | Props | State |
|---|---|---|
| What? | Data from outside | Component's own data |
| Who provides? | Parent component | Component itself |
| Mutable? | Read-only | Changeable via setState |
| C# equivalent | Method parameter | Private field |

### Data Flow — Always Top-Down

```
App (Parent)
  ↓ props
  ProductCard (Child)
      ↓ props
      ProductImage (Grandchild)
```

> Data flows **only downward** through props. To send data upward, use **callback functions** as props.

---

## 6. Event Handling

### Comparison

| Aspect | .cshtml + C# | React + TypeScript |
|---|---|---|
| Button click | `asp-action` / jQuery | `onClick` handler |
| Form submit | `<form asp-action>` | `onSubmit` handler |
| Prevent reload | — | `e.preventDefault()` |

### Button Click

```tsx
function DeleteButton() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Delete clicked!");
  };

  return <button className="btn btn-danger" onClick={handleClick}>Delete</button>;
}
```

### Form Submit

```tsx
import { useState, FormEvent } from "react";

function CreateProductForm() {
  const [name, setName] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // CRITICAL — prevents page reload
    console.log("Submitted:", name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Save</button>
    </form>
  );
}
```

### Common Event Types in TypeScript

```tsx
onClick     → React.MouseEvent<HTMLButtonElement>
onChange    → React.ChangeEvent<HTMLInputElement>
onChange    → React.ChangeEvent<HTMLSelectElement>
onSubmit    → React.FormEvent<HTMLFormElement>
onKeyDown   → React.KeyboardEvent<HTMLInputElement>
```

---

## 7. API Calls — fetch / axios

### Comparison

| Aspect | C# HttpClient | React + TypeScript |
|---|---|---|
| GET | `GetAsync()` | `axios.get()` |
| POST | `PostAsJsonAsync()` | `axios.post()` |
| Async/Await | `async/await` | `async/await` (same concept) |
| Error handling | `try/catch` | `try/catch` |

### Setup

```bash
npm install axios
```

### GET Request

```tsx
import { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>("/api/products");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name} — {p.price} BDT</li>
      ))}
    </ul>
  );
}
```

### POST Request

```tsx
const handleSubmit = async (data: ProductFormData) => {
  try {
    await axios.post<Product>("/api/products", data);
    console.log("Product saved!");
  } catch (err) {
    console.error("Save failed");
  }
};
```

### DELETE Request

```tsx
const handleDelete = async (id: number) => {
  try {
    await axios.delete(`/api/products/${id}`);
    setProducts(products.filter((p) => p.id !== id));
  } catch (err) {
    alert("Delete failed!");
  }
};
```

---

## 8. useEffect — Component Lifecycle

### Lifecycle Comparison

| Phase | C# | React useEffect |
|---|---|---|
| **Mount** | Constructor / OnInitialized | `useEffect(() => {}, [])` |
| **Update** | Property setter | `useEffect(() => {}, [value])` |
| **Unmount** | `Dispose()` | return function from useEffect |

### Mount — Runs Once on Load

```tsx
useEffect(() => {
  fetchData(); // API call on component load
}, []); // Empty array = runs once
```

### Update — Runs When Dependency Changes

```tsx
useEffect(() => {
  fetchProduct(selectedId);
}, [selectedId]); // Runs when selectedId changes
```

### Unmount — Cleanup (Like IDisposable)

```tsx
useEffect(() => {
  const timer = setInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);

  return () => clearInterval(timer); // Cleanup on unmount
}, []);
```

### Quick Reference

```
[]        →  Constructor     (runs once)
[value]   →  Property Setter (runs when value changes)
return fn →  Dispose         (cleanup)
no array  →  Every render    (usually avoid)
```

---

## 9. Project Structure

### .NET vs React Project Comparison

```
.NET MVC Project              React + TypeScript Project
─────────────────             ──────────────────────────
Controllers/                  src/
  HomeController.cs             components/
  ProductController.cs            common/
Models/                             Button.tsx
  Product.cs                      layout/
  UserViewModel.cs                  Navbar.tsx
Views/                                Footer.tsx
  Home/                         pages/
    Index.cshtml                  HomePage.tsx
    Details.cshtml                ProductPage.tsx
  Shared/                       features/
    _Layout.cshtml                products/
    _Navbar.cshtml                  ProductList.tsx
wwwroot/                            ProductCard.tsx
  css/                              ProductForm.tsx
  js/                           types/
Services/                         product.types.ts
  ProductService.cs             services/
                                  product.service.ts
                                hooks/
                                  useProducts.ts
```

### Layer Mapping

```
types/      →  Models/          (data structure)
services/   →  Services/        (API calls)
hooks/      →  Repository/      (business logic)
components/ →  Partial Views/   (reusable UI)
pages/      →  Controller+View/ (full pages)
```

### Types — Model Equivalent

```tsx
// src/types/product.types.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

export interface CreateProductDto {
  name: string;
  price: number;
}
```

### Service — API Layer

```tsx
// src/services/product.service.ts
import axios from "axios";
import { Product, CreateProductDto } from "../types/product.types";

const BASE_URL = "/api/products";

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const res = await axios.get<Product[]>(BASE_URL);
    return res.data;
  },

  getById: async (id: number): Promise<Product> => {
    const res = await axios.get<Product>(`${BASE_URL}/${id}`);
    return res.data;
  },

  create: async (data: CreateProductDto): Promise<Product> => {
    const res = await axios.post<Product>(BASE_URL, data);
    return res.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
```

### Custom Hook — Reusable Data Logic

```tsx
// src/hooks/useProducts.ts
import { useState, useEffect } from "react";
import { Product } from "../types/product.types";
import { productService } from "../services/product.service";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await productService.getAll();
        setProducts(data);
      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const remove = async (id: number) => {
    await productService.delete(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return { products, loading, error, remove };
}
```

---

## 10. React Router — Navigation

### Setup

```bash
npm install react-router-dom
```

### Comparison

| Aspect | .NET MVC | React Router |
|---|---|---|
| Route define | `Program.cs` / `[Route]` | `<Routes>` component |
| Navigate | `RedirectToAction()` | `useNavigate()` |
| URL parameter | `[FromRoute] int id` | `useParams()` |
| Active link | `@Html.ActionLink` | `<NavLink>` |
| Layout | `_Layout.cshtml` | Layout component + `<Outlet>` |

### Route Setup

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Navigation — useNavigate

```tsx
import { useNavigate } from "react-router-dom";

function CreateForm() {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await saveProduct(data);
    navigate("/products");    // RedirectToAction equivalent
    // navigate(-1);          // Go back
  };
}
```

### URL Parameters — useParams

```tsx
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams<{ id: string }>(); // Always string from URL

  useEffect(() => {
    fetchProduct(Number(id));
  }, [id]);
}
```

### Layout with Outlet — _Layout.cshtml Equivalent

```tsx
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="container mt-4">
        <Outlet /> {/* @RenderBody() equivalent */}
      </main>
      <Footer />
    </>
  );
}

// Usage in routes
<Route element={<MainLayout />}>
  <Route path="/" element={<HomePage />} />
  <Route path="/products" element={<ProductPage />} />
</Route>
```

### NavLink — Active Link Highlighting

```tsx
import { NavLink } from "react-router-dom";

<NavLink
  to="/products"
  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
>
  Products
</NavLink>
```

---

## 11. Context API — Global State

### Why Context API?

Solves **prop drilling** — when data needs to pass through many levels of components.

### Comparison

| Aspect | C# DI | React Context |
|---|---|---|
| Register | `builder.Services.AddScoped<>()` | `createContext()` + Provider |
| Inject / Use | Constructor injection | `useContext()` |
| Scope | Scoped / Singleton | Within Provider tree |

### Full Implementation — Auth Context

**Step 1: Create Context**

```tsx
// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: user !== null }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
```

**Step 2: Wrap App with Provider**

```tsx
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>{/* ... */}</Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
```

**Step 3: Use in Any Component**

```tsx
function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <nav>
      {isLoggedIn ? (
        <>
          <span>Hello, {user?.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
}
```

### Shopping Cart Context — Real Scenario

```tsx
// src/context/CartContext.tsx
interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  // ... rest of implementation
}
```

### Multiple Contexts

```tsx
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>{/* ... */}</Routes>
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
```

### When to Use Context vs Other Solutions

```
Context API — good for:
  - Authentication (user info, login/logout)
  - Theme (dark/light)
  - Language/Locale
  - Small global state

Consider alternatives when:
  - Frequently updating data           → Zustand / Redux
  - Server state (API data, caching)   → React Query / TanStack Query
  - Complex state logic                → useReducer + Context / Redux
```

---

## 12. Protected Routes — Authorization

### Comparison

| Aspect | .NET MVC | React |
|---|---|---|
| Auth check | `[Authorize]` | ProtectedRoute component |
| Role check | `[Authorize(Roles="Admin")]` | Role-based component |
| Redirect | `RedirectToAction("Login")` | `<Navigate to="/login">` |

### ProtectedRoute Component

```tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";

// [Authorize] equivalent
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// [Authorize(Roles = "Admin")] equivalent
export function RoleProtectedRoute({
  children,
  requiredRole,
}: {
  children: ReactNode;
  requiredRole: string;
}) {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (user?.role !== requiredRole) return <Navigate to="/unauthorized" replace />;
  return <>{children}</>;
}
```

### Usage in Routes

```tsx
<Routes>
  {/* Public */}
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<LoginPage />} />

  {/* [Authorize] */}
  <Route
    path="/products"
    element={
      <ProtectedRoute>
        <ProductPage />
      </ProtectedRoute>
    }
  />

  {/* [Authorize(Roles="Admin")] */}
  <Route
    path="/admin"
    element={
      <RoleProtectedRoute requiredRole="Admin">
        <AdminDashboard />
      </RoleProtectedRoute>
    }
  />
</Routes>
```

---

## 13. useRef — DOM Access and Mutable Values

### Comparison

| Aspect | .cshtml / jQuery | React useRef |
|---|---|---|
| DOM access | `document.getElementById()` | `useRef<HTMLElement>()` |
| Focus input | `$('#input').focus()` | `ref.current.focus()` |
| Mutable data | private field | `useRef<T>()` |
| Triggers re-render? | — | No |

### DOM Access — Focus Input

```tsx
import { useRef } from "react";

function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input ref={inputRef} placeholder="Search..." />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
    </div>
  );
}
```

### Timer Reference — Cleanup

```tsx
function StopWatch() {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  };

  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <div>
      <h3>{seconds}s</h3>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

### useState vs useRef

| | useState | useRef |
|---|---|---|
| Value change triggers re-render | Yes | No |
| DOM access | No | Yes |
| Timer/interval ID | Overkill | Perfect |
| C# equivalent | Property with UI binding | Private field |

---

## 14. useMemo and useCallback — Performance

### useMemo — Cache Expensive Calculations

```tsx
import { useMemo } from "react";

function ProductPage() {
  const [search, setSearch] = useState("");

  // Only recalculates when products or search changes
  const filtered = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);
}
```

### useCallback — Cache Function References

```tsx
import { useCallback } from "react";

function ProductPage() {
  // Function reference stays stable across re-renders
  const handleDelete = useCallback((id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return products.map((p) => (
    <ProductCard key={p.id} product={p} onDelete={handleDelete} />
  ));
}
```

### React.memo — Cache Entire Component

```tsx
import { memo } from "react";

const ProductCard = memo(function ProductCard({ product, onDelete }: Props) {
  // Only re-renders when props actually change
  return <div>{product.name}</div>;
});
```

### When to Optimize

```
DO optimize:
  - Large lists (100+ items)
  - Heavy calculations (sort, filter, reduce)
  - Child components with React.memo

DON'T optimize:
  - Simple variables: const x = a + b
  - Simple inline handlers
  - Small components
```

---

## 15. Custom Hooks — Reusable Logic

### Comparison

| Aspect | C# | React Custom Hook |
|---|---|---|
| Reusable logic | Service / Extension Method | `useXxx()` function |
| Naming | `IService` | `use` prefix (mandatory) |
| Registration | `AddScoped<>()` | Just import and call |

### useToggle

```tsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return { value, toggle, setTrue, setFalse };
}

// Usage
const modal = useToggle();
<button onClick={modal.toggle}>{modal.value ? "Close" : "Open"}</button>
```

### useFetch — Generic Data Fetching

```tsx
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get<T>(url);
      setData(res.data);
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [url]);

  return { data, loading, error, refetch: fetchData };
}

// Usage
const { data: products, loading } = useFetch<Product[]>("/api/products");
```

### useDebounce — Search Optimization

```tsx
function useDebounce<T>(value: T, delayMs: number = 500): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}

// Usage — API call only after user stops typing for 400ms
const [search, setSearch] = useState("");
const debouncedSearch = useDebounce(search, 400);

const { data } = useFetch<Product[]>(`/api/products?search=${debouncedSearch}`);
```

### useLocalStorage — Persistent State

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return { value, setValue: setStoredValue };
}

// Usage
const { value: theme, setValue: setTheme } = useLocalStorage("theme", "light");
```

---

## 16. Form Handling — React Hook Form

### Setup

```bash
npm install react-hook-form zod @hookform/resolvers
```

### Comparison

| Aspect | .NET MVC | React Hook Form |
|---|---|---|
| Validation | `[Required]`, `[MaxLength]` | Zod schema |
| Model binding | `asp-for` | `register()` |
| Error display | `asp-validation-for` | `errors.fieldName` |
| State | Automatic | Automatic (no useState needed) |

### Zod Schema — Data Annotations Equivalent

```tsx
import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(50, "Max 50 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string().min(1, "Required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;
```

### Form Component

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log("Valid data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register("email")} type="email" />
      {errors.email && <span>{errors.email.message}</span>}

      <button type="submit" disabled={isSubmitting}>Register</button>
    </form>
  );
}
```

### Mapping

```
[Required]              →  z.string().min(1, "msg")
[EmailAddress]          →  z.string().email("msg")
[MaxLength(50)]         →  z.string().max(50, "msg")
[Compare("Password")]   →  .refine(data => ...)
asp-for="Name"          →  {...register("name")}
asp-validation-for      →  errors.name?.message
```

---

## 17. Lifting State Up and Composition

### Lifting State Up

When two sibling components need shared data, move the state to their **parent**.

```tsx
// Parent owns the state
function ProductPage() {
  const [search, setSearch] = useState("");
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <SearchFilter search={search} onSearchChange={setSearch} />
      <ProductList products={filtered} />
      <ResultCount count={filtered.length} />
    </div>
  );
}

// Child 1 — sends data up via callback
function SearchFilter({ search, onSearchChange }: Props) {
  return <input value={search} onChange={(e) => onSearchChange(e.target.value)} />;
}

// Child 2 — receives data via props
function ProductList({ products }: Props) {
  return products.map((p) => <li key={p.id}>{p.name}</li>);
}
```

### Composition — children Pattern

```tsx
// Reusable wrapper — like _Layout.cshtml
interface CardProps {
  title: string;
  children: ReactNode; // @RenderBody() equivalent
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  );
}

// Usage — different content each time
<Card title="User Info">
  <p>Name: Rahim</p>
</Card>

<Card title="Product Form">
  <form>...</form>
</Card>
```

---

## 18. Error Handling — Error Boundary

### Error Boundary Component

```tsx
import { Component, ErrorInfo, ReactNode } from "react";

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="text-center">
          <h1>Something went wrong!</h1>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

### Usage

```tsx
// Wrap entire app
<ErrorBoundary>
  <App />
</ErrorBoundary>

// Or wrap specific sections
<ErrorBoundary fallback={<p>Product section failed</p>}>
  <ProductPage />
</ErrorBoundary>
```

> **Note:** Error Boundary cannot catch async errors. Use `try/catch` in API calls.

### Toast Notification Context

```tsx
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: "success" | "danger") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4">
        {toasts.map((t) => (
          <div key={t.id} className={`alert alert-${t.type}`}>{t.message}</div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
```

---

## 19. Styling Approaches

### Comparison

| Method | Scoped? | Best For |
|---|---|---|
| Global CSS | No | Simple, small projects |
| CSS Modules | Yes | Most projects (recommended) |
| Tailwind CSS | Utility | Full control, modern projects |
| Inline style | — | Dynamic values only |

### Global CSS

```css
/* src/styles/global.css */
.card-custom { border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
```

```tsx
import "./styles/global.css";
<div className="card-custom">Hello</div>
```

### CSS Modules — Scoped CSS (Recommended)

```css
/* ProductCard.module.css */
.card { border-radius: 12px; padding: 16px; }
.title { font-size: 1.2rem; color: #333; }
```

```tsx
import styles from "./ProductCard.module.css";
<div className={styles.card}>
  <h5 className={styles.title}>{name}</h5>
</div>
```

### Tailwind CSS

```tsx
<div className="p-4 rounded-xl shadow-md bg-white">
  <h5 className="font-bold text-gray-800">{name}</h5>
  <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
    Add
  </button>
</div>
```

### Bootstrap vs Tailwind

```
Bootstrap                      Tailwind
class="btn btn-primary"     →  className="px-4 py-2 bg-blue-600 text-white rounded"
class="card shadow"         →  className="rounded-xl shadow-md bg-white"
class="text-danger"         →  className="text-red-500"
class="mt-3 mb-2"          →  className="mt-3 mb-2" (almost same!)
```

### Inline Styles in TypeScript

```tsx
import { CSSProperties } from "react";

const cardStyle: CSSProperties = {
  color: "red",
  fontSize: "18px",        // camelCase (not font-size)
  marginTop: "10px",
  backgroundColor: "#f8f9fa",
};

<div style={cardStyle}>Hello</div>
```

---

## 20. Deployment and Build

### Comparison

| Aspect | .NET MVC | React (Vite) |
|---|---|---|
| Dev server | `dotnet run` | `npm run dev` |
| Build | `dotnet publish` | `npm run build` |
| Output | DLL + Runtime | Static HTML/CSS/JS |
| Hosting | IIS / Azure App Service | Any static host |
| Config | `appsettings.json` | `.env` files |

### Environment Variables

```bash
# .env.development
VITE_API_URL=http://localhost:5000/api

# .env.production
VITE_API_URL=https://api.example.com
```

```tsx
// Usage — VITE_ prefix required
const apiUrl = import.meta.env.VITE_API_URL;
```

### Build and Preview

```bash
npm run build      # Output: dist/ folder
npm run preview    # Preview production build locally
```

### Hosting with .NET Backend

```csharp
// Program.cs
app.UseStaticFiles();
app.MapFallbackToFile("index.html"); // React Router support
app.MapControllers();
```

### Vite Proxy — Avoid CORS Issues

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://localhost:5001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
```

### Deployment Checklist

```
- npm run build — no errors
- npm run preview — works locally
- .env.production — correct API URL
- No console errors
- CORS configured (if separate host)
- Fallback to index.html configured
- .env in .gitignore
```

---

## 21. Redux Toolkit — State Management

### When to Use Redux vs Context

| Aspect | Context API | Redux Toolkit |
|---|---|---|
| Setup | Simple | More code |
| DevTools | None | Redux DevTools (time travel) |
| Performance | All consumers re-render | Selective re-render |
| Async | Handle manually | createAsyncThunk built-in |
| Small app | Sufficient | Overkill |
| Large app | Context Hell | Scalable |

### Core Concepts

```
Store        =  Central database (Single Source of Truth)
Slice        =  Database table / feature module
Action       =  "What to do" — command message
Reducer      =  "How to do it" — command handler
dispatch()   =  Send the command
useSelector  =  Query the database
```

### Setup

```bash
npm install @reduxjs/toolkit react-redux
```

### Create a Slice

```tsx
// src/store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem { product: Product; quantity: number; }
interface CartState { items: CartItem[]; }

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] } as CartState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(i => i.product.id === action.payload.id);
      if (existing) {
        existing.quantity += 1; // Direct mutation OK in RTK (Immer handles it)
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.product.id !== action.payload);
    },
    clearCart: (state) => { state.items = []; },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
```

### Configure Store

```tsx
// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: { cart: cartReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Typed Hooks

```tsx
// src/store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### Usage in Components

```tsx
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addItem } from "../store/cartSlice";

function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  return (
    <button onClick={() => dispatch(addItem(product))}>Add to Cart</button>
  );
}

function Navbar() {
  const totalItems = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return <span>Cart: {totalItems}</span>;
}
```

### Async Actions

```tsx
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const res = await axios.get<Product[]>("/api/products");
  return res.data;
});

// Handle in slice
extraReducers: (builder) => {
  builder
    .addCase(fetchProducts.pending, (state) => { state.loading = true; })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed";
    });
},
```

---

## 22. CRUD Application Guide

### Tech Stack

- React + TypeScript + Vite
- Context API for state management
- json-server for mock backend
- Tailwind CSS for styling
- Manual useState for form handling

### Project Structure

```
src/
├── components/           — Reusable UI (Partial Views)
│   ├── ProductCard.tsx
│   ├── ProductForm.tsx
│   └── Spinner.tsx
├── context/              — Context API (DI Container)
│   └── ProductContext.tsx
├── pages/                — Pages (Controller + View)
│   ├── ProductListPage.tsx
│   ├── ProductCreatePage.tsx
│   ├── ProductEditPage.tsx
│   └── ProductDetailPage.tsx
├── services/             — API calls (Service Layer)
│   └── product.service.ts
├── types/                — TypeScript interfaces (Models)
│   └── product.types.ts
├── App.tsx               — Router (Program.cs)
├── main.tsx              — Entry point
└── index.css             — Tailwind
```

### Setup Commands

```bash
npm create vite@latest product-crud -- --template react-ts
cd product-crud
npm install axios react-router-dom react-icons
npm install -D tailwindcss @tailwindcss/vite json-server
```

### Data Flow

```
User clicks button
  → Page component → handleSubmit(data)
    → Context → addProduct(data)
      → Service → axios.post("/products", data)
        → json-server → saves to db.json
      → Service → returns response
    → Context → setProducts([...prev, newProduct])
  → Component → auto re-render
→ User sees updated UI
```

### .NET MVC to React Mapping

```
Models/Product.cs              →  types/product.types.ts
Services/ProductService.cs     →  services/product.service.ts
DI Container (Program.cs)     →  context/ProductContext.tsx
ProductController              →  pages/ProductXxxPage.tsx
Views/Product/Index.cshtml     →  pages/ProductListPage.tsx
Views/Product/Create.cshtml    →  pages/ProductCreatePage.tsx
Views/Product/Edit.cshtml      →  pages/ProductEditPage.tsx
Views/Product/Details.cshtml   →  pages/ProductDetailPage.tsx
Views/Shared/_Layout.cshtml    →  App.tsx (Navbar + Routes)
Views/Shared/_ProductCard      →  components/ProductCard.tsx
Program.cs MapRoute            →  App.tsx <Routes>
```

---

## 23. Best Practices and Common Mistakes

### State Rules

```tsx
// WRONG — direct mutation
user.name = "Karim";           // React won't detect this
items.push(4);                  // React won't detect this

// CORRECT — create new references
setUser({ ...user, name: "Karim" });
setItems([...items, 4]);
setItems(items.filter((i) => i !== 2));      // remove
setItems(items.map((i) => (i === 2 ? 20 : i))); // update
```

### useEffect Dependency Array

```tsx
// WRONG — missing dependency causes stale data
useEffect(() => { fetchProduct(id); }, []);  // id not in deps!

// CORRECT
useEffect(() => { fetchProduct(id); }, [id]);

// WRONG — infinite loop
useEffect(() => { setProducts([...data]); }, [data]); // new ref every render

// CORRECT
useEffect(() => { fetchData(); }, []); // run once
```

### && Operator Trap

```tsx
// WRONG — renders "0" on screen when count is 0
{count && <p>{count} items</p>}

// CORRECT — explicit boolean check
{count > 0 && <p>{count} items</p>}
```

### Key in Lists

```tsx
// WRONG — index key causes bugs with dynamic lists
{products.map((p, index) => <Card key={index} />)}

// CORRECT — unique id
{products.map((p) => <Card key={p.id} />)}
```

### Event Handler

```tsx
// WRONG — calls immediately on render
<button onClick={handleDelete(id)}>Delete</button>

// CORRECT — pass reference
<button onClick={() => handleDelete(id)}>Delete</button>
```

### Hooks Rules

```tsx
// WRONG — hooks inside conditions/loops
if (show) { const [x, setX] = useState(""); }

// CORRECT — always at top level
const [x, setX] = useState("");
useEffect(() => { if (show) { /* ... */ } }, [show]);
```

### API Call Best Practices

```tsx
// Always handle: loading + error + data
const [data, setData] = useState<T | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

// Use AbortController for cleanup
useEffect(() => {
  const controller = new AbortController();
  axios.get(url, { signal: controller.signal }).then(/* ... */);
  return () => controller.abort();
}, []);
```

### TypeScript

```tsx
// WRONG — defeats the purpose of TypeScript
const [data, setData] = useState<any>(null);

// CORRECT — proper types
const [data, setData] = useState<Product | null>(null);
```

---

## 24. Tips and Tricks

### Destructuring Everywhere

```tsx
// Long
function Card(props: CardProps) { return <h1>{props.product.name}</h1>; }

// Short
function Card({ product }: CardProps) {
  const { name, price } = product;
  return <h1>{name}</h1>;
}
```

### Optional Chaining and Nullish Coalescing

```tsx
const city = user?.address?.city ?? "Unknown";

// ?? vs || difference:
data.count || 10   // count=0 gives 10 (BUG!)
data.count ?? 10   // count=0 gives 0 (CORRECT)
```

### Object Lookup Instead of if/else

```tsx
// Long if/else chain
if (status === "active") return "green";
if (status === "pending") return "yellow";

// Clean object lookup
const colors: Record<string, string> = {
  active: "bg-green-500",
  pending: "bg-yellow-500",
  inactive: "bg-red-500",
};
const color = colors[status] ?? "bg-gray-300";
```

### Default Props

```tsx
function Button({
  variant = "primary",
  size = "md",
  disabled = false,
}: ButtonProps) {
  // Use directly, no extra variables needed
}
```

### Spread Props — Forward HTML Attributes

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function Input({ label, error, ...rest }: InputProps) {
  return (
    <div>
      <label>{label}</label>
      <input {...rest} />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

// Accepts any input attribute
<Input label="Email" type="email" placeholder="Enter email" required />
```

### Lazy State Initialization

```tsx
// WRONG — runs every render
const [data, setData] = useState(expensiveCalculation());

// CORRECT — runs only once
const [data, setData] = useState(() => expensiveCalculation());
```

### Functional State Update

```tsx
// WRONG — stale value in rapid updates
setCount(count + 1);
setCount(count + 1); // Both use same old value!

// CORRECT — always gets latest value
setCount((prev) => prev + 1);
setCount((prev) => prev + 1); // Correctly increments by 2
```

### Path Alias — Clean Imports

```json
// tsconfig.json
{ "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["src/*"] } } }
```

```tsx
// Before
import ProductCard from "../../../components/ProductCard";

// After
import ProductCard from "@/components/ProductCard";
```

### Console Debugging

```tsx
// Label your logs with object shorthand
console.log({ data, user, loading });
// Output: { data: [...], user: {...}, loading: false }

// Table for arrays
console.table(products);
```

### Constants File

```tsx
// src/constants/index.ts
export const ROLES = { ADMIN: "admin", USER: "user" } as const;
export const LIMITS = { MAX_CART: 10, PAGE_SIZE: 20 } as const;

// Usage
if (user.role === ROLES.ADMIN) { }
```

### Utility Functions

```tsx
// src/utils/format.ts
export const formatPrice = (price: number) => `${price.toLocaleString()} BDT`;
export const truncate = (text: string, max: number) =>
  text.length <= max ? text : text.slice(0, max) + "...";
```

### Early Return — Reduce Nesting

```tsx
// WRONG — deeply nested
function process(order: Order) {
  if (order) {
    if (order.items.length > 0) {
      if (order.isPaid) {
        return ship(order);
      }
    }
  }
}

// CORRECT — guard clauses
function process(order: Order) {
  if (!order) return "No order";
  if (order.items.length === 0) return "Empty";
  if (!order.isPaid) return "Unpaid";
  return ship(order);
}
```

### Stale Closure Fix

```tsx
// BUG — setTimeout captures old value
setTimeout(() => alert(count), 5000);

// FIX — useRef for latest value
const countRef = useRef(count);
countRef.current = count;
setTimeout(() => alert(countRef.current), 5000);
```

---

## 25. Learning Path

### Phase 1: Foundation

- Component, Props, State, Events
- useEffect, useRef, Custom Hooks
- React Router, Context API
- Form Handling, API Calls

### Phase 2: Professional

- React Query / TanStack Query (server state)
- Zustand (simple global state alternative to Redux)
- React Hook Form + Zod (professional forms)
- Error Boundary (production error handling)

### Phase 3: Advanced

- Next.js (full-stack React framework with SSR/SSG)
- Testing with React Testing Library + Vitest
- Storybook (component documentation)
- CI/CD with GitHub Actions

### Phase 4: Expert

- Performance Optimization (Profiler, Code Splitting, lazy loading)
- Design Patterns (Compound Components, Render Props, HOC)
- Monorepo with Turborepo
- Micro-frontend Architecture

---

## Quick Reference Cheatsheet

```
STATE:
  useState(value)                       → simple state
  useState(() => expensive())          → lazy init
  setState(prev => prev + 1)           → functional update
  { ...obj, key: newVal }             → object update
  [...arr, newItem]                    → array add
  arr.filter(i => i.id !== id)        → array remove
  arr.map(i => i.id === id ? new : i) → array update

EFFECT:
  useEffect(() => {}, [])              → mount (run once)
  useEffect(() => {}, [dep])           → run when dep changes
  useEffect(() => { return cleanup }, []) → unmount cleanup

HOOKS RULES:
  Always call at top level
  Never inside if/else/loops
  Only in components or custom hooks

PERFORMANCE:
  useMemo(() => value, [deps])         → cache computation
  useCallback((args) => fn, [deps])    → cache function
  React.memo(Component)                → cache component

ROUTING:
  useNavigate()                        → navigate programmatically
  useParams()                          → get URL parameters
  useSearchParams()                    → get query strings
  <Outlet />                           → render child routes

TYPESCRIPT:
  interface Props { }                  → define component props
  React.ChangeEvent<HTMLInputElement>  → input onChange event
  React.FormEvent<HTMLFormElement>     → form onSubmit event
  React.MouseEvent<HTMLButtonElement>  → button onClick event
```

---

> **Document Version:** 1.0
> **Last Updated:** March 2026
> **Target Audience:** .NET MVC developers learning React with TypeScript
