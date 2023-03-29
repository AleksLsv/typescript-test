import React, {useState} from 'react';
//import './App.module.css';
import s from './App.module.css';


function isPalindrome(word: string): boolean {
    const initialWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversedWord = initialWord.split("").reverse().join("");
    return initialWord === reversedWord;
}

console.log(isPalindrome("anna"));
console.log(isPalindrome("Anna"));
console.log(isPalindrome("YellowSubmarine"));


interface Row {
    id: number;
    word: string;
}

interface Props {
    state: Row[];
}

interface Props2 extends Props {
    onAddRow: (row: Row) => void;
}


const initialState: Row[] = [
    {id: 1, word: "anna"},
    {id: 2, word: "Anna"},
    {id: 3, word: "YellowSubmarine"}
];

function App() {

    const [state, setState] = useState(initialState);

    const handleAddRow = (newRow: Row) => {
        setState([...state, newRow]);
    };

    return (
        <div className="App">
            <Form state = {state} onAddRow={handleAddRow}/>
            <Table state={state}/>
        </div>
    );
}

const Table = (props: Props) => {

    const rows = props.state.map(p => <SingleRow id={p.id} word={p.word}/>)

    return (
        <table id="my-table" className="table">
            <thead>
            <tr>
                <th>Sequence Number</th>
                <th>Input Word</th>
                <th>Expected Result === Actual Result</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    )
};


const SingleRow = ({id, word}: Row) => {

    let check = isPalindrome(word);
    let trueOrFalse = (t: boolean) => t ? s.true : s.false;

    return (
        <tr>
            <td>{id}</td>
            <td>{word}</td>
            <td className={trueOrFalse(check)}> {String(check)} </td>
        </tr>
    )
}


const Form = (props: Props2) => {

    const [word, setWord] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const newRow: Row = {
            id: props.state.length+1,//new Date().getTime(),
            word: word
        };
        props.onAddRow(newRow);
        setWord('');
    };


    return (

        <form id="add-test-form" className="form" onSubmit={handleSubmit}>
            <h2>Add a new test</h2>
            <label htmlFor="input-word">Input word: </label>
            <input type="text"
                   placeholder="Enter your word"
                   value={word}
                   onChange={(event) => setWord(event.target.value)}/>
            <button type="submit"> Run test</button>
            <p></p>
        </form>

    )
};


export default App;
