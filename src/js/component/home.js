import React, { useState, useEffect } from "react";

export function Home() {
	//creamos las constantes que manejaran la app con su usestate
	const [Searched, setSearched] = useState(false);
	const [inputSearch, SetSearchValue] = useState("");
	const [inputValue, SetInputValue] = useState("");
	const [todoList, settodoList] = useState([]);

	//La URL se pedira al inicio para ir a buscar el usuario correcto dentro de todos los usuarios que tiene el fake api de la academia
	let URL = "https://assets.breatheco.de/apis/fake/todos/user/" + inputSearch;

	async function CreateUserProfile() {
		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		let raw = JSON.stringify([]);

		let requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		const response = await fetch(URL, requestOptions)
			.then(res => {
				if (res.status == 200) {
					SearchTodotodoList();
				}
			})
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	}

	async function SearchTodotodoList() {
		let requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		const response = await fetch(URL, requestOptions)
			.then(res => {
				if (res.status == 404) {
					CreateUserProfile();
				} else {
					return res.json();
				}
			})
			.catch(error => console.log("error", error));

		settodoList(response);
		setSearched(true);
		console.log(response);
	}

	async function UpdateTodo(newarray) {
		console.log(newarray);
		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		let raw = JSON.stringify(newarray);

		let requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		const response = await fetch(URL, requestOptions)
			.then(res => {
				if (res.status == 200) {
					SearchTodotodoList();
				}
			})
			.catch(error => console.log("error", error));
	}

	async function EraseTodo() {
		let requestOptions = {
			method: "DELETE",
			redirect: "follow"
		};

		const response = await fetch(URL, requestOptions)
			.then(res => {
				if (res.status == 200) {
					setSearched(false);
					SetInputValue("");
					return res;
				}
			})
			.catch(error => console.log("error", error));

		SetInputValue("");
		console.log(response);
	}

	const Addtodo = e => {
		if (e.key === "Enter") {
			const newtodoList = todoList.concat({
				label: inputValue,
				done: false
			});
			UpdateTodo(newtodoList);
			SetInputValue("");
		}
	};

	function RemoveTodo(e) {
		const newtodoList = todoList.filter(item => item !== e);
		//console.log(newtodoList.length);
		if (newtodoList.length == 0) {
			EraseTodo();
		} else {
			UpdateTodo(newtodoList);
		}
	}

	const TodoList = () => {
		if (todoList == undefined) {
			return (
				<div>
					<p>Hello, Add something to your todo list</p>
				</div>
			);
		} else {
			return (
				<div>
					<ul className="todoList-group">
						{todoList.map((item, id) => (
							<li
								className="todoList-group-item d-flex justify-content-between align-items-center"
								key={id}>
								{item.label}
								<button
									onClick={() => RemoveTodo(item)}
									className="btn btn-link">
									<i className="fas fa-times"></i>
								</button>
							</li>
						))}
					</ul>
					<span className="float-left text-muted mt-2">
						{todoList.length} left
					</span>
				</div>
			);
		}
	};

	if (!Searched) {
		return (
			<div className="text-white text-center mt-5 justify-content-center.bg-light">
				<h1>Things ToDo</h1>
				<div className="card cardtodos mx-auto">
					<div className="card-body">
						<div className="input-group mb-3">
							<input
								type="text"
								value={inputSearch}
								className="form-control"
								onChange={e => SetSearchValue(e.target.value)}
								placeholder="UserName"
							/>
							<div className="input-group-append ml-3">
								<button
									type="button"
									className="btn btn-success"
									onClick={() => SearchTodotodoList()}>
									Go
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="text-center mt-5 justify-content-center.bg-light">
				<h1 className="text-white">Things ToDo </h1>
				<div className="card cardtodos mx-auto">
					<div className="card-body">
						<div className="input-group mb-3">
							<input
								type="text"
								value={inputSearch}
								className="form-control"
								onChange={e => SetSearchValue(e.target.value)}
								placeholder="UserName"
							/>
							<div className="input-group-append">
								<button
									type="button"
									className="btn btn-primary"
									onClick={() => SearchTodotodoList()}>
									Go
								</button>
							</div>
						</div>
						<div>
							<div className="input-group mb-3">
								<input
									type="text"
									className="form-control"
									placeholder="Something you wanna do?"
									value={inputValue}
									onChange={e =>
										SetInputValue(e.target.value)
									}
									onKeyUp={Addtodo}
								/>
							</div>
							<TodoList />
						</div>
					</div>
					<div className="card-footer">
						<button
							type="button"
							className="btn btn-success"
							onClick={() => EraseTodo()}>
							Clear All
						</button>
					</div>
				</div>
			</div>
		);
	}
}
