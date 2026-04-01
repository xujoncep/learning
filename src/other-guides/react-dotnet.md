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
7. [useEffect — Component Lifecycle](#7-useeffect--component-lifecycle)
8. [API Calls — fetch / axios](#8-api-calls--fetch--axios)
9. [useReducer — Complex State Management](#9-usereducer--complex-state-management)
10. [Project Structure](#10-project-structure)
11. [React Router — Navigation](#11-react-router--navigation)
12. [Context API — Global State](#12-context-api--global-state)
13. [Protected Routes — Authorization](#13-protected-routes--authorization)
14. [useRef — DOM Access and Mutable Values](#14-useref--dom-access-and-mutable-values)
15. [useMemo and useCallback — Performance](#15-usememo-and-usecallback--performance)
16. [Custom Hooks — Reusable Logic](#16-custom-hooks--reusable-logic)
17. [Form Handling — React Hook Form](#17-form-handling--react-hook-form)
18. [Lifting State Up and Composition](#18-lifting-state-up-and-composition)
19. [Error Handling — Error Boundary](#19-error-handling--error-boundary)
20. [Styling Approaches](#20-styling-approaches)
21. [Deployment and Build](#21-deployment-and-build)
22. [Redux Toolkit — State Management](#22-redux-toolkit--state-management)
23. [Best Practices and Common Mistakes](#23-best-practices-and-common-mistakes)
24. [Tips and Tricks](#24-tips-and-tricks)
25. [VS Code Setup — Extensions and Shortcuts](#25-vs-code-setup--extensions-and-shortcuts)
26. [Learning Path](#26-learning-path)
27. [CRUD Application — Full Project (Context API)](#27-crud-application--full-project-context-api)
28. [CRUD Application — Without Context API (Props Version)](#28-crud-application--without-context-api-props-version)

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

## 7. useEffect — Component Lifecycle

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

## 8. API Calls — fetch / axios

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

## 9. useReducer — Complex State Management

### Why useReducer?

`useState` যখন simple state এর জন্য যথেষ্ট, তখন complex state logic এর জন্য `useReducer` better choice। এটা .NET এর **Command Pattern / CQRS** এর মতো কাজ করে।

### Comparison

| Aspect | C# | React useReducer |
|---|---|---|
| State container | ViewModel / Entity | `state` object |
| Command | Command class / MediatR Request | `action` object |
| Handler | Command Handler | `reducer` function |
| Dispatch | `mediator.Send(command)` | `dispatch(action)` |

### useState vs useReducer

| | useState | useReducer |
|---|---|---|
| Best for | Simple, independent values | Complex, related state |
| Update logic | Inline in event handler | Centralized in reducer |
| Multiple actions | Multiple `setState` calls | Single `dispatch` |
| Debugging | Hard to trace | Easy — all logic in one place |
| C# equivalent | Property setter | Command Handler |

### Basic Example — Counter

```tsx
import { useReducer } from "react";

// Action types — Command definitions
type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "SET"; payload: number };

// State type
interface CounterState {
  count: number;
}

// Reducer — Command Handler (pure function)
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    case "SET":
      return { count: action.payload };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <h2>Count: {state.count}</h2>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      <button onClick={() => dispatch({ type: "SET", payload: 100 })}>Set 100</button>
    </div>
  );
}
```

### Real Example — Form State Management

```tsx
interface FormState {
  name: string;
  email: string;
  isSubmitting: boolean;
  error: string | null;
}

type FormAction =
  | { type: "SET_FIELD"; field: string; value: string }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; error: string }
  | { type: "RESET" };

const initialState: FormState = {
  name: "",
  email: "",
  isSubmitting: false,
  error: null,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value, error: null };
    case "SUBMIT_START":
      return { ...state, isSubmitting: true, error: null };
    case "SUBMIT_SUCCESS":
      return { ...initialState }; // Reset form
    case "SUBMIT_ERROR":
      return { ...state, isSubmitting: false, error: action.error };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

function ContactForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT_START" });
    try {
      await axios.post("/api/contact", { name: state.name, email: state.email });
      dispatch({ type: "SUBMIT_SUCCESS" });
    } catch {
      dispatch({ type: "SUBMIT_ERROR", error: "Failed to submit" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {state.error && <p className="text-red-500">{state.error}</p>}
      <input
        value={state.name}
        onChange={(e) => dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })}
      />
      <input
        value={state.email}
        onChange={(e) => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })}
      />
      <button disabled={state.isSubmitting}>
        {state.isSubmitting ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}
```

### useReducer + Context — Scalable State Management

```tsx
// Context + useReducer = mini Redux (without extra library)
const TodoContext = createContext<{
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
} | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}
```

### When to Use Which

```
useState     →  Simple values (string, number, boolean)
             →  Independent state (toggle, input value)
             →  1-2 state variables

useReducer   →  Complex objects with multiple fields
             →  State transitions depend on previous state
             →  Multiple related actions (CRUD operations)
             →  Shared logic via Context + useReducer
```

---

## 10. Project Structure

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

## 11. React Router — Navigation

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

## 12. Context API — Global State

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

## 13. Protected Routes — Authorization

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

## 14. useRef — DOM Access and Mutable Values

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

## 15. useMemo and useCallback — Performance

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

## 16. Custom Hooks — Reusable Logic

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

## 17. Form Handling — React Hook Form

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

## 18. Lifting State Up and Composition

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

## 19. Error Handling — Error Boundary

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

## 20. Styling Approaches

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

## 21. Deployment and Build

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

## 22. Redux Toolkit — State Management

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

## 25. VS Code Setup — Extensions and Shortcuts

### Must-Have Extensions

| Extension | কী করে | Install Command |
| --- | --- | --- |
| **ES7+ React/Redux/React-Native snippets** | React component snippets (`rafce`, `rfc` etc.) | `dsznajder.es7-react-js-snippets` |
| **Prettier - Code formatter** | Auto format on save | `esbenp.prettier-vscode` |
| **ESLint** | Code error ও warning দেখায় | `dbaeumer.vscode-eslint` |
| **Tailwind CSS IntelliSense** | Tailwind class autocomplete | `bradlc.vscode-tailwindcss` |
| **Auto Rename Tag** | Opening tag change করলে closing tag auto change | `formulahendry.auto-rename-tag` |
| **Error Lens** | Error inline এ দেখায় (line এর পাশে) | `usernamehw.errorlens` |
| **Thunder Client** | Postman alternative (VS Code এর ভিতরে API test) | `rangav.vscode-thunder-client` |
| **Pretty TypeScript Errors** | TypeScript error সুন্দর করে দেখায় | `yoavbls.pretty-ts-errors` |

> **Install করতে:** `Ctrl+Shift+X` → extension name search → Install

### Optional But Useful Extensions

| Extension | কী করে |
| --- | --- |
| **Import Cost** | Import এর size দেখায় (bundle size aware) |
| **GitLens** | Git blame inline দেখায় |
| **Console Ninja** | console.log output editor এর মধ্যে দেখায় |
| **Turbo Console Log** | Shortcut দিয়ে console.log generate করে |

### React Snippets — ES7+ Extension

> এই snippets গুলো `ES7+ React/Redux/React-Native snippets` extension install করলে কাজ করবে।

| Snippet | কী Generate করে |
| --- | --- |
| `rafce` | React Arrow Function Component (with export) |
| `rfc` | React Function Component |
| `rfce` | React Function Component (with export) |
| `rcc` | React Class Component |
| `imp` | `import moduleName from 'module'` |
| `imd` | `import { destructured } from 'module'` |
| `useState` → `usf` | `const [value, setValue] = useState(initial)` |
| `useEffect` → `uef` | `useEffect(() => { }, [])` |
| `useContext` → `ucx` | `const value = useContext(MyContext)` |
| `useRef` → `urf` | `const ref = useRef(initial)` |
| `useMemo` → `umm` | `const value = useMemo(() => compute, [deps])` |
| `useCallback` → `ucb` | `const fn = useCallback(() => {}, [deps])` |

**Example — `rafce` type করে Tab চাপলে:**

```tsx
const ComponentName = () => {
  return (
    <div>ComponentName</div>
  );
};

export default ComponentName;
```

### Essential Keyboard Shortcuts

| Shortcut | কাজ | Category |
| --- | --- | --- |
| `Ctrl+P` | Quick file open (file name search) | Navigation |
| `Ctrl+Shift+P` | Command Palette (সব command) | Navigation |
| `Ctrl+B` | Sidebar toggle | Layout |
| `` Ctrl+` `` | Terminal toggle | Terminal |
| `Ctrl+Shift+E` | Explorer panel focus | Navigation |
| `Ctrl+Shift+F` | Search across all files | Search |
| `Ctrl+Shift+H` | Search and Replace across files | Search |
| `F12` | Go to Definition | Code Navigation |
| `Alt+F12` | Peek Definition (inline preview) | Code Navigation |
| `Shift+F12` | Find All References | Code Navigation |
| `F2` | Rename Symbol (সব জায়গায় rename) | Refactor |
| `Ctrl+D` | Select next occurrence (multi-cursor) | Multi-cursor |
| `Ctrl+Shift+L` | Select ALL occurrences | Multi-cursor |
| `Alt+Up/Down` | Move line up/down | Editing |
| `Shift+Alt+Up/Down` | Copy line up/down | Editing |
| `Ctrl+Shift+K` | Delete entire line | Editing |
| `Ctrl+/` | Toggle line comment | Editing |
| `Shift+Alt+F` | Format document (Prettier) | Formatting |
| `Ctrl+Space` | Trigger IntelliSense | Autocomplete |
| `Ctrl+.` | Quick Fix / Suggestions | Refactor |
| `Ctrl+Shift+O` | Go to Symbol in file | Navigation |
| `Ctrl+G` | Go to Line number | Navigation |
| `Ctrl+W` | Close current tab | Tab |
| `Ctrl+Tab` | Switch between open tabs | Tab |
| `Ctrl+\` | Split editor | Layout |

### Multi-Cursor Shortcuts — সবচেয়ে Powerful Feature

```text
Ctrl+D          →  Same word পরেরটা select করে (repeatedly press)
Ctrl+Shift+L    →  Same word সব একবারে select
Alt+Click       →  যেকোনো জায়গায় cursor add
Shift+Alt+Down  →  নিচে cursor add
Ctrl+U          →  Last cursor selection undo
```

**Use Case:** Variable rename, className change, multiple imports — একবারে সব জায়গায়।

### Emmet Shortcuts — JSX তে কাজ করে

| Shortcut | Output |
| --- | --- |
| `div.container` + Tab | `<div className="container"></div>` |
| `ul>li*3` + Tab | `<ul><li></li><li></li><li></li></ul>` |
| `button.btn.btn-primary` + Tab | `<button className="btn btn-primary"></button>` |
| `input:text` + Tab | `<input type="text" />` |
| `.card>.card-body>h5+p` + Tab | Nested structure with classes |

> **Note:** Emmet React এ default কাজ করে। যদি না করে, `settings.json` এ add করুন:

```json
{
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  }
}
```

### Recommended VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": true,
  "editor.minimap.enabled": false,
  "explorer.confirmDelete": false,
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  },
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always"
}
```

> `Ctrl+Shift+P` → "Open User Settings (JSON)" → paste করুন।

---

## 26. Learning Path

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

## 27. CRUD Application — Full Project (Context API)

> এই section এ একটি complete Product CRUD application এর full code দেওয়া হলো।
> সব concept যা আগের sections এ শেখা হয়েছে — সব এখানে practically apply করা হয়েছে।

### Tech Stack

- **React + TypeScript + Vite** — Frontend
- **Context API** — State Management
- **json-server** — Mock Backend (fake REST API)
- **Tailwind CSS** — Styling
- **React Router** — Navigation
- **axios** — HTTP Calls

### Project Structure

```
product-crud/
├── db.json                   — json-server database
├── package.json
├── src/
│   ├── types/
│   │   └── product.types.ts  — Models (C# Model class)
│   ├── services/
│   │   └── product.service.ts — API calls (C# Service layer)
│   ├── context/
│   │   └── ProductContext.tsx — Global state (C# DI Container)
│   ├── components/
│   │   ├── Navbar.tsx        — Navigation bar
│   │   ├── ProductCard.tsx   — Single product card (Partial View)
│   │   ├── ProductForm.tsx   — Create/Edit form (shared)
│   │   └── Spinner.tsx       — Loading indicator
│   ├── pages/
│   │   ├── ProductListPage.tsx   — Index (list all)
│   │   ├── ProductCreatePage.tsx — Create new
│   │   ├── ProductEditPage.tsx   — Edit existing
│   │   └── ProductDetailPage.tsx — Details view
│   ├── App.tsx               — Router setup (Program.cs)
│   ├── main.tsx              — Entry point
│   └── index.css             — Tailwind import
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
Views/Shared/_Layout.cshtml    →  App.tsx (Navbar + Outlet)
Views/Shared/_ProductCard      →  components/ProductCard.tsx
Program.cs MapRoute            →  App.tsx <Routes>
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

---

### File 1: `db.json` — Mock Database

```json
{
  "products": [
    {
      "id": 1,
      "name": "Laptop",
      "description": "High performance laptop for developers",
      "price": 75000,
      "inStock": true
    },
    {
      "id": 2,
      "name": "Wireless Mouse",
      "description": "Ergonomic wireless mouse",
      "price": 1500,
      "inStock": true
    },
    {
      "id": 3,
      "name": "Mechanical Keyboard",
      "description": "RGB mechanical keyboard with Cherry MX switches",
      "price": 8500,
      "inStock": false
    }
  ]
}
```

**Run json-server:**

```bash
npx json-server db.json --port 3001
```

> এটা `http://localhost:3001/products` এ REST API দেবে — GET, POST, PUT, DELETE সব support করে।

---

### File 2: `src/types/product.types.ts` — Models

```tsx
// C# Model class equivalent
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
}

// CreateProductDto — POST/PUT request body
export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  inStock: boolean;
}
```

---

### File 3: `src/services/product.service.ts` — API Layer

```tsx
// C# ProductService.cs equivalent
import axios from "axios";
import { Product, ProductFormData } from "../types/product.types";

const API_URL = "http://localhost:3001/products";

export const productService = {
  // GET /products — GetAll()
  getAll: async (): Promise<Product[]> => {
    const res = await axios.get<Product[]>(API_URL);
    return res.data;
  },

  // GET /products/:id — GetById(id)
  getById: async (id: number): Promise<Product> => {
    const res = await axios.get<Product>(`${API_URL}/${id}`);
    return res.data;
  },

  // POST /products — Create(dto)
  create: async (data: ProductFormData): Promise<Product> => {
    const res = await axios.post<Product>(API_URL, data);
    return res.data;
  },

  // PUT /products/:id — Update(id, dto)
  update: async (id: number, data: ProductFormData): Promise<Product> => {
    const res = await axios.put<Product>(`${API_URL}/${id}`, data);
    return res.data;
  },

  // DELETE /products/:id — Delete(id)
  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};
```

---

### File 4: `src/context/ProductContext.tsx` — Global State

```tsx
// C# DI Container + Service Registration equivalent
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Product, ProductFormData } from "../types/product.types";
import { productService } from "../services/product.service";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (data: ProductFormData) => Promise<void>;
  updateProduct: (id: number, data: ProductFormData) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  getProduct: (id: number) => Promise<Product>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all products on mount — like Constructor/OnInitialized
  useEffect(() => {
    const load = async () => {
      try {
        const data = await productService.getAll();
        setProducts(data);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const addProduct = useCallback(async (data: ProductFormData) => {
    const newProduct = await productService.create(data);
    setProducts((prev) => [...prev, newProduct]);
  }, []);

  const updateProduct = useCallback(async (id: number, data: ProductFormData) => {
    const updated = await productService.update(id, data);
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
  }, []);

  const deleteProduct = useCallback(async (id: number) => {
    await productService.delete(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const getProduct = useCallback(async (id: number) => {
    return await productService.getById(id);
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, loading, error, addProduct, updateProduct, deleteProduct, getProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

// Custom hook — useAuth() pattern এর মতো
export function useProducts(): ProductContextType {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within ProductProvider");
  return context;
}
```

---

### File 5: `src/components/Spinner.tsx` — Loading Component

```tsx
export default function Spinner() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
```

---

### File 6: `src/components/Navbar.tsx` — Navigation

```tsx
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-white bg-blue-700 px-4 py-2 rounded"
      : "text-blue-200 hover:text-white px-4 py-2";

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-white text-xl font-bold">Product CRUD</h1>
        <div className="flex gap-2">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/products" className={linkClass}>Products</NavLink>
          <NavLink to="/products/create" className={linkClass}>Add New</NavLink>
        </div>
      </div>
    </nav>
  );
}
```

---

### File 7: `src/components/ProductCard.tsx` — Product Card

```tsx
import { Link } from "react-router-dom";
import { Product } from "../types/product.types";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  const handleDelete = () => {
    if (window.confirm(`"${product.name}" delete করতে চান?`)) {
      onDelete(product.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            product.inStock
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <p className="text-gray-500 text-sm mb-3 line-clamp-2">
        {product.description}
      </p>

      <p className="text-xl font-bold text-blue-600 mb-4">
        {product.price.toLocaleString()} BDT
      </p>

      <div className="flex gap-2">
        <Link
          to={`/products/${product.id}`}
          className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
        >
          <FaEye /> Details
        </Link>
        <Link
          to={`/products/edit/${product.id}`}
          className="flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 text-sm"
        >
          <FaEdit /> Edit
        </Link>
        <button
          onClick={handleDelete}
          className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
}
```

---

### File 8: `src/components/ProductForm.tsx` — Shared Form

```tsx
// Create এবং Edit দুই page এ same form use হয়
// C# তে Partial View দিয়ে form reuse করতাম — same concept
import { useState, FormEvent, useEffect } from "react";
import { ProductFormData } from "../types/product.types";

interface ProductFormProps {
  initialData?: ProductFormData;       // Edit mode এ existing data আসবে
  onSubmit: (data: ProductFormData) => Promise<void>;
  submitLabel: string;                  // "Create" or "Update"
}

const emptyForm: ProductFormData = {
  name: "",
  description: "",
  price: 0,
  inStock: true,
};

export default function ProductForm({
  initialData,
  onSubmit,
  submitLabel,
}: ProductFormProps) {
  const [form, setForm] = useState<ProductFormData>(initialData ?? emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // initialData change হলে form update করো (Edit page এ async load হয়)
  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Simple validation
    if (!form.name.trim()) {
      setError("Product name is required");
      return;
    }
    if (form.price <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(form);
    } catch {
      setError("Operation failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter product name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter product description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price (BDT)
        </label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          min={0}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="inStock"
          checked={form.inStock}
          onChange={handleChange}
          className="w-4 h-4 text-blue-600 rounded"
        />
        <label className="text-sm text-gray-700">In Stock</label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
      >
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
```

---

### File 9: `src/pages/ProductListPage.tsx` — Index Page

```tsx
// C# — ProductController.Index() + Views/Product/Index.cshtml equivalent
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import { useState } from "react";

export default function ProductListPage() {
  const { products, loading, error, deleteProduct } = useProducts();
  const [search, setSearch] = useState("");

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Products ({filtered.length})
        </h2>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={deleteProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

---

### File 10: `src/pages/ProductCreatePage.tsx` — Create Page

```tsx
// C# — ProductController.Create() + Views/Product/Create.cshtml equivalent
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductForm from "../components/ProductForm";
import { ProductFormData } from "../types/product.types";

export default function ProductCreatePage() {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const handleSubmit = async (data: ProductFormData) => {
    await addProduct(data);
    navigate("/products"); // RedirectToAction("Index") equivalent
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add New Product
      </h2>
      <ProductForm onSubmit={handleSubmit} submitLabel="Create Product" />
    </div>
  );
}
```

---

### File 11: `src/pages/ProductEditPage.tsx` — Edit Page

```tsx
// C# — ProductController.Edit(id) + Views/Product/Edit.cshtml equivalent
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductForm from "../components/ProductForm";
import Spinner from "../components/Spinner";
import { ProductFormData } from "../types/product.types";

export default function ProductEditPage() {
  const { id } = useParams<{ id: string }>();
  const { updateProduct, getProduct } = useProducts();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState<ProductFormData | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const product = await getProduct(Number(id));
        setInitialData({
          name: product.name,
          description: product.description,
          price: product.price,
          inStock: product.inStock,
        });
      } catch {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, getProduct]);

  const handleSubmit = async (data: ProductFormData) => {
    await updateProduct(Number(id), data);
    navigate("/products");
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Edit Product
      </h2>
      <ProductForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Update Product"
      />
    </div>
  );
}
```

---

### File 12: `src/pages/ProductDetailPage.tsx` — Details Page

```tsx
// C# — ProductController.Details(id) + Views/Product/Details.cshtml equivalent
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { Product } from "../types/product.types";
import Spinner from "../components/Spinner";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProduct(Number(id));
        setProduct(data);
      } catch {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, getProduct]);

  const handleDelete = async () => {
    if (!product) return;
    if (window.confirm(`"${product.name}" delete করতে চান?`)) {
      await deleteProduct(product.id);
      navigate("/products");
    }
  };

  if (loading) return <Spinner />;
  if (error || !product) {
    return <p className="text-center text-red-500 py-10">{error ?? "Not found"}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        to="/products"
        className="inline-flex items-center gap-1 text-blue-600 hover:underline mb-6"
      >
        <FaArrowLeft /> Back to Products
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              product.inStock
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <p className="text-gray-600 mb-4">{product.description}</p>

        <p className="text-3xl font-bold text-blue-600 mb-6">
          {product.price.toLocaleString()} BDT
        </p>

        <div className="flex gap-3">
          <Link
            to={`/products/edit/${product.id}`}
            className="flex items-center gap-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            <FaEdit /> Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

### File 13: `src/App.tsx` — Router Setup

```tsx
// C# — Program.cs route configuration equivalent
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import Navbar from "./components/Navbar";
import ProductListPage from "./pages/ProductListPage";
import ProductCreatePage from "./pages/ProductCreatePage";
import ProductEditPage from "./pages/ProductEditPage";
import ProductDetailPage from "./pages/ProductDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/create" element={<ProductCreatePage />} />
            <Route path="/products/edit/:id" element={<ProductEditPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="*" element={<p className="text-center text-xl">404 — Page Not Found</p>} />
          </Routes>
        </main>
      </ProductProvider>
    </BrowserRouter>
  );
}
```

---

### File 14: `src/main.tsx` — Entry Point

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

---

### File 15: `src/index.css` — Tailwind Import

```css
@import "tailwindcss";
```

---

### File 16: `vite.config.ts`

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

---

### File 17: `package.json` — Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "server": "json-server db.json --port 3001"
  }
}
```

> **Run করতে:** একটা terminal এ `npm run server` (API), আরেকটায় `npm run dev` (React app)

---

### Summary — কোন file কী কাজ করে

```
types/product.types.ts     →  Data structure define (Model)
services/product.service.ts →  API calls (axios GET/POST/PUT/DELETE)
context/ProductContext.tsx  →  Global state + business logic (DI Container)
components/Spinner.tsx      →  Loading indicator
components/Navbar.tsx       →  Navigation bar with active link
components/ProductCard.tsx  →  Single product display (Partial View)
components/ProductForm.tsx  →  Shared form for Create + Edit
pages/ProductListPage.tsx   →  List all products with search
pages/ProductCreatePage.tsx →  Create new product
pages/ProductEditPage.tsx   →  Edit existing product
pages/ProductDetailPage.tsx →  View product details
App.tsx                     →  Router + Layout (Program.cs)
main.tsx                    →  Entry point (renders App)
db.json                     →  Fake database for json-server
```

---

## 28. CRUD Application — Without Context API (Props Version)

> এটা Section 27 এর same application — কিন্তু **Context API ছাড়া**।
> সব state `App.tsx` এ থাকবে এবং props দিয়ে child components এ pass হবে।
> দুইটা version compare করলে বুঝবেন কেন Context API দরকার হয়।

### Context API vs Props — Key Difference

```text
Context API Version (Section 27):
  App.tsx → ProductProvider wraps everything
    → Pages use useProducts() hook — কোনো props লাগে না
    → যেকোনো component সরাসরি data access করতে পারে

Props Version (This Section):
  App.tsx → সব state এখানে (products, loading, error)
    → Props দিয়ে pages এ পাঠায়
    → Pages আবার props দিয়ে components এ পাঠায়
    → এটাই "Prop Drilling" — যত deep, তত বেশি props pass
```

### Project Structure

```text
product-crud-props/
├── db.json                   — same as before
├── src/
│   ├── types/
│   │   └── product.types.ts  — same as before
│   ├── services/
│   │   └── product.service.ts — same as before
│   ├── components/
│   │   ├── Navbar.tsx         — same as before
│   │   ├── ProductCard.tsx    — same (already uses props)
│   │   ├── ProductForm.tsx    — same (already uses props)
│   │   └── Spinner.tsx        — same
│   ├── pages/
│   │   ├── ProductListPage.tsx   — props থেকে data নেয়
│   │   ├── ProductCreatePage.tsx — props থেকে addProduct নেয়
│   │   ├── ProductEditPage.tsx   — props থেকে updateProduct নেয়
│   │   └── ProductDetailPage.tsx — props থেকে data নেয়
│   ├── App.tsx               — সব state এখানে! (বড় পার্থক্য)
│   └── main.tsx              — same
```

> **Note:** `types/`, `services/`, `components/` — এগুলো Section 27 এর সাথে exactly same। শুধু **App.tsx** এবং **pages/** গুলো আলাদা।

---

### File 1: `src/App.tsx` — All State Lives Here

```tsx
// Context API version এ state ছিল ProductContext.tsx তে
// Props version এ সব state App.tsx তে — এটাই মূল পার্থক্য
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Product, ProductFormData } from "./types/product.types";
import { productService } from "./services/product.service";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import ProductListPage from "./pages/ProductListPage";
import ProductCreatePage from "./pages/ProductCreatePage";
import ProductEditPage from "./pages/ProductEditPage";
import ProductDetailPage from "./pages/ProductDetailPage";

export default function App() {
  // সব state এখানে — Context API তে এগুলো ProductContext.tsx তে ছিল
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all products on mount
  useEffect(() => {
    const load = async () => {
      try {
        const data = await productService.getAll();
        setProducts(data);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // CRUD functions — Context API version এ এগুলো ProductContext এ ছিল
  const addProduct = useCallback(async (data: ProductFormData) => {
    const newProduct = await productService.create(data);
    setProducts((prev) => [...prev, newProduct]);
  }, []);

  const updateProduct = useCallback(async (id: number, data: ProductFormData) => {
    const updated = await productService.update(id, data);
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
  }, []);

  const deleteProduct = useCallback(async (id: number) => {
    await productService.delete(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const getProduct = useCallback(async (id: number) => {
    return await productService.getById(id);
  }, []);

  // Loading state
  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <BrowserRouter>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />

          {/* প্রতিটা page এ props pass করতে হচ্ছে — এটাই prop drilling */}
          <Route
            path="/products"
            element={
              <ProductListPage
                products={products}
                onDelete={deleteProduct}
              />
            }
          />
          <Route
            path="/products/create"
            element={<ProductCreatePage onAdd={addProduct} />}
          />
          <Route
            path="/products/edit/:id"
            element={
              <ProductEditPage
                onUpdate={updateProduct}
                onGetProduct={getProduct}
              />
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProductDetailPage
                onDelete={deleteProduct}
                onGetProduct={getProduct}
              />
            }
          />
          <Route path="*" element={<p className="text-center text-xl">404 — Page Not Found</p>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
```

---

### File 2: `src/pages/ProductListPage.tsx`

```tsx
// Context API version: const { products, deleteProduct } = useProducts();
// Props version: products এবং onDelete props দিয়ে আসছে
import { useState } from "react";
import { Product } from "../types/product.types";
import ProductCard from "../components/ProductCard";

interface ProductListPageProps {
  products: Product[];
  onDelete: (id: number) => Promise<void>;
}

export default function ProductListPage({ products, onDelete }: ProductListPageProps) {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Products ({filtered.length})
        </h2>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

---

### File 3: `src/pages/ProductCreatePage.tsx`

```tsx
// Context API version: const { addProduct } = useProducts();
// Props version: onAdd prop দিয়ে আসছে
import { useNavigate } from "react-router-dom";
import { ProductFormData } from "../types/product.types";
import ProductForm from "../components/ProductForm";

interface ProductCreatePageProps {
  onAdd: (data: ProductFormData) => Promise<void>;
}

export default function ProductCreatePage({ onAdd }: ProductCreatePageProps) {
  const navigate = useNavigate();

  const handleSubmit = async (data: ProductFormData) => {
    await onAdd(data);
    navigate("/products");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add New Product
      </h2>
      <ProductForm onSubmit={handleSubmit} submitLabel="Create Product" />
    </div>
  );
}
```

---

### File 4: `src/pages/ProductEditPage.tsx`

```tsx
// Context API version: const { updateProduct, getProduct } = useProducts();
// Props version: onUpdate, onGetProduct props দিয়ে আসছে
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product, ProductFormData } from "../types/product.types";
import ProductForm from "../components/ProductForm";
import Spinner from "../components/Spinner";

interface ProductEditPageProps {
  onUpdate: (id: number, data: ProductFormData) => Promise<void>;
  onGetProduct: (id: number) => Promise<Product>;
}

export default function ProductEditPage({ onUpdate, onGetProduct }: ProductEditPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState<ProductFormData | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const product = await onGetProduct(Number(id));
        setInitialData({
          name: product.name,
          description: product.description,
          price: product.price,
          inStock: product.inStock,
        });
      } catch {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, onGetProduct]);

  const handleSubmit = async (data: ProductFormData) => {
    await onUpdate(Number(id), data);
    navigate("/products");
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Edit Product
      </h2>
      <ProductForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Update Product"
      />
    </div>
  );
}
```

---

### File 5: `src/pages/ProductDetailPage.tsx`

```tsx
// Context API version: const { getProduct, deleteProduct } = useProducts();
// Props version: onGetProduct, onDelete props দিয়ে আসছে
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Product } from "../types/product.types";
import Spinner from "../components/Spinner";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";

interface ProductDetailPageProps {
  onDelete: (id: number) => Promise<void>;
  onGetProduct: (id: number) => Promise<Product>;
}

export default function ProductDetailPage({ onDelete, onGetProduct }: ProductDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await onGetProduct(Number(id));
        setProduct(data);
      } catch {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, onGetProduct]);

  const handleDelete = async () => {
    if (!product) return;
    if (window.confirm(`"${product.name}" delete করতে চান?`)) {
      await onDelete(product.id);
      navigate("/products");
    }
  };

  if (loading) return <Spinner />;
  if (error || !product) {
    return <p className="text-center text-red-500 py-10">{error ?? "Not found"}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        to="/products"
        className="inline-flex items-center gap-1 text-blue-600 hover:underline mb-6"
      >
        <FaArrowLeft /> Back to Products
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              product.inStock
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <p className="text-gray-600 mb-4">{product.description}</p>

        <p className="text-3xl font-bold text-blue-600 mb-6">
          {product.price.toLocaleString()} BDT
        </p>

        <div className="flex gap-3">
          <Link
            to={`/products/edit/${product.id}`}
            className="flex items-center gap-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            <FaEdit /> Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

### Context API vs Props — Side by Side Comparison

| বিষয় | Context API (Section 27) | Props (Section 28) |
| --- | --- | --- |
| State কোথায়? | `ProductContext.tsx` | `App.tsx` |
| Data access | `useProducts()` hook call | Props দিয়ে pass |
| Page component | Clean — no props needed | Props interface লাগে |
| App.tsx | Clean — just Provider wrap | বড় — সব state + props |
| New page add | শুধু `useProducts()` call | App.tsx এ নতুন props add |
| Scalability | ভালো — decouple | Prop drilling সমস্যা |
| Setup complexity | বেশি (Context + Provider) | কম |

### কোনটা কখন Use করবেন?

```text
Props Version ভালো যখন:
  - ছোট app (3-4 টা component)
  - Simple parent → child data flow
  - শেখার জন্য (basics বুঝতে)

Context API ভালো যখন:
  - বড় app (অনেক component)
  - Deep nested components data চায়
  - Multiple pages এ same data লাগে
  - Prop drilling headache হচ্ছে
```

### Prop Drilling সমস্যা — Visual

```text
Props Version:
  App.tsx (state owner)
    ↓ products, onDelete, onAdd, onUpdate, onGetProduct (5 props!)
    Routes
      ↓ products, onDelete
      ProductListPage
        ↓ product, onDelete
        ProductCard (finally uses it!)

Context API Version:
  App.tsx
    ProductProvider (state owner)
      Routes
        ProductListPage
          const { products, deleteProduct } = useProducts();  ← সরাসরি!
          ProductCard
```

> **শেখার Tip:** আগে Props version বানান, তারপর Context API version এ convert করুন। তাহলে বুঝবেন কেন Context API দরকার হয়!

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
