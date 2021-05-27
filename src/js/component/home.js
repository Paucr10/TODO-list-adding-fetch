import React, { useState } from "react";

export function Home() {
	const FetchUrl =
		"https://assets.breatheco.de/apis/fake/todos/user/usuarioPaucr10";
	const [currentItem, setCurrentItem] = useState();
	const [todos, setTodos] = useState([]);

	const onChangeHandler = e => {
		setCurrentItem(e.target.value);
	};

	const addTodo = async e => {
		if (e.key == "Enter" && e.target.value !== "") {
			const NuevoTodo = { label: currentItem, done: false };
			// Se hace el put
			await fetch(FetchUrl, {
				method: "PUT",
				body: JSON.stringify([...todos, NuevoTodo]),
				headers: { "Content-Type": "application/json" }
			})
				.then(res => res.json())
				.then(data => console.log([data]));
			// Se hace el get para obtener el todo
			await fetch(FetchUrl)
				.then(res => res.json())
				.then(data => {
					setTodos(data);
					setCurrentItem("");
				});
		}
	};

	const delTodo = async key => {
		// Como me quedaba un todo, lo fuerzo a que me quede la lista en blanco
		if (todos.length === 1) {
			setTodos([]);
		} else {
			const listaNueva = todos.filter((item, index) => {
				return key !== index ? item : null;
			});
			// Se hace le put
			await fetch(FetchUrl, {
				method: "PUT",
				body: JSON.stringify(listaNueva),
				headers: { "Content-Type": "application/json" }
			})
				.then(res => res.json())
				.then(data => console.log([data]));
			// Se hace el get para eliminar un todo
			await fetch(FetchUrl)
				.then(res => res.json())
				.then(data => {
					setTodos(data);
					// e.target.value = " ";
				});
		}
	};

	return (
		<div className="principal">
			<h1>Things ToDo</h1>
			<h3>Please type your tasks</h3>
			<header className="home-header">
				<div className="wrapper">
					<div className="Input-wrapper">
						<input
							value={currentItem}
							onKeyPress={addTodo}
							onChange={onChangeHandler}
							tye="text"
							placeholder="What needs to be done?"
						/>
						<div>
							{todos.map((todo, key) => {
								return (
									<div className="window" key={key}>
										{todo.label}
										<button onClick={() => delTodo(key)}>
											x
										</button>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}
