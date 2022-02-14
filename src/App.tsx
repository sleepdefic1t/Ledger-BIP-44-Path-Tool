import React, { useState } from "react";
import './App.css'

import * as Bip44 from "./bip44";

export default function App() {
	const [path, setPath] = useState("");
	const [parsed, setParsed] = useState("");
	const pathPlaceholder = "BIP Path (44'/1'/0'/0/0)";

	function handleParse() {
		try {
			setParsed(Bip44.Path.fromString(path).toBytes().toString("hex"));
		} catch (e) {
			alert(e);
		}
		setPath("");
	}

	return (
		<main>
			<header>
				<center>
					<img src="https://raw.githubusercontent.com/LedgerHQ/ledger-live-desktop/develop/build/icon.png" width="250px" />
				</center>
				<p style={{fontSize: '10px', textAlign: 'left'}}>This tool parses a standard BIP-44 path into a packed uint32 hex-string prepended by its element length. This is useful when creating APDU instructions for Ledger HW wallet communication where a derivation path is required.</p>
				<p style={{fontSize: '10px'}}>For example, the path <code style={{background: 'rgba(0, 0, 0, 0.25)'}}>"44'/1'/0'/0/0"</code> becomes <code style={{background: 'rgba(0, 0, 0, 0.25)'}}>058000002c80000001800000000000000000000000</code>.</p>
			</header>
			<div>
				<div>Enter your BIP Path below:</div>
				<input label="Path" placeholder={pathPlaceholder} value={path} onChange={e => setPath(e.target.value)} className={path} />
			</div>
			<div>
				<button style={{ width: '50%', color: 'black' }} onClick={handleParse}>Parse Path</button>
			</div>
			<result>
				<div>Parsed Path: {parsed}</div>
			</result>
		</main>
	)
}
