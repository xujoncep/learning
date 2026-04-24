import { Link, useNavigate } from 'react-router-dom';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LayoutDashboard, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth, avatarColor, initials } from '@/lib/auth';

export function UserMenu() {
  const { displayName, logout } = useAuth();
  const navigate = useNavigate();

  const color = avatarColor(displayName);
  const label = initials(displayName);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="Open user menu"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-surface font-serif text-sm font-semibold shadow-soft-1 border border-line-2 hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
          style={{ background: color }}
        >
          {label}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          align="end"
          className="z-50 min-w-[220px] rounded-xl border border-line bg-surface-2 p-1.5 shadow-soft-3 animate-fade-in"
        >
          <div className="px-3 py-2.5 border-b border-line/70 mb-1">
            <div className="text-[11px] uppercase tracking-[0.04em] text-ink-4">Signed in as</div>
            <div className="font-serif text-base text-ink mt-0.5 leading-tight">{displayName}</div>
          </div>
          <DropdownMenu.Item asChild>
            <Link
              to="/dashboard"
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-ink-2 hover:bg-sand-2 transition-colors cursor-pointer outline-none data-[highlighted]:bg-sand-2"
            >
              <LayoutDashboard className="h-4 w-4 text-ink-4" />
              Dashboard
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Link
              to="/sections/gate-cse"
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-ink-2 hover:bg-sand-2 transition-colors cursor-pointer outline-none data-[highlighted]:bg-sand-2"
            >
              <UserIcon className="h-4 w-4 text-ink-4" />
              My course
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="my-1 h-px bg-line/70" />
          <DropdownMenu.Item
            onSelect={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-ink-2 hover:bg-sand-2 transition-colors cursor-pointer outline-none data-[highlighted]:bg-sand-2"
          >
            <LogOut className="h-4 w-4 text-ink-4" />
            Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
