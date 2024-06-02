import Body from "./Body";
import Excel from "./Excel";
import Logo from "./Logo";

function Discovery() {
    return (
        <div>
            <h2>Excel</h2>
            <Excel headers={[`Name`, `Year`]} initialData={[[`Charles`, `1859`], [`Antoine`, `1943`]]}/>
            <h2>Logo</h2>
            <Logo />
            <h2>Body</h2>
            <Body />
        </div>
    );
}

export default Discovery;