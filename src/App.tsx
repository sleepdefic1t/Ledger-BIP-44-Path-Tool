import React, { useState } from "react";
import './App.css'

import * as Bip44 from "./utils/bip44";

export default function App() {
	const headerImageUrl = "./icon.png"
	const headerText = "This tool parses a standard BIP-44 path into a packed uint32 hex-string prepended by its element length. This is useful when creating APDU instructions for Ledger HW wallet communication where a derivation path is required.";

	const defaultPath = "44'/1'/0'/0/0"
	const defaultResult = "058000002c80000001800000000000000000000000";
	const pathPlaceholder = "Path: (e.g., \"" + defaultPath + "\")";

	const [path, setPath] = useState("");
	const [parsed, setParsed] = useState("");

	function handleParse() {
		try {
			setParsed(Bip44.Path.fromString(path).toBytes().toString("hex"));
		} catch (err) {
			alert(err);
			setParsed("");
		}
		setPath("");
	}

	function handleSetDefault() {
		setParsed("");
		setPath(defaultPath);
	}

	function handleSubmit(e: any) {
		e.preventDefault();
		e.target.reset();
	}

	return (
		<main>

			<div className="card">
				<header className="content-header">
					<img src={headerImageUrl} />
					<p className="header-description">{headerText}</p>
					<p className="header-example">
						For example, the path <code>{defaultPath}</code> becomes <code>{defaultResult}</code>.
					</p>
				</header>
			</div>

			<div className="content-body">
				<form className="path-form"
					onSubmit={e => handleSubmit(e)}>
					<input type="text"
						className={path}
						defaultValue={path}
						placeholder={pathPlaceholder}
						onChange={e => setPath(e.target.value)} />
					<button className="default-button"
						onClick={handleSetDefault}>Default</button>
					<button className="parse-button"
						onClick={handleParse}>Parse</button>
				</form>
			</div>

			<div className="card">
				<footer className="content-result">
					<textarea className={parsed}
						defaultValue={parsed}
						placeholder={"result"} />
				</footer>
			</div>

		</main>
	)
}
