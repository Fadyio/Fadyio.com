import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import * as React from 'react'

export function ModeToggle() {
  const [theme, setThemeState] = React.useState<'light' | 'dark'>('light')

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setThemeState(isDarkMode ? 'dark' : 'light')
  }, [])

  React.useEffect(() => {
    const isDark = theme === 'dark'

    document.documentElement.classList.add('disable-transitions')

    document.documentElement.classList[isDark ? 'add' : 'remove']('dark')

    window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('opacity')

    requestAnimationFrame(() => {
      document.documentElement.classList.remove('disable-transitions')
    })
  }, [theme])

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="group"
      title="Toggle theme"
      onClick={toggleTheme}
    >
      <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
