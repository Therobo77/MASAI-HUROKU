// API

// 1.base_url - http://localhost:3000/api 
// 2.end point - /todo
// 3. query params - ?id=2 
const url ='http://localhost:3000/api'

window.addEventListener('load', () => {
    getData();
});

let getData = async () => {
    let res = await fetch(`${url}/todo`);
    res = await res.json();
    RendorDom(res);
    // console.log('Success',res);
}

let RendorDom = (data) => {
    let ttask= document.getElementById('ttask');
    ttask.innerText = `TOTAL_TASKS: ${data.length}`;
    let cont = document.getElementById('container');
    cont.innerHTML = null;

    data.forEach(({id,title,status}) => {
        let div1= document.createElement('div');

        let h3= document.createElement('h3');
        h3.innerText = title;

        let p = document.createElement('p');
        p.innerText = status;

        // delete

        let dltbtn= document.createElement('button');
        dltbtn.innerText = 'Delete';
        dltbtn.style.backgroundColor = 'red';
        dltbtn.style.color = 'white';
        dltbtn.onclick = () => {
            Remove(id);
        };

        // toggle

        let togle_btn= document.createElement('button');
        togle_btn.innerText = 'Toggle';
        togle_btn.style.backgroundColor = 'blue';
        togle_btn.style.color = 'white';
        togle_btn.onclick = () => {
            Toggle(id);
        };
        div1.append(h3,p,dltbtn,togle_btn);
        cont.append(div1);
    });
}


let addTodo = async () => {
    let todo = document.getElementById('todo').value;

    let todo_data ={
        "title": todo,
        "id":Date.now() +todo,
        "status": false
    };

    let res = await fetch(`${url}/todo`, {
        method: 'POST',
        body: JSON.stringify(todo_data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    getData();
}


let Remove = async (id)=>{
    let res = await fetch(`${url}/todo/${id}`, {
        method: 'DELETE',
    });
    getData();
}
let Toggle = async (id)=>{

    let todo = await fetch(`${url}/todo/${id}`);
        todo = await todo.json();

    let todo_status = {status: !todo.status};

    let res = await fetch(`${url}/todo/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(todo_status),
        headers: {
            "Content-Type": "application/json",
        },
    });
    getData();
}