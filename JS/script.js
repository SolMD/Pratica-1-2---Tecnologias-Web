let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

/* CADASTRO */
const form = document.getElementById("formCadastro");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensagem = document.getElementById("mensagem");

        if (nome === "" || email === "") {
            mensagem.textContent = "Preencha todos os campos.";
            mensagem.style.color = "red";
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            mensagem.textContent = "Email inválido.";
            mensagem.style.color = "red";
            return;
        }

        const novoUsuario = {
            id: Date.now(),
            nome,
            email
        };

        usuarios.push(novoUsuario);

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        mensagem.textContent = "Cadastro realizado com sucesso.";
        mensagem.style.color = "green";

        form.reset();
    });
}

/* LISTAGEM */
const lista = document.getElementById("lista");

if (lista) {
    renderizarLista();
}

function renderizarLista() {
    lista.innerHTML = "";

    if (usuarios.length === 0) {
        lista.innerHTML = "<p style='text-align:center;'>Nenhum usuário cadastrado</p>";
        return;
    }

    usuarios.forEach((user) => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${user.nome} - ${user.email}
            <button onclick="remover(${user.id})">Excluir</button>
        `;

        lista.appendChild(li);
    });
}

/* REMOVER */
function remover(id) {
    usuarios = usuarios.filter(user => user.id !== id);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    renderizarLista();
}