"use client";
import { userAgent } from "next/server";
import { hostname } from "os";
import React, { useEffect, useState } from "react";
export default function page() {
	const [data, setData] = useState();
const [keyboard, setKeyboard] = useState("");
	useEffect(() => {
		const fetchHostname = async () => {
			const response = await fetch("/api/os");
			const data = await response.json();
			setData(data);
			console.log(data);
		};
		fetchHostname();
setKeyboard(navigator.language);
	}, []);
	return (
		<div>
			<h1>Voici les informations de ma machine</h1>
			<p>Nom de la machine : {data?.data?.hostname}</p>
            <p>OS : {data?.data?.type}</p>
			<p>Version : {data?.data?.release}</p>
			<p>clavier de la machine : {keyboard}</p>
		</div>
	);
}
