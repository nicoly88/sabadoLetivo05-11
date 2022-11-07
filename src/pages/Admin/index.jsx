import { useState } from 'react';
import './admin.css';
import { auth } from '../../firebaseConnection';
import { signOut } from 'firebase/auth'
import { addDoc, collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';

function Admin() {
    const [tarefaInput, setTatefaInput] = useState('');
    const [user, setUser] = useState({})
    const[tarefas, setTarefas] = useState([])
    const unsub = onSnapshot(q,(snapshot)=>{
        let lista = [];
        snapshot.forEach((doc)=>{
            lista.push({
                id:doc.id,
                tarefa: doc.data().tarefa,
                userUid:doc.data().userUid
            })
        })
        console.log(lista)
        setTarefas(lista)
    })

    useEffect(() => {
        if(userDetail){
            const data = JSON.parse(userDetail);
            const tarefaRef = collection(db,"tarefas")
            const q = query(tarefaRef, 
                    orderBy("created","desc"), 
                    where("userUid", "==",data?.uid))
            const unsub = onSnapshot(q,(snapshot)=>{
        })
        }//fim do if


        async function loadTarefas() {
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))
        }
        loadTarefas();
    }, [])

    return (
        <div className="admin-container">
            <h1>Minhas Tarefas</h1>
            <form className='form' onSubmit={handleRegister}>
                <textarea
                    placeholder="Digite sua tarefa"
                    value={tarefaInput}
                    onChange={(e) => setTatefaInput(e.target.value)}
                />
                <button type="submit">Registrar tarefa</button>
            </form>

            <article className='list'>
                <p>Estudar JavaScript com React</p>
                <div>
                    <button>Editar</button>
                    <button className='btn-delete'>Concluir</button>
                </div>
            </article>
            <button className='btn-logout' onClick={handleLogout}>Sair</button>
        </div>
    )
}

async function handleRegister(e) {
    e.preventDefault();//para não atualizar a página 
    if (tarefaInput === '') {
        alert("Digite sua tarefa")
        return; //para parar a execução do código
    }
    await addDoc(collection(db,'tarefas'),{
        tarefa: tarefaInput,
        created: new Date(),
        userUid: user?.uid
    })
    .then(() => {
        console.log("Tarefa Registrada")
        setTarefaInput('')
    })
    .catch((error) => {
        console.log("Erro ao Registrar"+ error)
    })
}//fim da função handleRegister

async function handleLogout() {
    await signOut(auth)
}//fim da função handleLogout

export default Admin;