import { useEffect, useSyncExternalStore, type ReactNode } from 'react'

type Theme = 'dark' | 'light'

const STORAGE_KEY = 'olon:theme'

function isTheme(value: unknown): value is Theme {
  return value === 'dark' || value === 'light'
}

function resolveInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'

  const fromDom = document.documentElement.getAttribute('data-theme')
  if (isTheme(fromDom)) return fromDom

  try {
    const fromStorage = window.localStorage.getItem(STORAGE_KEY)
    if (isTheme(fromStorage)) return fromStorage
  } catch {
    // localStorage unavailable
  }

  return 'light'
}

const listeners = new Set<() => void>()
let currentTheme: Theme =
  typeof window !== 'undefined' ? resolveInitialTheme() : 'light'

function emit(): void {
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot(): Theme {
  return currentTheme
}

function getServerSnapshot(): Theme {
  return 'light'
}

function applyToDom(theme: Theme): void {
  if (typeof document === 'undefined') return
  if (document.documentElement.getAttribute('data-theme') !== theme) {
    document.documentElement.setAttribute('data-theme', theme)
  }
}

function persist(theme: Theme): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // storage quota / disabled
  }
}

export function setTheme(next: Theme): void {
  if (currentTheme === next) return
  currentTheme = next
  applyToDom(next)
  persist(next)
  emit()
}

export function toggleTheme(): void {
  setTheme(currentTheme === 'dark' ? 'light' : 'dark')
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return { theme, setTheme, toggleTheme }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    applyToDom(currentTheme)
  }, [])
  return <>{children}</>
}
