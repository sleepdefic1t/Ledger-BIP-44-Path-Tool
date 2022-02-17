import React, { useState } from "react";
import './App.css'

import * as Bip44 from "./bip44";

export default function App() {
	const [path, setPath] = useState("");
	const [parsed, setParsed] = useState("");

	function handleParse() {
		try {
			setParsed(Bip44.Path.fromString(path).toBytes().toString("hex"));
		} catch (e) {
			alert(e);
		}
		setPath("");
	}

	function setDefault() {
		setPath(defaultPath);
	}

	const headerImageUrl = "https://raw.githubusercontent.com/LedgerHQ/ledger-live-desktop/develop/build/icon.png"
	const headerText = "This tool parses a standard BIP-44 path into a packed uint32 hex-string prepended by its element length. This is useful when creating APDU instructions for Ledger HW wallet communication where a derivation path is required.";

	const defaultPath = "44'/1'/0'/0/0"
	const defaultResult ="058000002c80000001800000000000000000000000";
	const pathPlaceholder = "Path: (e.g., \"" + defaultPath + "\")";

	function ContentHeader() {
		return (
			<header className="content-header">
				<img src={headerImageUrl} />
				<p className="header-description">{headerText}</p>
			    <p className="header-example">
				    For example, the path <code>{defaultPath}</code> becomes <code>{defaultResult}</code>.
			    </p>
			</header>
		)
	}

	function ContentBody() {
		return (
			<div className="content-body">
				<input className={path}
					   type="text"
					   placeholder={pathPlaceholder}
					   defaultValue={path}
					   onChange={e => setPath(e.target.value)} />
			    <button className="default-button"
					    onClick={setDefault}>Use Default</button>
				<button className="parse-button"
					    onClick={handleParse}>Parse Path</button>
			</div>
		)
	}

	function ContentFooter() {
		return (
			<footer className="content-result">
				<textarea className={parsed}
					   defaultValue={parsed}
					   placeholder={"result"} />
			</footer>
		)
	}

	return (
		<main>
			<ContentHeader />
			<ContentBody />
			<ContentFooter />
		</main>
	)
}
