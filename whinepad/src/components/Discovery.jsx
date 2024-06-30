import Body from "./Body";
import Excel from "./Excel";
import Logo from "./Logo";
import Button from "./Button";
import Suggest from "./Suggest";
import Rating from "./Rating";
import FormInput from "./FormInput";

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
            <h2>Различные формы</h2>
            <table className={"Discovery-pad"}>
                <tbody>
                    <tr>
                        <td>Стандартное поле для ввода</td>
                        <td><FormInput /></td>
                    </tr>
                    <tr>
                        <td>Поле с заданным значением</td>
                        <td><FormInput defaultValue={`with a default`}/></td>
                    </tr>
                    <tr>
                        <td>Поле для ввода "год"</td>
                        <td><FormInput type={`year`}/></td>
                    </tr>
                    <tr>
                        <td>Поле тип "рейтинг"</td>
                        <td><FormInput type={`rating`} defaultValue={4}/></td>
                    </tr>
                    <tr>
                        <td>Поле выпадающий список</td>
                        <td>
                            <FormInput 
                                type={`suggest`}
                                options={[`red`, `green`, `blue`]}
                                defaultValue={`green`}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Стандартное текстовое поле</td>
                        <td>
                            <FormInput 
                                type={`textarea`}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Discovery;