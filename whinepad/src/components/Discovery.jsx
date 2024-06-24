import Body from "./Body";
import Excel from "./Excel";
import Logo from "./Logo";
import Button from "./Button";

function Discovery() {
    return (
        <div>
            <h2>Excel</h2>
            <Excel headers={[`Name`, `Year`]} initialData={[[`Charles`, `1859`], [`Antoine`, `1943`]]}/>
            <h2>Logo</h2>
            <Logo />
            <h2>Body</h2>
            <Body>Тут будет контент</Body>
            <h2>Кнопки</h2>
            <p>
                Кнопка с нажатием: {` `}
                <Button onClick={()=>alert(`ouch`)}>Нажми на меня</Button>    
            </p>
            <p>
                Ссылка: <Button href={`https://reactjs.org/`}>Перейти</Button>
            </p>
            <p>
                Пользовательское имя класа: {` `}
                <Button className={`Discovery-custom-button`}>Ничего не делаю</Button>
            </p>

        </div>
    );
}

export default Discovery;