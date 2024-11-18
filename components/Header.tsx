
import Button from './Button'; 



type ButtonProps = {

    theme: "light" | "dark";
  
    onClick: () => void;

    toggleMode: () => void;
  
};

const Header = ({ theme, toggleMode }: ButtonProps) => {
    return (
        <header className='flex justify-center items-center container'>
            <h1 className={`${theme === 'light' ? 'text-[#222731]' : 'text-white'} text-[26px] font-bold `}>devfinder</h1>
            <Button 
                theme={theme}
                onClick={toggleMode}
            />
        </header>
    )
}

export default Header