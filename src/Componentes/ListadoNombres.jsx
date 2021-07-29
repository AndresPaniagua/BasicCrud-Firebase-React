import React, {useState} from 'react';
import uniqid from 'uniqid';

const ListadoNombres = () => {
    const [nombre, setNombre] = useState('');
    const [listaNombres, setListaNombres] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [id, setId] = useState('');
    const [error, setError] = useState(null);

    const AddName = (e) => {
        e.preventDefault();
        if(!nombre.trim()) {
            setError('Debe escribir un nombre');
            return;
        }

        const newName = {
            id: uniqid(),
            tituloNombre: nombre
        };

        setListaNombres([...listaNombres, newName]);
        setNombre('');
        setError(null);
    }

    const DeleteName = (nameId) => {
        const newArray = listaNombres.filter(item => item.id !== nameId);
        setListaNombres(newArray);
    }

    const Edit = (item) => {
        setModoEdicion(true);
        setNombre(item.tituloNombre);
        setId(item.id);
    }

    const EditName = (e) => {
        e.preventDefault();
        if(!nombre.trim()) {
            setError('Debe escribir un nombre');
            return;
        }
        const newArray = listaNombres
            .map(item => item.id === id ? {id: id, tituloNombre: nombre} : item);
        setListaNombres(newArray);
        setNombre('');
        setModoEdicion(false);
        setError(null);
    }

    return (
        <div>
            <h2>App de Crud Basica</h2>

            <div className="row">
                <div className="col">
                    <h2>Listado de nombres</h2>
                    <ul className="list-group">
                        {
                            listaNombres.map((item) =>
                                <li 
                                    key={item.id} 
                                    className="list-group-item">
                                        {item.tituloNombre}
                                    <button onClick={() => {DeleteName(item.id)}} className="btn btn-danger float-end ml-2">
                                        Delete
                                    </button>
                                    <button onClick={() => {Edit(item)}} className="btn btn-warning float-end ml-2">
                                        Edit
                                    </button>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="col">
                    <h2>Formulario para añadir nombres</h2>
                    <form onSubmit={modoEdicion ? EditName : AddName} className="form-group">
                        <input 
                            onChange={(e)=>{setNombre(e.target.value)}} 
                            value={nombre}
                            className="form-control m-2" 
                            type="text" 
                            placeholder="Introduce el nombre" />
                        <input 
                            className="btn btn-success m-2" 
                            type="submit"
                            value={modoEdicion ? 'Edit' : 'Add'}/>
                    </form>
                    {
                        error != null ? 
                            (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ) 
                        : 
                            (
                                <div></div>
                            )}
                </div>
            </div>
        </div>
    )
}

export default ListadoNombres;
