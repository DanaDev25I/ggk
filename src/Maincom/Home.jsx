import { useTheme } from 'next-themes';
import { Switch } from '@nextui-org/react'; 
import { SunIcon,MoonIcon } from 'lucide-react';

function Home() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (isChecked) => {
    setTheme(isChecked ? 'dark' : 'light');
  };

  return (
    <div>
      {/* Theme Switch */}
      <Switch
        defaultSelected={theme === 'dark'}
        size="lg"
        color="secondary"
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
        onChange={(e) => handleThemeChange(e.target.checked)}
        className="ml-4"
      />
    </div>
  );
}

export default Home;
