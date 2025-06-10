import React from 'react'
import StyledInput from '../Input/Input';


export default function PetContainer() {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('м');
    const [breedId, setBreedId] = useState(0);
    const [color, setColor] = useState('коричневый');
    const [weight, setWeight] = useState(0);
    const [edit, setEdit] = useState(false);

    if (edit){
        return <div>
            <form onSubmit={}>
            <div>
                <label htmlFor="">Имя</label>
                <StyledInput type="text" value={name} name={name} onChange = {(e)=>setName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="">Имя</label>
                <StyledInput type="text" value={name} name={name} onChange = {(e)=>setName(e.target.value)}/>
            </div>
            </form>
        </div>
    }
    return (
        <></>
    )
}
