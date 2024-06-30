import Body from "./Body";
import Excel from "./Excel";
import Logo from "./Logo";
import Button from "./Button";
import Suggest from "./Suggest";
import Rating from "./Rating";

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
            <h2>Suggest</h2>
            <p>
                <Suggest options={[`eenie`, `meenie`, `miney`, `mo `]}></Suggest>
            </p>
            <h2>Rating</h2>
            <p>
                Оценка не поставлена: <Rating />
            </p>
            <p>
                Рейтинг равен "4": <Rating defaultValue={4}/> 
            </p>
            <p>
                Максимальный рейтинг: <Rating max={11} />
            </p>
            <p>
                Только чтение: <Rating readonly={true} defaultValue={3} />
            </p>
        </div>
    );
}

export default Discovery;