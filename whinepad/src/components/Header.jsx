import Logo from './Logo.jsx';
import './Header.css';

import Button from './Button.jsx';
import FormInput from './FormInput';

function Header ({onSearch, onAdd, count = 0}) {
    const placeholder = count > 1 ? `Найдено ${count} позиций` : `Поиск`; 
    return (
        <div className='Header'>
            <Logo />
            <div>
                <FormInput placeholder={placeholder} id='search' onChange={onSearch}/>
            </div>
            <div>
                <Button onClick={onAdd}><b>&#65291;</b>Добавить вино</Button>
            </div>
        </div>
    );
}

export default Header;